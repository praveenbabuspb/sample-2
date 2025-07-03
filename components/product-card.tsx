'use client';

import Image from 'next/image';
import { Plus, Minus } from 'lucide-react';

import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { carts, addItem, updateQuantity } = useCartStore();
  const itemInCart = carts[product.shopName]?.items.find((item) => item.id === product.id);
  const quantity = itemInCart ? itemInCart.quantity : 0;

  // Calculate dummy discount
  const originalPrice = product.price * 1.25;
  const discount = Math.round((1 - product.price / originalPrice) * 100);

  return (
    <div className="w-full group">
      <div className="bg-card text-card-foreground rounded-lg overflow-hidden flex flex-col h-full border shadow-sm transition-all duration-300 hover:shadow-lg hover:border-primary/30">
        <div className="relative aspect-square w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            data-ai-hint={product.dataAiHint}
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white text-xs font-semibold uppercase tracking-wider">Out of Stock</span>
            </div>
          )}
        </div>
        <div className="p-3 flex-grow flex flex-col justify-end space-y-2">
          <div>
            <h3 className="text-sm font-semibold leading-tight line-clamp-2 h-10">{product.name}</h3>
            <p className="text-xs text-muted-foreground">{product.unit}</p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-baseline gap-1.5">
                <span className="text-lg font-bold text-foreground">${product.price.toFixed(2)}</span>
                <span className="text-sm line-through text-muted-foreground">${originalPrice.toFixed(2)}</span>
            </div>
            <div className="flex items-center justify-between">
              <div>
                {discount > 0 &&
                  <div className="text-xs font-semibold text-green-600">
                    {discount}% OFF
                  </div>
                }
              </div>
              
              <div className="flex items-center">
                {quantity > 0 ? (
                  <div className="flex items-center border rounded-md">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateQuantity(product.id, product.shopName, quantity - 1)}
                      className="h-8 w-8 rounded-r-none text-destructive hover:bg-destructive/10 hover:text-destructive"
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-sm text-foreground px-2">
                      {quantity}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => addItem(product)}
                      className="h-8 w-8 rounded-l-none text-primary hover:bg-primary/10 hover:text-primary"
                      disabled={!product.inStock}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    onClick={() => addItem(product)}
                    disabled={!product.inStock}
                    variant="outline"
                    size="sm"
                    className="h-8 px-4 font-bold text-primary border-primary/50 hover:bg-primary/5 hover:text-primary"
                  >
                    ADD
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
