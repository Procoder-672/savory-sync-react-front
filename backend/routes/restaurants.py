from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from models import db, Restaurant, MenuItem, User

restaurants_bp = Blueprint('restaurants', __name__)

@restaurants_bp.route('/', methods=['GET'])
def get_restaurants():
    restaurants = Restaurant.query.filter_by(active=True).all()
    
    restaurant_list = []
    for restaurant in restaurants:
        # Calculate average rating from orders
        ratings = [order.rating for order in restaurant.orders if hasattr(order, 'rating') and order.rating]
        avg_rating = sum(ratings) / len(ratings) if ratings else 0.0
        
        restaurant_data = {
            'id': restaurant.id,
            'name': restaurant.name,
            'description': restaurant.description,
            'cuisine': restaurant.cuisine,
            'address': restaurant.address,
            'rating': avg_rating,
            'delivery_fee': restaurant.delivery_fee,
            'delivery_time': restaurant.delivery_time,
            'featured': restaurant.featured,
            'image': '🍕',  # Default emoji
            'category': restaurant.cuisine.lower() if restaurant.cuisine else 'general',
            'dietaryOptions': []  # Will be populated from menu items
        }
        restaurant_list.append(restaurant_data)
    
    return jsonify(restaurant_list), 200

@restaurants_bp.route('/<int:restaurant_id>', methods=['GET'])
def get_restaurant(restaurant_id):
    restaurant = Restaurant.query.get_or_404(restaurant_id)
    
    # Get menu items
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
    
    restaurant_data = {
        'id': restaurant.id,
        'name': restaurant.name,
        'description': restaurant.description,
        'cuisine': restaurant.cuisine,
        'address': restaurant.address,
        'rating': restaurant.rating,
        'delivery_fee': restaurant.delivery_fee,
        'delivery_time': restaurant.delivery_time,
        'featured': restaurant.featured,
        'image': '🍕',
        'menu_items': menu_items_data
    }
    
    return jsonify(restaurant_data), 200

@restaurants_bp.route('/', methods=['POST'])
@jwt_required()
def create_restaurant():
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    
    if user.role != 'seller':
        return jsonify({'error': 'Only sellers can create restaurants'}), 403
    
    data = request.get_json()
    
    restaurant = Restaurant(
        name=data['name'],
        description=data.get('description'),
        cuisine=data.get('cuisine'),
        address=data.get('address'),
        phone=data.get('phone'),
        delivery_fee=data.get('delivery_fee', 0.0),
        delivery_time=data.get('delivery_time', '30-45 min'),
        featured=data.get('featured', False),
        owner_id=current_user_id
    )
    
    db.session.add(restaurant)
    db.session.commit()
    
    return jsonify({
        'message': 'Restaurant created successfully',
        'restaurant': {
            'id': restaurant.id,
            'name': restaurant.name,
            'description': restaurant.description,
            'cuisine': restaurant.cuisine
        }
    }), 201

@restaurants_bp.route('/search', methods=['GET'])
def search_restaurants():
    query = request.args.get('q', '')
    category = request.args.get('category', '')
    dietary_preferences = request.args.getlist('dietary')
    
    restaurants_query = Restaurant.query.filter_by(active=True)
    
    if query:
        restaurants_query = restaurants_query.filter(
            Restaurant.name.ilike(f'%{query}%') | 
            Restaurant.cuisine.ilike(f'%{query}%')
        )
    
    if category and category != 'all':
        restaurants_query = restaurants_query.filter(Restaurant.cuisine.ilike(f'%{category}%'))
    
    restaurants = restaurants_query.all()
    
    # Filter by dietary preferences if specified
    if dietary_preferences:
        filtered_restaurants = []
        for restaurant in restaurants:
            menu_items = MenuItem.query.filter_by(restaurant_id=restaurant.id, active=True).all()
            restaurant_dietary_tags = set()
            for item in menu_items:
                if item.dietary_tags:
                    restaurant_dietary_tags.update(item.dietary_tags)
            
            if any(pref in restaurant_dietary_tags for pref in dietary_preferences):
                filtered_restaurants.append(restaurant)
        restaurants = filtered_restaurants
    
    restaurant_list = []
    for restaurant in restaurants:
        restaurant_data = {
            'id': restaurant.id,
            'name': restaurant.name,
            'description': restaurant.description,
            'cuisine': restaurant.cuisine,
            'address': restaurant.address,
            'rating': restaurant.rating,
            'delivery_fee': restaurant.delivery_fee,
            'delivery_time': restaurant.delivery_time,
            'featured': restaurant.featured,
            'image': '🍕',
            'category': restaurant.cuisine.lower() if restaurant.cuisine else 'general'
        }
        restaurant_list.append(restaurant_data)
    
    return jsonify(restaurant_list), 200 