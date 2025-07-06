from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, MenuItem, Restaurant, User

menu_bp = Blueprint('menu', __name__)

@menu_bp.route('/restaurants/<int:restaurant_id>/menu', methods=['GET'])
def get_menu_items(restaurant_id):
    menu_items = MenuItem.query.filter_by(restaurant_id=restaurant_id, active=True).all()
    
    menu_items_data = []
    for item in menu_items:
        item_data = {
            'id': item.id,
            'name': item.name,
            'description': item.description,
            'price': item.price,
            'category': item.category,
            'image': item.image,
            'dietaryTags': item.dietary_tags or [],
            'allergens': item.allergens or [],
            'nutritionalInfo': item.nutritional_info or {},
            'spiceLevel': item.spice_level,
            'isPopular': item.is_popular,
            'preparationTime': item.preparation_time
        }
        menu_items_data.append(item_data)
    
    return jsonify(menu_items_data), 200

@menu_bp.route('/restaurants/<int:restaurant_id>/menu', methods=['POST'])
@jwt_required()
def create_menu_item(restaurant_id):
    current_user_id = get_jwt_identity()
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    
    if restaurant.owner_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    menu_item = MenuItem(
        name=data['name'],
        description=data.get('description'),
        price=data['price'],
        category=data.get('category'),
        image=data.get('image', '🍕'),
        dietary_tags=data.get('dietary_tags', []),
        allergens=data.get('allergens', []),
        nutritional_info=data.get('nutritional_info', {}),
        spice_level=data.get('spice_level'),
        preparation_time=data.get('preparation_time'),
        is_popular=data.get('is_popular', False),
        restaurant_id=restaurant_id
    )
    
    db.session.add(menu_item)
    db.session.commit()
    
    return jsonify({
        'message': 'Menu item created successfully',
        'menu_item': {
            'id': menu_item.id,
            'name': menu_item.name,
            'price': menu_item.price,
            'category': menu_item.category
        }
    }), 201

@menu_bp.route('/menu-items/<int:item_id>', methods=['PUT'])
@jwt_required()
def update_menu_item(item_id):
    current_user_id = get_jwt_identity()
    menu_item = MenuItem.query.get_or_404(item_id)
    restaurant = Restaurant.query.get(menu_item.restaurant_id)
    
    if restaurant.owner_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    data = request.get_json()
    
    menu_item.name = data.get('name', menu_item.name)
    menu_item.description = data.get('description', menu_item.description)
    menu_item.price = data.get('price', menu_item.price)
    menu_item.category = data.get('category', menu_item.category)
    menu_item.image = data.get('image', menu_item.image)
    menu_item.dietary_tags = data.get('dietary_tags', menu_item.dietary_tags)
    menu_item.allergens = data.get('allergens', menu_item.allergens)
    menu_item.nutritional_info = data.get('nutritional_info', menu_item.nutritional_info)
    menu_item.spice_level = data.get('spice_level', menu_item.spice_level)
    menu_item.preparation_time = data.get('preparation_time', menu_item.preparation_time)
    menu_item.is_popular = data.get('is_popular', menu_item.is_popular)
    menu_item.active = data.get('active', menu_item.active)
    
    db.session.commit()
    
    return jsonify({'message': 'Menu item updated successfully'}), 200

@menu_bp.route('/menu-items/<int:item_id>', methods=['DELETE'])
@jwt_required()
def delete_menu_item(item_id):
    current_user_id = get_jwt_identity()
    menu_item = MenuItem.query.get_or_404(item_id)
    restaurant = Restaurant.query.get(menu_item.restaurant_id)
    
    if restaurant.owner_id != current_user_id:
        return jsonify({'error': 'Unauthorized'}), 403
    
    menu_item.active = False
    db.session.commit()
    
    return jsonify({'message': 'Menu item deleted successfully'}), 200 