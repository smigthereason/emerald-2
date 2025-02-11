from flask_sqlalchemy import SQLAlchemy
from datetime import datetime, timedelta
from flask_bcrypt import Bcrypt
from flask_jwt_extended import create_access_token
from sqlalchemy.dialects.postgresql import JSON
import re

# Initialize extensions
db = SQLAlchemy()
bcrypt = Bcrypt()

# User model
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(10), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(256), nullable=False)
    failed_login_attempts = db.Column(db.Integer, default=0)
    last_failed_login = db.Column(db.DateTime, default=datetime.utcnow)
    role = db.Column(db.String(20), default='user', nullable=False)
    image = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    cart_items = db.relationship('Cart', backref='user', lazy=True)
    orders = db.relationship('Order', backref='user', lazy=True)
    
    def set_password(self, password):
        if not re.match(r'^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', password):
            raise ValueError("Password must contain at least one letter, one number, one special character, and be at least 8 characters long")
        self.password_hash = bcrypt.generate_password_hash(password).decode('utf-8')
    
    def check_password(self, password):
        return bcrypt.check_password_hash(self.password_hash, password)
    
    def generate_token(self):
        return create_access_token(identity=str(self.id),expires_delta=timedelta(hours=1))

    @staticmethod
    def validate_username(username):
        if not (4 < len(username) < 10):
            raise ValueError("Username must be between 5 and 9 characters long")
        return True
    
    @staticmethod
    def validate_email(email):
        if not re.match(r'^[\w\.-]+@[\w\.-]+\.\w+$', email):
            raise ValueError("Invalid email format")
        return True

class RevokedToken(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    jti = db.Column(db.String(36), nullable=False, unique=True)
    created_at = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)

    @classmethod
    def is_token_revoked(cls, jti):
        return db.session.query(cls).filter_by(jti=jti).first() is not None
# Category model
class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    products = db.relationship('Product', backref='category', lazy=True)
    
    ALLOWED_CATEGORIES = ["Tops", "Jeans", "Jackets", "Skirts", "Dresses", "Shoes"]
    
    @staticmethod
    def validate_category(name):
        if name not in Category.ALLOWED_CATEGORIES:
            raise ValueError(f"Invalid category: {name}. Allowed: {Category.ALLOWED_CATEGORIES}")
        return True


# Tag model
class Tag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), unique=True, nullable=False)
    products = db.relationship('ProductTag', backref='tag', lazy=True)
    
    ALLOWED_TAGS = ["Summer", "Winter", "Spring"]
    
    @staticmethod
    def validate_tag(name):
        if name not in Tag.ALLOWED_TAGS:
            raise ValueError("Invalid tag")
        return True

# Product model
class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200), nullable=False)
    description = db.Column(db.Text, nullable=False)
    price = db.Column(db.Float, nullable=False)
    discount = db.Column(db.Float, default=0.0)
    quantity = db.Column(db.Integer, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'), nullable=False)
    images = db.Column(JSON, nullable=True)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    product_tags = db.relationship('ProductTag', backref='product', lazy=True)
    
    def validate_discount(self):
        if self.discount >= self.price:
            raise ValueError("Discount must be less than the product price")

# Association table for Product - Tag many-to-many relationship
class ProductTag(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    tag_id = db.Column(db.Integer, db.ForeignKey('tag.id'), nullable=False)

# Favorites model
class Favorite(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)

# Review model
class Review(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.Text, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ShippingDetails model
class ShippingDetail(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    email = db.Column(db.String(120), nullable=False)
    phone_number = db.Column(db.String(20), nullable=False)
    first_name = db.Column(db.String(50), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    address = db.Column(db.String(255), nullable=False)
    country = db.Column(db.String(100), nullable=False)
    city = db.Column(db.String(100), nullable=False)
    location = db.Column(db.String(255), nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# Order model
class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    status = db.Column(db.String(50), default='Pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    order_items = db.relationship('OrderItem', backref='order', lazy=True)
    
    @staticmethod
    def place_order(user_id):
        user_cart = Cart.query.filter_by(user_id=user_id).all()
        if not user_cart:
            raise ValueError("Cart is empty, cannot place order.")
        
        total_price = sum(item.product.price * item.quantity for item in user_cart)
        
        new_order = Order(user_id=user_id, total_price=total_price, status='Paid')
        db.session.add(new_order)
        
        for item in user_cart:
            order_item = OrderItem(order_id=new_order.id, product_id=item.product_id, quantity=item.quantity)
            db.session.add(order_item)
            db.session.delete(item)
        
        db.session.commit()
        return new_order

# OrderItem model
class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)

# Cart model
class Cart(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey('product.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False, default=1)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
