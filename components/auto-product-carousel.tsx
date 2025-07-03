
"use client"

import type { Product } from '@/data/products';
import { ProductCard } from './product-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';

interface AutoProductCarouselProps {
  products: Product[];
}

export function AutoProductCarousel({ products }: AutoProductCarouselProps) {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <Carousel
      opts={{
        align: 'start',
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 3000,
          stopOnInteraction: true,
        }),
      ]}
      className="w-full"
    >
      <CarouselContent className="-ml-4">
        {products.map((product) => (
          <CarouselItem key={product.id} className="pl-4 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
            <ProductCard product={product} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden md:flex" />
      <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden md:flex" />
    </Carousel>
  );
}
