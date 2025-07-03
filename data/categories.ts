export interface NavItem {
  name: string;
  icon: string;
}

export const categories: NavItem[] = [
  { name: "Supermarket", icon: "ShoppingCart" },
  { name: "Pharmacy", icon: "Pill" },
  { name: "Meat", icon: "Beef" },
  { name: "Electronics", icon: "Smartphone" },
  { name: "Stationary", icon: "PenTool" },
  { name: "Fruits & Vegetables", icon: "Apple" },
  { name: "Gifts", icon: "Gift" },
];

export const superSaverCategories: NavItem[] = [
  { name: "Super Deals", icon: "Flame" },
  { name: "Bulk Buys", icon: "ShoppingBag" },
  { name: "Value Packs", icon: "Zap" },
];
