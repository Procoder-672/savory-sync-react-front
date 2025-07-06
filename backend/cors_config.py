"""
CORS Configuration for SavorySync Backend
"""

from flask_cors import CORS

def configure_cors(app):
    """Configure CORS for the Flask application"""
    
    # Development configuration - allow all origins
    CORS(app, resources={
        r"/api/*": {
            "origins": ["http://localhost:3000", "http://localhost:5173", "http://127.0.0.1:3000", "http://127.0.0.1:5173"],
            "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
            "allow_headers": ["Content-Type", "Authorization", "X-Requested-With"],
            "supports_credentials": True
        }
    })
    
    # For production, you would configure specific origins:
    # CORS(app, resources={
    #     r"/api/*": {
    #         "origins": ["https://your-frontend-domain.com"],
    #         "methods": ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    #         "allow_headers": ["Content-Type", "Authorization"],
    #         "supports_credentials": True
    #     }
    # }) 