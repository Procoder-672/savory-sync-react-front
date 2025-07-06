# SavorySync API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

## Endpoints

### Authentication

#### Register User
- **URL**: `/auth/register`
- **Method**: `POST`
- **Description**: Register a new user (customer or seller)
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "customer",
  "phone": "555-0101",
  "address": "123 Main St"
}
```
- **Response**:
```json
{
  "message": "User registered successfully",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

#### Login User
- **URL**: `/auth/login`
- **Method**: `POST`
- **Description**: Login with email and password
- **Request Body**:
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```
- **Response**:
```json
{
  "message": "Login successful",
  "access_token": "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "customer"
  }
}
```

### Restaurants

#### Get All Restaurants
- **URL**: `/restaurants`
- **Method**: `GET`
- **Description**: Get list of all active restaurants
- **Response**:
```json
[
  {
    "id": 1,
    "name": "Mario's Pizza Palace",
    "description": "Authentic Italian pizza",
    "cuisine": "Italian",
    "address": "123 Main St",
    "rating": 4.8,
    "delivery_fee": 2.99,
    "delivery_time": "25-35 min",
    "featured": true,
    "image": "🍕",
    "category": "italian",
    "dietaryOptions": ["vegetarian", "gluten-free"]
  }
]
```

#### Get Restaurant Details
- **URL**: `/restaurants/<id>`
- **Method**: `GET`
- **Description**: Get specific restaurant with menu items
- **Response**:
```json
{
  "id": 1,
  "name": "Mario's Pizza Palace",
  "description": "Authentic Italian pizza",
  "cuisine": "Italian",
  "address": "123 Main St",
  "rating": 4.8,
  "delivery_fee": 2.99,
  "delivery_time": "25-35 min",
  "featured": true,
  "image": "🍕",
  "menu_items": [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "description": "Classic tomato sauce with mozzarella",
      "price": 12.99,
      "category": "Pizza",
      "image": "🍕",
      "dietaryTags": ["vegetarian"],
      "allergens": ["dairy", "gluten"],
      "nutritionalInfo": {
        "calories": 285,
        "protein": 12,
        "carbs": 35,
        "fat": 10
      },
      "spiceLevel": "medium",
      "isPopular": true,
      "preparationTime": 15
    }
  ]
}
```

#### Create Restaurant
- **URL**: `/restaurants`
- **Method**: `POST`
- **Authentication**: Required (Seller only)
- **Description**: Create a new restaurant
- **Request Body**:
```json
{
  "name": "New Restaurant",
  "description": "Amazing food",
  "cuisine": "Italian",
  "address": "456 Oak Ave",
  "phone": "555-0201",
  "delivery_fee": 3.99,
  "delivery_time": "30-45 min",
  "featured": false
}
```

#### Search Restaurants
- **URL**: `/restaurants/search`
- **Method**: `GET`
- **Query Parameters**:
  - `q`: Search query
  - `category`: Category filter
  - `dietary`: Dietary preferences (can be multiple)
- **Example**: `/restaurants/search?q=pizza&category=italian&dietary=vegetarian&dietary=gluten-free`

### Menu Items

#### Get Restaurant Menu
- **URL**: `/restaurants/<restaurant_id>/menu`
- **Method**: `GET`
- **Description**: Get all menu items for a restaurant

#### Add Menu Item
- **URL**: `/restaurants/<restaurant_id>/menu`
- **Method**: `POST`
- **Authentication**: Required (Restaurant owner only)
- **Request Body**:
```json
{
  "name": "New Pizza",
  "description": "Delicious new pizza",
  "price": 14.99,
  "category": "Pizza",
  "image": "🍕",
  "dietary_tags": ["vegetarian"],
  "allergens": ["dairy", "gluten"],
  "nutritional_info": {
    "calories": 300,
    "protein": 15,
    "carbs": 40,
    "fat": 12
  },
  "spice_level": "medium",
  "preparation_time": 20,
  "is_popular": false
}
```

#### Update Menu Item
- **URL**: `/menu-items/<item_id>`
- **Method**: `PUT`
- **Authentication**: Required (Restaurant owner only)

#### Delete Menu Item
- **URL**: `/menu-items/<item_id>`
- **Method**: `DELETE`
- **Authentication**: Required (Restaurant owner only)

### Orders

#### Create Order
- **URL**: `/orders`
- **Method**: `POST`
- **Authentication**: Required
- **Request Body**:
```json
{
  "restaurant_id": 1,
  "items": [
    {
      "menu_item_id": 1,
      "quantity": 2,
      "price": 12.99,
      "customizations": ["Extra cheese", "No onions"]
    }
  ],
  "delivery_address": "123 Main St, Apt 4B",
  "delivery_fee": 2.99,
  "notes": "Please deliver to front door"
}
```
- **Response**:
```json
{
  "message": "Order created successfully",
  "order": {
    "id": 1,
    "order_number": "ORD-20240115123456",
    "total_amount": 28.97,
    "status": "pending"
  }
}
```

#### Get Orders
- **URL**: `/orders`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Get user's orders (customers see their orders, sellers see restaurant orders)

#### Update Order Status
- **URL**: `/orders/<order_id>/status`
- **Method**: `PUT`
- **Authentication**: Required (Seller only)
- **Request Body**:
```json
{
  "status": "preparing"
}
```
- **Status Options**: `pending`, `preparing`, `ready`, `delivered`, `cancelled`

#### Get Previous Orders
- **URL**: `/orders/previous`
- **Method**: `GET`
- **Authentication**: Required
- **Description**: Get previous orders for smart reordering
- **Response**:
```json
[
  {
    "id": "order-1",
    "restaurantId": 1,
    "restaurantName": "Mario's Pizza Palace",
    "items": [
      {
        "id": 1,
        "name": "Margherita Pizza",
        "price": 12.99,
        "quantity": 1,
        "customizations": ["Extra cheese"]
      }
    ],
    "totalAmount": 15.98,
    "orderDate": "2024-01-15",
    "frequency": 1
  }
]
```

### Analytics

#### Get Sales Analytics
- **URL**: `/analytics/sales`
- **Method**: `GET`
- **Authentication**: Required (Seller only)
- **Response**:
```json
{
  "total_revenue": 5420.50,
  "total_orders": 234,
  "avg_order_value": 23.16,
  "popular_items": [
    {
      "id": 1,
      "name": "Margherita Pizza",
      "image": "🍕",
      "order_count": 45
    }
  ]
}
```

## Error Responses

### 400 Bad Request
```json
{
  "error": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "error": "Invalid email or password"
}
```

### 403 Forbidden
```json
{
  "error": "Only sellers can create restaurants"
}
```

### 404 Not Found
```json
{
  "error": "Restaurant not found"
}
```

### 409 Conflict
```json
{
  "error": "Email already registered"
}
```

## Data Models

### User
```json
{
  "id": 1,
  "email": "user@example.com",
  "name": "John Doe",
  "role": "customer",
  "phone": "555-0101",
  "address": "123 Main St",
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Restaurant
```json
{
  "id": 1,
  "name": "Restaurant Name",
  "description": "Restaurant description",
  "cuisine": "Italian",
  "address": "123 Main St",
  "phone": "555-0101",
  "rating": 4.8,
  "delivery_fee": 2.99,
  "delivery_time": "25-35 min",
  "featured": true,
  "active": true,
  "owner_id": 1,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Menu Item
```json
{
  "id": 1,
  "name": "Item Name",
  "description": "Item description",
  "price": 12.99,
  "category": "Pizza",
  "image": "🍕",
  "dietaryTags": ["vegetarian", "gluten-free"],
  "allergens": ["dairy", "gluten"],
  "nutritionalInfo": {
    "calories": 285,
    "protein": 12,
    "carbs": 35,
    "fat": 10
  },
  "spiceLevel": "medium",
  "preparationTime": 15,
  "isPopular": true,
  "active": true,
  "restaurant_id": 1,
  "created_at": "2024-01-15T10:30:00Z"
}
```

### Order
```json
{
  "id": 1,
  "order_number": "ORD-20240115123456",
  "customer_id": 1,
  "restaurant_id": 1,
  "status": "pending",
  "total_amount": 28.97,
  "delivery_address": "123 Main St",
  "delivery_fee": 2.99,
  "tax": 2.08,
  "subtotal": 25.98,
  "notes": "Please deliver to front door",
  "created_at": "2024-01-15T10:30:00Z",
  "updated_at": "2024-01-15T10:30:00Z"
}
```

## Testing

You can test the API using curl, Postman, or any HTTP client. Make sure to:

1. Start the Flask server: `python app.py`
2. Use the correct base URL: `http://localhost:5000/api`
3. Include JWT tokens in Authorization header for protected endpoints
4. Set Content-Type header to `application/json` for POST/PUT requests

## Rate Limiting

Currently, no rate limiting is implemented. For production, consider adding rate limiting middleware.

## CORS

CORS is enabled for all origins in development. For production, configure CORS to allow only your frontend domain. 