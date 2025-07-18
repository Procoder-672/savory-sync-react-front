import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  CreditCard, 
  TrendingUp, 
  DollarSign, 
  Download, 
  RefreshCw, 
  Search,
  Calendar,
  Filter,
  Plus,
  Trash2,
  Eye,
  AlertCircle
} from 'lucide-react';

const PaymentDashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const paymentMethods = [
    { id: 1, type: 'Visa', last4: '4242', expiry: '12/26', default: true },
    { id: 2, type: 'Mastercard', last4: '5555', expiry: '03/25', default: false },
    { id: 3, type: 'PayPal', email: 'user@example.com', default: false }
  ];

  const transactions = [
    { id: 'TXN001', date: '2024-01-15', amount: 45.99, status: 'completed', merchant: 'Pizza Palace', method: 'Visa ****4242' },
    { id: 'TXN002', date: '2024-01-14', amount: 29.50, status: 'completed', merchant: 'Burger House', method: 'PayPal' },
    { id: 'TXN003', date: '2024-01-13', amount: 67.80, status: 'pending', merchant: 'Sushi Zen', method: 'Mastercard ****5555' },
    { id: 'TXN004', date: '2024-01-12', amount: 15.25, status: 'failed', merchant: 'Coffee Corner', method: 'Visa ****4242' }
  ];

  const earnings = [
    { period: 'Today', amount: 245.50, orders: 12, growth: '+8.2%' },
    { period: 'This Week', amount: 1680.25, orders: 89, growth: '+12.5%' },
    { period: 'This Month', amount: 6840.75, orders: 356, growth: '+18.3%' },
    { period: 'This Year', amount: 45680.20, orders: 2150, growth: '+25.1%' }
  ];

  const refunds = [
    { id: 'REF001', orderId: 'ORD123', amount: 25.99, reason: 'Item not as described', status: 'approved', date: '2024-01-14' },
    { id: 'REF002', orderId: 'ORD124', amount: 45.50, reason: 'Order cancelled', status: 'pending', date: '2024-01-13' },
    { id: 'REF003', orderId: 'ORD125', amount: 19.99, reason: 'Quality issue', status: 'rejected', date: '2024-01-12' }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6 animate-fade-in">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Payment Dashboard</h1>
            <p className="text-muted-foreground">Manage payments, earnings, and financial data</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export Data
            </Button>
            <Button size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {earnings.map((stat, index) => (
            <Card key={index} className="hover-scale">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.period}</CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">${stat.amount}</div>
                <p className="text-xs text-muted-foreground">
                  {stat.orders} orders
                  <span className="text-green-600 ml-1">{stat.growth}</span>
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
            <TabsTrigger value="methods">Payment Methods</TabsTrigger>
            <TabsTrigger value="earnings">Earnings</TabsTrigger>
            <TabsTrigger value="refunds">Refunds</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your latest payment activity</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {transactions.slice(0, 5).map((transaction) => (
                      <div key={transaction.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium">{transaction.merchant}</p>
                          <p className="text-sm text-muted-foreground">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${transaction.amount}</p>
                          <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <CardDescription>Manage your payment options</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {paymentMethods.map((method) => (
                      <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CreditCard className="h-5 w-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">
                              {method.type} {method.last4 && `****${method.last4}`}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {method.expiry || method.email}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {method.default && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                    <Button variant="outline" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Transactions Tab */}
          <TabsContent value="transactions" className="space-y-6">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>Transaction History</CardTitle>
                    <CardDescription>View and manage all your transactions</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search transactions..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9 w-64"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="w-32">
                        <Filter className="h-4 w-4 mr-2" />
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="failed">Failed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <DollarSign className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{transaction.merchant}</p>
                          <p className="text-sm text-muted-foreground">
                            {transaction.id} • {transaction.date}
                          </p>
                          <p className="text-sm text-muted-foreground">{transaction.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">${transaction.amount}</p>
                        <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="methods" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>Add, edit, or remove your payment options</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <CreditCard className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium text-lg">
                            {method.type} {method.last4 && `ending in ${method.last4}`}
                          </p>
                          <p className="text-muted-foreground">
                            {method.expiry && `Expires ${method.expiry}`}
                            {method.email && method.email}
                          </p>
                          {method.default && (
                            <Badge variant="secondary" className="mt-2">Default Payment Method</Badge>
                          )}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Edit</Button>
                        <Button variant="outline" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                  <Button className="w-full" size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Add New Payment Method
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Earnings Tab */}
          <TabsContent value="earnings" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Earnings Overview</CardTitle>
                  <CardDescription>Track your revenue and growth</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-4 text-muted-foreground">Earnings Chart Placeholder</span>
                  </div>
                </CardContent>
              </Card>
              
              <div className="space-y-4">
                {earnings.map((earning, index) => (
                  <Card key={index}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm">{earning.period}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">${earning.amount}</div>
                      <p className="text-sm text-muted-foreground">
                        {earning.orders} orders
                      </p>
                      <p className="text-sm text-green-600">{earning.growth}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          {/* Refunds Tab */}
          <TabsContent value="refunds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Refund Management</CardTitle>
                <CardDescription>View and process refund requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {refunds.map((refund) => (
                    <div key={refund.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <AlertCircle className="h-8 w-8 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Refund #{refund.id}</p>
                          <p className="text-sm text-muted-foreground">Order: {refund.orderId}</p>
                          <p className="text-sm text-muted-foreground">{refund.reason}</p>
                          <p className="text-sm text-muted-foreground">{refund.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-lg">${refund.amount}</p>
                        <Badge variant="secondary" className={getStatusColor(refund.status)}>
                          {refund.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Analytics</CardTitle>
                  <CardDescription>Detailed payment insights</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-muted/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-16 w-16 text-muted-foreground" />
                    <span className="ml-4 text-muted-foreground">Analytics Chart Placeholder</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span>Success Rate</span>
                      <span className="font-bold text-green-600">98.5%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Order Value</span>
                      <span className="font-bold">$42.15</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monthly Growth</span>
                      <span className="font-bold text-green-600">+18.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Refund Rate</span>
                      <span className="font-bold text-red-600">2.1%</span>
                    </div>
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

export default PaymentDashboard;