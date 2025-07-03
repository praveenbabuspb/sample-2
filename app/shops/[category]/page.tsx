import Link from 'next/link';
import { MainLayout } from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { DataService } from '@/services/dataService';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { HomeCarousel } from '@/components/home-carousel';
import { bannerImages } from '@/data/bannerImages';

export default async function ShopsPage({ params }: { params: { category: string } }) {
  const categoryName = decodeURIComponent(params.category);
  const shops = await DataService.getShopsByCategory(categoryName);
  const categories = await DataService.getCategories();

  if (!shops || shops.length === 0) {
    notFound();
  }

  return (
    <MainLayout categories={categories}>
      <div className="w-full max-w-6xl mx-auto">
        <div className="space-y-8">
          <div className="md:relative md:flex md:items-center md:justify-center md:h-14">
            <div className="md:absolute md:left-0">
              <Link href="/" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <ArrowLeft size={16} />
                Back to Categories
              </Link>
            </div>
            <div className="text-center mt-4 md:mt-0">
              <h1 className="text-3xl font-headline md:text-4xl text-primary">{categoryName}</h1>
              <p className="text-base mt-1 text-muted-foreground">Select a shop to start your order</p>
            </div>
          </div>
          
          <HomeCarousel bannerImages={bannerImages} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {shops.map((shop) => (
              <Link href={`/shop/${encodeURIComponent(shop.name)}`} key={shop.id}>
                <Card className="overflow-hidden hover:shadow-xl transition-shadow duration-300 h-full flex flex-col group">
                  <CardHeader className="p-0">
                    <div className="bg-muted h-32 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform duration-300">
                      {shop.image}
                    </div>
                  </CardHeader>
                  <CardContent className="p-4 flex-grow">
                    <CardTitle className="text-xl">{shop.name}</CardTitle>
                    <CardDescription className="text-sm mt-1">{shop.description}</CardDescription>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center p-4 pt-0">
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-yellow-500">⭐</span>
                      <span>{shop.rating}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">{shop.deliveryTime}</span>
                  </CardFooter>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
