
import RestaurantCard from './RestaurantCard';
import FeaturedRestaurantCard from './FeaturedRestaurantCard';

interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  category: string;
  featured: boolean;
}

interface RestaurantGridProps {
  restaurants: Restaurant[];
  filteredRestaurants: Restaurant[];
  activeCategory: string;
}

const RestaurantGrid = ({ restaurants, filteredRestaurants, activeCategory }: RestaurantGridProps) => {
  const featuredRestaurants = restaurants.filter(r => r.featured);

  return (
    <>
      {/* Featured Restaurants */}
      {activeCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Restaurants</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredRestaurants.slice(0, 3).map((restaurant) => (
              <FeaturedRestaurantCard key={restaurant.id} restaurant={restaurant} />
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
            <RestaurantCard key={restaurant.id} restaurant={restaurant} />
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
    </>
  );
};

export default RestaurantGrid;
