# Quick Setup Guide - SavorySync Backend

## Prerequisites
- Python 3.8+
- MySQL Server
- pip

## Quick Start

1. **Install Dependencies**
   ```bash
   pip install -r requirements.txt
   ```

2. **Setup MySQL Database**
   ```bash
   python setup_database.py
   ```

3. **Initialize Database Tables**
   ```bash
   python init_db.py
   ```

4. **Run the Server**
   ```bash
   python app.py
   ```

The API will be available at `http://localhost:5000`

## Test the API

1. **Health Check**
   ```bash
   curl http://localhost:5000/api/health
   ```

2. **Register a User**
   ```bash
   curl -X POST http://localhost:5000/api/auth/register \
     -H "Content-Type: application/json" \
     -d '{
       "email": "test@example.com",
       "password": "password123",
       "name": "Test User",
       "role": "customer"
     }'
   ```

3. **Get Restaurants**
   ```bash
   curl http://localhost:5000/api/restaurants
   ```

## Default Sample Data

The setup script creates sample data including:
- 4 users (2 customers, 2 sellers)
- 4 restaurants with different cuisines
- 7 menu items across different categories
- Sample orders and order items

## API Endpoints Summary

- **Authentication**: `/api/auth/register`, `/api/auth/login`
- **Restaurants**: `/api/restaurants/*`
- **Menu Items**: `/api/restaurants/*/menu`, `/api/menu-items/*`
- **Orders**: `/api/orders/*`
- **Analytics**: `/api/analytics/*`

## Environment Variables

Create a `.env` file in the backend directory:
```
SECRET_KEY=your-secret-key-here
JWT_SECRET_KEY=your-jwt-secret-key-here
DATABASE_URL=mysql://root:password@localhost/savory_sync
FLASK_ENV=development
FLASK_DEBUG=1
```

## Troubleshooting

1. **Database Connection Error**: Make sure MySQL is running and credentials are correct
2. **Import Errors**: Make sure all dependencies are installed
3. **CORS Issues**: Check that the frontend URL is in the CORS configuration
4. **JWT Token Issues**: Verify the JWT secret key is set correctly

## Next Steps

1. Connect your React frontend to this API
2. Update the frontend API calls to use these endpoints
3. Test all features with the sample data
4. Customize the database schema as needed
5. Deploy to production with proper security settings 