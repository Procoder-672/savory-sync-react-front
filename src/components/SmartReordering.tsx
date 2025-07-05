import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { RefreshCw, Clock, Star, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export interface PreviousOrder {
  id: string;
  restaurantId: number;
  restaurantName: string;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
    customizations?: string[];
  }>;
  totalAmount: number;
  orderDate: string;
  frequency: number; // How many times this order has been repeated
}

interface SmartReorderingProps {
  currentRestaurantId?: number;
  onReorder: (order: PreviousOrder) => void;
}

const SmartReordering = ({ currentRestaurantId, onReorder }: SmartReorderingProps) => {
  const [previousOrders, setPreviousOrders] = useState<PreviousOrder[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock previous orders data - in real app, this would come from localStorage or API
  useEffect(() => {
    const mockOrders: PreviousOrder[] = [
      {
        id: 'order-1',
        restaurantId: 1,
        restaurantName: "Mario's Pizza Palace",
        items: [
          { id: 1, name: 'Margherita Pizza', price: 12.99, quantity: 1 },
          { id: 3, name: 'Caesar Salad', price: 8.99, quantity: 1 }
        ],
        totalAmount: 21.98,
        orderDate: '2024-01-15',
        frequency: 5
      },
      {
        id: 'order-2',
        restaurantId: 2,
        restaurantName: "Burger Junction",
        items: [
          { id: 4, name: 'Classic Burger', price: 10.99, quantity: 2, customizations: ['No pickles', 'Extra cheese'] },
          { id: 6, name: 'French Fries', price: 4.99, quantity: 1 }
        ],
        totalAmount: 26.97,
        orderDate: '2024-01-12',
        frequency: 3
      },
      {
        id: 'order-3',
        restaurantId: 5,
        restaurantName: "Green Bowl",
        items: [
          { id: 11, name: 'Quinoa Bowl', price: 12.99, quantity: 1, customizations: ['Extra avocado'] },
          { id: 12, name: 'Green Smoothie', price: 6.99, quantity: 1 }
        ],
        totalAmount: 19.98,
        orderDate: '2024-01-10',
        frequency: 7
      }
    ];
    setPreviousOrders(mockOrders);
  }, []);

  const handleQuickReorder = async (order: PreviousOrder) => {
    setIsLoading(true);
    
    // Simulate API call to check item availability and pricing
    setTimeout(() => {
      onReorder(order);
      toast({
        title: "Order Added to Cart",
        description: `Your previous order from ${order.restaurantName} has been reordered successfully!`,
      });
      setIsLoading(false);
    }, 1000);
  };

  const getRecommendedOrders = () => {
    // Sort by frequency and recency
    return previousOrders
      .sort((a, b) => {
        // Prioritize frequency first, then recency
        if (b.frequency !== a.frequency) {
          return b.frequency - a.frequency;
        }
        return new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime();
      })
      .slice(0, 3);
  };

  const getCurrentRestaurantOrders = () => {
    if (!currentRestaurantId) return [];
    return previousOrders
      .filter(order => order.restaurantId === currentRestaurantId)
      .sort((a, b) => b.frequency - a.frequency);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const ordersToShow = currentRestaurantId 
    ? getCurrentRestaurantOrders() 
    : getRecommendedOrders();

  if (ordersToShow.length === 0) {
    return null;
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <RefreshCw className="h-5 w-5 text-blue-500" />
          <span>
            {currentRestaurantId ? 'Your Previous Orders' : 'Quick Reorder'}
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {ordersToShow.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium">{order.restaurantName}</h4>
                  {order.frequency > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      <Star className="h-3 w-3 mr-1" />
                      Favorite
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-gray-600 mb-2">
                  {order.items.map(item => `${item.quantity}x ${item.name}`).join(', ')}
                </div>
                <div className="flex items-center space-x-4 text-xs text-gray-500">
                  <div className="flex items-center">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDate(order.orderDate)}
                  </div>
                  <span>Ordered {order.frequency} times</span>
                  <span className="font-medium">${order.totalAmount.toFixed(2)}</span>
                </div>
              </div>
              <Button
                size="sm"
                onClick={() => handleQuickReorder(order)}
                disabled={isLoading}
                className="bg-blue-500 hover:bg-blue-600"
              >
                <ShoppingCart className="h-4 w-4 mr-1" />
                Reorder
              </Button>
            </div>
          ))}
        </div>
        
        {!currentRestaurantId && previousOrders.length > 3 && (
          <div className="mt-4 text-center">
            <Button variant="outline" size="sm">
              View All Previous Orders
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SmartReordering;