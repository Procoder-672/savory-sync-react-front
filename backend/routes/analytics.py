from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, User, Restaurant, Order, OrderItem, MenuItem
from datetime import datetime, timedelta
from sqlalchemy import func

analytics_bp = Blueprint('analytics', __name__)

@analytics_bp.route('/sales', methods=['GET'])
@jwt_required()
def get_sales_analytics():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'seller':
        return jsonify({'error': 'Only sellers can access analytics'}), 403
    
    restaurant = Restaurant.query.filter_by(owner_id=current_user_id).first()
    if not restaurant:
        return jsonify({'error': 'No restaurant found'}), 404
    
    # Get orders for the last 30 days
    thirty_days_ago = datetime.utcnow() - timedelta(days=30)
    orders = Order.query.filter(
        Order.restaurant_id == restaurant.id,
        Order.created_at >= thirty_days_ago
    ).all()
    
    total_revenue = sum(order.total_amount for order in orders)
    total_orders = len(orders)
    avg_order_value = total_revenue / total_orders if total_orders > 0 else 0
    
    # Get popular items
    popular_items = db.session.query(
        MenuItem, func.count(OrderItem.id).label('order_count')
    ).join(OrderItem).filter(
        MenuItem.restaurant_id == restaurant.id
    ).group_by(MenuItem.id).order_by(func.count(OrderItem.id).desc()).limit(5).all()
    
    popular_items_data = []
    for item, count in popular_items:
        popular_items_data.append({
            'id': item.id,
            'name': item.name,
            'image': item.image,
            'order_count': count
        })
    
    return jsonify({
        'total_revenue': total_revenue,
        'total_orders': total_orders,
        'avg_order_value': avg_order_value,
        'popular_items': popular_items_data
    }), 200 