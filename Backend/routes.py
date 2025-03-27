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
from flask_cors import CORS
from models import db, User, RevokedToken, Product, Category, Cart, Favorite, Order, ShippingDetail
from datetime import datetime, timedelta
import os
import json

app = Flask(__name__) 



bcrypt = Bcrypt()
auth_bp = Blueprint("auth", __name__)
routes_bp = Blueprint("routes", __name__)

# Constants for login attempt limits
MAX_FAILED_ATTEMPTS = 3
LOCKOUT_DURATION = timedelta(minutes=10)

# Define product categories (to match frontend)
PRODUCT_CATEGORIES = [
    "Tops",
    "Skirts",
    "Dresses",
    "Jackets", 
    "Shoes",
    "Pants"
]

@app.route('/images/<path:filename>')
def serve_images(filename):
    return send_from_directory(os.path.join(app.root_path, 'assets/images'), filename)

# Role-based access control
def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_identity = get_jwt_identity()
        user = User.query.filter_by(email=user_identity["email"]).first()
        if not user or not user.is_admin:
            return jsonify({"error": "Admin access required"}), 403
        return fn(*args, **kwargs)
    return wrapper


# Authentication Routes
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

@routes_bp.route('/login', methods=['POST'])
def login():
    email = request.json.get("email", None)
    password_hash = request.json.get("password_hash", None)

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password_hash, password_hash):
        access_token = create_access_token(identity=user.email)  
        refresh_token = create_refresh_token(identity=user.email)

        return jsonify({
            "access_token": access_token,
            "refresh_token": refresh_token,
            "is_admin": user.is_admin  
        })
    else:
        return jsonify({"message": "Invalid username or password"}), 401

@routes_bp.route('/refresh', methods=['POST'])
@jwt_required(refresh=True)
def refresh():
    current_user_id = get_jwt_identity()
    new_access_token = create_access_token(identity=current_user_id)
    return jsonify({"access_token": new_access_token}), 200

@routes_bp.route("/current_user", methods=["GET"])
@jwt_required()
def get_current_user():
    current_user_email = get_jwt_identity()
    current_user = User.query.filter_by(email=current_user_email).first()

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
def check_if_token_in_blocklist(jwt_header, decrypted_token):
    jti = decrypted_token["jti"]
    return jti in BLACKLIST

@routes_bp.route("/logout", methods=["POST"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    BLACKLIST.add(jti)
    return jsonify({"success":"Logged out successfully"}), 200

# # Product Routes
# @routes_bp.route('/products', methods=['GET'])
# def get_products():
#     """Retrieve all products with optional filtering and pagination"""
#     try:
#         # Pagination
#         page = request.args.get('page', 1, type=int)
#         per_page = request.args.get('per_page', 10, type=int)
        
#         # Filtering options
#         category = request.args.get('category')
#         min_price = request.args.get('min_price', type=float)
#         max_price = request.args.get('max_price', type=float)
        
#         # Base query
#         query = Product.query
        
#         # Apply filters
#         if category:
#             query = query.filter_by(category=category)
        
#         if min_price is not None:
#             query = query.filter(Product.price >= min_price)
        
#         if max_price is not None:
#             query = query.filter(Product.price <= max_price)
        
#         # Paginate results
#         paginated_products = query.paginate(page=page, per_page=per_page)
        
#         return jsonify({
#             "products": [
#                 {
#                     "id": product.id,
#                     "name": product.name,
#                     "category": product.category,
#                     "price": product.price,
#                     "stock": product.stock,
#                     "status": product.status,
#                     "image": product.image
#                 } for product in paginated_products.items
#             ],
#             "total_products": paginated_products.total,
#             "page": page,
#             "per_page": per_page,
#             "total_pages": paginated_products.pages
#         }), 200
    
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500

@routes_bp.route('/products', methods=['GET'])
def get_products():
    """Retrieve all products with proper field names"""
    try:
        # Pagination
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 10, type=int)
        
        # Base query
        query = Product.query
        
        # Apply filters if needed
        category_id = request.args.get('category_id')
        min_price = request.args.get('min_price', type=float)
        max_price = request.args.get('max_price', type=float)
        
        if category_id:
            query = query.filter_by(category_id=category_id)
        if min_price is not None:
            query = query.filter(Product.price >= min_price)
        if max_price is not None:
            query = query.filter(Product.price <= max_price)
        
        # Get paginated results
        paginated_products = query.paginate(page=page, per_page=per_page)
        
        # Format response to match frontend expectations
        products_data = []
        for product in paginated_products.items:
            # Get category name
            category = Category.query.get(product.category_id)
            category_name = category.name if category else "Unknown"
            
            products_data.append({
                "id": product.id,
                "title": product.title,
                "description": product.description,
                "price": product.price,
                "discount": product.discount,
                "quantity": product.quantity,
                "tag": product.tag,
                "colors": product.colors if isinstance(product.colors, list) else json.loads(product.colors),
                "sizes": product.sizes if isinstance(product.sizes, list) else json.loads(product.sizes),
                "images": product.images if isinstance(product.images, list) else json.loads(product.images),
                "category_id": product.category_id,
                "category_name": category_name,
                "created_at": product.created_at.isoformat() if product.created_at else None
            })
        
        return jsonify({
            "products": products_data,
            "total_products": paginated_products.total,
            "page": page,
            "per_page": per_page,
            "total_pages": paginated_products.pages
        }), 200
    
    except Exception as e:
        # Log the full error for debugging
        app.logger.error(f"Error in get_products: {str(e)}", exc_info=True)
        return jsonify({"error": "Failed to fetch products"}), 500


@routes_bp.route('/products/<int:product_id>', methods=['GET'])
def get_product(product_id):
    """Retrieve a specific product by ID"""
    product = Product.query.get_or_404(product_id)
    
    return jsonify({
        "id": product.id,
        "name": product.name,
        "category": product.category,
        "price": product.price,
        "stock": product.stock,
        "status": product.status,
        "image": product.image
    }), 200

# @routes_bp.route('/products', methods=['POST'])
# @jwt_required()
# def create_product():
#     """Create a new product with comprehensive validation"""
#     try:
#         data = request.get_json()
        
#         # Validate required fields
#         required_fields = ['name', 'category', 'price', 'stock', 'status']
#         for field in required_fields:
#             if field not in data:
#                 return jsonify({"error": f"{field} is required"}), 400
        
#         # Validate category
#         if data['category'] not in PRODUCT_CATEGORIES:
#             return jsonify({"error": "Invalid category"}), 400
        
#         # Validate price and stock
#         try:
#             price = float(data['price'])
#             stock = int(data['stock'])
            
#             if price < 0:
#                 return jsonify({"error": "Price must be non-negative"}), 400
            
#             if stock < 0:
#                 return jsonify({"error": "Stock must be non-negative"}), 400
#         except ValueError:
#             return jsonify({"error": "Invalid price or stock format"}), 400
        
#         # Validate status
#         valid_statuses = ['In Stock', 'Low Stock', 'Out of Stock']
#         if data['status'] not in valid_statuses:
#             return jsonify({"error": "Invalid status"}), 400
        
#         # Create new product
#         new_product = Product(
#             name=data['name'],
#             category=data['category'],
#             price=price,
#             stock=stock,
#             status=data['status'],
#             image=data.get('image', '')
#         )
        
#         db.session.add(new_product)
#         db.session.commit()
        
#         return jsonify({
#             "message": "Product created successfully", 
#             "product": {
#                 "id": new_product.id,
#                 "name": new_product.name,
#                 "category": new_product.category,
#                 "price": new_product.price,
#                 "stock": new_product.stock,
#                 "status": new_product.status,
#                 "image": new_product.image
#             }
#         }), 201
    
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @routes_bp.route('/products/<int:product_id>', methods=['PUT'])
# @jwt_required()
# def update_product(product_id):
#     """Update an existing product"""
#     try:
#         product = Product.query.get_or_404(product_id)
#         data = request.get_json()
        
#         # Update fields that are present in the request
#         if 'name' in data:
#             product.name = data['name']
        
#         if 'category' in data:
#             if data['category'] not in PRODUCT_CATEGORIES:
#                 return jsonify({"error": "Invalid category"}), 400
#             product.category = data['category']
        
#         if 'price' in data:
#             try:
#                 price = float(data['price'])
#                 if price < 0:
#                     return jsonify({"error": "Price must be non-negative"}), 400
#                 product.price = price
#             except ValueError:
#                 return jsonify({"error": "Invalid price format"}), 400
        
#         if 'stock' in data:
#             try:
#                 stock = int(data['stock'])
#                 if stock < 0:
#                     return jsonify({"error": "Stock must be non-negative"}), 400
#                 product.stock = stock
#             except ValueError:
#                 return jsonify({"error": "Invalid stock format"}), 400
        
#         if 'status' in data:
#             valid_statuses = ['In Stock', 'Low Stock', 'Out of Stock']
#             if data['status'] not in valid_statuses:
#                 return jsonify({"error": "Invalid status"}), 400
#             product.status = data['status']
        
#         if 'image' in data:
#             product.image = data['image']
        
#         db.session.commit()
        
#         return jsonify({
#             "message": "Product updated successfully",
#             "product": {
#                 "id": product.id,
#                 "name": product.name,
#                 "category": product.category,
#                 "price": product.price,
#                 "stock": product.stock,
#                 "status": product.status,
#                 "image": product.image
#             }
#         }), 200
    
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500

# @routes_bp.route('/products/<int:product_id>', methods=['DELETE'])
# @jwt_required()
# def delete_product(product_id):
#     """Delete a product"""
#     try:
#         product = Product.query.get_or_404(product_id)
        
#         db.session.delete(product)
#         db.session.commit()
        
#         return jsonify({
#             "message": "Product deleted successfully"
#         }), 200
    
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 500


# @routes_bp.route('/products', methods=['POST'])
# # @admin_required
# def create_product():
#     data = request.get_json()
#     product = Product(**data)
#     db.session.add(product)
#     db.session.commit()
#     return jsonify({"message": "Product created successfully"}), 201

@routes_bp.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.get_json()
        
        # Update required fields to match your model
        required_fields = ['title', 'description', 'price', 'tag', 'colors', 'sizes', 'category_id']
        for field in required_fields:
            if field not in data:
                return jsonify({"error": f"Missing required field: {field}"}), 400
        
        # Create product with your model's structure
        new_product = Product(
            title=data['title'],
            description=data['description'],
            price=float(data['price']),
            discount=float(data.get('discount', 0.0)),
            quantity=int(data.get('quantity', 1)),
            tag=data['tag'],
            colors=data['colors'],
            sizes=data['sizes'],
            images=data.get('images', []),
            category_id=int(data['category_id'])
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
            "product": {
                "id": new_product.id,
                "title": new_product.title,
                "description": new_product.description,
                "price": new_product.price,
                "discount": new_product.discount,
                "quantity": new_product.quantity,
                "tag": new_product.tag,
                "colors": new_product.colors,
                "sizes": new_product.sizes,
                "images": new_product.images,
                "category_id": new_product.category_id,
                "created_at": new_product.created_at.isoformat()
            }
        }), 201
    
    except ValueError as e:
        return jsonify({"error": "Invalid number format"}), 400
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
    
# @routes_bp.route('/products/<int:product_id>', methods=['PUT'])
# # @admin_required
# def update_product(product_id):
#     product = Product.query.get_or_404(product_id)
#     data = request.get_json()
#     for key, value in data.items():
#         setattr(product, key, value)
#     db.session.commit()
#     return jsonify({"message": "Product updated successfully"}), 200

@routes_bp.route('/products/<int:product_id>', methods=['PUT', 'OPTIONS'])
@cross_origin()
def update_product(product_id):
    if request.method == 'OPTIONS':
        return jsonify({}), 200
    
    # Rest of your PUT route implementation
    product = Product.query.get_or_404(product_id)
    data = request.get_json()
    
    for key, value in data.items():
        setattr(product, key, value)
    
    db.session.commit()
    
    return jsonify({
        "message": "Product updated successfully",
        "product": {
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
        }
    }), 200


@routes_bp.route('/products/<int:product_id>', methods=['DELETE'])
# @admin_required
def delete_product(product_id):
    product = Product.query.get_or_404(product_id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({"message": "Product deleted successfully"}), 200

# Cart Routes
@routes_bp.route('/cart', methods=['POST'])
@jwt_required()
def add_to_cart():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    data = request.get_json()
    product_id = data.get('product_id')
    quantity = data.get('quantity', 1)
    
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    cart_item = Cart(user_id=user.id, product_id=product_id, quantity=quantity)
    db.session.add(cart_item)
    db.session.commit()
    return jsonify({'message': 'Product added to cart'}), 201

@routes_bp.route('/cart', methods=['GET'])
@jwt_required()
def get_cart():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    cart_items = Cart.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'product_id': c.product_id, 
        'quantity': c.quantity,
        'product': {
            'name': Product.query.get(c.product_id).name,
            'price': Product.query.get(c.product_id).price,
            'image': Product.query.get(c.product_id).image
        }
    } for c in cart_items]), 200

@routes_bp.route('/cart/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_cart(product_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    cart_item = Cart.query.filter_by(user_id=user.id, product_id=product_id).first()
    if cart_item:
        db.session.delete(cart_item)
        db.session.commit()
        return jsonify({'message': 'Product removed from cart'}), 200
    return jsonify({'error': 'Product not found in cart'}), 404

# Favorite Routes
@routes_bp.route('/favorites', methods=['POST'])
@jwt_required()
def add_to_favorites():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    data = request.get_json()
    product_id = data.get('product_id')
    
    # Check if product exists
    product = Product.query.get(product_id)
    if not product:
        return jsonify({'error': 'Product not found'}), 404
    
    # Check if already favorited
    existing_favorite = Favorite.query.filter_by(user_id=user.id, product_id=product_id).first()
    if existing_favorite:
        return jsonify({'message': 'Product already in favorites'}), 200
    
    favorite = Favorite(user_id=user.id, product_id=product_id)
    db.session.add(favorite)
    db.session.commit()
    return jsonify({'message': 'Product added to favorites'}), 201

@routes_bp.route('/favorites', methods=['GET'])
@jwt_required()
def get_favorites():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'product_id': f.product_id,
        'product': {
            'name': Product.query.get(f.product_id).name,
            'price': Product.query.get(f.product_id).price,
            'image': Product.query.get(f.product_id).image
        }
    } for f in favorites]), 200

@routes_bp.route('/favorites/<int:product_id>', methods=['DELETE'])
@jwt_required()
def remove_from_favorites(product_id):
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    favorite = Favorite.query.filter_by(user_id=user.id, product_id=product_id).first()
    if favorite:
        db.session.delete(favorite)
        db.session.commit()
        return jsonify({'message': 'Product removed from favorites'}), 200
    return jsonify({'error': 'Product not found in favorites'}), 404

# User Profile Routes
@routes_bp.route('/profile', methods=['PUT'])
@jwt_required()
def edit_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    data = request.get_json()
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        # Check if new email already exists
        if User.query.filter(User.email == data['email'], User.id != user.id).first():
            return jsonify({'error': 'Email already in use'}), 400
        user.email = data['email']
    
    db.session.commit()
    return jsonify({
        'message': 'Profile updated successfully',
        'user': {
            'id': user.id,
            'username': user.username,
            'email': user.email
        }
    }), 200

# Order Routes
@routes_bp.route('/orders', methods=['GET'])
@jwt_required()
def get_orders():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    if not user:
        return jsonify({'error': 'User not found'}), 404
        
    orders = Order.query.filter_by(user_id=user.id).all()
    return jsonify([{
        'order_id': o.id, 
        'status': o.status, 
        'total': o.total,
        'created_at': o.created_at.isoformat()
    } for o in orders]), 200

# Error handlers
@routes_bp.errorhandler(404)
def resource_not_found(e):
    return jsonify({"error": "Resource not found"}), 404

@routes_bp.errorhandler(400)
def bad_request(e):
    return jsonify({"error": "Bad request"}), 400

@routes_bp.errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal server error"}), 500

# Add these new routes to routes.py

@routes_bp.route('/profile', methods=['GET'])
@jwt_required()
def get_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Get user's favorites
    favorites = Favorite.query.filter_by(user_id=user.id).all()
    favorite_products = [Product.query.get(f.product_id) for f in favorites]
    
    # Get user's orders
    orders = Order.query.filter_by(user_id=user.id).all()
    
    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "image": user.image,
            "created_at": user.created_at.isoformat()
        },
        "favorites": [
            {
                "id": p.id,
                "title": p.title,
                "price": p.price,
                "image": p.images[0] if p.images else None
            } for p in favorite_products if p
        ],
        "orders": [
            {
                "id": o.id,
                "total_price": o.total_price,
                "status": o.status,
                "created_at": o.created_at.isoformat(),
                "items": [
                    {
                        "product_id": item.product_id,
                        "quantity": item.quantity
                    } for item in o.order_items
                ]
            } for o in orders
        ]
    }), 200

@routes_bp.route('/profile/update', methods=['PUT'])
@jwt_required()
def update_profile():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    
    if 'username' in data:
        user.username = data['username']
    if 'email' in data:
        user.email = data['email']
    
    db.session.commit()
    
    return jsonify({"message": "Profile updated successfully"}), 200

@routes_bp.route('/profile/password', methods=['PUT'])
@jwt_required()
def change_password():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    data = request.get_json()
    
    if not all(key in data for key in ['current_password', 'new_password']):
        return jsonify({"error": "Missing required fields"}), 400
    
    if not user.check_password(data['current_password']):
        return jsonify({"error": "Current password is incorrect"}), 401
    
    try:
        user.set_password(data['new_password'])
        db.session.commit()
        return jsonify({"message": "Password changed successfully"}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

# Profile Image
@routes_bp.route('/profile/image', methods=['POST'])
@jwt_required()
def upload_profile_image():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    if 'image' not in request.files:
        return jsonify({"error": "No image provided"}), 400
    
    image_file = request.files['image']
    if image_file.filename == '':
        return jsonify({"error": "No selected file"}), 400
    
    # Generate a unique filename
    import uuid
    ext = image_file.filename.split('.')[-1]
    filename = f"user_{user.id}_{uuid.uuid4().hex}.{ext}"
    
    # In production, you would upload to cloud storage like S3
    upload_folder = os.path.join(app.root_path, 'static', 'uploads')
    os.makedirs(upload_folder, exist_ok=True)
    filepath = os.path.join(upload_folder, filename)
    image_file.save(filepath)
    
    # Update user's image path
    user.image = f"/static/uploads/{filename}"
    db.session.commit()
    
    return jsonify({
        "message": "Image uploaded successfully",
        "image_url": user.image
    }), 200
    
@routes_bp.route('/profile/current-password', methods=['GET'])
@jwt_required()
def check_password_exists():
    current_user_email = get_jwt_identity()
    user = User.query.filter_by(email=current_user_email).first()
    
    if not user:
        return jsonify({"error": "User not found"}), 404
    
    # Return a boolean indicating if a password is set
    # For security, never return the actual password hash
    return jsonify({
        "has_password": user.password_hash is not None
    }), 200
    
