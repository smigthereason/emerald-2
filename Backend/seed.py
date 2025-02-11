from app import create_app, db
from models import User, Product, Category, Tag, Review, ShippingDetail, Order, OrderItem, Cart, Favorite
from faker import Faker
import random

def seed_data():
    app = create_app()
    fake = Faker()

    with app.app_context():
        # Drop and recreate tables
        db.drop_all()
        db.create_all()

        # --- Create Categories ---
        categories = []
        for name in Category.ALLOWED_CATEGORIES:
            category = Category(name=name)
            db.session.add(category)
            categories.append(category)
        db.session.commit()  # Commit after category creation

        # --- Create Tags ---
        tags = []
        for name in Tag.ALLOWED_TAGS:
            tag = Tag(name=name)
            db.session.add(tag)
            tags.append(tag)
        db.session.commit()

        # --- Create Users ---
        users = []
        for _ in range(10):
            user = User(
                username=fake.user_name(),
                email=fake.email(),
                role=random.choice(['user', 'admin'])
            )
            user.set_password('Password123!')  # Set a default password
            db.session.add(user)
            users.append(user)
        db.session.commit()

        # --- Create Products ---
        products = []
        for _ in range(20):
            product = Product(
                name=fake.word().capitalize(),
                description=fake.text(),
                price=round(random.uniform(5.0, 100.0), 2),
                quantity=random.randint(1, 50),
                category_id=random.choice(categories).id  # Use category_id instead of category object
            )
            db.session.add(product)
            products.append(product)
        db.session.commit()

        # --- Create Reviews ---
        for _ in range(30):
            review = Review(
                user_id=random.choice(users).id,  # Use user_id instead of user object
                product_id=random.choice(products).id,  # Use product_id instead of product object
                rating=random.randint(1, 5),
                comment=fake.sentence()
            )
            db.session.add(review)
        db.session.commit()

        # --- Create Shipping Details ---
        for user in users:
            shipping = ShippingDetail(
                user_id=user.id,
                email=user.email,
                phone_number=fake.phone_number(),
                first_name=fake.first_name(),
                last_name=fake.last_name(),
                address=fake.address(),
                country=fake.country(),
                city=fake.city()
            )
            db.session.add(shipping)
        db.session.commit()

        # --- Create Orders and OrderItems ---
        for _ in range(15):
            user = random.choice(users)
            order = Order(
                user_id=user.id,
                total_price=0.0  # Will update after adding items
            )
            db.session.add(order)
            db.session.flush()  # Flush to get order.id before adding items

            total_price = 0.0
            for _ in range(random.randint(1, 5)):
                product = random.choice(products)
                quantity = random.randint(1, 3)
                order_item = OrderItem(
                    order_id=order.id,  # Use order_id instead of order object
                    product_id=product.id,  # Use product_id instead of product object
                    quantity=quantity
                )
                db.session.add(order_item)
                total_price += product.price * quantity

            order.total_price = round(total_price, 2)
        db.session.commit()

        # --- Create Cart Items ---
        for user in users:
            for _ in range(random.randint(1, 5)):
                product = random.choice(products)
                cart_item = Cart(
                    user_id=user.id,  # Use user_id instead of user object
                    product_id=product.id,  # Use product_id instead of product object
                    quantity=random.randint(1, 3)
                )
                db.session.add(cart_item)
        db.session.commit()

        # --- Create Favorites ---
        for user in users:
            for _ in range(random.randint(1, 5)):
                product = random.choice(products)
                favorite = Favorite(
                    user_id=user.id,  # Use user_id instead of user object
                    product_id=product.id  # Use product_id instead of product object
                )
                db.session.add(favorite)
        db.session.commit()

        print("✅ Database seeded successfully.")

if __name__ == '__main__':
    seed_data()
