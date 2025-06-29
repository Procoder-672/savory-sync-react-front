
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingBag, DollarSign, Star, Clock } from 'lucide-react';

interface StatsData {
  totalOrders: number;
  revenue: number;
  avgRating: number;
  pendingOrders: number;
}

interface StatsCardsProps {
  stats: StatsData;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Total Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{stats.totalOrders}</span>
            <ShoppingBag className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">+12% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Revenue</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">${stats.revenue}</span>
            <DollarSign className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">+18% from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Average Rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{stats.avgRating}</span>
            <Star className="h-8 w-8 text-yellow-500" />
          </div>
          <p className="text-xs text-green-600 mt-1">+0.2 from last month</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-gray-600">Pending Orders</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold text-orange-600">{stats.pendingOrders}</span>
            <Clock className="h-8 w-8 text-orange-500" />
          </div>
          <p className="text-xs text-gray-600 mt-1">Needs attention</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
