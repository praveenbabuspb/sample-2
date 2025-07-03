import { DealCard } from "./deal-card";

const dealsData = [
  {
    headerImage: {
      src: 'https://placehold.co/800x340.png',
      alt: 'Electronics Deals',
      dataAiHint: 'electronics sale',
    },
    items: [
      { src: 'https://placehold.co/100x120.png', alt: 'Audio Devices', href: '#', dataAiHint: 'headphones' },
      { src: 'https://placehold.co/100x120.png', alt: 'Home Gadgets', href: '#', dataAiHint: 'smart home' },
      { src: 'https://placehold.co/100x120.png', alt: 'Tech Accessories', href: '#', dataAiHint: 'tech accessories' },
      { src: 'https://placehold.co/100x120.png', alt: 'Charging Needs', href: '#', dataAiHint: 'phone charger' },
      { src: 'https://placehold.co/100x120.png', alt: 'Personal Care Electronics', href: '#', dataAiHint: 'electric razor' },
      { src: 'https://placehold.co/100x120.png', alt: 'Mobiles', href: '#', dataAiHint: 'smartphone' },
    ],
    bgColor: 'bg-black',
    buttonTheme: 'dark' as const,
  },
  {
    headerImage: {
      src: 'https://placehold.co/800x340.png',
      alt: 'Beauty Deals',
      dataAiHint: 'beauty products',
    },
    items: [
      { src: 'https://placehold.co/100x120.png', alt: 'Lipsticks', href: '#', dataAiHint: 'lipstick' },
      { src: 'https://placehold.co/100x120.png', alt: 'Face Creams', href: '#', dataAiHint: 'face cream' },
      { src: 'https://placehold.co/100x120.png', alt: 'Eye Makeup', href: '#', dataAiHint: 'eyeliner mascara' },
      { src: 'https://placehold.co/100x120.png', alt: 'Nail Polish', href: '#', dataAiHint: 'nail polish' },
      { src: 'https://placehold.co/100x120.png', alt: 'Korean Beauty', href: '#', dataAiHint: 'korean skincare' },
      { src: 'https://placehold.co/100x120.png', alt: 'Deals of the day', href: '#', dataAiHint: 'sale discount' },
    ],
    bgColor: 'bg-rose-100',
    buttonTheme: 'light' as const,
  }
];

export function DealsSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-8">
      {dealsData.map((deal, index) => (
        <DealCard key={index} deal={deal} />
      ))}
    </div>
  );
}
