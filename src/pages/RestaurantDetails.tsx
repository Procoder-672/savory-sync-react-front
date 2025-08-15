
import { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { ChefHat, ArrowLeft, Star, Clock, MapPin, ShoppingCart, User, LogOut, Plus, Minus, Info, Trash2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import SmartReordering, { PreviousOrder } from '@/components/SmartReordering';
import { MenuItem, NutritionalInfo } from '@/types/menu';
import { dietaryOptions } from '@/components/DietaryPreferences';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<{ [key: number]: number }>({});
  const [showNutrition, setShowNutrition] = useState<{ [key: number]: boolean }>({});
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleReorder = (order: PreviousOrder) => {
    // Add all items from the previous order to cart
    order.items.forEach(item => {
      setCartItems(prev => ({
        ...prev,
        [item.id]: (prev[item.id] || 0) + item.quantity
      }));
    });
    
    toast({
      title: "Order Reordered Successfully",
      description: `${order.items.length} items from your previous order have been added to your cart.`,
    });
  };

  const toggleNutritionInfo = (itemId: number) => {
    setShowNutrition(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  const getDietaryBadgeColor = (tag: string) => {
    const option = dietaryOptions.find(opt => opt.id === tag);
    return option ? option.color : 'bg-gray-500';
  };

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

  // Mock menu items with enhanced nutritional info
  const menuItems: MenuItem[] = [
    { 
      id: 1, 
      restaurantId: 1, 
      name: "Margherita Pizza", 
      price: 12.99, 
      image: "🍕", 
      description: "Fresh mozzarella, tomato sauce, and basil",
      category: "pizza",
      status: 'active' as const,
      dietaryTags: ['vegetarian'],
      nutritionalInfo: { calories: 280, protein: 12, carbs: 35, fat: 10, fiber: 2, sodium: 590 },
      allergens: ['gluten', 'dairy'],
      preparationTime: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 2, 
      restaurantId: 1, 
      name: "Pepperoni Pizza", 
      price: 14.99, 
      image: "🍕", 
      description: "Classic pepperoni with mozzarella cheese",
      category: "pizza",
      status: 'active' as const,
      dietaryTags: [],
      nutritionalInfo: { calories: 320, protein: 15, carbs: 35, fat: 14, fiber: 2, sodium: 720 },
      allergens: ['gluten', 'dairy'],
      preparationTime: 15,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 3, 
      restaurantId: 1, 
      name: "Caesar Salad", 
      price: 8.99, 
      image: "🥗", 
      description: "Fresh romaine lettuce with caesar dressing",
      category: "salad",
      status: 'active' as const,
      dietaryTags: ['vegetarian', 'low-calorie'],
      nutritionalInfo: { calories: 150, protein: 8, carbs: 12, fat: 8, fiber: 4, sodium: 380 },
      allergens: ['dairy'],
      preparationTime: 5,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 4, 
      restaurantId: 2, 
      name: "Classic Burger", 
      price: 10.99, 
      image: "🍔", 
      description: "Beef patty with lettuce, tomato, and pickles",
      category: "burger",
      status: 'active' as const,
      dietaryTags: [],
      nutritionalInfo: { calories: 450, protein: 25, carbs: 35, fat: 22, fiber: 3, sodium: 850 },
      allergens: ['gluten'],
      preparationTime: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 5, 
      restaurantId: 2, 
      name: "Veggie Burger", 
      price: 11.99, 
      image: "🍔", 
      description: "Plant-based patty with fresh vegetables",
      category: "burger",
      status: 'active' as const,
      dietaryTags: ['vegetarian', 'vegan', 'high-protein'],
      nutritionalInfo: { calories: 380, protein: 20, carbs: 45, fat: 12, fiber: 8, sodium: 650 },
      allergens: ['gluten'],
      preparationTime: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 6, 
      restaurantId: 2, 
      name: "Sweet Potato Fries", 
      price: 5.99, 
      image: "🍟", 
      description: "Crispy sweet potato fries with herbs",
      category: "sides",
      status: 'active' as const,
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free'],
      nutritionalInfo: { calories: 180, protein: 3, carbs: 32, fat: 6, fiber: 4, sodium: 280 },
      allergens: [],
      preparationTime: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 11, 
      restaurantId: 5, 
      name: "Quinoa Power Bowl", 
      price: 12.99, 
      image: "🥗", 
      description: "Nutritious quinoa with fresh vegetables and avocado",
      category: "bowl",
      status: 'active' as const,
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'high-protein', 'low-calorie'],
      nutritionalInfo: { calories: 320, protein: 18, carbs: 42, fat: 8, fiber: 12, sodium: 420 },
      allergens: [],
      preparationTime: 10,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    { 
      id: 12, 
      restaurantId: 5, 
      name: "Green Detox Smoothie", 
      price: 6.99, 
      image: "🥤", 
      description: "Healthy smoothie with spinach, apple, and ginger",
      category: "drinks",
      status: 'active' as const,
      dietaryTags: ['vegetarian', 'vegan', 'gluten-free', 'low-calorie'],
      nutritionalInfo: { calories: 120, protein: 4, carbs: 28, fat: 1, fiber: 6, sodium: 45 },
      allergens: [],
      preparationTime: 3,
      createdAt: new Date(),
      updatedAt: new Date()
    },
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

  const getTotalPrice = () => {
    return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
      const item = menuItems.find(m => m.id === parseInt(itemId));
      return total + (item ? item.price * quantity : 0);
    }, 0);
  };

  const getCartItemsWithDetails = () => {
    return Object.entries(cartItems).map(([itemId, quantity]) => {
      const item = menuItems.find(m => m.id === parseInt(itemId));
      return item ? { ...item, quantity } : null;
    }).filter(Boolean);
  };

  const proceedToCheckout = () => {
    if (getTotalItems() === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before proceeding to checkout.",
        variant: "destructive"
      });
      return;
    }
    
    // Store cart data in localStorage for checkout page
    localStorage.setItem('cartItems', JSON.stringify({
      restaurantId: parseInt(id || '0'),
      restaurantName: restaurant?.name || '',
      items: getCartItemsWithDetails()
    }));
    
    navigate('/checkout');
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
              <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    <span className="ml-2">Cart ({getTotalItems()})</span>
                    {getTotalItems() > 0 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {getTotalItems()}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent className="w-[400px] sm:w-[540px]">
                  <SheetHeader>
                    <SheetTitle>Your Cart</SheetTitle>
                    <SheetDescription>
                      Review your items and proceed to checkout
                    </SheetDescription>
                  </SheetHeader>
                  <div className="mt-6 space-y-4">
                    {getTotalItems() === 0 ? (
                      <div className="text-center py-8">
                        <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                        <p className="text-sm text-gray-400">Add some delicious items from the menu!</p>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                          {getCartItemsWithDetails().map((item) => (
                            <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                              <div className="text-2xl">{item.image}</div>
                              <div className="flex-1">
                                <h4 className="font-medium">{item.name}</h4>
                                <p className="text-sm text-gray-500">${item.price}</p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => removeFromCart(item.id)}
                                >
                                  <Minus className="h-4 w-4" />
                                </Button>
                                <span className="font-medium w-8 text-center">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => addToCart(item.id, item.name)}
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="text-right">
                                <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => {
                                    setCartItems(prev => {
                                      const newCart = { ...prev };
                                      delete newCart[item.id];
                                      return newCart;
                                    });
                                  }}
                                  className="text-red-500 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="border-t pt-4">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-medium">Total:</span>
                            <span className="text-xl font-bold text-orange-500">
                              ${getTotalPrice().toFixed(2)}
                            </span>
                          </div>
                          <Button 
                            onClick={proceedToCheckout} 
                            className="w-full bg-orange-500 hover:bg-orange-600"
                            size="lg"
                          >
                            Proceed to Checkout
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
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

        {/* Smart Reordering for this restaurant */}
        <SmartReordering 
          currentRestaurantId={parseInt(id || '0')} 
          onReorder={handleReorder} 
        />

        {/* Menu Items */}
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Menu</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {restaurantMenuItems.map((item) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-4">
                  <div className="text-4xl text-center mb-3">{item.image}</div>
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleNutritionInfo(item.id)}
                      className="p-1"
                    >
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                  
                  {/* Dietary Tags */}
                  {item.dietaryTags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.dietaryTags.map((tag) => (
                        <Badge 
                          key={tag}
                          className={`text-xs text-white ${getDietaryBadgeColor(tag)}`}
                        >
                          {dietaryOptions.find(opt => opt.id === tag)?.label || tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Nutritional Information */}
                  {showNutrition[item.id] && (
                    <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                      <h4 className="text-sm font-medium mb-2">Nutritional Information (per serving)</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>Calories: {item.nutritionalInfo.calories}</div>
                        <div>Protein: {item.nutritionalInfo.protein}g</div>
                        <div>Carbs: {item.nutritionalInfo.carbs}g</div>
                        <div>Fat: {item.nutritionalInfo.fat}g</div>
                        {item.nutritionalInfo.fiber && <div>Fiber: {item.nutritionalInfo.fiber}g</div>}
                        {item.nutritionalInfo.sodium && <div>Sodium: {item.nutritionalInfo.sodium}mg</div>}
                      </div>
                      {item.allergens.length > 0 && (
                        <div className="mt-2 text-xs text-red-600">
                          <strong>Allergens:</strong> {item.allergens.join(', ')}
                        </div>
                      )}
                      {item.preparationTime && (
                        <div className="mt-1 text-xs text-gray-500">
                          Prep time: {item.preparationTime} min
                        </div>
                      )}
                    </div>
                  )}

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
