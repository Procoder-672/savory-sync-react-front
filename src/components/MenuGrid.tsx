
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Edit, Trash2 } from 'lucide-react';
import AddItemForm from './AddItemForm';

interface MenuItem {
  id: number;
  name: string;
  price: number;
  category: string;
  status: string;
  image: string;
  description?: string;
}

interface MenuGridProps {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
}

const MenuGrid = ({ menuItems, onAddItem }: MenuGridProps) => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Menu Management</h2>
        <AddItemForm onAddItem={onAddItem} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4">
              <div className="text-center mb-4">
                <div className="text-4xl mb-2">{item.image}</div>
                <h3 className="font-semibold text-lg">{item.name}</h3>
                <p className="text-gray-600">{item.category}</p>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-xl font-bold text-orange-600">${item.price}</span>
                <Badge variant={item.status === 'active' ? 'default' : 'secondary'}>
                  {item.status}
                </Badge>
              </div>
              <div className="flex space-x-2">
                <Button size="sm" variant="outline" className="flex-1">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit
                </Button>
                <Button size="sm" variant="outline" className="flex-1 text-red-600 border-red-200 hover:bg-red-50">
                  <Trash2 className="h-4 w-4 mr-1" />
                  Delete
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MenuGrid;
