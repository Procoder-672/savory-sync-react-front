from flask import Flask
from flask_bcrypt import Bcrypt
from flask_jwt_extended import JWTManager
from config import Config
from models import db
from cors_config import configure_cors
import os

# Import routes
from routes.auth import auth_bp
from routes.restaurants import restaurants_bp
from routes.menu import menu_bp
from routes.orders import orders_bp
from routes.analytics import analytics_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    
    # Initialize extensions
    db.init_app(app)
    bcrypt = Bcrypt(app)
    jwt = JWTManager(app)
    configure_cors(app)
    
    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(restaurants_bp, url_prefix='/api/restaurants')
    app.register_blueprint(menu_bp, url_prefix='/api')
    app.register_blueprint(orders_bp, url_prefix='/api/orders')
    app.register_blueprint(analytics_bp, url_prefix='/api/analytics')
    
    # Health check endpoint
    @app.route('/api/health', methods=['GET'])
    def health_check():
        return {'status': 'healthy', 'message': 'SavorySync API is running'}, 200
    
    return app

if __name__ == '__main__':
    app = create_app()
    
    with app.app_context():
        db.create_all()
    
    app.run(debug=True, host='0.0.0.0', port=5000) 