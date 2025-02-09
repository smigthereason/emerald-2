from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity,get_jwt
from models import db, User,RevokedToken
from datetime import datetime, timedelta

bcrypt = Bcrypt()
auth_bp = Blueprint('auth', __name__)
revoked_tokens = set()
# Constants for login attempt limits
MAX_FAILED_ATTEMPTS = 3
LOCKOUT_DURATION = timedelta(minutes=10)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    try:
        User.validate_username(data['username'])
        User.validate_email(data['email'])
        # Check if user already exists (to give a clear error)
        existing_user = User.query.filter_by(email=data['email']).first()
        if existing_user:
            return jsonify({"error": "Email already exists. Please use a different email."}), 400
        user = User(username=data['username'], email=data['email'])
        user.set_password(data['password'])
        db.session.add(user)
        db.session.commit()
        return jsonify({'message': 'User registered successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    user = User.query.filter_by(email=data['email']).first()

    if user:
        # Check if the user is currently locked out
        if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
            lockout_time_elapsed = datetime.utcnow() - user.last_failed_login
            if lockout_time_elapsed < LOCKOUT_DURATION:
                remaining_lockout = LOCKOUT_DURATION - lockout_time_elapsed
                return jsonify({'error': f'Account locked. Try again in {remaining_lockout.seconds // 60} minutes.'}), 403
            else:
                # Reset failed attempts after lockout duration has passed
                user.failed_login_attempts = 0
                db.session.commit()

        if user.check_password(data['password']):
            # Successful login
            token = user.generate_token()
            user.failed_login_attempts = 0  # Reset on successful login
            db.session.commit()
            return jsonify({'User login successfully ,token': token}), 200
        else:
            # Failed login attempt
            user.failed_login_attempts += 1
            user.last_failed_login = datetime.utcnow()
            db.session.commit()
            if user.failed_login_attempts >= MAX_FAILED_ATTEMPTS:
                return jsonify({'error': 'Account locked due to multiple failed login attempts. Try again in 10 minutes.'}), 403
            else:
                remaining_attempts = MAX_FAILED_ATTEMPTS - user.failed_login_attempts
                return jsonify({'error': f'Invalid credentials. {remaining_attempts} attempts remaining.'}), 401

    return jsonify({'error': 'Invalid credentials'}), 401

@auth_bp.route('/logout', methods=['POST'])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]  # Get the unique token identifier
    revoked_token = RevokedToken(jti=jti)  # Create a new revoked token entry
    db.session.add(revoked_token)
    db.session.commit()
    return jsonify({"message": "Successfully logged out"}), 200

@auth_bp.route('/protected', methods=['GET'])
@jwt_required()
def protected():
    current_user = get_jwt_identity()
    return jsonify({'message': f'Hello User {current_user}'}), 200
