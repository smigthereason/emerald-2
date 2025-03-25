from functools import wraps
from flask import Flask, send_from_directory
from flask import Blueprint, request, jsonify
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    create_access_token,
    create_refresh_token,
    jwt_required,
    get_jwt_identity,
    get_jwt,
)
from sqlalchemy.exc import IntegrityError
from flask_cors import cross_origin
from models import db, User, RevokedToken, Product, Category, Cart, Favorite, Order, ShippingDetail
from datetime import datetime, timedelta
import os

app = Flask(__name__) 


bcrypt = Bcrypt()
auth_bp = Blueprint("auth", __name__)
routes_bp = Blueprint("routes", __name__)

# Constants for login attempt limits
MAX_FAILED_ATTEMPTS = 3
LOCKOUT_DURATION = timedelta(minutes=10)

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets/images'), filename)


@routes_bp.route('/register', methods=['POST'])
def register():
    if request.method == 'OPTIONS':  
        return '', 200
    
    data = request.get_json()
    
    if 'username' not in data or 'email' not in data or 'password' not in data:
        return jsonify({'error': 'Missing required fields'}), 400
    
    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify({'error': 'User with this email already exists'}), 400
    
    hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')

    new_user = User(
        username=data['username'],
        email=data['email'],
        password_hash=hashed_password,
        is_admin=False
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({'success': 'User registered successfully'}), 201


@app.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password_hash = request.json.get("password_hash", None)

    # Query the user by email
    user = User.query.filter_by(email=email).first()

    # Check if the user exists and the password is correct
    if user and bcrypt.check_password_hash(user.password_hash, password_hash):
        access_token = create_access_token(identity=user.id)
        refresh_token = create_refresh_token(identity=user.id)

        # Return tokens and the user's role
        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token,
            # "is_admin": user.is_admin  
        })
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@app.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": new_access_token}), 200

@app.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_id = get_jwt_identity()
    current_user = User.query.get(current_user_id)
    if current_user:
        return jsonify({
            "id": current_user.id, 
            "username": current_user.username, 
            "email": current_user.email,
            "is_admin": current_user.is_admin
        }), 200
    else:
        return jsonify({"message": "User not found"}), 404



BLACKLIST = set()
# @jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    jti = decrypted_token["jti"]
    return jti in BLACKLIST

@app.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Logged out successfully"}), 200


# # Google OAuth route placeholder
# @auth_bp.route("/login/google", methods=["GET"])
# def google_login():
#     # This would be implemented with a library like authlib or directly with Google OAuth
#     # For now, just a placeholder
#     return jsonify({"message": "Google OAuth not implemented"}), 501

# @auth_bp.route("/register", methods=["POST", "OPTIONS"])
# @cross_origin(
#     origins=["http://localhost:5173", "http://127.0.0.1:5173"],
#     methods=["POST", "OPTIONS"],
#     supports_credentials=True
# )
# def register():
#     # Handle preflight OPTIONS request
#     if request.method == "OPTIONS":
#         response = jsonify({"message": "OK"})
#         response.headers.add('Access-Control-Allow-Origin', 'http://localhost:5173')
#         response.headers.add('Access-Control-Allow-Headers', 'Content-Type')
#         response.headers.add('Access-Control-Allow-Methods', 'POST, OPTIONS')
#         return response, 200

#     data = request.get_json()
    
#     # Validate input data
#     if not data:
#         return jsonify({"error": "No input data provided"}), 400
    
#     # Check for required fields
#     required_fields = ["username", "email", "password"]
#     for field in required_fields:
#         if field not in data:
#             return jsonify({"error": f"Missing required field: {field}"}), 400

#     try:
#         # Validate username and email
#         User.validate_username(data["username"])
#         User.validate_email(data["email"])

#         # Check if user already exists
#         existing_user = User.query.filter_by(email=data["email"]).first()
#         if existing_user:
#             return jsonify({"error": "Email already exists. Please use a different email."}), 400

#         # Create new user
#         user = User(
#             username=data["username"], 
#             email=data["email"]
#         )
#         user.set_password(data["password"])

#         db.session.add(user)
#         db.session.commit()

#         # Generate token for immediate login after registration
#         token = user.generate_token()

#         return jsonify({
#             "message": "User registered successfully",
#             "token": token,
#             "user": {
#                 "id": user.id,
#                 "username": user.username,
#                 "email": user.email,
#             },
#         }), 201

#     except ValueError as ve:
#         # Catch specific validation errors
#         return jsonify({"error": str(ve)}), 400
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

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



@routes_bp.route('/products', methods=['POST'])
def create_product():
    """
    Create a new product
    """
    try:
        data = request.get_json()
        
        # Validate required fields
        required_fields = ['title', 'description', 'price', 'quantity', 'tag', 'colors', 'sizes', 'category_id']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"{field} is required"}), 400
        
        # Check if category exists
        category = Category.query.get(data['category_id'])
        if not category:
            return jsonify({"error": "Invalid category"}), 404
        
        # Create new product
        new_product = Product(
            title=data['title'],
            description=data['description'],
            price=data['price'],
            discount=data.get('discount', 0.0),
            quantity=data['quantity'],
            tag=data['tag'],
            colors=data['colors'],
            sizes=data['sizes'],
            category_id=data['category_id'],
            images=data.get('images', [])
        )
        
        # Validate discount
        try:
            new_product.validate_discount()
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        
        db.session.add(new_product)
        db.session.commit()
        
        return jsonify({
            "message": "Product created successfully", 
            "product_id": new_product.id
        }), 201
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes_bp.route('/products', methods=['GET'])
def get_products():
    """
    Retrieve all products with optional filtering and pagination
    """
    try:
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Filtering options
        category_id = request.args.get('category_id', type=int)
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        tag = request.args.get('tag')
        
        # Base query
        query = Product.query
        
        # Apply filters
        if category_id:
            query = query.filter_by(category_id=category_id)
        
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        if tag:
            query = query.filter_by(tag=tag)
        
        # Paginate results
        paginated_products = query.paginate(page=page, per_page=per_page)
        
        return jsonify({
            "products": [
                {
                    "id": product.id,
                    "title": product.title,
                    "description": product.description,
                    "price": product.price,
                    "discount": product.discount,
                    "quantity": product.quantity,
                    "tag": product.tag,
                    "colors": product.colors,
                    "sizes": product.sizes,
                    "images": product.images,
                    "category_id": product.category_id,
                    "created_at": product.created_at.isoformat()
                } for product in paginated_products.items
            ],
            "total_products": paginated_products.total,
            "page": page,
            "per_page": per_page,
            "total_pages": paginated_products.pages
        }), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@routes_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """
    Retrieve a specific product by ID
    """
    product = Product.query.get_or_404(product_id)
    
    return jsonify({
        "id": product.id,
        "title": product.title,
        "description": product.description,
        "price": product.price,
        "discount": product.discount,
        "quantity": product.quantity,
        "tag": product.tag,
        "colors": product.colors,
        "sizes": product.sizes,
        "images": product.images,
        "category_id": product.category_id,
        "created_at": product.created_at.isoformat()
    }), 200

@routes_bp.route('/products/<int:product_id>', methods=['PUT'])
def update_product(product_id):
    """
    Update an existing product
    """
    try:
        product = Product.query.get_or_404(product_id)
        data = request.get_json()
        
        # Update fields that are present in the request
        if 'title' in data:
            product.title = data['title']
        
        if 'description' in data:
            product.description = data['description']
        
        if 'price' in data:
            product.price = data['price']
        
        if 'discount' in data:
            product.discount = data['discount']
        
        if 'quantity' in data:
            product.quantity = data['quantity']
        
        if 'tag' in data:
            product.tag = data['tag']
        
        if 'colors' in data:
            product.colors = data['colors']
        
        if 'sizes' in data:
            product.sizes = data['sizes']
        
        if 'images' in data:
            product.images = data['images']
        
        if 'category_id' in data:
            # Verify category exists
            category = Category.query.get(data['category_id'])
            if not category:
                return jsonify({"error": "Invalid category"}), 404
            product.category_id = data['category_id']
        
        # Validate discount
        try:
            product.validate_discount()
        except ValueError as e:
            return jsonify({"error": str(e)}), 400
        
        db.session.commit()
        
        return jsonify({
            "message": "Product updated successfully",
            "product_id": product.id
        }), 200
    
    except IntegrityError:
        db.session.rollback()
        return jsonify({"error": "Database integrity error"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@routes_bp.route('/products/<int:product_id>', methods=['DELETE'])
def delete_product(product_id):
    """
    Delete a product
    """
    try:
        product = Product.query.get_or_404(product_id)
        
        db.session.delete(product)
        db.session.commit()
        
        return jsonify({
            "message": "Product deleted successfully"
        }), 200
    
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

# Error handlers
@routes_bp.errorhandler(404)
def resource_not_found(e):
    return jsonify({"error": "Resource not found"}), 404

@routes_bp.errorhandler(400)
def bad_request(e):
    return jsonify({"error": "Bad request"}), 400





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
