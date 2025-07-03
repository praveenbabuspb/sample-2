export interface Product {
  id: string;
  name: string;
  price: number;
  unit: string;
  image: string;
  category: string;
  description: string;
  rating: number;
  inStock: boolean;
  shopName: string;
  shopCategory: string;
  dataAiHint?: string;
}

export interface Shop {
  id: number;
  name: string;
  description: string;
  rating: number;
  deliveryTime: string;
  image: string;
  category: string;
}

export interface ShopCategory {
  name: string;
  url: string;
  icon: string;
  image: string;
}

export interface NavItem {
  name: string;
  icon: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface ShopCart {
  shopName: string;
  shopCategory: string;
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

export interface BannerImage {
  src: string;
  alt: string;
  href: string;
  dataAiHint: string;
}