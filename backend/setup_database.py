import mysql.connector
from mysql.connector import Error
import os

def setup_database():
    """Setup MySQL database for SavorySync"""
    
    # Database configuration
    host = os.getenv('DB_HOST', 'localhost')
    user = os.getenv('DB_USER', 'root')
    password = os.getenv('DB_PASSWORD', 'password')
    database = os.getenv('DB_NAME', 'savory_sync')
    
    try:
        # Connect to MySQL server
        connection = mysql.connector.connect(
            host=host,
            user=user,
            password=password
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Create database if it doesn't exist
            cursor.execute(f"CREATE DATABASE IF NOT EXISTS {database}")
            print(f"Database '{database}' created successfully")
            
            # Use the database
            cursor.execute(f"USE {database}")
            
            # Create tables
            create_tables(cursor)
            
            # Insert sample data
            insert_sample_data(cursor)
            
            connection.commit()
            print("Database setup completed successfully!")
            
    except Error as e:
        print(f"Error: {e}")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

def create_tables(cursor):
    """Create all necessary tables"""
    
    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS user (
            id INT AUTO_INCREMENT PRIMARY KEY,
            email VARCHAR(120) UNIQUE NOT NULL,
            password_hash VARCHAR(255) NOT NULL,
            name VARCHAR(100) NOT NULL,
            role VARCHAR(20) NOT NULL,
            phone VARCHAR(20),
            address TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    
    # Restaurants table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS restaurant (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            cuisine VARCHAR(50),
            address TEXT,
            phone VARCHAR(20),
            rating FLOAT DEFAULT 0.0,
            delivery_fee FLOAT DEFAULT 0.0,
            delivery_time VARCHAR(20),
            featured BOOLEAN DEFAULT FALSE,
            active BOOLEAN DEFAULT TRUE,
            owner_id INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (owner_id) REFERENCES user(id)
        )
    """)
    
    # Menu items table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS menu_item (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description TEXT,
            price FLOAT NOT NULL,
            category VARCHAR(50),
            image VARCHAR(255),
            dietary_tags JSON,
            allergens JSON,
            nutritional_info JSON,
            spice_level VARCHAR(20),
            preparation_time INT,
            is_popular BOOLEAN DEFAULT FALSE,
            active BOOLEAN DEFAULT TRUE,
            restaurant_id INT NOT NULL,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
        )
    """)
    
    # Orders table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS `order` (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_number VARCHAR(20) UNIQUE NOT NULL,
            customer_id INT NOT NULL,
            restaurant_id INT NOT NULL,
            status VARCHAR(20) DEFAULT 'pending',
            total_amount FLOAT NOT NULL,
            delivery_address TEXT,
            delivery_fee FLOAT DEFAULT 0.0,
            tax FLOAT DEFAULT 0.0,
            subtotal FLOAT NOT NULL,
            notes TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (customer_id) REFERENCES user(id),
            FOREIGN KEY (restaurant_id) REFERENCES restaurant(id)
        )
    """)
    
    # Order items table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS order_item (
            id INT AUTO_INCREMENT PRIMARY KEY,
            order_id INT NOT NULL,
            menu_item_id INT NOT NULL,
            quantity INT NOT NULL,
            unit_price FLOAT NOT NULL,
            total_price FLOAT NOT NULL,
            customizations JSON,
            FOREIGN KEY (order_id) REFERENCES `order`(id),
            FOREIGN KEY (menu_item_id) REFERENCES menu_item(id)
        )
    """)
    
    print("All tables created successfully!")

def insert_sample_data(cursor):
    """Insert sample data for testing"""
    
    # Insert sample users
    users_data = [
        ('john@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS.Oi', 'John Doe', 'customer', '555-0101', '123 Main St'),
        ('sarah@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS.Oi', 'Sarah Wilson', 'customer', '555-0102', '456 Oak Ave'),
        ('mario@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS.Oi', 'Mario Rossi', 'seller', '555-0201', '789 Pizza St'),
        ('chef@example.com', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewdBPj3bp.gS.Oi', 'Chef Wang', 'seller', '555-0202', '321 Wok Ave')
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO user (email, password_hash, name, role, phone, address)
        VALUES (%s, %s, %s, %s, %s, %s)
    """, users_data)
    
    # Insert sample restaurants
    restaurants_data = [
        ("Mario's Pizza Palace", "Authentic Italian pizza made with fresh ingredients", "Italian", "123 Main St, Downtown", "555-0301", 4.8, 2.99, "25-35 min", True, 3),
        ("Dragon Wok", "Traditional Chinese cuisine with a modern twist", "Chinese", "456 Oak Ave, Chinatown", "555-0302", 4.7, 3.49, "30-40 min", True, 4),
        ("Burger Junction", "Juicy burgers and crispy fries", "American", "789 Pine St, Midtown", "555-0303", 4.6, 1.99, "20-30 min", False, 3),
        ("Taco Fiesta", "Vibrant Mexican flavors", "Mexican", "321 Elm St, South Side", "555-0304", 4.5, 2.49, "25-35 min", False, 4)
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO restaurant (name, description, cuisine, address, phone, rating, delivery_fee, delivery_time, featured, owner_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, restaurants_data)
    
    # Insert sample menu items
    menu_items_data = [
        ("Margherita Pizza", "Classic tomato sauce with mozzarella", 12.99, "Pizza", "🍕", '["vegetarian"]', '["dairy", "gluten"]', '{"calories": 285, "protein": 12, "carbs": 35, "fat": 10}', "medium", 15, True, 1),
        ("Pepperoni Pizza", "Spicy pepperoni with melted cheese", 15.99, "Pizza", "🍕", '["gluten"]', '["dairy", "gluten"]', '{"calories": 320, "protein": 15, "carbs": 35, "fat": 14}', "medium", 15, True, 1),
        ("Caesar Salad", "Fresh romaine with caesar dressing", 8.99, "Salad", "🥗", '["vegetarian"]', '["dairy"]', '{"calories": 180, "protein": 8, "carbs": 12, "fat": 12}', "mild", 10, False, 1),
        ("Kung Pao Chicken", "Spicy chicken with peanuts", 14.99, "Main", "🥡", '["gluten-free"]', '["nuts"]', '{"calories": 420, "protein": 28, "carbs": 15, "fat": 22}', "hot", 20, True, 2),
        ("Sweet and Sour Pork", "Crispy pork with tangy sauce", 13.99, "Main", "🥡", '["gluten-free"]', '[]', '{"calories": 380, "protein": 25, "carbs": 18, "fat": 20}', "medium", 18, False, 2),
        ("Classic Burger", "Juicy beef patty with lettuce and tomato", 10.99, "Burger", "🍔", '["gluten"]', '["dairy"]', '{"calories": 450, "protein": 22, "carbs": 30, "fat": 25}', "mild", 12, True, 3),
        ("French Fries", "Crispy golden fries", 4.99, "Sides", "🍟", '["vegetarian", "vegan"]', '[]', '{"calories": 220, "protein": 3, "carbs": 28, "fat": 10}', "mild", 8, False, 3)
    ]
    
    cursor.executemany("""
        INSERT IGNORE INTO menu_item (name, description, price, category, image, dietary_tags, allergens, nutritional_info, spice_level, preparation_time, is_popular, restaurant_id)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
    """, menu_items_data)
    
    print("Sample data inserted successfully!")

if __name__ == "__main__":
    setup_database() 