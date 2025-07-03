import { MainLayout } from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { DataService } from '@/services/dataService';
import { HomeCarousel } from '@/components/home-carousel';
import { bannerImages } from '@/data/bannerImages';

export default async function ContactPage() {
  const categories = await DataService.getCategories();
  return (
    <MainLayout categories={categories}>
      <div className='space-y-8'>
        <HomeCarousel bannerImages={bannerImages} />
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline md:text-5xl text-center text-primary">Contact Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg">
              Get in touch with us through this page. We'd love to hear from you!
            </p>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
