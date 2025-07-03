'use client';

import React, { useState } from 'react';
import Image from 'next/image';

const categoriesData = [
    { id: 1, name: 'Local Rice', image: 'https://placehold.co/90x90.png' },
    { id: 2, name: 'Atta', image: 'https://placehold.co/90x90.png' },
    { id: 3, name: 'Rice', image: 'https://placehold.co/90x90.png' },
    { id: 4, name: 'Toor, Urad & Chana', image: 'https://placehold.co/90x90.png' },
    { id: 5, name: 'Besan, Sooji & Maida', image: 'https://placehold.co/90x90.png' },
    { id: 6, name: 'Poha, Daliya & Other Grains', image: 'https://placehold.co/90x90.png' },
    { id: 7, name: 'Millet & Other Flours', image: 'https://placehold.co/90x90.png' },
    { id: 8, name: 'Rajma, Chhole & Others', image: 'https://placehold.co/90x90.png' },
    { id: 9, name: 'Moong & Masoor', image: 'https://placehold.co/90x90.png' },
    { id: 10, name: 'Fresh Atta', image: 'https://placehold.co/90x90.png' },
  ];

const productsData = [
    {
      id: '114825',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'toor dal',
      deliveryTime: '11 mins',
      name: 'Udhaiyam Toor Dal/Toor Dal (Thuvaram Parupu)',
      weight: '500 g',
      price: '77',
      originalPrice: '84',
      options: '2',
    },
    {
      id: '114801',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'urad dal',
      deliveryTime: '11 mins',
      name: 'Udhaiyam Urad Dal (Dhuli) (Ulutham Parupu)',
      weight: '500 g',
      price: '72',
      originalPrice: '83',
      options: '2',
    },
    {
      id: '403799',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'arhar dal',
      deliveryTime: '11 mins',
      name: 'Basic Arhar/ Toor Dal (Thuvaram Parupu)',
      weight: '1 kg',
      price: '131',
      originalPrice: '240',
    },
    {
      id: '39493',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'tata sampann dal',
      deliveryTime: '11 mins',
      name: 'Tata Sampann Unpolished Toor Dal/Toor Dal (Thuvaram Parupu)',
      weight: '1 kg',
      price: '175',
      originalPrice: '224',
      options: '2',
    },
    {
      id: '527583',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'kala chana',
      deliveryTime: '11 mins',
      name: 'Whole Farm Premium Kala Chana/Brown Chana (Kadalai)',
      weight: '500 g',
      price: '61',
      originalPrice: '115',
    },
     {
      id: '527584',
      image: 'https://placehold.co/400x400.png',
      dataAiHint: 'green peas',
      deliveryTime: '11 mins',
      name: 'Fresh Green Peas',
      weight: '500 g',
      price: '45',
      originalPrice: '61',
    },
  ];

const CategoryNavigation = ({ categories, activeCategory, onCategoryClick }: any) => {
    return (
      <nav className="w-28 bg-white flex-shrink-0 overflow-y-auto">
        <div className="flex flex-col items-center">
          {categories.map((category: any) => (
            <div
              key={category.id}
              className="py-2 w-full cursor-pointer"
              onClick={() => onCategoryClick(category.id)}
            >
              <div className="relative flex flex-col items-center justify-center gap-1">
                <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                  <div className="flex h-full items-center justify-center rounded-md bg-muted">
                    <div className={`transition-all duration-300 ease-in-out absolute h-16 w-12 ${activeCategory === category.id ? 'bottom-[-8px] scale-110' : 'bottom-[-20px]'}`}>
                      <Image
                        src={category.image}
                        alt={category.name}
                        width={48}
                        height={64}
                        className="h-full w-full object-contain"
                        data-ai-hint="product category"
                      />
                    </div>
                  </div>
                </div>
                <div className={`text-xs text-center w-full break-words px-1 ${activeCategory === category.id ? 'font-bold text-foreground' : 'font-medium text-muted-foreground'}`}>
                  {category.name}
                </div>
                {activeCategory === category.id && <div className="absolute right-0 top-0 h-full w-1 rounded-l-lg bg-primary"></div>}
              </div>
            </div>
          ))}
        </div>
      </nav>
    );
  };
  
const ProductCard = ({ product }: any) => {
    const discount = product.originalPrice && product.price 
      ? Math.round((1 - parseInt(product.price) / parseInt(product.originalPrice)) * 100) 
      : 0;

    return (
      <div className="p-1.5" style={{ gridColumn: 'span 2' }}>
        <div className="relative flex h-full flex-col items-start gap-0.5 pb-3 border rounded-lg justify-between shadow-sm bg-white cursor-pointer hover:shadow-md transition-shadow">
          <div className="relative w-full overflow-hidden px-2.5 rounded-lg pt-2">
            <div className="overflow-hidden flex flex-col w-full h-full aspect-square rounded-lg">
              <Image className="h-full w-full object-cover transition-opacity opacity-100" width="270" height="270" src={product.image} alt={product.name} data-ai-hint={product.dataAiHint} />
            </div>
          </div>
          <div className="w-full px-3">
            <div className="flex w-full flex-wrap gap-1 mb-2">
              <div className="bg-muted px-1 py-0.5 rounded-md">
                <div className="flex items-center gap-0.5">
                  <div className="w-2.5">
                    <div className="overflow-hidden flex flex-col w-full h-full aspect-square">
                      <Image className="h-full w-full" width="10" height="10" src="https://placehold.co/10x10.png" alt="delivery time" data-ai-hint="clock" />
                    </div>
                  </div>
                  <div className="text-[10px] font-bold uppercase text-foreground">
                    {product.deliveryTime}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full flex-col">
              <div className="mb-2 flex flex-col text-sm" style={{ height: '3.375rem' }}>
                <div className="mb-1.5">
                  <div className="text-sm font-semibold line-clamp-2 text-foreground h-10">
                    {product.name}
                  </div>
                </div>
                <div className="flex items-center">
                  <div className="text-xs font-medium line-clamp-1 text-muted-foreground">
                    {product.weight}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-lg font-bold text-foreground">${product.price}</span>
                    {product.originalPrice && (
                       <span className="text-sm line-through text-muted-foreground">${product.originalPrice}</span>
                    )}
                  </div>
                  {discount > 0 && (
                     <div className="text-xs font-semibold text-green-600 mt-1">
                      {discount}% OFF
                    </div>
                  )}
                </div>
                <button className="rounded-md flex justify-center font-semibold items-center relative text-sm py-2 px-4 gap-0.5 min-w-[66px] bg-primary/10 border border-primary text-primary hover:bg-primary/20" tabIndex={0} role="button">
                  <div>ADD</div>
                  {product.options && (
                    <div className="absolute px-1 bg-green-50 -bottom-1.5">
                      <div className="text-[10px] font-semibold text-muted-foreground">
                        {product.options} options
                      </div>
                    </div>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};
  
const ProductGrid = ({ products }: any) => {
    return (
      <div className="flex-1 overflow-y-auto bg-slate-50">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
          {products.map((product: any) => (
            <ProductCard key={product.id} product={product} />
          ))}
           {products.map((product: any) => (
            <ProductCard key={`${product.id}-2`} product={{...product, id: `${product.id}-2`}} />
          ))}
           {products.map((product: any) => (
            <ProductCard key={`${product.id}-3`} product={{...product, id: `${product.id}-3`}} />
          ))}
        </div>
      </div>
    );
};
  

export const ProductDisplay = () => {
    const [activeCategory, setActiveCategory] = useState(4); // Default to 'Toor, Urad & Chana'
  
    // In a real app, you'd filter products based on activeCategory
    const displayedProducts = productsData;
  
    return (
      <section className="my-8">
        <div className="flex border rounded-lg overflow-hidden" style={{ height: '75vh' }}>
          <CategoryNavigation
            categories={categoriesData}
            activeCategory={activeCategory}
            onCategoryClick={setActiveCategory}
          />
          <ProductGrid products={displayedProducts} />
        </div>
      </section>
    );
};
