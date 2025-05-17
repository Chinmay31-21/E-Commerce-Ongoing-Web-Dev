import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    description: 'Premium electronic devices and accessories',
    image: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg',
    slug: 'electronics',
  },
  {
    id: '2',
    name: 'Home Decor',
    description: 'Elegant decorations for your living space',
    image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg',
    slug: 'home-decor',
  },
  {
    id: '3',
    name: 'Kitchen',
    description: 'Quality kitchenware and culinary tools',
    image: 'https://images.pexels.com/photos/1358900/pexels-photo-1358900.jpeg',
    slug: 'kitchen',
  },
  {
    id: '4',
    name: 'Accessories',
    description: 'Stylish personal accessories and gifts',
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg',
    slug: 'accessories',
  },
  {
    id: '5',
    name: 'Food & Beverages',
    description: 'Gourmet foods and premium drinks',
    image: 'https://images.pexels.com/photos/1435904/pexels-photo-1435904.jpeg',
    slug: 'food-beverages',
  },
  {
    id: '6',
    name: 'Bath',
    description: 'Luxury bath products and accessories',
    image: 'https://images.pexels.com/photos/3960069/pexels-photo-3960069.jpeg',
    slug: 'bath',
  },
  {
    id: '7',
    name: 'Home Garden',
    description: 'Indoor and outdoor gardening essentials',
    image: 'https://images.pexels.com/photos/4503751/pexels-photo-4503751.jpeg',
    slug: 'home-garden',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};