export interface NutritionalInfo {
  calories: number;
  protein: number; // grams
  carbs: number; // grams
  fat: number; // grams
  fiber?: number; // grams
  sugar?: number; // grams
  sodium?: number; // mg
}

export interface MenuItem {
  id: number;
  restaurantId: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  status: 'active' | 'inactive' | 'out-of-stock';
  dietaryTags: string[]; // e.g., ['vegetarian', 'gluten-free', 'low-calorie']
  nutritionalInfo: NutritionalInfo;
  allergens: string[]; // e.g., ['nuts', 'dairy', 'gluten']
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  isPopular?: boolean;
  preparationTime?: number; // minutes
  expiryTime?: Date; // for time-limited offers
  splitType?: 'individual' | 'shareable' | 'family'; // for split billing options
  createdAt: Date;
  updatedAt: Date;
}

export interface Restaurant {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  deliveryFee: number;
  cuisine: string;
  category: string;
  featured: boolean;
  address: string;
  description: string;
  phone: string;
  cuisineType: string;
  openingHours: string;
  sellerId: number;
  hygieneRating: number; // 1-5 scale
  dietaryOptions: string[]; // dietary preferences this restaurant caters to
}

export interface User {
  id: number;
  name: string;
  email: string;
  password?: string; // not included in frontend responses
  role: 'customer' | 'seller';
  phone: string;
  address: string;
  dietaryPreferences: string[];
  allergies: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: number;
  userId: number;
  restaurantId: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'ready' | 'out-for-delivery' | 'delivered' | 'cancelled';
  totalAmount: number;
  orderDate: Date;
  deliveryAddress: string;
  specialInstructions?: string;
  deliveryFee: number;
  tax: number;
  subtotal: number;
  paymentMethod: 'card' | 'cash' | 'digital-wallet';
  splitBilling?: boolean;
  splitPersons?: SplitPerson[];
  estimatedDeliveryTime?: Date;
  actualDeliveryTime?: Date;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: number;
  orderId: number;
  menuItemId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  customizations: string[];
  menuItem?: MenuItem;
}

export interface SplitPerson {
  id: string;
  name: string;
  email: string;
  amount: number;
  items: OrderItem[];
  paymentStatus: 'pending' | 'paid' | 'failed';
}