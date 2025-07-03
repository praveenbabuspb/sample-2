
'use client';

import { useState, useEffect } from 'react';
import { DataService } from '@/services/dataService';
import type { ShopCategory } from '@/data/shopCategories';
import type { Product } from '@/data/products';
import { ProductCard } from './product-card';
import { Skeleton } from './ui/skeleton';
import { cn } from '@/lib/utils';
import { ScrollArea } from './ui/scroll-area';
import { Card } from './ui/card';

const FEATURED_SHOP_NAME = "FreshMart Supermarket";

export function FeaturedProductsSection() {
  const [categories, setCategories] = useState<ShopCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [loadingProducts, setLoadingProducts] = useState(false);

  useEffect(() => {
    const fetchInitialData = async () => {
      setLoadingCategories(true);
      try {
        const fetchedCategories = await DataService.getShopCategories(FEATURED_SHOP_NAME);
        setCategories(fetchedCategories);

        if (fetchedCategories.length > 0) {
          const firstCategory = fetchedCategories[0].name;
          setActiveCategory(firstCategory);
          setLoadingProducts(true);
          const fetchedProducts = await DataService.getProducts(FEATURED_SHOP_NAME, firstCategory);
          setProducts(fetchedProducts);
        }
      } catch (error) {
        console.error("Failed to fetch featured shop data:", error);
      } finally {
        setLoadingCategories(false);
        setLoadingProducts(false);
      }
    };

    fetchInitialData();
  }, []);

  const handleCategoryClick = async (categoryName: string) => {
    if (categoryName === activeCategory) return;
    setActiveCategory(categoryName);
    setLoadingProducts(true);
    setProducts([]);
    try {
      const fetchedProducts = await DataService.getProducts(FEATURED_SHOP_NAME, categoryName);
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to fetch products for category:", categoryName, error);
    } finally {
      setLoadingProducts(false);
    }
  };

  if (loadingCategories) {
    return (
      <Card className="w-full p-4 md:p-6">
        <Skeleton className="h-8 w-1/3 mb-6" />
        <div className="flex flex-col md:flex-row gap-6" style={{ minHeight: '500px' }}>
          <div className="w-full md:w-1/4">
            <div className="space-y-2">
              {Array.from({ length: 5 }).map((_, i) => <Skeleton key={i} className="h-12 w-full" />)}
            </div>
          </div>
          <div className="w-full md:w-3/4">
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="bg-card border rounded-xl p-3 space-y-3">
                  <Skeleton className="h-32 w-full rounded-lg" />
                  <Skeleton className="h-4 w-3/4 mt-2" />
                  <Skeleton className="h-4 w-1/4" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <section className="w-full">
        <h2 className="text-3xl font-bold mb-4">From {FEATURED_SHOP_NAME}</h2>
        <Card className="overflow-hidden">
            <div className="flex flex-col md:flex-row" style={{ height: '70vh', maxHeight: '700px' }}>
                <aside className="w-full md:w-1/4 lg:w-1/5 border-b md:border-b-0 md:border-r bg-muted/30">
                    <ScrollArea className="h-full">
                        <nav className="p-2">
                            <ul>
                                {categories.map((category) => (
                                <li key={category.name}>
                                    <button
                                    onClick={() => handleCategoryClick(category.name)}
                                    className={cn(
                                        "w-full text-left px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                        activeCategory === category.name
                                        ? "bg-primary/10 text-primary font-semibold"
                                        : "text-muted-foreground hover:bg-muted/80"
                                    )}
                                    >
                                    {category.name}
                                    </button>
                                </li>
                                ))}
                            </ul>
                        </nav>
                    </ScrollArea>
                </aside>

                <main className="w-full md:w-3/4 lg:w-4/5 h-full">
                    <ScrollArea className="h-full">
                        <div className="p-4">
                            {loadingProducts ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {Array.from({ length: 8 }).map((_, i) => (
                                       <div key={i} className="bg-card border rounded-xl p-3 space-y-3">
                                            <Skeleton className="aspect-square w-full rounded-lg" />
                                            <Skeleton className="h-4 w-3/4 mt-2" />
                                            <Skeleton className="h-4 w-1/4" />
                                            <div className="flex justify-between items-center pt-2">
                                                <Skeleton className="h-6 w-1/3" />
                                                <Skeleton className="h-9 w-16" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {products.length > 0 ? products.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    )) : <p className="col-span-full text-center text-muted-foreground">No products found in this category.</p>}
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </main>
            </div>
        </Card>
    </section>
  );
}
