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
  dietaryTags: string[]; // e.g., ['vegetarian', 'gluten-free', 'low-calorie']
  nutritionalInfo: NutritionalInfo;
  allergens: string[]; // e.g., ['nuts', 'dairy', 'gluten']
  spiceLevel?: 'mild' | 'medium' | 'hot' | 'very-hot';
  isPopular?: boolean;
  preparationTime?: number; // minutes
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
  address?: string;
  description?: string;
  dietaryOptions: string[]; // dietary preferences this restaurant caters to
}