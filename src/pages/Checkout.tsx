import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { 
  ShoppingCart, 
  MapPin, 
  CreditCard, 
  Users, 
  Clock, 
  Truck, 
  Tag, 
  Plus, 
  Minus, 
  X,
  Gift,
  Percent,
  Phone,
  Mail,
  Home,
  Building,
  Calendar,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations: string[];
  image: string;
}

interface SplitBillPerson {
  id: string;
  name: string;
  email: string;
  items: CartItem[];
  amount: number;
}

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  // Mock cart data
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Margherita Pizza',
      price: 18.99,
      quantity: 2,
      customizations: ['Extra cheese', 'Thin crust'],
      image: '/placeholder.svg'
    },
    {
      id: '2',
      name: 'Caesar Salad',
      price: 12.99,
      quantity: 1,
      customizations: ['No croutons'],
      image: '/placeholder.svg'
    }
  ]);

  // Split billing state
  const [isSplitBilling, setIsSplitBilling] = useState(false);
  const [splitPersons, setSplitPersons] = useState<SplitBillPerson[]>([
    { id: '1', name: '', email: '', items: [], amount: 0 }
  ]);

  // Form states
  const [deliveryInfo, setDeliveryInfo] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    apartment: '',
    city: '',
    zipCode: '',
    instructions: ''
  });

  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [orderOptions, setOrderOptions] = useState({
    deliveryType: 'delivery',
    deliveryTime: 'asap',
    scheduledTime: '',
    utensils: true,
    napkins: true
  });

  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<{code: string, discount: number} | null>(null);

  // Calculations
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryFee = orderOptions.deliveryType === 'delivery' ? 3.99 : 0;
  const tax = subtotal * 0.08;
  const discount = appliedPromo ? (subtotal * appliedPromo.discount / 100) : 0;
  const total = subtotal + deliveryFee + tax - discount;

  const updateQuantity = (id: string, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + change) }
          : item
      ).filter(item => item.quantity > 0)
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyPromoCode = () => {
    const validCodes = {
      'SAVE10': 10,
      'WELCOME15': 15,
      'NEWUSER20': 20
    };

    if (validCodes[promoCode as keyof typeof validCodes]) {
      setAppliedPromo({
        code: promoCode,
        discount: validCodes[promoCode as keyof typeof validCodes]
      });
      toast({
        title: "Promo code applied!",
        description: `You saved ${validCodes[promoCode as keyof typeof validCodes]}%`,
      });
    } else {
      toast({
        title: "Invalid promo code",
        description: "Please check the code and try again.",
        variant: "destructive"
      });
    }
  };

  const addSplitPerson = () => {
    setSplitPersons([...splitPersons, {
      id: Date.now().toString(),
      name: '',
      email: '',
      items: [],
      amount: 0
    }]);
  };

  const removeSplitPerson = (id: string) => {
    setSplitPersons(splitPersons.filter(person => person.id !== id));
  };

  const handlePlaceOrder = () => {
    if (!deliveryInfo.name || !deliveryInfo.phone || !deliveryInfo.address) {
      toast({
        title: "Missing information",
        description: "Please fill in all required delivery details.",
        variant: "destructive"
      });
      return;
    }

    if (paymentInfo.method === 'card' && (!paymentInfo.cardNumber || !paymentInfo.expiryDate || !paymentInfo.cvv)) {
      toast({
        title: "Missing payment information",
        description: "Please complete your payment details.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order placed successfully!",
      description: "You'll receive a confirmation email shortly.",
    });

    // Navigate to order confirmation or customer dashboard
    navigate('/customer-dashboard');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center space-x-2">
              <ShoppingCart className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold">Checkout</span>
            </Link>
            <Link to="/customer-dashboard">
              <Button variant="outline">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  Delivery Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={deliveryInfo.name}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, name: e.target.value})}
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={deliveryInfo.phone}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, phone: e.target.value})}
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={deliveryInfo.email}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, email: e.target.value})}
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <Label htmlFor="address">Address *</Label>
                  <Input
                    id="address"
                    value={deliveryInfo.address}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, address: e.target.value})}
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label htmlFor="apartment">Apartment/Suite</Label>
                    <Input
                      id="apartment"
                      value={deliveryInfo.apartment}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, apartment: e.target.value})}
                      placeholder="Apt 2B"
                    />
                  </div>
                  <div>
                    <Label htmlFor="city">City</Label>
                    <Input
                      id="city"
                      value={deliveryInfo.city}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, city: e.target.value})}
                      placeholder="San Francisco"
                    />
                  </div>
                  <div>
                    <Label htmlFor="zipCode">ZIP Code</Label>
                    <Input
                      id="zipCode"
                      value={deliveryInfo.zipCode}
                      onChange={(e) => setDeliveryInfo({...deliveryInfo, zipCode: e.target.value})}
                      placeholder="94102"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="instructions">Delivery Instructions</Label>
                  <Textarea
                    id="instructions"
                    value={deliveryInfo.instructions}
                    onChange={(e) => setDeliveryInfo({...deliveryInfo, instructions: e.target.value})}
                    placeholder="Leave at door, ring bell, etc."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Options */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Truck className="h-5 w-5 text-primary" />
                  Delivery Options
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={orderOptions.deliveryType}
                  onValueChange={(value) => setOrderOptions({...orderOptions, deliveryType: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="delivery" id="delivery" />
                    <Label htmlFor="delivery" className="flex items-center gap-2">
                      <Truck className="h-4 w-4" />
                      Delivery ($3.99)
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="pickup" id="pickup" />
                    <Label htmlFor="pickup" className="flex items-center gap-2">
                      <Building className="h-4 w-4" />
                      Pickup (Free)
                    </Label>
                  </div>
                </RadioGroup>

                <Separator />

                <div>
                  <Label>Delivery Time</Label>
                  <RadioGroup
                    value={orderOptions.deliveryTime}
                    onValueChange={(value) => setOrderOptions({...orderOptions, deliveryTime: value})}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="asap" id="asap" />
                      <Label htmlFor="asap" className="flex items-center gap-2">
                        <Clock className="h-4 w-4" />
                        ASAP (30-45 mins)
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scheduled" id="scheduled" />
                      <Label htmlFor="scheduled" className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Schedule for later
                      </Label>
                    </div>
                  </RadioGroup>
                  
                  {orderOptions.deliveryTime === 'scheduled' && (
                    <Input
                      type="datetime-local"
                      value={orderOptions.scheduledTime}
                      onChange={(e) => setOrderOptions({...orderOptions, scheduledTime: e.target.value})}
                      className="mt-2"
                    />
                  )}
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="utensils"
                      checked={orderOptions.utensils}
                      onCheckedChange={(checked) => setOrderOptions({...orderOptions, utensils: checked as boolean})}
                    />
                    <Label htmlFor="utensils">Include utensils</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="napkins"
                      checked={orderOptions.napkins}
                      onCheckedChange={(checked) => setOrderOptions({...orderOptions, napkins: checked as boolean})}
                    />
                    <Label htmlFor="napkins">Include napkins</Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Split Billing */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-primary" />
                  Split Bill
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2 mb-4">
                  <Checkbox
                    id="splitBilling"
                    checked={isSplitBilling}
                    onCheckedChange={(checked) => setIsSplitBilling(checked as boolean)}
                  />
                  <Label htmlFor="splitBilling">Split this order between multiple people</Label>
                </div>

                {isSplitBilling && (
                  <div className="space-y-4">
                    {splitPersons.map((person, index) => (
                      <div key={person.id} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium">Person {index + 1}</h4>
                          {splitPersons.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeSplitPerson(person.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                        <div className="grid md:grid-cols-2 gap-3">
                          <Input
                            placeholder="Name"
                            value={person.name}
                            onChange={(e) => {
                              setSplitPersons(splitPersons.map(p => 
                                p.id === person.id ? {...p, name: e.target.value} : p
                              ));
                            }}
                          />
                          <Input
                            placeholder="Email"
                            value={person.email}
                            onChange={(e) => {
                              setSplitPersons(splitPersons.map(p => 
                                p.id === person.id ? {...p, email: e.target.value} : p
                              ));
                            }}
                          />
                        </div>
                        <div className="mt-3">
                          <Label>Amount: ${(total / splitPersons.length).toFixed(2)}</Label>
                        </div>
                      </div>
                    ))}
                    <Button
                      variant="outline"
                      onClick={addSplitPerson}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Another Person
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-primary" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <RadioGroup
                  value={paymentInfo.method}
                  onValueChange={(value) => setPaymentInfo({...paymentInfo, method: value})}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="card" id="card" />
                    <Label htmlFor="card" className="flex items-center gap-2">
                      <CreditCard className="h-4 w-4" />
                      Credit/Debit Card
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="flex items-center gap-2">
                      <Gift className="h-4 w-4" />
                      Cash on Delivery
                    </Label>
                  </div>
                </RadioGroup>

                {paymentInfo.method === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={paymentInfo.cardNumber}
                        onChange={(e) => setPaymentInfo({...paymentInfo, cardNumber: e.target.value})}
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={paymentInfo.expiryDate}
                          onChange={(e) => setPaymentInfo({...paymentInfo, expiryDate: e.target.value})}
                          placeholder="MM/YY"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={paymentInfo.cvv}
                          onChange={(e) => setPaymentInfo({...paymentInfo, cvv: e.target.value})}
                          placeholder="123"
                        />
                      </div>
                      <div>
                        <Label htmlFor="nameOnCard">Name on Card</Label>
                        <Input
                          id="nameOnCard"
                          value={paymentInfo.nameOnCard}
                          onChange={(e) => setPaymentInfo({...paymentInfo, nameOnCard: e.target.value})}
                          placeholder="John Doe"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Order Summary */}
          <div className="space-y-6">
            {/* Cart Items */}
            <Card>
              <CardHeader>
                <CardTitle>Your Order</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-start gap-3 pb-4 border-b last:border-b-0 last:pb-0">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">
                        ${item.price.toFixed(2)} each
                      </p>
                      {item.customizations.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-1">
                          {item.customizations.map((custom, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {custom}
                            </Badge>
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, -1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Promo Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Tag className="h-5 w-5 text-primary" />
                  Promo Code
                </CardTitle>
              </CardHeader>
              <CardContent>
                {appliedPromo ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Percent className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium text-green-800">
                        {appliedPromo.code} (-{appliedPromo.discount}%)
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setAppliedPromo(null)}
                      className="h-8 w-8 p-0"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      placeholder="Enter promo code"
                    />
                    <Button onClick={applyPromoCode} variant="outline">
                      Apply
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {orderOptions.deliveryType === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                {discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
                {isSplitBilling && (
                  <div className="text-sm text-muted-foreground">
                    ${(total / splitPersons.length).toFixed(2)} per person
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Place Order Button */}
            <Button
              onClick={handlePlaceOrder}
              className="w-full h-12 text-lg"
              size="lg"
            >
              <Shield className="h-5 w-5 mr-2" />
              Place Order - ${total.toFixed(2)}
            </Button>

            <p className="text-xs text-muted-foreground text-center">
              By placing this order, you agree to our terms of service and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;