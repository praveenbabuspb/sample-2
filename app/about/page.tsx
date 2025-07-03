'use client';

import { useState, useEffect } from 'react';
import { MainLayout } from '@/components/main-layout';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { DataService } from '@/services/dataService';
import { HomeCarousel } from '@/components/home-carousel';
import { bannerImages } from '@/data/bannerImages';
import { Button } from '@/components/ui/button';
import type { NavItem } from '@/data/categories';

export default function AboutPage() {
  const [categories, setCategories] = useState<NavItem[]>([]);
  const [shouldThrow, setShouldThrow] = useState(false);

  useEffect(() => {
    DataService.getCategories().then(setCategories);
  }, []);

  if (shouldThrow) {
    throw new Error('This is a test to see the error page.');
  }

  return (
    <MainLayout categories={categories}>
      <div className='space-y-8'>
        <HomeCarousel bannerImages={bannerImages} />
        <Card className="w-full max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-3xl font-headline md:text-5xl text-center text-primary">About Us</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-center text-lg">
              This page tells you a little bit about us. We are passionate about creating beautiful and functional user interfaces.
            </p>
          </CardContent>
          <CardFooter className="flex justify-center">
            <Button variant="destructive" onClick={() => setShouldThrow(true)}>
              Test Error Page
            </Button>
          </CardFooter>
        </Card>
      </div>
    </MainLayout>
  )
}
