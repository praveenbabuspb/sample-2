
"use client";

import Link from 'next/link';
import Image from 'next/image';
import Autoplay from 'embla-carousel-autoplay';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface BannerImage {
  src: string;
  alt: string;
  href: string;
  dataAiHint: string;
}

interface HomeCarouselProps {
  bannerImages: BannerImage[];
}

export function HomeCarousel({ bannerImages }: HomeCarouselProps) {
  return (
    <Carousel
      className="w-full max-w-5xl mx-auto"
      plugins={[
        Autoplay({
          delay: 5000,
          stopOnInteraction: true,
        }),
      ]}
      opts={{
        loop: true,
      }}
    >
      <CarouselContent>
        {bannerImages.map((banner, index) => (
          <CarouselItem key={index}>
            <Link href={banner.href}>
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="relative aspect-[4/1] w-full">
                    <Image
                      src={banner.src}
                      alt={banner.alt}
                      fill
                      className="object-cover"
                      data-ai-hint={banner.dataAiHint}
                    />
                  </div>
                </CardContent>
              </Card>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2" />
      <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2" />
    </Carousel>
  );
}
