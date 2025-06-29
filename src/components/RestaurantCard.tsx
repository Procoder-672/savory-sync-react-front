
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

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

interface RestaurantCardProps {
  restaurant: Restaurant;
  showFeaturedBadge?: boolean;
}

const RestaurantCard = ({ restaurant, showFeaturedBadge = true }: RestaurantCardProps) => {
  return (
    <Link to={`/restaurant/${restaurant.id}`}>
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
            {showFeaturedBadge && restaurant.featured && (
              <Badge className="bg-orange-500">Featured</Badge>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RestaurantCard;
