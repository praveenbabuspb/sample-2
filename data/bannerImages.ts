export interface BannerImage {
  src: string;
  alt: string;
  href: string;
  dataAiHint: string;
}

export const bannerImages: BannerImage[] = [
  {
    src: 'https://placehold.co/1200x300.png',
    alt: 'Special offer on groceries',
    href: '/shops/Supermarket',
    dataAiHint: 'supermarket groceries',
  },
  {
    src: 'https://placehold.co/1200x300.png',
    alt: 'Fresh meat delivery',
    href: '/shops/Meat',
    dataAiHint: 'fresh meat',
  },
  {
    src: 'https://placehold.co/1200x300.png',
    alt: 'Latest electronics on sale',
    href: '/shops/Electronics',
    dataAiHint: 'electronics sale',
  },
];
