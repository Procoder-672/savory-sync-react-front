from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Order, OrderItem, User, Restaurant, MenuItem
from datetime import datetime

orders_bp = Blueprint('orders', __name__)

@orders_bp.route('/', methods=['POST'])
@jwt_required()
def create_order():
    current_user_id = get_jwt_identity()
    data = request.get_json()
    
    # Generate order number
    order_number = f"ORD-{datetime.now().strftime('%Y%m%d%H%M%S')}"
    
    # Calculate totals
    subtotal = sum(item['price'] * item['quantity'] for item in data['items'])
    delivery_fee = data.get('delivery_fee', 0.0)
    tax = subtotal * 0.08  # 8% tax
    total_amount = subtotal + delivery_fee + tax
    
    order = Order(
        order_number=order_number,
        customer_id=current_user_id,
        restaurant_id=data['restaurant_id'],
        total_amount=total_amount,
        delivery_address=data.get('delivery_address'),
        delivery_fee=delivery_fee,
        tax=tax,
        subtotal=subtotal,
        notes=data.get('notes')
    )
    
    db.session.add(order)
    db.session.flush()  # Get the order ID
    
    # Create order items
    for item_data in data['items']:
        order_item = OrderItem(
            order_id=order.id,
            menu_item_id=item_data['menu_item_id'],
            quantity=item_data['quantity'],
            unit_price=item_data['price'],
            total_price=item_data['price'] * item_data['quantity'],
            customizations=item_data.get('customizations', [])
        )
        db.session.add(order_item)
    
    db.session.commit()
    
    return jsonify({
        'message': 'Order created successfully',
        'order': {
            'id': order.id,
            'order_number': order.order_number,
            'total_amount': order.total_amount,
            'status': order.status
        }
    }), 201

@orders_bp.route('/', methods=['GET'])
@jwt_required()
def get_orders():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role == 'customer':
        orders = Order.query.filter_by(customer_id=current_user_id).order_by(Order.created_at.desc()).all()
    else:  # seller
        restaurant = Restaurant.query.filter_by(owner_id=current_user_id).first()
        if not restaurant:
            return jsonify([]), 200
        orders = Order.query.filter_by(restaurant_id=restaurant.id).order_by(Order.created_at.desc()).all()
    
    orders_data = []
    for order in orders:
        # Get order items
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items_data = []
        for item in order_items:
            items_data.append({
                'id': item.menu_item.id,
                'name': item.menu_item.name,
                'quantity': item.quantity,
                'unit_price': item.unit_price,
                'total_price': item.total_price,
                'customizations': item.customizations or []
            })
        
        order_data = {
            'id': order.id,
            'order_number': order.order_number,
            'customer': user.name if user.role == 'customer' else 'Customer',
            'items': items_data,
            'total': order.total_amount,
            'status': order.status,
            'time': order.created_at.strftime('%Y-%m-%d %H:%M'),
            'delivery_address': order.delivery_address,
            'notes': order.notes
        }
        orders_data.append(order_data)
    
    return jsonify(orders_data), 200

@orders_bp.route('/<int:order_id>/status', methods=['PUT'])
@jwt_required()
def update_order_status(order_id):
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'seller':
        return jsonify({'error': 'Only sellers can update order status'}), 403
    
    order = Order.query.get_or_404(order_id)
    restaurant = Restaurant.query.get(order.restaurant_id)
    
    if restaurant.owner_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    order.status = data['status']
    order.updated_at = datetime.utcnow()
    
    db.session.commit()
    
    return jsonify({'message': 'Order status updated successfully'}), 200

@orders_bp.route('/previous', methods=['GET'])
@jwt_required()
def get_previous_orders():
    current_user_id = get_jwt_identity()
    
    # Get user's previous orders with items
    orders = Order.query.filter_by(customer_id=current_user_id).order_by(Order.created_at.desc()).limit(10).all()
    
    previous_orders = []
    for order in orders:
        order_items = OrderItem.query.filter_by(order_id=order.id).all()
        items_data = []
        for item in order_items:
            items_data.append({
                'id': item.menu_item.id,
                'name': item.menu_item.name,
                'price': item.unit_price,
                'quantity': item.quantity,
                'customizations': item.customizations or []
            })
        
        previous_order = {
            'id': f'order-{order.id}',
            'restaurantId': order.restaurant_id,
            'restaurantName': order.restaurant.name,
            'items': items_data,
            'totalAmount': order.total_amount,
            'orderDate': order.created_at.strftime('%Y-%m-%d'),
            'frequency': 1  # This would be calculated based on order history
        }
        previous_orders.append(previous_order)
    
    return jsonify(previous_orders), 200 