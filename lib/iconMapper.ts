
import { 
  ShoppingCart, 
  Pill, 
  Beef, 
  Smartphone, 
  PenTool, 
  Apple, 
  Gift, 
  ShoppingBag,
  Coffee,
  Zap,
  Flame,
  Fish,
  Shell,
  PiggyBank,
  Home,
  Camera,
  Book,
  Paintbrush,
  Leaf,
  Carrot,
  Sprout,
  User,
  Calendar,
  type LucideIcon 
} from 'lucide-react';

const iconMap: Record<string, LucideIcon> = {
  ShoppingCart,
  Pill,
  Beef,
  Smartphone,
  PenTool,
  Apple,
  Gift,
  ShoppingBag,
  Coffee,
  Zap,
  Fish,
  Shell,
  PiggyBank,
  Flame,
  Home,
  Camera,
  Book,
  Paintbrush,
  Leaf,
  Carrot,
  Sprout,
  User,
  Calendar,
};

export const getIcon = (iconName: string): LucideIcon => {
  return iconMap[iconName] || Flame;
};
