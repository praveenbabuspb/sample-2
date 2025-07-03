'use client';

import * as React from 'react';
import Link from 'next/link';
import { Store, Star, ChevronRight } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { DataService } from '@/services/dataService';
import type { Shop } from '@/data/shops';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

interface ShopsMenuProps {
  categoryName: string;
}

export function ShopsMenu({ categoryName }: ShopsMenuProps) {
  const [shops, setShops] = React.useState<Shop[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [isOpen, setIsOpen] = React.useState(false);

  React.useEffect(() => {
    let isMounted = true;
    if (isOpen) {
      setLoading(true);
      DataService.getShopsByCategory(categoryName).then(fetchedShops => {
        if (isMounted) {
          setShops(fetchedShops);
          setLoading(false);
        }
      });
    }
    return () => { isMounted = false; };
  }, [isOpen, categoryName]);

  const Icon = Store;
  const isActive = isOpen;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <button
          className={cn(
            "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors",
            "text-foreground/80 hover:text-primary",
            isActive && "text-primary",
          )}
          aria-current={isActive ? "page" : undefined}
        >
          <div className="md:hidden">
            <Icon size={18} strokeWidth={2.5} />
          </div>
          <span className="hidden md:inline">Shops</span>

          {isActive && (
            <motion.div
              layoutId="lamp"
              className="absolute inset-0 w-full bg-muted rounded-full -z-10"
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
            >
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
              </div>
            </motion.div>
          )}
        </button>
      </PopoverTrigger>
      <PopoverContent 
        className="w-72 p-3 mb-2 bg-background/60 border backdrop-blur-xl rounded-2xl shadow-lg"
        sideOffset={12}
        align="center"
      >
        <h3 className="text-md font-semibold px-2 pb-2 text-foreground">
          Shops in {categoryName}
        </h3>
        <ScrollArea className="h-80">
          <div className="space-y-1.5 pr-2">
            {loading ? (
              Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl">
                  <Skeleton className="w-10 h-10 rounded-lg" />
                  <div className="flex-1 space-y-1.5">
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </div>
                </div>
              ))
            ) : shops.length > 0 ? (
              shops.map((shop) => (
                <Link
                  key={shop.id}
                  href={`/shop/${encodeURIComponent(shop.name)}`}
                  className="block rounded-xl p-3 text-sm transition-colors hover:bg-black/5 dark:hover:bg-white/10"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center gap-3">
                    <div className="text-2xl bg-muted flex items-center justify-center w-10 h-10 rounded-lg shrink-0">{shop.image}</div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-foreground truncate">{shop.name}</p>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-0.5">
                        <div className="flex items-center gap-0.5">
                          <Star className="w-3 h-3 text-yellow-500 fill-current" />
                          <span>{shop.rating}</span>
                        </div>
                        <span>•</span>
                        <span className="truncate">{shop.deliveryTime}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                  </div>
                </Link>
              ))
            ) : (
              <p className="p-3 text-sm text-muted-foreground">No shops found.</p>
            )}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
