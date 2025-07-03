
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

import { Card, CardContent } from '@/components/ui/card';

const mainPromo = {
  imgSrc: "https://placehold.co/400x250.png",
  dataAiHint: "shopping deals",
  title: "Mega Deals",
  description: "Unbeatable prices on all your favorite items.",
  href: "/shops/Supermarket"
};

const categoryPromos = [
  {
    href: '/shops/Electronics',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'electronics gadget',
    alt: 'Electronics'
  },
  {
    href: '/shops/Fruits%20&%20Vegetables',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'fresh fruits',
    alt: 'Fruits & Veg'
  },
  {
    href: '/shops/Gifts',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'gift box',
    alt: 'Gifts'
  },
  {
    href: '/shops/Meat',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'meat steak',
    alt: 'Meat'
  },
  {
    href: '/shops/Pharmacy',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'pills pharmacy',
    alt: 'Pharmacy'
  },
  {
    href: '/shops/Stationary',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'office stationery',
    alt: 'Stationary'
  },
  {
    href: '/shops/Supermarket',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'supermarket aisle',
    alt: 'Supermarket'
  },
  {
    href: '/shops/Electronics',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'laptop computer',
    alt: 'Laptops'
  },
  {
    href: '/shops/Gifts',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'birthday cake',
    alt: 'Birthdays'
  },
  {
    href: '/shops/Meat',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'fresh fish',
    alt: 'Seafood'
  },
  {
    href: '/shops/Pharmacy',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'vitamins supplements',
    alt: 'Vitamins'
  },
  {
    href: '/shops/Supermarket',
    imgSrc: 'https://placehold.co/150x150.png',
    dataAiHint: 'cold drinks',
    alt: 'Beverages'
  },
];

export function PromoSection() {
  const [showAll, setShowAll] = useState(false);
  const isMobile = useIsMobile();

  const promosToShow = isMobile && !showAll ? categoryPromos.slice(0, 5) : categoryPromos;
  const showMoreButton = isMobile && !showAll && categoryPromos.length > 5;

  return (
    <Card className="w-full bg-gradient-to-br from-gray-800 to-gray-900 text-white overflow-hidden">
      <CardContent className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="w-full md:w-1/3 shrink-0">
            <Link href={mainPromo.href}>
              <div className="flex flex-col h-full bg-white/15 backdrop-blur-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
                <div className="relative w-full h-48">
                    <Image
                      src={mainPromo.imgSrc}
                      alt={mainPromo.title}
                      fill
                      className="object-cover"
                      data-ai-hint={mainPromo.dataAiHint}
                    />
                </div>
                <div className='p-4'>
                    <h3 className="text-xl font-bold text-white">{mainPromo.title}</h3>
                    <p className="text-sm text-gray-200 mt-1">{mainPromo.description}</p>
                </div>
              </div>
            </Link>
          </div>
          <div className="w-full md:w-2/3">
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-x-4 gap-y-6">
              {promosToShow.map((promo, index) => (
                <Link href={promo.href} key={index} className="group flex flex-col items-center text-center gap-2">
                  <div className="aspect-square w-full relative rounded-full overflow-hidden transition-transform group-hover:scale-105 border-2 border-transparent group-hover:border-primary">
                    <Image
                      src={promo.imgSrc}
                      alt={promo.alt}
                      fill
                      className="object-cover"
                      data-ai-hint={promo.dataAiHint}
                    />
                  </div>
                   <span className="text-xs sm:text-sm font-medium text-gray-100 group-hover:text-white">{promo.alt}</span>
                </Link>
              ))}
              {showMoreButton && (
                 <button
                  onClick={() => setShowAll(true)}
                  className="group flex flex-col items-center text-center gap-2"
                >
                  <div className="aspect-square w-full relative rounded-full overflow-hidden transition-transform group-hover:scale-105 border-2 border-transparent group-hover:border-primary bg-white/10 flex items-center justify-center">
                    <MoreHorizontal className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-100 group-hover:text-white">More</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
