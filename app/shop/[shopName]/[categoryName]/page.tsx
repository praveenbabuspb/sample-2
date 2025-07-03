

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Minus, Plus, Trash2 } from 'lucide-react';
import { DataService } from '@/services/dataService';
import type { Product } from '@/data/products';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { notFound } from 'next/navigation';
import { FloatingCart } from '@/components/floating-cart';

const NewProductCard = ({ product }: { product: Product }) => {
    const { carts, addItem, updateQuantity } = useCartStore();
    const itemInCart = carts[product.shopName]?.items.find((item) => item.id === product.id);
    const quantity = itemInCart ? itemInCart.quantity : 0;
    
    const originalPrice = (product.price * 1.25).toFixed(2);
    const discount = Math.round((1 - product.price / parseFloat(originalPrice)) * 100);

    const AddToCartButton = () => (
        quantity > 0 ? (
            <div className="flex items-center border rounded-md justify-between w-full md:w-auto">
                <Button variant="ghost" size="icon" onClick={() => updateQuantity(product.id, product.shopName, quantity - 1)} className="h-8 w-8 rounded-r-none text-destructive hover:bg-destructive/10 flex-1 md:flex-none">
                    {quantity === 1 ? <Trash2 className="h-4 w-4" /> : <Minus className="h-4 w-4" />}
                </Button>
                <span className="px-2 text-center font-bold text-xs">{quantity}</span>
                <Button variant="ghost" size="icon" onClick={() => addItem(product)} className="h-8 w-8 rounded-l-none text-primary hover:bg-primary/10 flex-1 md:flex-none">
                    <Plus className="h-4 w-4" />
                </Button>
            </div>
        ) : (
            <Button
                onClick={() => addItem(product)}
                disabled={!product.inStock}
                className="h-8 rounded-md flex justify-center font-semibold items-center relative text-sm py-1.5 px-3 gap-0.5 bg-primary/10 border border-primary text-primary hover:bg-primary/20 w-full md:w-auto"
            >
                ADD
            </Button>
        )
    );

    return (
        <div className="relative flex h-full flex-col items-start border rounded-lg shadow-sm bg-card cursor-pointer hover:shadow-md transition-shadow group">
          <div className="relative w-full overflow-hidden rounded-t-lg">
            <div className="overflow-hidden flex flex-col w-full h-full aspect-square">
              <Image className="h-full w-full object-cover transition-transform group-hover:scale-105" width="270" height="270" src={product.image} alt={product.name} data-ai-hint={product.dataAiHint} />
            </div>
          </div>
          
          <div className="w-full p-2.5 flex-grow flex flex-col justify-between">
              {/* Top section */}
              <div>
                  <div className="flex w-full flex-wrap gap-1 mb-1.5">
                      <div className="bg-muted px-1 py-0.5 rounded-md">
                          <div className="flex items-center gap-0.5">
                          <div className="w-2.5">
                              <div className="overflow-hidden flex flex-col w-full h-full aspect-square">
                              <Image className="h-full w-full" width="10" height="10" src="https://placehold.co/10x10.png" alt="delivery time" data-ai-hint="clock" />
                              </div>
                          </div>
                          <div className="text-[10px] font-bold uppercase text-foreground">
                              15 mins
                          </div>
                          </div>
                      </div>
                  </div>
                  <div className="text-sm font-semibold line-clamp-2 text-foreground h-10">
                      {product.name}
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">{product.unit}</span>
              </div>

              {/* Bottom section */}
              <div className="w-full mt-4 flex flex-col md:flex-row md:items-end md:justify-between gap-2">
                  <div>
                      <div className="flex items-baseline gap-1.5">
                          <span className="text-base font-bold text-foreground">${product.price.toFixed(2)}</span>
                          <span className="text-xs line-through text-muted-foreground">${originalPrice}</span>
                      </div>
                       {discount > 0 && (
                          <span className="text-xs font-semibold text-green-600">
                          {discount}% OFF
                          </span>
                      )}
                  </div>
                  <AddToCartButton />
              </div>
          </div>
        </div>
    );
};

const CategoryNavigation = ({ categories, activeCategory, onCategoryClick }: { categories: string[], activeCategory: string | null, onCategoryClick: (category: string) => void }) => {
    return (
      <nav className="w-24 md:w-28 bg-card flex-shrink-0 overflow-y-auto border-r">
        <div className="flex flex-col items-center p-1">
          {categories.map((category) => (
            <div
              key={category}
              className="py-2 w-full cursor-pointer"
              onClick={() => onCategoryClick(category)}
            >
              <div className="relative flex flex-col items-center justify-center gap-1">
                <div className="relative h-16 w-16 overflow-hidden rounded-lg">
                  <div className="flex h-full items-center justify-center rounded-md bg-muted">
                    <div className={cn(
                        "transition-all duration-300 ease-in-out absolute h-20 w-16",
                        activeCategory === category ? 'bottom-[-8px] scale-110' : 'bottom-[-20px]'
                    )}>
                      <Image
                        src="https://placehold.co/90x90.png"
                        alt={category}
                        width={64}
                        height={80}
                        className="h-full w-full object-contain"
                        data-ai-hint="product category"
                      />
                    </div>
                  </div>
                </div>
                <div className={cn(
                    "text-xs text-center w-full break-words px-1 h-8 flex items-center justify-center",
                    activeCategory === category ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'
                )}>
                  {category}
                </div>
                {activeCategory === category && <div className="absolute right-0 top-0 h-full w-1 rounded-l-lg bg-primary"></div>}
              </div>
            </div>
          ))}
        </div>
      </nav>
    );
};

const ProductGrid = ({ products }: { products: Product[] }) => {
  if (products.length === 0) {
    return <p className="col-span-full text-center text-muted-foreground py-10 w-full">No products found in this sub-category.</p>;
  }
  return (
    <div className="flex-1 overflow-y-auto bg-muted/30 p-2">
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
        {products.map((product) => (
          <NewProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};


export default function CategoryPage({ params }: { params: { shopName: string; categoryName: string } }) {
  const decodedShopName = decodeURIComponent(params.shopName);
  const decodedCategoryName = decodeURIComponent(params.categoryName);

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [activeSubCategory, setActiveSubCategory] = useState<string | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const fetchedProducts = await DataService.getProducts(decodedShopName, decodedCategoryName);
        if (!fetchedProducts || fetchedProducts.length === 0) {
            setAllProducts([]);
            setSubCategories([]);
            setFilteredProducts([]);
        } else {
            setAllProducts(fetchedProducts);

            const uniqueSubCategories = [...new Set(fetchedProducts.map(p => p.category))];
            setSubCategories(uniqueSubCategories);

            if (uniqueSubCategories.length > 0) {
              const firstSubCategory = uniqueSubCategories[0];
              setActiveSubCategory(firstSubCategory);
              setFilteredProducts(fetchedProducts.filter(p => p.category === firstSubCategory));
            } else {
              setFilteredProducts(fetchedProducts);
            }
        }
      } catch (error) {
        console.error("Failed to fetch category data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();
  }, [decodedShopName, decodedCategoryName]);

  useEffect(() => {
    if (activeSubCategory) {
      setFilteredProducts(allProducts.filter(p => p.category === activeSubCategory));
    } else {
      setFilteredProducts(allProducts);
    }
  }, [activeSubCategory, allProducts]);

  const handleSubCategoryClick = (subCategoryName: string) => {
    setActiveSubCategory(subCategoryName);
  };

  if (loading) {
    return (
        <div className="bg-background min-h-screen">
            <main className="container mx-auto py-8 px-0 sm:px-2 md:px-4">
                <div className="px-4 sm:px-0">
                  <Skeleton className="h-6 w-1/4 mb-4" />
                  <Skeleton className="h-10 w-1/2 mb-8" />
                </div>
                
                <Card className="flex rounded-none sm:rounded-lg overflow-hidden h-[70vh] md:h-[calc(1.5*24rem)] lg:h-[calc(2*24rem)]">
                  <div className="w-24 md:w-28 border-r p-1">
                    <div className="space-y-4">
                      {Array.from({ length: 7 }).map((_, i) => (
                        <div key={i} className="flex flex-col items-center gap-2 py-2">
                          <Skeleton className="h-16 w-16 rounded-lg" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex-1 p-2 bg-muted/30">
                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                          {Array.from({ length: 18 }).map((_, i) => (
                              <div key={i} className="space-y-3 p-2.5 border rounded-lg bg-card h-full">
                                <Skeleton className="aspect-square w-full rounded-lg" />
                                <Skeleton className="h-4 w-3/4" />
                                <Skeleton className="h-4 w-1/4" />
                                <Skeleton className="h-10 w-full" />
                              </div>
                          ))}
                      </div>
                  </div>
                </Card>
            </main>
            <FloatingCart />
        </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <main className="container mx-auto py-8 px-0 sm:px-2 md:px-4">
        <div className="px-4 sm:px-0">
          <div className="mb-4">
            <Link href={`/shop/${params.shopName}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
              <ArrowLeft size={16} />
              <span>Back to {decodedShopName}</span>
            </Link>
          </div>

          <div className="mb-8">
              <h1 className="text-4xl font-bold">{decodedCategoryName}</h1>
              <p className="text-muted-foreground mt-1">Browse products in {decodedCategoryName} from {decodedShopName}</p>
          </div>
        </div>
        
        <Card className="flex rounded-none sm:rounded-lg overflow-hidden h-[70vh] md:h-[calc(1.5*24rem)] lg:h-[calc(2*24rem)]">
            <CategoryNavigation categories={subCategories} activeCategory={activeSubCategory} onCategoryClick={handleSubCategoryClick} />
            <ProductGrid products={filteredProducts} />
        </Card>
      </main>
      <FloatingCart />
    </div>
  );
}
