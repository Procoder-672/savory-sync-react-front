import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ChefHat, 
  Plus, 
  TrendingUp, 
  ShoppingBag, 
  Clock, 
  DollarSign, 
  Star, 
  Edit, 
  Trash2, 
  Eye,
  User,
  LogOut,
  Bell
} from 'lucide-react';
import { Link } from 'react-router-dom';
import AddItemForm from '@/components/AddItemForm';

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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'preparing': return 'bg-yellow-500';
      case 'ready': return 'bg-green-500';
      case 'delivered': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ChefHat className="h-8 w-8 text-orange-500" />
              <span className="text-2xl font-bold text-gray-900">SavorySync</span>
              <Badge className="bg-orange-500 ml-2">Seller</Badge>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="h-5 w-5" />
                <span className="ml-2">Notifications</span>
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
            {/* Stats Cards */}
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

            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  Recent Orders
                  <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                    <Eye className="h-4 w-4 mr-2" />
                    View All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
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
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>All Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentOrders.map((order) => (
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
                        <Button size="sm" variant="outline">
                          Update Status
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="menu" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Menu Management</h2>
              <AddItemForm onAddItem={handleAddItem} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menuItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="text-center mb-4">
                      <div className="text-4xl mb-2">{item.image}</div>
                      <h3 className="font-semibold text-lg">{item.name}</h3>
                      <p className="text-gray-600">{item.category}</p>
                    </div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xl font-bold text-orange-600">${item.price}</span>
                      <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                        {item.status}
                      </Badge>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                        <Trash2 className="h-4 w-4 mr-1" />
                        Delete
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-500" />
                    Sales Trend
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    Sales chart would go here
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Popular Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {menuItems.slice(0, 3).map((item, index) => (
                      <div key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{item.image}</span>
                          <div>
                            <p className="font-medium">{item.name}</p>
                            <p className="text-sm text-gray-600">{index + 1}. Most ordered</p>
                          </div>
                        </div>
                        <Badge>{45 - index * 10} orders</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default SellerDashboard;
