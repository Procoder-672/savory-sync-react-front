import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Shield, 
  Utensils, 
  AlertTriangle,
  Edit,
  Save,
  X
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface UserProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: string;
  dietaryPreferences: string[];
  allergies: string[];
  role: 'customer' | 'seller';
}

const UserProfile = () => {
  const { toast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    address: '123 Main Street, San Francisco, CA 94102',
    dietaryPreferences: ['vegetarian', 'gluten-free'],
    allergies: ['nuts', 'shellfish'],
    role: 'customer'
  });

  const [editForm, setEditForm] = useState(profile);

  const dietaryOptions = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free', 
    'low-calorie', 'high-protein', 'keto', 'halal', 'kosher'
  ];

  const allergenOptions = [
    'nuts', 'peanuts', 'shellfish', 'fish', 'eggs', 
    'dairy', 'soy', 'wheat', 'sesame', 'sulfites'
  ];

  const handleSave = () => {
    setProfile(editForm);
    setIsEditing(false);
    toast({
      title: "Profile updated",
      description: "Your profile has been successfully updated.",
    });
  };

  const handleCancel = () => {
    setEditForm(profile);
    setIsEditing(false);
  };

  const toggleDietaryPreference = (preference: string) => {
    setEditForm(prev => ({
      ...prev,
      dietaryPreferences: prev.dietaryPreferences.includes(preference)
        ? prev.dietaryPreferences.filter(p => p !== preference)
        : [...prev.dietaryPreferences, preference]
    }));
  };

  const toggleAllergy = (allergy: string) => {
    setEditForm(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Profile Settings</h1>
          <p className="text-muted-foreground">Manage your account information and preferences</p>
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

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Basic Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
              {isEditing ? (
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => setEditForm(prev => ({...prev, name: e.target.value}))}
                />
              ) : (
                <p className="mt-1 text-sm">{profile.name}</p>
              )}
            </div>
            <div>
              <Label>Role</Label>
              <div className="mt-1">
                <Badge variant={profile.role === 'customer' ? 'default' : 'secondary'}>
                  {profile.role === 'customer' ? 'Customer' : 'Restaurant Owner'}
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="email">Email Address</Label>
            {isEditing ? (
              <Input
                id="email"
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm(prev => ({...prev, email: e.target.value}))}
              />
            ) : (
              <p className="mt-1 text-sm">{profile.email}</p>
            )}
          </div>
          <div>
            <Label htmlFor="phone">Phone Number</Label>
            {isEditing ? (
              <Input
                id="phone"
                value={editForm.phone}
                onChange={(e) => setEditForm(prev => ({...prev, phone: e.target.value}))}
              />
            ) : (
              <p className="mt-1 text-sm">{profile.phone}</p>
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
              <p className="mt-1 text-sm">{profile.address}</p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dietary Preferences */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Utensils className="h-5 w-5 text-primary" />
            Dietary Preferences
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {dietaryOptions.map(option => (
                <div key={option} className="flex items-center space-x-2">
                  <Checkbox
                    id={`diet-${option}`}
                    checked={editForm.dietaryPreferences.includes(option)}
                    onCheckedChange={() => toggleDietaryPreference(option)}
                  />
                  <Label htmlFor={`diet-${option}`} className="text-sm capitalize">
                    {option.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.dietaryPreferences.length > 0 ? (
                profile.dietaryPreferences.map(pref => (
                  <Badge key={pref} variant="secondary" className="capitalize">
                    {pref.replace('-', ' ')}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No dietary preferences set</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Allergies */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-500" />
            Allergies & Restrictions
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {allergenOptions.map(allergy => (
                <div key={allergy} className="flex items-center space-x-2">
                  <Checkbox
                    id={`allergy-${allergy}`}
                    checked={editForm.allergies.includes(allergy)}
                    onCheckedChange={() => toggleAllergy(allergy)}
                  />
                  <Label htmlFor={`allergy-${allergy}`} className="text-sm capitalize">
                    {allergy}
                  </Label>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {profile.allergies.length > 0 ? (
                profile.allergies.map(allergy => (
                  <Badge key={allergy} variant="destructive" className="capitalize">
                    {allergy}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No allergies recorded</p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Security */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
            Security & Privacy
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button variant="outline" className="w-full md:w-auto">
            Change Password
          </Button>
          <Button variant="outline" className="w-full md:w-auto ml-0 md:ml-2">
            Privacy Settings
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserProfile;