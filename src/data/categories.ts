import { Category } from '../types';

export const categories: Category[] = [
  {
    id: '1',
    name: 'Crochet Patterns',
    description: 'Exclusive digital patterns for all skill levels',
    image: 'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
    slug: 'crochet-patterns',
  },
  {
    id: '2',
    name: 'Finished Products',
    description: 'Beautiful handmade crochet items ready to ship',
    image: 'https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg',
    slug: 'finished-products',
  },
  {
    id: '3',
    name: 'Yarn & Supplies',
    description: 'Premium yarns and crochet tools',
    image: 'https://images.pexels.com/photos/6474464/pexels-photo-6474464.jpeg',
    slug: 'yarn-supplies',
  },
  {
    id: '4',
    name: 'Baby Items',
    description: 'Adorable crochet items for little ones',
    image: 'https://images.pexels.com/photos/6474465/pexels-photo-6474465.jpeg',
    slug: 'baby-items',
  },
  {
    id: '5',
    name: 'Home Decor',
    description: 'Crochet decorations for your living space',
    image: 'https://images.pexels.com/photos/6474466/pexels-photo-6474466.jpeg',
    slug: 'home-decor',
  },
  {
    id: '6',
    name: 'Accessories',
    description: 'Stylish crochet bags, hats, and accessories',
    image: 'https://images.pexels.com/photos/6474467/pexels-photo-6474467.jpeg',
    slug: 'accessories',
  },
  {
    id: '7',
    name: 'Seasonal Items',
    description: 'Holiday and seasonal crochet designs',
    image: 'https://images.pexels.com/photos/6474468/pexels-photo-6474468.jpeg',
    slug: 'seasonal-items',
  },
];

export const getCategoryBySlug = (slug: string): Category | undefined => {
  return categories.find(category => category.slug === slug);
};