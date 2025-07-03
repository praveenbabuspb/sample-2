
"use client";

import { Home, User, Mail } from 'lucide-react';
import { NavBar, type NavItem } from '@/components/navbar';
import { FloatingCart } from './floating-cart';
import { getIcon } from '@/lib/iconMapper';
import { Header } from './header';
import { CategoryNavBar } from './category-navbar';
import type { NavItem as CategoryData } from '@/data/categories';
import * as React from 'react';
import { usePathname } from 'next/navigation';
import { ShopsMenu } from './shops-menu';
import { DataService } from '@/services/dataService';


const defaultNavItems: NavItem[] = [
  { name: 'Home', url: '/', icon: Home },
  { name: 'About', url: '/about', icon: User },
  { name: 'Contact', url: '/contact', icon: Mail },
];

interface NavItemFromProp {
  name: string;
  url: string;
  iconName: string;
}

export function MainLayout({ children, navItems: navItemsFromProp, categories }: { 
  children: React.ReactNode; 
  navItems?: NavItemFromProp[];
  categories?: CategoryData[]
 }) {
  
  const pathname = usePathname();
  const [contextualNavItems, setContextualNavItems] = React.useState<(NavItem | React.ReactNode)[] | null>(null);

  React.useEffect(() => {
    let isMounted = true;
    const resolveNavItems = async () => {
        const categoryPageMatch = pathname.match(/^\/shops\/([^\/]+)$/);
        if (categoryPageMatch) {
            const categoryName = decodeURIComponent(categoryPageMatch[1]);
            if (isMounted) {
                setContextualNavItems([
                    defaultNavItems[0],
                    <ShopsMenu key="shops-menu" categoryName={categoryName} />,
                ]);
            }
            return;
        }

        const shopPageMatch = pathname.match(/^\/shop\/([^\/]+)$/);
        if (shopPageMatch) {
            const shopName = decodeURIComponent(shopPageMatch[1]);
            const shop = await DataService.getShopByName(shopName);
            if (shop && isMounted) {
                setContextualNavItems([
                    defaultNavItems[0],
                    <ShopsMenu key="shops-menu" categoryName={shop.category} />,
                ]);
            } else if (isMounted) {
                setContextualNavItems(defaultNavItems);
            }
            return;
        }

        if (isMounted) {
            setContextualNavItems(null); // Use props or default
        }
    }
    resolveNavItems();
    return () => { isMounted = false; }
  }, [pathname, defaultNavItems]);

  const navItems = contextualNavItems 
    ? contextualNavItems 
    : (navItemsFromProp 
        ? navItemsFromProp.map(item => ({
            name: item.name,
            url: item.url,
            icon: getIcon(item.iconName),
        }))
        : defaultNavItems
      );
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      {categories && <CategoryNavBar categories={categories} />}
      <NavBar items={navItems} />
      <main className="flex-grow container mx-auto px-4 pt-4 pb-24">
        {children}
      </main>
      <FloatingCart />
    </div>
  );
}
