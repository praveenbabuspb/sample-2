import {ShopCategory} from '../types';

export const shopCategories: Record<string, ShopCategory[]> = {
  'FreshMart Supermarket': [
    {
      name: 'Grocery',
      url: '/grocery',
      icon: 'shopping-bag',
      image: 'https://placehold.co/150x150.png',
    },
    {
      name: 'Snacks',
      url: '/snacks',
      icon: 'local-cafe',
      image: 'https://placehold.co/150x150.png',
    },
    {
      name: 'Cool Drinks',
      url: '/cooldrinks',
      icon: 'local-drink',
      image: 'https://placehold.co/150x150.png',
    },
  ],
  'Prime Cuts Butchery': [
    {
      name: 'Chicken',
      url: '/chicken',
      icon: 'restaurant',
      image: 'https://placehold.co/150x150.png',
    },
    {
      name: 'Mutton',
      url: '/mutton',
      icon: 'restaurant',
      image: 'https://placehold.co/150x150.png',
    },
  ],
  'TechWorld Electronics': [
    {
      name: 'Smartphones',
      url: '/smartphones',
      icon: 'phone-android',
      image: 'https://placehold.co/150x150.png',
    },
    {
      name: 'Laptops',
      url: '/laptops',
      icon: 'laptop',
      image: 'https://placehold.co/150x150.png',
    },
  ],
};