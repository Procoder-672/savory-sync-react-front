# SavorySync Backend API

A Flask-based REST API for the SavorySync food delivery platform with MySQL database.

## Features

- **Authentication System**: User registration and login with JWT tokens
- **Restaurant Management**: CRUD operations for restaurants
- **Menu Management**: Add, edit, delete menu items with dietary information
- **Order Management**: Create, track, and update order status
- **Smart Reordering**: Previous order history for quick reordering
- **Analytics**: Sales trends and popular items analysis
- **Search & Filtering**: Restaurant search with dietary preference filtering

## Tech Stack

- **Framework**: Flask
- **Database**: MySQL
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: Bcrypt
- **CORS**: Flask-CORS for cross-origin requests

## Setup Instructions

### Prerequisites

1. Python 3.8+
2. MySQL Server
3. pip (Python package manager)

### Installation

1. **Clone the repository and navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Setup MySQL Database**
   ```bash
   python setup_database.py
   ```

5. **Configure environment variables**
   Create a `.env` file in the backend directory:
   ```
   SECRET_KEY=your-super-secret-key-change-this-in-production
   JWT_SECRET_KEY=your-jwt-secret-key-change-this-in-production
   DATABASE_URL=mysql://root:password@localhost/savory_sync
   FLASK_ENV=development
   FLASK_DEBUG=1
   ```

6. **Run the application**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### Restaurants

- `GET /api/restaurants` - Get all restaurants
- `GET /api/restaurants/<id>` - Get specific restaurant with menu
- `POST /api/restaurants` - Create new restaurant (seller only)
- `GET /api/restaurants/search` - Search restaurants with filters

### Menu Items

- `GET /api/restaurants/<id>/menu` - Get restaurant menu
- `POST /api/restaurants/<id>/menu` - Add menu item (seller only)
- `PUT /api/menu-items/<id>` - Update menu item (seller only)
- `DELETE /api/menu-items/<id>` - Delete menu item (seller only)

### Orders

- `POST /api/orders` - Create new order
- `GET /api/orders` - Get user's orders
- `PUT /api/orders/<id>/status` - Update order status (seller only)
- `GET /api/orders/previous` - Get previous orders for reordering

### Analytics

- `GET /api/analytics/sales` - Get sales analytics (seller only)

## Database Schema

### Users Table
- `id` (Primary Key)
- `email` (Unique)
- `password_hash`
- `name`
- `role` (customer/seller)
- `phone`
- `address`
- `created_at`

### Restaurants Table
- `id` (Primary Key)
- `name`
- `description`
- `cuisine`
- `address`
- `phone`
- `rating`
- `delivery_fee`
- `delivery_time`
- `featured`
- `active`
- `owner_id` (Foreign Key to Users)
- `created_at`

### Menu Items Table
- `id` (Primary Key)
- `name`
- `description`
- `price`
- `category`
- `image`
- `dietary_tags` (JSON)
- `allergens` (JSON)
- `nutritional_info` (JSON)
- `spice_level`
- `preparation_time`
- `is_popular`
- `active`
- `restaurant_id` (Foreign Key to Restaurants)
- `created_at`

### Orders Table
- `id` (Primary Key)
- `order_number` (Unique)
- `customer_id` (Foreign Key to Users)
- `restaurant_id` (Foreign Key to Restaurants)
- `status`
- `total_amount`
- `delivery_address`
- `delivery_fee`
- `tax`
- `subtotal`
- `notes`
- `created_at`
- `updated_at`

### Order Items Table
- `id` (Primary Key)
- `order_id` (Foreign Key to Orders)
- `menu_item_id` (Foreign Key to Menu Items)
- `quantity`
- `unit_price`
- `total_price`
- `customizations` (JSON)

## Sample API Requests

### Register a Customer
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123",
    "name": "John Customer",
    "role": "customer"
  }'
```

### Login
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "customer@example.com",
    "password": "password123"
  }'
```

### Get Restaurants
```bash
curl -X GET http://localhost:5000/api/restaurants
```

### Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "restaurant_id": 1,
    "items": [
      {
        "menu_item_id": 1,
        "quantity": 2,
        "price": 12.99,
        "customizations": ["Extra cheese"]
      }
    ],
    "delivery_address": "123 Main St",
    "notes": "Please deliver to front door"
  }'
```

## Error Handling

The API returns appropriate HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `409` - Conflict
- `500` - Internal Server Error

## Security Features

- Password hashing with Bcrypt
- JWT token authentication
- Role-based access control
- Input validation
- SQL injection prevention with SQLAlchemy ORM

## Development

To run in development mode with auto-reload:
```bash
export FLASK_ENV=development
export FLASK_DEBUG=1
python app.py
```

## Testing

The API includes sample data for testing. You can use the provided endpoints to test all features without creating additional data.

## Deployment

For production deployment:
1. Change secret keys in environment variables
2. Use a production WSGI server (Gunicorn)
3. Set up proper MySQL configuration
4. Configure CORS for your frontend domain
5. Use HTTPS
6. Set up proper logging 