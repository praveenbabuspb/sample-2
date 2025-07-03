"use client";

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface Deal {
  headerImage: {
    src: string;
    alt: string;
    dataAiHint: string;
  };
  items: {
    src: string;
    alt: string;
    href: string;
    dataAiHint: string;
  }[];
  bgColor: string;
  buttonTheme: 'light' | 'dark';
}

interface DealCardProps {
  deal: Deal;
}

export function DealCard({ deal }: DealCardProps) {
  return (
    <Card className="relative w-full overflow-hidden rounded-xl border-none group aspect-[2.4/1]">
      <Image
        src={deal.headerImage.src}
        alt={deal.headerImage.alt}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-105"
        data-ai-hint={deal.headerImage.dataAiHint}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" aria-hidden="true" />
      
      <div className="relative z-10 flex h-full w-full flex-col justify-end">
        <Carousel
          opts={{
            align: 'start',
            dragFree: true,
          }}
          className="w-full"
        >
          <CarouselContent className="pb-4 -ml-4 pl-4">
            {deal.items.map((item, index) => (
              <CarouselItem key={index} className="basis-auto">
                <Link href={item.href}>
                  <div className="h-[100px] w-[85px] relative transition-transform duration-300 hover:scale-110 hover:-translate-y-2">
                      <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-contain drop-shadow-lg"
                          data-ai-hint={item.dataAiHint}
                      />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious 
            className={cn(
              "absolute left-5 top-1/2 -translate-y-1/2 z-10 h-8 w-8",
              deal.buttonTheme === 'dark' && 'bg-black/50 text-white border-none hover:bg-black/70 hover:text-white',
              deal.buttonTheme === 'light' && 'bg-white/50 text-black border-none hover:bg-white/70 hover:text-black'
            )} 
          />
          <CarouselNext 
            className={cn(
              "absolute right-5 top-1/2 -translate-y-1/2 z-10 h-8 w-8",
              deal.buttonTheme === 'dark' && 'bg-black/50 text-white border-none hover:bg-black/70 hover:text-white',
              deal.buttonTheme === 'light' && 'bg-white/50 text-black border-none hover:bg-white/70 hover:text-black'
            )} 
          />
        </Carousel>
      </div>
    </Card>
  );
}
