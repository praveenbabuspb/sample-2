
'use client';

import type { ShopCategory } from '@/data/shopCategories';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface ShopCategoryCirclesProps {
  categories: ShopCategory[];
  shopName: string;
}

export function ShopCategoryCircles({ categories, shopName }: ShopCategoryCirclesProps) {
  if (!categories || categories.length === 0) {
    return null;
  }

  const createCategoryLink = (categoryName: string) => {
    return `/shop/${encodeURIComponent(shopName)}/${encodeURIComponent(categoryName)}`; 
  };

  return (
    <section className="py-8">
       <h2 className="text-2xl font-bold mb-6 text-center">Shop by Category</h2>
       <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4 px-4">
          {categories.map((category) => (
            <CarouselItem key={category.name} className="pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 xl:basis-[12%]">
              <Link href={createCategoryLink(category.name)} className="group flex flex-col items-center text-center gap-3">
                  <div className="relative aspect-square w-24 h-24 rounded-full overflow-hidden transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg border-2 border-transparent group-hover:border-primary">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      className="object-cover"
                      data-ai-hint="product category"
                    />
                  </div>
                   <span className="text-sm font-semibold text-foreground group-hover:text-primary transition-colors text-center break-words w-full">{category.name}</span>
                </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute -left-0 top-1/2 -translate-y-1/2 hidden md:flex" />
        <CarouselNext className="absolute -right-0 top-1/2 -translate-y-1/2 hidden md:flex" />
       </Carousel>
    </section>
  );
}
