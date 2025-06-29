
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Eye } from 'lucide-react';

interface Order {
  id: string;
  customer: string;
  items: string;
  total: number;
  status: string;
  time: string;
}

interface RecentOrdersProps {
  orders: Order[];
  showUpdateButton?: boolean;
}

const RecentOrders = ({ orders, showUpdateButton = false }: RecentOrdersProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          {showUpdateButton ? 'All Orders' : 'Recent Orders'}
          {!showUpdateButton && (
            <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
              <Eye className="h-4 w-4 mr-2" />
              View All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <div className="flex items-center space-x-4">
                  <div>
                    <p className="font-semibold">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">{order.items}</p>
                    <p className="text-xs text-gray-500">{order.time}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <span className="font-semibold">${order.total}</span>
                <Badge className={getStatusColor(order.status)}>
                  {order.status}
                </Badge>
                {showUpdateButton && (
                  <Button size="sm" variant="outline">
                    Update Status
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentOrders;
