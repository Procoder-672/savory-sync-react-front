
import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SellerHeader from '@/components/SellerHeader';
import StatsCards from '@/components/StatsCards';
import RecentOrders from '@/components/RecentOrders';
import MenuGrid from '@/components/MenuGrid';
import AnalyticsView from '@/components/AnalyticsView';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  status: string;
  image: string;
  description?: string;
}

const SellerDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Mock data
  const stats = {
    totalOrders: 234,
    revenue: 5420,
    avgRating: 4.7,
    pendingOrders: 8
  };

  const recentOrders = [
    {
      id: '#12345',
      customer: 'John Doe',
      items: 'Margherita Pizza x2, Caesar Salad x1',
      total: 28.50,
      status: 'preparing',
      time: '10 min ago'
    },
    {
      id: '#12344',
      customer: 'Sarah Wilson',
      items: 'Pepperoni Pizza x1, Garlic Bread x1',
      total: 18.99,
      status: 'ready',
      time: '15 min ago'
    },
    {
      id: '#12343',
      customer: 'Mike Johnson',
      items: 'Chicken Pizza x1, Coke x2',
      total: 22.75,
      status: 'delivered',
      time: '1 hour ago'
    }
  ];

  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: 'Margherita Pizza',
      price: 12.99,
      category: 'Pizza',
      status: 'active',
      image: '🍕'
    },
    {
      id: 2,
      name: 'Pepperoni Pizza',
      price: 15.99,
      category: 'Pizza',
      status: 'active',
      image: '🍕'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      price: 8.99,
      category: 'Salad',
      status: 'active',
      image: '🥗'
    },
    {
      id: 4,
      name: 'Garlic Bread',
      price: 4.99,
      category: 'Sides',
      status: 'inactive',
      image: '🍞'
    }
  ]);

  const handleAddItem = (newItem: MenuItem) => {
    setMenuItems(prev => [...prev, newItem]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <SellerHeader />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back, Mario's Pizza! 👨‍🍳</h1>
          <p className="text-gray-600">Manage your restaurant and track your performance.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="menu">Menu</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <StatsCards stats={stats} />
            <RecentOrders orders={recentOrders} />
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <RecentOrders orders={recentOrders} showUpdateButton={true} />
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <MenuGrid menuItems={menuItems} onAddItem={handleAddItem} />
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <AnalyticsView menuItems={menuItems} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
