import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Filter, X, Leaf, Wheat, Milk, Nut, Heart, Zap } from 'lucide-react';

export interface DietaryPreference {
  id: string;
  label: string;
  icon: JSX.Element;
  color: string;
}

export const dietaryOptions: DietaryPreference[] = [
  { id: 'vegetarian', label: 'Vegetarian', icon: <Leaf className="h-4 w-4" />, color: 'bg-green-500' },
  { id: 'vegan', label: 'Vegan', icon: <Leaf className="h-4 w-4" />, color: 'bg-green-600' },
  { id: 'gluten-free', label: 'Gluten Free', icon: <Wheat className="h-4 w-4" />, color: 'bg-amber-500' },
  { id: 'dairy-free', label: 'Dairy Free', icon: <Milk className="h-4 w-4" />, color: 'bg-blue-500' },
  { id: 'nut-free', label: 'Nut Free', icon: <Nut className="h-4 w-4" />, color: 'bg-red-500' },
  { id: 'low-calorie', label: 'Low Calorie', icon: <Heart className="h-4 w-4" />, color: 'bg-pink-500' },
  { id: 'high-protein', label: 'High Protein', icon: <Zap className="h-4 w-4" />, color: 'bg-purple-500' },
];

interface DietaryPreferencesProps {
  selectedPreferences: string[];
  onPreferencesChange: (preferences: string[]) => void;
  isOpen: boolean;
  onToggle: () => void;
}

const DietaryPreferences = ({ 
  selectedPreferences, 
  onPreferencesChange, 
  isOpen, 
  onToggle 
}: DietaryPreferencesProps) => {
  const handlePreferenceToggle = (preferenceId: string) => {
    const newPreferences = selectedPreferences.includes(preferenceId)
      ? selectedPreferences.filter(id => id !== preferenceId)
      : [...selectedPreferences, preferenceId];
    onPreferencesChange(newPreferences);
  };

  const clearAllPreferences = () => {
    onPreferencesChange([]);
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={onToggle}
        className="flex items-center space-x-2"
      >
        <Filter className="h-4 w-4" />
        <span>Dietary Filters</span>
        {selectedPreferences.length > 0 && (
          <Badge variant="secondary" className="ml-2">
            {selectedPreferences.length}
          </Badge>
        )}
      </Button>

      {isOpen && (
        <Card className="absolute top-full left-0 mt-2 w-80 z-50 shadow-lg">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Dietary Preferences</CardTitle>
              <div className="flex items-center space-x-2">
                {selectedPreferences.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearAllPreferences}
                    className="text-xs"
                  >
                    Clear All
                  </Button>
                )}
                <Button variant="ghost" size="sm" onClick={onToggle}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {dietaryOptions.map((option) => (
                <div key={option.id} className="flex items-center space-x-3">
                  <Checkbox
                    id={option.id}
                    checked={selectedPreferences.includes(option.id)}
                    onCheckedChange={() => handlePreferenceToggle(option.id)}
                  />
                  <Label
                    htmlFor={option.id}
                    className="flex items-center space-x-2 cursor-pointer flex-1"
                  >
                    <div className={`p-1 rounded-full ${option.color} text-white`}>
                      {option.icon}
                    </div>
                    <span>{option.label}</span>
                  </Label>
                </div>
              ))}
            </div>
            
            {selectedPreferences.length > 0 && (
              <>
                <Separator className="my-4" />
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">
                    Active Filters:
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {selectedPreferences.map((prefId) => {
                      const option = dietaryOptions.find(opt => opt.id === prefId);
                      return option ? (
                        <Badge
                          key={prefId}
                          className={`${option.color} text-white`}
                        >
                          {option.label}
                        </Badge>
                      ) : null;
                    })}
                  </div>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default DietaryPreferences;