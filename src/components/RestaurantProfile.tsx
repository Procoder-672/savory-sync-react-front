import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  Building, 
  Phone, 
  MapPin, 
  Clock, 
  Star, 
  Utensils,
  Edit,
  Save,
  X,
  Shield
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RestaurantProfile {
  id: number;
  name: string;
  description: string;
  address: string;
  phone: string;
  cuisineType: string;
  openingHours: string;
  sellerId: number;
  hygieneRating: number;
  image: string;
  rating: number;
  deliveryFee: number;
  category: string;
  featured: boolean;
}

const RestaurantProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [restaurant, setRestaurant] = useState<RestaurantProfile>({
    id: 1,
    name: "Mario's Pizza Palace",
    description: "Authentic Italian pizzas made with fresh ingredients and traditional recipes passed down through generations.",
    address: "123 Pizza Street, Little Italy, San Francisco, CA 94102",
    phone: "+1 (555) PIZZA-01",
    cuisineType: "Italian",
    openingHours: "Mon-Sun: 11:00 AM - 11:00 PM",
    sellerId: 1,
    hygieneRating: 5,
    image: "🍕",
    rating: 4.8,
    deliveryFee: 2.99,
    category: "pizza",
    featured: true
  });

  const [editForm, setEditForm] = useState(restaurant);

  const cuisineTypes = [
    'Italian', 'Chinese', 'Mexican', 'Indian', 'Thai', 'Japanese', 
    'American', 'Mediterranean', 'French', 'Korean', 'Vietnamese', 'Greek'
  ];

  const handleSave = () => {
    setRestaurant(editForm);
    setIsEditing(false);
    toast({
      title: "Restaurant profile updated",
      description: "Your restaurant information has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditForm(restaurant);
    setIsEditing(false);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Restaurant Profile</h1>
          <p className="text-muted-foreground">Manage your restaurant information and settings</p>
        </div>
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
              <Button onClick={handleCancel} variant="outline">
                <X className="h-4 w-4 mr-2" />
                Cancel
              </Button>
            </>
          ) : (
            <Button onClick={() => setIsEditing(true)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          )}
        </div>
      </div>

      {/* Basic Restaurant Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5 text-primary" />
            Restaurant Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Restaurant Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                />
              ) : (
                <p className="mt-1 text-sm font-medium">{restaurant.name}</p>
              )}
            </div>
            <div>
              <Label>Current Rating</Label>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex">
                  {renderStars(restaurant.rating)}
                </div>
                <span className="text-sm font-medium">{restaurant.rating}/5</span>
              </div>
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description</Label>
            {isEditing ? (
              <Textarea
                id="description"
                value={editForm.description}
                onChange={(e) => setEditForm(prev => ({...prev, description: e.target.value}))}
                rows={3}
              />
            ) : (
              <p className="mt-1 text-sm">{restaurant.description}</p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="cuisineType">Cuisine Type</Label>
              {isEditing ? (
                <Select
                  value={editForm.cuisineType}
                  onValueChange={(value) => setEditForm(prev => ({...prev, cuisineType: value}))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {cuisineTypes.map(cuisine => (
                      <SelectItem key={cuisine} value={cuisine}>
                        {cuisine}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : (
                <p className="mt-1 text-sm">{restaurant.cuisineType}</p>
              )}
            </div>
            <div>
              <Label htmlFor="deliveryFee">Delivery Fee</Label>
              {isEditing ? (
                <Input
                  id="deliveryFee"
                  type="number"
                  step="0.01"
                  value={editForm.deliveryFee}
                  onChange={(e) => setEditForm(prev => ({...prev, deliveryFee: parseFloat(e.target.value)}))}
                />
              ) : (
                <p className="mt-1 text-sm">${restaurant.deliveryFee.toFixed(2)}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact & Location */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            Contact & Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm(prev => ({...prev, phone: e.target.value}))}
              />
            ) : (
              <p className="mt-1 text-sm">{restaurant.phone}</p>
            )}
          </div>
          <div>
            <Label htmlFor="address">Address</Label>
            {isEditing ? (
              <Textarea
                id="address"
                value={editForm.address}
                onChange={(e) => setEditForm(prev => ({...prev, address: e.target.value}))}
                rows={3}
              />
            ) : (
              <p className="mt-1 text-sm">{restaurant.address}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Operating Hours */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5 text-primary" />
            Operating Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div>
            <Label htmlFor="openingHours">Opening Hours</Label>
            {isEditing ? (
              <Input
                id="openingHours"
                value={editForm.openingHours}
                onChange={(e) => setEditForm(prev => ({...prev, openingHours: e.target.value}))}
                placeholder="e.g., Mon-Sun: 11:00 AM - 11:00 PM"
              />
            ) : (
              <p className="mt-1 text-sm">{restaurant.openingHours}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Hygiene Rating */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Health & Safety
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <Label>Hygiene Rating</Label>
              <div className="mt-1 flex items-center gap-2">
                <div className="flex">
                  {renderStars(restaurant.hygieneRating)}
                </div>
                <span className="text-sm font-medium">{restaurant.hygieneRating}/5</span>
              </div>
            </div>
            <Badge 
              variant={restaurant.hygieneRating >= 4 ? "default" : restaurant.hygieneRating >= 3 ? "secondary" : "destructive"}
            >
              {restaurant.hygieneRating >= 4 ? "Excellent" : restaurant.hygieneRating >= 3 ? "Good" : "Needs Improvement"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Status & Visibility */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Restaurant Status
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Featured Restaurant</Label>
              <p className="text-sm text-muted-foreground">
                Featured restaurants appear at the top of search results
              </p>
            </div>
            <Badge variant={restaurant.featured ? "default" : "secondary"}>
              {restaurant.featured ? "Featured" : "Standard"}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RestaurantProfile;