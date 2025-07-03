
import { shops, type Shop } from '@/data/shops';
import { shopCategories, type ShopCategory } from '@/data/shopCategories';
import { products, type Product } from '@/data/products';
import { categories, superSaverCategories, type NavItem } from '@/data/categories';

const delay = (ms: number) => new Promise(res => setTimeout(res, ms));

export class DataService {
  static async getCategories(): Promise<NavItem[]> {
    await delay(50);
    return categories;
  }

  static async getSuperSaverCategories(): Promise<NavItem[]> {
    await delay(50);
    return superSaverCategories;
  }
  
  static async getShopsByCategory(category: string): Promise<Shop[]> {
    await delay(100);
    return shops[category] || [];
  }

  static async getAllShops(): Promise<Shop[]> {
    await delay(50);
    return Object.values(shops).flat();
  }
  
  static async getShopByName(shopName: string): Promise<Shop | undefined> {
    await delay(50);
    const allShops = Object.values(shops).flat();
    return allShops.find(s => s.name === shopName);
  }

  static async getShopCategories(shopName: string): Promise<ShopCategory[]> {
    await delay(100);
    return shopCategories[shopName] || [];
  }

  static async getProducts(shopName: string, categoryName: string): Promise<Product[]> {
    await delay(150);
    if (products[shopName] && products[shopName][categoryName]) {
      return products[shopName][categoryName];
    }
    return [];
  }
}
