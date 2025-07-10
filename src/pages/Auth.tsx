
import { useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ChefHat, Users, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState(searchParams.get('role') || 'customer');
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (type: 'login' | 'signup', formData: FormData) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: `${type === 'login' ? 'Welcome back!' : 'Account created!'}`,
        description: `You've successfully ${type === 'login' ? 'signed in' : 'signed up'} as a ${role}.`,
      });
      
      // Navigate to role-specific dashboard
      navigate(role === 'customer' ? '/customer-dashboard' : '/seller-dashboard');
    }, 1000);
  };

  const handleSubmit = (type: 'login' | 'signup') => (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    handleAuth(type, formData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center mb-8">
          <Link to="/" className="flex items-center space-x-2 text-orange-500 hover:text-orange-600 transition-colors">
            <ArrowLeft className="h-5 w-5" />
            <ChefHat className="h-8 w-8" />
            <span className="text-2xl font-bold text-gray-900">SavorySync</span>
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Welcome</CardTitle>
            <CardDescription>
              Choose your account type and get started with SavorySync
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <Label htmlFor="role" className="text-sm font-medium mb-2 block">
                I am a:
              </Label>
              <Select value={role} onValueChange={setRole}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="customer">
                    <div className="flex items-center space-x-2">
                      <Users className="h-4 w-4" />
                      <span>Customer - Order Food</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="seller">
                    <div className="flex items-center space-x-2">
                      <ChefHat className="h-4 w-4" />
                      <span>Restaurant Owner - Sell Food</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Tabs defaultValue="login" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="login">Sign In</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>
              
              <TabsContent value="login">
                <form onSubmit={handleSubmit('login')} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      name="email"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      name="password"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Signing In...' : 'Sign In'}
                  </Button>
                </form>
              </TabsContent>
              
              <TabsContent value="signup">
                <form onSubmit={handleSubmit('signup')} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-firstname">First Name</Label>
                      <Input
                        id="signup-firstname"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-lastname">Last Name</Label>
                      <Input
                        id="signup-lastname"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-phone">Phone Number</Label>
                    <Input
                      id="signup-phone"
                      name="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="signup-address">Address</Label>
                    <Input
                      id="signup-address"
                      name="address"
                      placeholder="123 Main Street, City, State, ZIP"
                      required
                    />
                  </div>
                  {role === 'seller' && (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-name">Restaurant Name</Label>
                        <Input
                          id="restaurant-name"
                          name="restaurantName"
                          placeholder="Enter your restaurant name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="restaurant-address">Restaurant Address</Label>
                        <Input
                          id="restaurant-address"
                          name="restaurantAddress"
                          placeholder="Restaurant location"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cuisine-type">Cuisine Type</Label>
                        <Input
                          id="cuisine-type"
                          name="cuisineType"
                          placeholder="e.g., Italian, Chinese, Mexican"
                          required
                        />
                      </div>
                    </>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      name="password"
                      type="password"
                      placeholder="Create a password"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm Password</Label>
                    <Input
                      id="confirm-password"
                      name="confirmPassword"
                      type="password"
                      placeholder="Confirm your password"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-orange-500 hover:bg-orange-600"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
