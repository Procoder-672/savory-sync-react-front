
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
