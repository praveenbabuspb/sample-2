"use client";

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { getIcon } from '@/lib/iconMapper';
import { cn } from '@/lib/utils';
import type { NavItem as CategoryNavItem } from '@/data/categories';

interface CategoryNavBarProps {
  categories: CategoryNavItem[];
}

export function CategoryNavBar({ categories }: CategoryNavBarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-[80px] z-30 w-full border-b bg-background/95 backdrop-blur-sm">
      <div className="container px-4">
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4">
            {categories.map((category, index) => {
              const Icon = getIcon(category.icon);
              const href = `/shops/${encodeURIComponent(category.name)}`;
              const isActive = pathname === href;

              return (
                <CarouselItem key={index} className="basis-auto pl-4">
                  <Link
                    href={href}
                    className={cn(
                      'relative flex items-center gap-2 pb-3 pt-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
                      isActive && 'text-primary'
                    )}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <span className="shrink-0">{category.name}</span>
                    {isActive && (
                      <motion.div
                        layoutId="category-underline"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                      />
                    )}
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="absolute -left-4 top-1/2 -translate-y-1/2 hidden h-8 w-8 md:flex" />
          <CarouselNext className="absolute -right-4 top-1/2 -translate-y-1/2 hidden h-8 w-8 md:flex" />
        </Carousel>
      </div>
    </div>
  );
}
