from functools import wraps
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
routes_bp = Blueprint("routes", __name__)

# Constants for login attempt limits
MAX_FAILED_ATTEMPTS = 3
LOCKOUT_DURATION = timedelta(minutes=10)

# Google OAuth route placeholder
@auth_bp.route("/login/google", methods=["GET"])
def google_login():
    # This would be implemented with a library like authlib or directly with Google OAuth
    # For now, just a placeholder
    return jsonify({"message": "Google OAuth not implemented"}), 501

@auth_bp.route("/register", methods=["POST", "OPTIONS"])
@cross_origin(
    origins=["http://localhost:5173", "http://127.0.0.1:5173"],
    methods=["POST", "OPTIONS"],
    supports_credentials=True
)
def register():
    # Handle preflight OPTIONS request
    if request.method == "OPTIONS":
        response = jsonify({"message": "OK"})
        response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
        response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
        response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
        return response, 200

    data = request.get_json()
    
    # Validate input data
    if not data:
        return jsonify({"error": "No input data provided"}), 400
    
    # Check for required fields
    required_fields = ["username", "email", "password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing required field: {field}"}), 400

    try:
        # Validate username and email
        User.validate_username(data["username"])
        User.validate_email(data["email"])

        # Check if user already exists
        existing_user = User.query.filter_by(email=data["email"]).first()
        if existing_user:
            return jsonify({"error": "Email already exists. Please use a different email."}), 400

        # Create new user
        user = User(
            username=data["username"], 
            email=data["email"]
        )
        user.set_password(data["password"])

        db.session.add(user)
        db.session.commit()

        # Generate token for immediate login after registration
        token = user.generate_token()

        return jsonify({
            "message": "User registered successfully",
            "token": token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email,
            },
        }), 201

    except ValueError as ve:
        # Catch specific validation errors
        return jsonify({"error": str(ve)}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Role-based access control
def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        current_user_id = get_jwt_identity()
        user = User.query.get(current_user_id)
        if user.role != 'admin':
            return jsonify({'error': 'Admin access required'}), 403
        return fn(*args, **kwargs)
    return wrapper

# Get all products with pagination
@routes_bp.route('/products', methods=['GET'])
def get_products():
    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    products = Product.query.paginate(page=page, per_page=per_page, error_out=False)
    return jsonify([{'id': p.id, 'name': p.name, 'price': p.price} for p in products.items]), 200

# Admin: Create product
@routes_bp.route('/products', methods=['POST'])
@jwt_required()
@admin_required
def create_product():
    data = request.get_json()
    product = Product(name=data['name'], price=data['price'])
    db.session.add(product)
    db.session.commit()
    return jsonify({'message': 'Product created successfully'}), 201

# Admin: Update product
@routes_bp.route('/products/<int:product_id>', methods=['PATCH'])
@jwt_required()
@admin_required
def update_product(product_id):
    data = request.get_json()
    product = Product.query.get_or_404(product_id)
    if 'name' in data:
        product.name = data['name']
    if 'price' in data:
        product.price = data['price']
    db.session.commit()
    return jsonify({'message': 'Product updated successfully'}), 200

# Admin: Delete product
@routes_bp.route('/products/<int:product_id>', methods=['DELETE'])
@jwt_required()
@admin_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted successfully'}), 200

# Add product to cart
@routes_bp.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user = get_jwt_identity()
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    cart_item = Cart(user_id=current_user, product_id=product_id, quantity=quantity)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'message': 'Product added to cart'}), 201

# Get all products in cart
@routes_bp.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user = get_jwt_identity()
    cart_items = Cart.query.filter_by(user_id=current_user).all()
    return jsonify([{'product_id': c.product_id, 'quantity': c.quantity} for c in cart_items]), 200

# Remove product from cart
@routes_bp.route('/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(product_id):
    current_user = get_jwt_identity()
    cart_item = Cart.query.filter_by(user_id=current_user, product_id=product_id).first()
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Product removed from cart'}), 200
    return jsonify({'error': 'Product not found in cart'}), 404

# Add product to favorites
@routes_bp.route('/favorites', methods=['POST'])
@jwt_required()
def add_to_favorites():
    current_user = get_jwt_identity()
    data = request.get_json()
    favorite = Favorite(user_id=current_user, product_id=data['product_id'])
    db.session.add(favorite)
    db.session.commit()
    return jsonify({'message': 'Product added to favorites'}), 201

# Remove product from favorites
@routes_bp.route('/favorites/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_favorites(product_id):
    current_user = get_jwt_identity()
    favorite = Favorite.query.filter_by(user_id=current_user, product_id=product_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Product removed from favorites'}), 200
    return jsonify({'error': 'Product not found in favorites'}), 404

# Get all favorite products
@routes_bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user = get_jwt_identity()
    favorites = Favorite.query.filter_by(user_id=current_user).all()
    return jsonify([{'product_id': f.product_id} for f in favorites]), 200

# Update shipping details
@routes_bp.route('/shipping', methods=['PUT'])
@jwt_required()
def update_shipping():
    current_user = get_jwt_identity()
    data = request.get_json()
    shipping = ShippingDetail.query.filter_by(user_id=current_user).first()
    if not shipping:
        return jsonify({'error': 'Shipping details not found'}), 404
    shipping.update(data)
    db.session.commit()
    return jsonify({'message': 'Shipping details updated successfully'}), 200

# Edit user profile
@routes_bp.route('/profile', methods=['PUT'])
@jwt_required()
def edit_profile():
    current_user = get_jwt_identity()
    data = request.get_json()
    user = User.query.get_or_404(current_user)
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    db.session.commit()
    return jsonify({'message': 'Profile updated successfully'}), 200

# Get all user orders
@routes_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    current_user = get_jwt_identity()
    orders = Order.query.filter_by(user_id=current_user).all()
    return jsonify([{'order_id': o.id, 'status': o.status, 'total': o.total} for o in orders]), 200
