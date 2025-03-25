from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
)
from flask_cors import cross_origin
from models import db, User, RevokedToken
from datetime import datetime, timedelta

bcrypt = Bcrypt()
auth_bp = Blueprint("auth", __name__)

# Constants for login attempt limits
MAX_FAILED_ATTEMPTS = 3
LOCKOUT_DURATION = timedelta(minutes=10)


@auth_bp.route("/register", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)
def register():
    if request.method == "OPTIONS":
        response = jsonify({"message": "OK"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200

    data = request.get_json()
    try:
        User.validate_username(data["username"])
        User.validate_email(data["email"])

        # Check if user already exists
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user:
            return (
                jsonify(
                    {"error": "Email already exists. Please use a different email."}
                ),
                400,
            )

        user = User(username=data["username"], email=data["email"])
        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        # Generate token for immediate login after registration
        token = user.generate_token()

        return (
            jsonify(
                {
                    "message": "User registered successfully",
                    "token": token,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                }
            ),
            201,
        )

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


@auth_bp.route("/login", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    methods=["POST", "OPTIONS"],
    allow_headers=["Content-Type", "Authorization"],
    supports_credentials=True
)
def login():
    if request.method == "OPTIONS":
        response = jsonify({"message": "OK"})
        response.headers.add("Access-Control-Allow-Origin", "http://localhost:5173")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type, Authorization")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        response.headers.add("Access-Control-Allow-Credentials", "true")
        return response, 200

    data = request.get_json()
    user = User.query.filter_by(email=data["email"]).first()

    if user:
        # Check if the user is currently locked out
        if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
            lockout_time_elapsed = datetime.utcnow() - user.last_failed_login
            if lockout_time_elapsed < LOCKOUT_DURATION:
                remaining_lockout = LOCKOUT_DURATION - lockout_time_elapsed
                return (
                    jsonify(
                        {
                            "error": f"Account locked. Try again in {remaining_lockout.seconds // 60} minutes."
                        }
                    ),
                    403,
                )
            else:
                # Reset failed attempts after lockout duration has passed
                user.failed_login_attempts = 0
                db.session.commit()

        if user.check_password(data["password"]):
            # Successful login
            token = user.generate_token()
            user.failed_login_attempts = 0  # Reset on successful login
            db.session.commit()

            return (
                jsonify(
                    {
                        "message": "Login successful",
                        "token": token,
                        "user": {
                            "id": user.id,
                            "username": user.username,
                            "email": user.email,
                        },
                    }
                ),
                200,
            )
        else:
            # Failed login attempt
            user.failed_login_attempts += 1
            user.last_failed_login = datetime.utcnow()
            db.session.commit()

            if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
                return (
                    jsonify(
                        {
                            "error": "Account locked due to multiple failed login attempts. Try again in 10 minutes."
                        }
                    ),
                    403,
                )
            else:
                remaining_attempts = MAX_FAILED_ATTEMPTS - user.failed_login_attempts
                return (
                    jsonify(
                        {
                            "error": f"Invalid credentials. {remaining_attempts} attempts remaining."
                        }
                    ),
                    401,
                )

    return jsonify({"error": "Invalid credentials"}), 401


@auth_bp.route("/logout", methods=["POST", "OPTIONS"])
@cross_origin()
@jwt_required()
def logout():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:
        jti = get_jwt()["jti"]  # Get the unique token identifier
        revoked_token = RevokedToken(jti=jti)  # Create a new revoked token entry
        db.session.add(revoked_token)
        db.session.commit()
        return jsonify({"message": "Successfully logged out"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": "Logout failed"}), 500


@auth_bp.route("/protected", methods=["GET", "OPTIONS"])
@cross_origin()
@jwt_required()
def protected():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)
        if not user:
            return jsonify({"error": "User not found"}), 404

        return (
            jsonify(
                {
                    "message": f"Hello User {user.username}",
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"error": "Authentication failed"}), 401


# Optional: Add a route to check token validity
@auth_bp.route("/verify-token", methods=["GET", "OPTIONS"])
@cross_origin()
@jwt_required()
def verify_token():
    if request.method == "OPTIONS":
        return jsonify({"message": "OK"}), 200

    try:
        current_user = get_jwt_identity()
        user = User.query.get(current_user)

        return (
            jsonify(
                {
                    "valid": True,
                    "user": {
                        "id": user.id,
                        "username": user.username,
                        "email": user.email,
                    },
                }
            ),
            200,
        )
    except Exception as e:
        return jsonify({"valid": False}), 401
