import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  Bell, 
  Search,
  Filter,
  Download,
  CreditCard,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Users,
  AlertTriangle,
  Calendar,
  MoreHorizontal,
  Eye,
  ExternalLink,
  Menu,
  X,
  BarChart3,
  PieChart,
  FileDown,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle
} from 'lucide-react';

const PaymentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  // Mock data
  const stats = [
    {
      title: 'Total Revenue',
      value: '$54,239.00',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-primary'
    },
    {
      title: 'Monthly Income',
      value: '$8,750.00',
      change: '+8.2%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-secondary'
    },
    {
      title: 'Active Customers',
      value: '2,486',
      change: '+5.1%',
      trend: 'up',
      icon: Users,
      color: 'bg-accent'
    },
    {
      title: 'Failed Payments',
      value: '24',
      change: '-2.4%',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-destructive'
    }
  ];

  const transactions = [
    {
      id: 'PAY-001',
      date: '2024-01-19',
      time: '14:32',
      customer: 'John Doe',
      email: 'john.doe@email.com',
      amount: 129.99,
      status: 'completed',
      method: 'Visa ****4242',
      type: 'payment'
    },
    {
      id: 'PAY-002',
      date: '2024-01-19',
      time: '13:45',
      customer: 'Sarah Wilson',
      email: 'sarah.w@email.com',
      amount: 89.50,
      status: 'pending',
      method: 'Mastercard ****5555',
      type: 'payment'
    },
    {
      id: 'REF-003',
      date: '2024-01-19',
      time: '12:18',
      customer: 'Mike Johnson',
      email: 'mike.j@email.com',
      amount: 45.00,
      status: 'failed',
      method: 'PayPal',
      type: 'refund'
    },
    {
      id: 'PAY-004',
      date: '2024-01-18',
      time: '16:22',
      customer: 'Emily Chen',
      email: 'emily.chen@email.com',
      amount: 234.75,
      status: 'completed',
      method: 'Apple Pay',
      type: 'payment'
    },
    {
      id: 'PAY-005',
      date: '2024-01-18',
      time: '15:10',
      customer: 'David Brown',
      email: 'david.b@email.com',
      amount: 67.25,
      status: 'completed',
      method: 'Google Pay',
      type: 'payment'
    }
  ];

  const alerts = [
    {
      id: 1,
      type: 'error',
      title: 'Payment Gateway Issue',
      message: '3 payments failed due to gateway timeout',
      time: '5 minutes ago'
    },
    {
      id: 2,
      type: 'warning',
      title: 'High Chargeback Rate',
      message: 'Chargeback rate increased to 2.1%',
      time: '1 hour ago'
    },
    {
      id: 3,
      type: 'info',
      title: 'Monthly Report Ready',
      message: 'Your January payment report is available',
      time: '2 hours ago'
    }
  ];

  const upcomingPayouts = [
    {
      id: 1,
      amount: 2450.00,
      date: '2024-01-22',
      bank: 'Chase Bank ****1234',
      status: 'scheduled'
    },
    {
      id: 2,
      amount: 1850.75,
      date: '2024-01-25',
      bank: 'Wells Fargo ****5678',
      status: 'pending'
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-success" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-warning" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-destructive" />;
      default:
        return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-success/10 text-success border-success/20';
      case 'pending':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'failed':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted/10 text-muted-foreground border-muted/20';
    }
  };

  const sidebarItems = [
    { name: 'Dashboard', active: true, icon: BarChart3 },
    { name: 'Transactions', active: false, icon: CreditCard },
    { name: 'Payouts', active: false, icon: DollarSign },
    { name: 'Subscriptions', active: false, icon: Calendar },
    { name: 'Invoices', active: false, icon: FileDown },
    { name: 'Settings', active: false, icon: PieChart }
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Top Navigation */}
      <header className="bg-card border-b border-border shadow-soft sticky top-0 z-50">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <DollarSign className="h-5 w-5 text-white" />
                </div>
                <h1 className="text-xl font-bold text-foreground">PayDash</h1>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search transactions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 w-64 bg-muted/50 border-0 focus:bg-card"
                />
              </div>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-3 w-3 bg-destructive rounded-full text-xs"></span>
              </Button>
              <div className="w-8 h-8 bg-gradient-primary rounded-full"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'w-64' : 'w-0'} lg:w-64 bg-card border-r border-border transition-all duration-300 overflow-hidden shadow-medium`}>
          <div className="p-6 space-y-8">
            <nav className="space-y-2">
              {sidebarItems.map((item, index) => (
                <Button
                  key={index}
                  variant={item.active ? "default" : "ghost"}
                  className={`w-full justify-start space-x-3 ${item.active ? 'bg-gradient-primary text-white shadow-medium' : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'}`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6 space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <Card key={index} className="shadow-soft hover:shadow-medium transition-all duration-300 bg-gradient-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                      <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                      <p className={`text-sm flex items-center space-x-1 ${stat.trend === 'up' ? 'text-success' : 'text-destructive'}`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                        <span>{stat.change}</span>
                      </p>
                    </div>
                    <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center shadow-medium`}>
                      <stat.icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Monthly Income Chart */}
            <Card className="lg:col-span-2 shadow-soft bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground">Monthly Revenue</CardTitle>
                <CardDescription>Revenue trends over the past 12 months</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-64 bg-muted/20 rounded-xl flex items-center justify-center border border-muted/30">
                  <div className="text-center">
                    <BarChart3 className="h-16 w-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-muted-foreground">Chart visualization would be here</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alerts Section */}
            <Card className="shadow-soft bg-gradient-card border-0">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>Alerts</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-muted/30 border border-muted/50">
                    <div className="flex items-start space-x-3">
                      {alert.type === 'error' && <XCircle className="h-4 w-4 text-destructive mt-0.5" />}
                      {alert.type === 'warning' && <AlertTriangle className="h-4 w-4 text-warning mt-0.5" />}
                      {alert.type === 'info' && <CheckCircle className="h-4 w-4 text-info mt-0.5" />}
                      <div className="flex-1">
                        <p className="font-medium text-sm text-foreground">{alert.title}</p>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Recent Transactions */}
          <Card className="shadow-soft bg-gradient-card border-0">
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                <div>
                  <CardTitle className="text-foreground">Recent Transactions</CardTitle>
                  <CardDescription>Latest payment activity</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-32 bg-muted/50 border-0">
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
                  <Button variant="outline" size="sm" className="bg-muted/50 border-0">
                    <Download className="h-4 w-4 mr-2" />
                    Export CSV
                  </Button>
                  <Button variant="outline" size="sm" className="bg-muted/50 border-0">
                    <FileDown className="h-4 w-4 mr-2" />
                    Export PDF
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-muted/30 hover:bg-muted/40 transition-all duration-200 cursor-pointer"
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        {getStatusIcon(transaction.status)}
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <p className="font-medium text-foreground">{transaction.customer}</p>
                          <Badge variant="outline" className={getStatusColor(transaction.status)}>
                            {transaction.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{transaction.id} • {transaction.date} {transaction.time}</p>
                        <p className="text-sm text-muted-foreground">{transaction.method}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-lg text-foreground">
                        {transaction.type === 'refund' ? '-' : ''}${transaction.amount}
                      </p>
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Payouts */}
          <Card className="shadow-soft bg-gradient-card border-0">
            <CardHeader>
              <CardTitle className="text-foreground">Upcoming Payouts</CardTitle>
              <CardDescription>Scheduled money transfers to your bank accounts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingPayouts.map((payout) => (
                  <div key={payout.id} className="flex items-center justify-between p-4 rounded-xl bg-muted/20 border border-muted/30">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center">
                        <DollarSign className="h-5 w-5 text-success" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">${payout.amount.toFixed(2)}</p>
                        <p className="text-sm text-muted-foreground">{payout.bank}</p>
                        <p className="text-sm text-muted-foreground">Due: {payout.date}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                      {payout.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>

      {/* Customer Details Modal */}
      <Dialog open={!!selectedTransaction} onOpenChange={() => setSelectedTransaction(null)}>
        <DialogContent className="max-w-2xl bg-card border-0 shadow-large">
          <DialogHeader>
            <DialogTitle className="text-foreground">Transaction Details</DialogTitle>
            <DialogDescription>
              Detailed information about this transaction
            </DialogDescription>
          </DialogHeader>
          {selectedTransaction && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Transaction ID</p>
                  <p className="font-medium text-foreground">{selectedTransaction.id}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Amount</p>
                  <p className="font-medium text-foreground">${selectedTransaction.amount}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Customer</p>
                  <p className="font-medium text-foreground">{selectedTransaction.customer}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant="outline" className={getStatusColor(selectedTransaction.status)}>
                    {selectedTransaction.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Payment Method</p>
                  <p className="font-medium text-foreground">{selectedTransaction.method}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date & Time</p>
                  <p className="font-medium text-foreground">{selectedTransaction.date} {selectedTransaction.time}</p>
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                <Button variant="outline">View Receipt</Button>
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in Gateway
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PaymentDashboard;