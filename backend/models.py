from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(255), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    role = db.Column(db.String(20), nullable=False)  # 'customer' or 'seller'
    phone = db.Column(db.String(20))
    address = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    restaurant = db.relationship('Restaurant', backref='owner', uselist=False)
    orders = db.relationship('Order', backref='customer', lazy=True)

class Restaurant(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    cuisine = db.Column(db.String(50))
    address = db.Column(db.Text)
    phone = db.Column(db.String(20))
    rating = db.Column(db.Float, default=0.0)
    delivery_fee = db.Column(db.Float, default=0.0)
    delivery_time = db.Column(db.String(20))
    featured = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, default=True)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    
    # Relationships
    menu_items = db.relationship('MenuItem', backref='restaurant', lazy=True)
    orders = db.relationship('Order', backref='restaurant', lazy=True)

class MenuItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category = db.Column(db.String(50))
    image = db.Column(db.String(255))
    dietary_tags = db.Column(db.JSON)  # Store as JSON array
    allergens = db.Column(db.JSON)  # Store as JSON array
    nutritional_info = db.Column(db.JSON)  # Store nutritional info as JSON
    spice_level = db.Column(db.String(20))
    preparation_time = db.Column(db.Integer)  # minutes
    is_popular = db.Column(db.Boolean, default=False)
    active = db.Column(db.Boolean, default=True)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

class Order(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_number = db.Column(db.String(20), unique=True, nullable=False)
    customer_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    restaurant_id = db.Column(db.Integer, db.ForeignKey('restaurant.id'), nullable=False)
    status = db.Column(db.String(20), default='pending')  # pending, preparing, ready, delivered, cancelled
    total_amount = db.Column(db.Float, nullable=False)
    delivery_address = db.Column(db.Text)
    delivery_fee = db.Column(db.Float, default=0.0)
    tax = db.Column(db.Float, default=0.0)
    subtotal = db.Column(db.Float, nullable=False)
    notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    # Relationships
    order_items = db.relationship('OrderItem', backref='order', lazy=True)

class OrderItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    order_id = db.Column(db.Integer, db.ForeignKey('order.id'), nullable=False)
    menu_item_id = db.Column(db.Integer, db.ForeignKey('menu_item.id'), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    unit_price = db.Column(db.Float, nullable=False)
    total_price = db.Column(db.Float, nullable=False)
    customizations = db.Column(db.JSON)  # Store customizations as JSON
    
    # Relationship
    menu_item = db.relationship('MenuItem') 