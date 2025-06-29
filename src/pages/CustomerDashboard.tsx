
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ChefHat, Search, Star, Clock, MapPin, ShoppingCart, User, LogOut, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerDashboard = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = ['all', 'pizza', 'burger', 'asian', 'mexican', 'healthy'];
  
  const restaurants = [
    {
      id: 1,
      name: "Mario's Pizza Palace",
      image: "🍕",
      rating: 4.8,
      deliveryTime: "25-35 min",
      deliveryFee: 2.99,
      cuisine: "Italian",
      category: "pizza",
      featured: true
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
      featured: false
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
      featured: true
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
      featured: false
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
      featured: true
    }
  ];

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'all' || restaurant.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredRestaurants = restaurants.filter(r => r.featured);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">SavorySync</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-5 w-5" />
                <span className="ml-2">Cart (0)</span>
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
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Good afternoon! 👋</h1>
          <p className="text-gray-600">What delicious food are you craving today?</p>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search restaurants or cuisines..."
              className="pl-10 pr-4 py-2 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Categories</h2>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap ${
                  activeCategory === category 
                    ? 'bg-orange-500 hover:bg-orange-600' 
                    : 'border-orange-200 text-orange-600 hover:bg-orange-50'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Featured Restaurants */}
        {activeCategory === 'all' && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Restaurants</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {featuredRestaurants.slice(0, 3).map((restaurant) => (
                <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="text-4xl text-center mb-3">{restaurant.image}</div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{restaurant.name}</h3>
                        <Button variant="ghost" size="sm" className="p-1">
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-500 mr-1" />
                          <span>{restaurant.rating}</span>
                        </div>
                        <div className="flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          <span>{restaurant.deliveryTime}</span>
                        </div>
                        <Badge variant="secondary">${restaurant.deliveryFee} fee</Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* All Restaurants */}
        <div>
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            {activeCategory === 'all' ? 'All Restaurants' : `${activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)} Restaurants`}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link key={restaurant.id} to={`/restaurant/${restaurant.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div className="text-3xl">{restaurant.image}</div>
                      <Button variant="ghost" size="sm" className="p-1">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                    <h3 className="font-semibold text-lg mb-1">{restaurant.name}</h3>
                    <p className="text-gray-600 text-sm mb-3">{restaurant.cuisine}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 mr-1" />
                        <span>{restaurant.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{restaurant.deliveryTime}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">${restaurant.deliveryFee} delivery</Badge>
                      {restaurant.featured && (
                        <Badge className="bg-orange-500">Featured</Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {filteredRestaurants.length === 0 && (
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No restaurants found</h3>
            <p className="text-gray-600">Try adjusting your search or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerDashboard;
