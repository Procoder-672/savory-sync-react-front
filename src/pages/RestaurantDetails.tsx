
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChefHat, ArrowLeft, Star, Clock, MapPin, ShoppingCart, User, LogOut, Plus, Minus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const RestaurantDetails = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});

  // Mock restaurant data - in a real app, this would come from an API
  const restaurants = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      image: "🍕",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      cuisine: "Italian",
      address: "123 Main St, Downtown",
      description: "Authentic Italian pizza made with fresh ingredients and traditional recipes passed down through generations."
    },
    {
      id: 2,
      name: "Burger Junction",
      image: "🍔",
      rating: 4.6,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      cuisine: "American",
      address: "456 Oak Ave, Midtown",
      description: "Juicy burgers and crispy fries made with premium ingredients and served fresh daily."
    },
    {
      id: 3,
      name: "Dragon Wok",
      image: "🥡",
      rating: 4.7,
      deliveryTime: "30-40 min",
      deliveryFee: 3.49,
      cuisine: "Chinese",
      address: "789 Pine St, Chinatown",
      description: "Traditional Chinese cuisine with a modern twist, featuring fresh wok-cooked dishes."
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "🌮",
      rating: 4.5,
      deliveryTime: "25-35 min",
      deliveryFee: 2.49,
      cuisine: "Mexican",
      address: "321 Elm St, South Side",
      description: "Vibrant Mexican flavors with authentic spices and fresh ingredients in every bite."
    },
    {
      id: 5,
      name: "Green Bowl",
      image: "🥗",
      rating: 4.9,
      deliveryTime: "20-25 min",
      deliveryFee: 3.99,
      cuisine: "Healthy",
      address: "654 Maple Ave, North End",
      description: "Fresh, healthy meals made with organic ingredients and superfoods for a nutritious dining experience."
    }
  ];

  // Mock menu items - in a real app, this would come from an API
  const menuItems = [
    { id: 1, restaurantId: 1, name: "Margherita Pizza", price: 12.99, image: "🍕", description: "Fresh mozzarella, tomato sauce, and basil" },
    { id: 2, restaurantId: 1, name: "Pepperoni Pizza", price: 14.99, image: "🍕", description: "Classic pepperoni with mozzarella cheese" },
    { id: 3, restaurantId: 1, name: "Caesar Salad", price: 8.99, image: "🥗", description: "Fresh romaine lettuce with caesar dressing" },
    { id: 4, restaurantId: 2, name: "Classic Burger", price: 10.99, image: "🍔", description: "Beef patty with lettuce, tomato, and pickles" },
    { id: 5, restaurantId: 2, name: "Cheese Burger", price: 11.99, image: "🍔", description: "Classic burger with melted cheese" },
    { id: 6, restaurantId: 2, name: "French Fries", price: 4.99, image: "🍟", description: "Crispy golden fries with salt" },
    { id: 7, restaurantId: 3, name: "Sweet & Sour Pork", price: 13.99, image: "🥡", description: "Tender pork with sweet and sour sauce" },
    { id: 8, restaurantId: 3, name: "Fried Rice", price: 9.99, image: "🍚", description: "Wok-fried rice with vegetables and egg" },
    { id: 9, restaurantId: 4, name: "Chicken Tacos", price: 9.99, image: "🌮", description: "Three soft tacos with grilled chicken" },
    { id: 10, restaurantId: 4, name: "Beef Burrito", price: 11.99, image: "🌯", description: "Large burrito with seasoned beef and beans" },
    { id: 11, restaurantId: 5, name: "Quinoa Bowl", price: 12.99, image: "🥗", description: "Nutritious quinoa with fresh vegetables" },
    { id: 12, restaurantId: 5, name: "Green Smoothie", price: 6.99, image: "🥤", description: "Healthy smoothie with spinach and fruits" },
  ];

  const restaurant = restaurants.find(r => r.id === parseInt(id || '0'));
  const restaurantMenuItems = menuItems.filter(item => item.restaurantId === parseInt(id || '0'));

  if (!restaurant) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Restaurant not found</h1>
          <Link to="/customer-dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  const addToCart = (itemId: number, itemName: string) => {
    setCartItems(prev => ({
      ...prev,
      [itemId]: (prev[itemId] || 0) + 1
    }));
    toast({
      title: "Added to cart",
      description: `${itemName} has been added to your cart.`,
    });
  };

  const removeFromCart = (itemId: number) => {
    setCartItems(prev => {
      const newCart = { ...prev };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const getTotalItems = () => {
    return Object.values(cartItems).reduce((sum, count) => sum + count, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/customer-dashboard">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/" className="flex items-center space-x-2">
                <ChefHat className="h-8 w-8 text-orange-500" />
                <span className="text-2xl font-bold text-gray-900">SavorySync</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart ({getTotalItems()})</span>
              </Button>
              <Button variant="ghost" size="sm">
                <User className="h-5 w-5" />
                <span className="ml-2">Profile</span>
              </Button>
              <Link to="/">
                <Button variant="ghost" size="sm">
                  <LogOut className="h-5 w-5" />
                  <span className="ml-2">Logout</span>
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Restaurant Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-6">
            <div className="text-6xl">{restaurant.image}</div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{restaurant.name}</h1>
              <p className="text-gray-600 mb-4">{restaurant.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Star className="h-4 w-4 text-yellow-500 mr-1" />
                  <span>{restaurant.rating}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{restaurant.deliveryTime}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>{restaurant.address}</span>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge className="bg-orange-500">{restaurant.cuisine}</Badge>
                <Badge variant="secondary">${restaurant.deliveryFee} delivery</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Menu Items */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantMenuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl text-center mb-3">{item.image}</div>
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-orange-500">${item.price}</span>
                    <div className="flex items-center space-x-2">
                      {cartItems[item.id] > 0 && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="font-medium">{cartItems[item.id]}</span>
                        </>
                      )}
                      <Button
                        size="sm"
                        onClick={() => addToCart(item.id, item.name)}
                        className="bg-orange-500 hover:bg-orange-600"
                      >
                        <Plus className="h-4 w-4" />
                        {cartItems[item.id] > 0 ? '' : 'Add'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RestaurantDetails;
