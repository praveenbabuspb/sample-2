
'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCarousel } from './product-carousel';
import type { Product } from '@/data/products';
import type { Shop } from '@/data/shops';

interface ShopSectionProps {
  shop: Shop;
  shopProducts: {
    [categoryName: string]: Product[];
  };
}

export function ShopSection({ shop, shopProducts }: ShopSectionProps) {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 px-1">
        <Link href={`/shop/${encodeURIComponent(shop.name)}`}>
          <h2 className="text-2xl font-bold text-foreground hover:text-primary transition-colors">
            {shop.name}
          </h2>
        </Link>
        <Button asChild variant="link" className="text-primary hover:text-primary/80">
          <Link href={`/shop/${encodeURIComponent(shop.name)}`}>
            See All <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-6">
        {Object.entries(shopProducts || {}).map(([category, products]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-muted-foreground mb-3 px-1">
              {category}
            </h3>
            <ProductCarousel products={(products as Product[]).slice(0, 10)} />
          </div>
        ))}
      </div>
    </div>
  );
}
