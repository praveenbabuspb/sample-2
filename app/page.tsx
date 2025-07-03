
'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { DataService } from '@/services/dataService';
import type { Product } from '@/data/products';
import type { Shop } from '@/data/shops';
import type { NavItem } from '@/data/categories';
import { HomeCarousel } from '@/components/home-carousel';
import { PromoSection } from '@/components/promo-section';
import { DealsSection } from '@/components/deals-section';
import { useSuperSaverStore } from '@/store/superSaverStore';
import { Skeleton } from '@/components/ui/skeleton';
import { ShopSection } from '@/components/shop-section';
import { bannerImages } from '@/data/bannerImages';

interface ShopProducts {
  [shopName: string]: {
    [categoryName: string]: Product[];
  };
}

export default function HomePage() {
  const { isSuperSaver } = useSuperSaverStore();

  const [categories, setCategories] = useState<NavItem[]>([]);
  const [featuredShops, setFeaturedShops] = useState<Shop[]>([]);
  const [shopProducts, setShopProducts] = useState<ShopProducts>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);

      if (isSuperSaver) {
        const cats = await DataService.getSuperSaverCategories();
        setCategories(cats);
        setFeaturedShops([]);
        setShopProducts({});
      } else {
        const cats = await DataService.getCategories();
        setCategories(cats);

        const featuredShopsConfig = [
          { name: "FreshMart Supermarket", category: "Supermarket" },
          { name: "Prime Cuts Butchery", category: "Meat" },
          { name: "TechWorld Electronics", category: "Electronics" },
        ];

        const allShops = await DataService.getAllShops();
        const fShops = featuredShopsConfig
          .map(config => allShops.find(s => s.name === config.name && s.category === config.category))
          .filter((s): s is Shop => s !== undefined);
        setFeaturedShops(fShops);
        
        const featuredShopCategories: { [shopName: string]: string[] } = {
          "FreshMart Supermarket": ["Grocery", "Snacks"],
          "Prime Cuts Butchery": ["Chicken", "Mutton"],
          "TechWorld Electronics": ["Smartphones", "Laptops"]
        };

        const productPromises = fShops.map(async (shop) => {
            const categoriesToFetch = featuredShopCategories[shop.name] || [];
            const productsByCategory: { [category: string]: Product[] } = {};
            
            for (const category of categoriesToFetch) {
                productsByCategory[category] = await DataService.getProducts(shop.name, category);
            }
        
            return { [shop.name]: productsByCategory };
        });
        
        const results = await Promise.all(productPromises);
        const productsByShop = results.reduce((acc, result) => ({ ...acc, ...result }), {});
        setShopProducts(productsByShop);
      }

      setLoading(false);
    };

    fetchAllData();
  }, [isSuperSaver]);

  const categoryNavItems = categories.map((category) => ({
    name: category.name,
    url: `/shops/${encodeURIComponent(category.name)}`,
    iconName: category.icon,
  }));

  const navItems = [...categoryNavItems];

  if (loading) {
    return (
      <MainLayout categories={categories}>
        <div className="w-full space-y-16">
          <Skeleton className="h-[125px] w-full max-w-5xl mx-auto rounded-lg" />
          <DealsSection />
          <PromoSection />
          <div className="space-y-12">
            <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
                </div>
            </div>
             <div className="space-y-4">
                <Skeleton className="h-8 w-1/3" />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                  {Array.from({ length: 6 }).map((_, i) => <Skeleton key={i} className="h-48 w-full" />)}
                </div>
            </div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isSuperSaver) {
    return (
      <MainLayout navItems={navItems} categories={categories}>
        <div className="flex flex-col items-center justify-center h-96">
          <h1 className="text-4xl font-bold text-primary mb-4">Super Saver Mode!</h1>
          <p className="text-lg text-muted-foreground">Here is some completely different content.</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout navItems={navItems} categories={categories}>
      <div className="w-full space-y-16">
        <HomeCarousel bannerImages={bannerImages} />
        <DealsSection />
        <PromoSection />
        <div className="space-y-12">
          {featuredShops.map((shop) => (
            <ShopSection
              key={shop.id}
              shop={shop}
              shopProducts={shopProducts[shop.name]}
            />
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
