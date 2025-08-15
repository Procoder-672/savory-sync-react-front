
import { useState } from 'react';
import CustomerHeader from '@/components/CustomerHeader';
import SearchAndCategories from '@/components/SearchAndCategories';
import RestaurantGrid from '@/components/RestaurantGrid';
import { PreviousOrder } from '@/components/SmartReordering';
import { useToast } from '@/hooks/use-toast';
import { Restaurant } from '@/types/menu';

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const { toast } = useToast();

  const categories = ['all', 'pizza', 'burger', 'asian', 'mexican', 'healthy'];
  
  const restaurants: Restaurant[] = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      image: "🍕",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      cuisine: "Italian",
      category: "pizza",
      featured: true,
      address: "123 Pizza Street, Little Italy, San Francisco",
      description: "Authentic Italian pizzas made with fresh ingredients",
      phone: "+1 (555) PIZZA-01",
      cuisineType: "Italian",
      openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
      sellerId: 1,
      hygieneRating: 5,
      dietaryOptions: ['vegetarian', 'gluten-free']
    },
    {
      id: 2,
      name: "Burger Junction",
      image: "🍔",
      rating: 4.6,
      deliveryTime: "20-30 min",
      deliveryFee: 1.99,
      cuisine: "American",
      category: "burger",
      featured: false,
      address: "456 Burger Ave, Downtown, San Francisco",
      description: "Gourmet burgers made with locally sourced ingredients",
      phone: "+1 (555) BURGER-2",
      cuisineType: "American",
      openingHours: "Mon-Sun: 10:00 AM - 12:00 AM",
      sellerId: 2,
      hygieneRating: 4,
      dietaryOptions: ['gluten-free', 'dairy-free']
    },
    {
      id: 3,
      name: "Dragon Wok",
      image: "🥡",
      rating: 4.7,
      deliveryTime: "30-40 min",
      deliveryFee: 3.49,
      cuisine: "Chinese",
      category: "asian",
      featured: true,
      address: "789 Wok Street, Chinatown, San Francisco",
      description: "Traditional Chinese dishes with modern presentation",
      phone: "+1 (555) DRAGON-3",
      cuisineType: "Chinese",
      openingHours: "Mon-Sun: 11:30 AM - 10:30 PM",
      sellerId: 3,
      hygieneRating: 5,
      dietaryOptions: ['vegetarian', 'vegan', 'gluten-free']
    },
    {
      id: 4,
      name: "Taco Fiesta",
      image: "🌮",
      rating: 4.5,
      deliveryTime: "25-35 min",
      deliveryFee: 2.49,
      cuisine: "Mexican",
      category: "mexican",
      featured: false,
      address: "321 Taco Lane, Mission District, San Francisco",
      description: "Authentic Mexican street food and traditional recipes",
      phone: "+1 (555) TACO-45",
      cuisineType: "Mexican",
      openingHours: "Mon-Sun: 10:00 AM - 11:00 PM",
      sellerId: 4,
      hygieneRating: 4,
      dietaryOptions: ['vegetarian', 'gluten-free', 'dairy-free']
    },
    {
      id: 5,
      name: "Green Bowl",
      image: "🥗",
      rating: 4.9,
      deliveryTime: "20-25 min",
      deliveryFee: 3.99,
      cuisine: "Healthy",
      category: "healthy",
      featured: true,
      address: "654 Health St, SoMa, San Francisco",
      description: "Fresh, organic, and nutritious meals for health-conscious diners",
      phone: "+1 (555) GREEN-99",
      cuisineType: "Healthy",
      openingHours: "Mon-Sun: 7:00 AM - 9:00 PM",
      sellerId: 5,
      hygieneRating: 5,
      dietaryOptions: ['vegetarian', 'vegan', 'gluten-free', 'low-calorie', 'high-protein']
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || restaurant.category === activeCategory;
    const matchesDietaryPreferences = selectedDietaryPreferences.length === 0 || 
                                     selectedDietaryPreferences.some(pref => restaurant.dietaryOptions.includes(pref));
    return matchesSearch && matchesCategory && matchesDietaryPreferences;
  });

  const handleReorder = (order: PreviousOrder) => {
    // Store the reordered items in localStorage for the cart
    const existingCart = localStorage.getItem('cartItems');
    let cartData = existingCart ? JSON.parse(existingCart) : null;
    
    // If there's no existing cart or it's from a different restaurant, create new cart
    if (!cartData || cartData.restaurantId !== order.restaurantId) {
      cartData = {
        restaurantId: order.restaurantId,
        restaurantName: order.restaurantName,
        items: [...order.items]
      };
    } else {
      // Add items to existing cart
      order.items.forEach(newItem => {
        const existingItemIndex = cartData.items.findIndex((item: any) => item.id === newItem.id);
        if (existingItemIndex >= 0) {
          cartData.items[existingItemIndex].quantity += newItem.quantity;
        } else {
          cartData.items.push(newItem);
        }
      });
    }
    
    localStorage.setItem('cartItems', JSON.stringify(cartData));
    
    // Dispatch custom event to update cart counter
    window.dispatchEvent(new Event('cartUpdated'));
    
    toast({
      title: "Order Added to Cart",
      description: `${order.items.length} items from ${order.restaurantName} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good afternoon! 👋</h1>
          <p className="text-gray-600">What delicious food are you craving today?</p>
        </div>

        <SearchAndCategories
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
          categories={categories}
          selectedDietaryPreferences={selectedDietaryPreferences}
          onDietaryPreferencesChange={setSelectedDietaryPreferences}
          onReorder={handleReorder}
        />

        <RestaurantGrid
          restaurants={restaurants}
          filteredRestaurants={filteredRestaurants}
          activeCategory={activeCategory}
        />
      </div>
    </div>
  );
};

export default CustomerDashboard;
