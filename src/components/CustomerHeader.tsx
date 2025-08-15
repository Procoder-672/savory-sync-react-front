
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChefHat, ShoppingCart, User, LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const CustomerHeader = () => {
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to calculate total items in cart
  const calculateCartItems = () => {
    const cartData = localStorage.getItem('cartItems');
    if (cartData) {
      const cart = JSON.parse(cartData);
      if (cart.items && Array.isArray(cart.items)) {
        return cart.items.reduce((total: number, item: any) => total + item.quantity, 0);
      }
    }
    return 0;
  };

  // Update cart count on component mount and when localStorage changes
  useEffect(() => {
    const updateCartCount = () => {
      setCartItemCount(calculateCartItems());
    };

    // Initial load
    updateCartCount();

    // Listen for localStorage changes
    const handleStorageChange = () => {
      updateCartCount();
    };

    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for same-tab updates
    window.addEventListener('cartUpdated', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', handleStorageChange);
    };
  }, []);
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <ChefHat className="h-8 w-8 text-orange-500" />
            <span className="text-2xl font-bold text-gray-900">SavorySync</span>
          </Link>
          
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              <ShoppingCart className="h-5 w-5" />
              <span className="ml-2">Cart ({cartItemCount})</span>
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
  );
};

export default CustomerHeader;
