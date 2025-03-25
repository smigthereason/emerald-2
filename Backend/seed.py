
from app import create_app, db
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
import json
from app import create_app, db
import cloudinary
import cloudinary.uploader
import os

cloudinary.config(
    cloud_name="dlp71jbrz",
    api_key="553225451165873",
    api_secret="nmzMz9WP9vpeMe0xODHP7z8uXV4"
)

def upload_images_to_cloudinary(image_paths):
    """Uploads a list of images to Cloudinary and returns their URLs."""
    cloudinary_urls = []
    for img_path in image_paths:
        try:
            response = cloudinary.uploader.upload(img_path)
            cloudinary_urls.append(response["secure_url"])
        except Exception as e:
            print(f"Error uploading {img_path}: {e}")
    return cloudinary_urls

def seed_database():
    app = create_app()
    
    with app.app_context():
        from models import User, Category, Tag, Product, Review, ShippingDetail, Order, OrderItem, Cart, ProductTag
        
        # Drop and recreate tables
        db.drop_all()
        db.create_all()

        # Create categories first
        categories = [Category(name=cat) for cat in ["Tops", "Jeans", "Jackets", "Skirts", "Dresses", "Shoes"]]
        db.session.add_all(categories)
        db.session.commit()
        
        
        BASE_IMAGE_PATH = "./assets/images/"

        # Ensure categories are created before creating products
        # When creating products, use the correct category ID
        product_data = [
            {
                "title": "Summer Dress",
                "description": "A light and comfy dress for summer.",
                "price": 49.99,
                "discount": 5.00,
                "quantity": 10,
                "tag": "Summer",
                "colors": ["Red", "Blue", "Green"],
                "sizes": ["S", "M", "L"],
                "category": "Dresses",
                "local_images": ["dresses/d1.jpg", "dresses/d2.jpg"]
            },
            {
                "title": "Denim Jeans",
                "description": "Stylish and durable denim jeans.",
                "price": 59.99,
                "discount": 10.00,
                "quantity": 15,
                "tag": "Winter",
                "colors": ["Black", "Blue"],
                "sizes": ["M", "L", "XL"],
                "category": "Jeans",
                "local_images": ["pants/p1.jpeg", "pants/p2.jpeg"]
            },
            {
                "title": "Ribbed Sleeveless Top",
                "description": "Designed with a high neckline and a form-fitting silhouette, perfect for layering or wearing on its own.",
                "price": 65.00,
                "discount": 10.00,
                "quantity": 8,
                "tag": "Tops",
                "colors": ["Black", "Blue"],
                "sizes": ["M", "L", "XL"],
                "category": "Tops",
                "local_images": ["tops/t1.jpg", "tops/t2.jpg"]
            }
        ]
        
        # Create products and upload their images
        products = []
        for item in product_data:
            category = next((cat for cat in categories if cat.name == item["category"]), None)
            if not category:
                print(f"Category {item['category']} not found, skipping product {item['title']}")
                continue
            
            # Upload each product’s images to Cloudinary
            image_paths = [os.path.join(BASE_IMAGE_PATH, img) for img in item["local_images"]]
            cloudinary_images = upload_images_to_cloudinary(image_paths)
            
            # Create product entry
            product = Product(
                title=item["title"],
                description=item["description"],
                price=item["price"],
                discount=item["discount"],
                quantity=item["quantity"],
                tag=item["tag"],
                colors=json.dumps(item["colors"]),
                sizes=json.dumps(item["sizes"]),
                images=json.dumps(cloudinary_images),  # Store Cloudinary URLs
                category_id=category.id
            )
            products.append(product)

        # Add all products to the database
        db.session.add_all(products)
        db.session.commit()


        # Create users using set_password method
        user1 = User(username="john_doe", email="john@example.com")
        user1.set_password("Secure123!")  # Meets all requirements
        
        user2 = User(username="jane_doe", email="jane@example.com")
        user2.set_password("Strong456@")  # Meets all requirements
        
        user3 = User(username="admin_user", email="admin@example.com", is_admin=True)
        user3.set_password("Admin789!")  # Admin user
        
        db.session.add_all([user1, user2])
        db.session.commit()

        # Create tags
        tags = [Tag(name=tag) for tag in ["Summer", "Winter", "Spring"]]
        db.session.add_all(tags)
        db.session.commit()

        # Link products to tags
        product_tags = [
            ProductTag(product_id=products[0].id, tag_id=tags[0].id),
            ProductTag(product_id=products[1].id, tag_id=tags[1].id)
        ]
        db.session.add_all(product_tags)
        db.session.commit()

        # Create reviews
        reviews = [
            Review(user_id=user1.id, product_id=products[0].id, rating=5, comment="Great summer dress!"),
            Review(user_id=user2.id, product_id=products[1].id, rating=4, comment="Nice jeans but a bit tight.")
        ]
        db.session.add_all(reviews)
        db.session.commit()

        # Create shipping details
        shipping_details = ShippingDetail(
            user_id=user1.id,
            email="john@example.com",
            phone_number="123-456-7890",
            first_name="John",
            last_name="Doe",
            address="123 Street, City, Country",
            country="USA",
            city="New York"
        )
        db.session.add(shipping_details)
        db.session.commit()

        # Create order
        order = Order(user_id=user1.id, total_price=44.99, status='Paid')
        db.session.add(order)
        db.session.commit()

        # Create order items
        order_item = OrderItem(order_id=order.id, product_id=products[0].id, quantity=1)
        db.session.add(order_item)
        db.session.commit()

        # Create cart items
        cart_item = Cart(user_id=user2.id, product_id=products[1].id, quantity=2)
        db.session.add(cart_item)
        db.session.commit()

        print("Database seeded successfully!")

if __name__ == "__main__":
    seed_database()