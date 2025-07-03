
'use client';

import { useState, useEffect } from "react";
import { ArrowLeft } from "lucide-react";
import { FloatingCart } from '@/components/floating-cart';
import { DataService } from '@/services/dataService';
import type { Shop } from '@/data/shops';
import type { Product } from '@/data/products';
import type { ShopCategory } from "@/data/shopCategories";
import Link from "next/link";
import { notFound } from "next/navigation";
import { HomeCarousel } from "@/components/home-carousel";
import { bannerImages } from "@/data/bannerImages";
import { ProductCarousel } from "@/components/product-carousel";
import { AutoProductCarousel } from "@/components/auto-product-carousel";
import { Skeleton } from "@/components/ui/skeleton";
import { ShopCategoryCircles } from "@/components/shop-category-circles";

export default function ShopPage({ params }: { params: { shopName: string } }) {
  const shopName = decodeURIComponent(params.shopName);

  const [shop, setShop] = useState<Shop | null>(null);
  const [shopCategories, setShopCategories] = useState<ShopCategory[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [topDeals, setTopDeals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadShopData = async () => {
      setLoading(true);
      const shopData = await DataService.getShopByName(shopName);
      if (!shopData) {
        notFound();
        return;
      }
      setShop(shopData);

      const fetchedCategories = await DataService.getShopCategories(shopName);
      setShopCategories(fetchedCategories);
      
      if (fetchedCategories.length > 0) {
        const featuredProductsData = await DataService.getProducts(shopName, fetchedCategories[0].name);
        setFeaturedProducts(featuredProductsData);
      }
      
      if (fetchedCategories.length > 1) {
        const topDealsData = await DataService.getProducts(shopName, fetchedCategories[1].name);
        setTopDeals(topDealsData);
      } else if (fetchedCategories.length > 0) {
        // If only one category, use its products for the second carousel as well
        const topDealsData = await DataService.getProducts(shopName, fetchedCategories[0].name);
        setTopDeals(topDealsData);
      }

      setLoading(false);
    };
    loadShopData();
  }, [shopName]);


  if (loading || !shop) {
    return (
      <div className="bg-background min-h-screen">
        <main className="container mx-auto px-4 py-8">
            <div className="md:relative md:flex md:items-center md:justify-center md:h-14 mb-8">
                <div className="md:absolute md:left-0">
                    <Skeleton className="h-5 w-32" />
                </div>
                <div className="text-center mt-4 md:mt-0 space-y-2">
                    <Skeleton className="h-10 w-48 mx-auto" />
                    <Skeleton className="h-5 w-64 mx-auto" />
                </div>
            </div>
            
            <Skeleton className="aspect-[4/1] w-full max-w-5xl mx-auto rounded-lg mb-8" />

            <div className="py-8">
              <Skeleton className="h-8 w-1/3 mx-auto mb-6" />
              <div className="flex gap-4 overflow-hidden">
                {Array.from({ length: 7 }).map((_, i) => (
                  <div key={i} className="flex flex-col items-center gap-3 flex-shrink-0 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[12%]">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-12 mt-8">
                <div>
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <div className="flex gap-4 overflow-hidden">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 space-y-2">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
                 <div>
                    <Skeleton className="h-8 w-1/3 mb-4" />
                    <div className="flex gap-4 overflow-hidden">
                         {Array.from({ length: 5 }).map((_, i) => (
                            <div key={i} className="flex-shrink-0 w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/6 space-y-2">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </main>
        <FloatingCart />
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto px-4 py-8">
        <div className="md:relative md:flex md:items-center md:justify-center md:h-14 mb-8">
            <div className="md:absolute md:left-0">
                <Link href={`/shops/${encodeURIComponent(shop.category)}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                    <ArrowLeft size={16} />
                    <span>Back to {shop.category}</span>
                </Link>
            </div>
            <div className="text-center mt-4 md:mt-0">
                <h1 className="text-3xl font-headline md:text-4xl text-primary">{shop.name}</h1>
                <p className="text-base mt-1 text-muted-foreground">{shop.description}</p>
            </div>
        </div>
        
        <div className="mb-8">
          <HomeCarousel bannerImages={bannerImages} />
        </div>
        
        <ShopCategoryCircles categories={shopCategories} shopName={shop.name} />

        <div className="space-y-12 mt-8">
            {featuredProducts.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">Best Sellers</h2>
                    <AutoProductCarousel products={featuredProducts} />
                </section>
            )}

            {topDeals.length > 0 && (
                <section>
                    <h2 className="text-2xl font-bold mb-4">New Arrivals</h2>
                    <ProductCarousel products={topDeals} />
                </section>
            )}
        </div>

      </main>
      <FloatingCart />
    </div>
  );
}
