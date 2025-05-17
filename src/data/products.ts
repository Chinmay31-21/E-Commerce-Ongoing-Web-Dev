import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Premium Leather Wallet',
    description: 'Handcrafted from genuine Italian leather, this wallet combines elegance with practicality. Features 8 card slots, 2 currency compartments, and RFID protection.',
    price: 89.99,
    compareAtPrice: 120.00,
    images: [
      'https://images.pexels.com/photos/2079247/pexels-photo-2079247.jpeg',
      'https://images.pexels.com/photos/5947586/pexels-photo-5947586.jpeg',
    ],
    category: 'accessories',
    tags: ['leather', 'wallet', 'premium', 'gift'],
    featured: true,
    sourceType: 'own',
    stock: 15,
    rating: 4.8,
    reviewCount: 124,
    createdAt: '2023-05-12T10:30:00Z',
  },
  {
    id: '2',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in rich, clear sound with these premium wireless headphones. Featuring advanced noise-cancellation technology, 30-hour battery life, and plush memory foam ear cushions for all-day comfort.',
    price: 249.99,
    compareAtPrice: 299.99,
    images: [
      'https://images.pexels.com/photos/577769/pexels-photo-577769.jpeg',
      'https://images.pexels.com/photos/3394666/pexels-photo-3394666.jpeg',
    ],
    category: 'electronics',
    tags: ['headphones', 'wireless', 'audio', 'premium'],
    featured: true,
    sourceType: 'affiliate',
    affiliateLink: 'https://amazon.com/headphones',
    rating: 4.7,
    reviewCount: 256,
    createdAt: '2023-06-15T14:45:00Z',
  },
  {
    id: '3',
    name: 'Minimalist Desk Lamp',
    description: 'This elegant desk lamp combines form and function with its sleek design and adjustable brightness. Perfect for your home office or bedside table.',
    price: 59.99,
    compareAtPrice: 79.99,
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg',
      'https://images.pexels.com/photos/6492397/pexels-photo-6492397.jpeg',
    ],
    category: 'home-decor',
    tags: ['lamp', 'desk', 'office', 'lighting'],
    featured: false,
    sourceType: 'dropship',
    stock: 42,
    rating: 4.5,
    reviewCount: 87,
    createdAt: '2023-07-20T09:15:00Z',
  },
  {
    id: '4',
    name: 'Organic Cotton Bath Towel Set',
    description: 'Experience luxury with our 100% organic cotton towel set. Each set includes 2 bath towels, 2 hand towels, and 2 washcloths. These plush, absorbent towels are gentle on your skin and the environment.',
    price: 79.99,
    compareAtPrice: 99.99,
    images: [
      'https://images.pexels.com/photos/4210338/pexels-photo-4210338.jpeg',
      'https://images.pexels.com/photos/3771110/pexels-photo-3771110.jpeg',
    ],
    category: 'bath',
    tags: ['towels', 'organic', 'bathroom', 'cotton'],
    featured: true,
    sourceType: 'own',
    stock: 28,
    rating: 4.9,
    reviewCount: 102,
    createdAt: '2023-08-05T16:20:00Z',
  },
  {
    id: '5',
    name: 'Stainless Steel Water Bottle',
    description: 'Keep your drinks cold for 24 hours or hot for 12 with this vacuum-insulated stainless steel water bottle. Features a leak-proof lid and a sleek, durable design.',
    price: 34.99,
    compareAtPrice: 44.99,
    images: [
      'https://images.pexels.com/photos/4210864/pexels-photo-4210864.jpeg',
      'https://images.pexels.com/photos/13323027/pexels-photo-13323027.jpeg',
    ],
    category: 'kitchen',
    tags: ['water bottle', 'stainless steel', 'insulated', 'eco-friendly'],
    featured: false,
    sourceType: 'dropship',
    stock: 65,
    rating: 4.6,
    reviewCount: 178,
    createdAt: '2023-09-10T11:30:00Z',
  },
  {
    id: '6',
    name: 'Smart Indoor Garden',
    description: 'Grow fresh herbs and vegetables all year round with this sleek smart garden. The self-watering system and LED grow lights make gardening effortless, even for beginners.',
    price: 129.99,
    compareAtPrice: 159.99,
    images: [
      'https://images.pexels.com/photos/6969268/pexels-photo-6969268.jpeg',
      'https://images.pexels.com/photos/6969734/pexels-photo-6969734.jpeg',
    ],
    category: 'home-garden',
    tags: ['garden', 'smart', 'herbs', 'indoor'],
    featured: true,
    sourceType: 'affiliate',
    affiliateLink: 'https://amazon.com/smart-garden',
    rating: 4.4,
    reviewCount: 91,
    createdAt: '2023-10-15T13:45:00Z',
  },
  {
    id: '7',
    name: 'Handwoven Wool Throw Blanket',
    description: 'Add warmth and texture to your space with this luxurious handwoven throw blanket. Made from 100% Merino wool, this blanket is soft, breathable, and naturally temperature-regulating.',
    price: 119.99,
    compareAtPrice: 149.99,
    images: [
      'https://images.pexels.com/photos/6032280/pexels-photo-6032280.jpeg',
      'https://images.pexels.com/photos/8989497/pexels-photo-8989497.jpeg',
    ],
    category: 'home-decor',
    tags: ['blanket', 'wool', 'throw', 'handmade'],
    featured: false,
    sourceType: 'own',
    stock: 12,
    rating: 4.9,
    reviewCount: 64,
    createdAt: '2023-11-20T15:10:00Z',
  },
  {
    id: '8',
    name: 'Artisan Coffee Sampler',
    description: 'Explore the world of premium coffee with our artisan sampler pack. Includes four 4oz bags of single-origin beans from Ethiopia, Colombia, Guatemala, and Sumatra. Each batch is freshly roasted and shipped within 24 hours.',
    price: 45.99,
    compareAtPrice: 59.99,
    images: [
      'https://images.pexels.com/photos/7262868/pexels-photo-7262868.jpeg',
      'https://images.pexels.com/photos/2074122/pexels-photo-2074122.jpeg',
    ],
    category: 'food-beverages',
    tags: ['coffee', 'beans', 'artisan', 'gourmet'],
    featured: true,
    sourceType: 'dropship',
    stock: 30,
    rating: 4.7,
    reviewCount: 118,
    createdAt: '2023-12-05T09:25:00Z',
  },
];

export const getProductById = (id: string): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(product => product.category === category);
};

export const searchProducts = (query: string): Product[] => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product => 
    product.name.toLowerCase().includes(lowercaseQuery) || 
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const filterProducts = (options: {
  category?: string;
  priceRange?: { min: number; max: number };
  sortBy?: 'price-asc' | 'price-desc' | 'newest' | 'popular';
  sourceType?: 'affiliate' | 'dropship' | 'own' | 'all';
}): Product[] => {
  let filtered = [...products];
  
  if (options.category) {
    filtered = filtered.filter(product => product.category === options.category);
  }
  
  if (options.priceRange) {
    filtered = filtered.filter(product => 
      product.price >= options.priceRange!.min && 
      product.price <= options.priceRange!.max
    );
  }
  
  if (options.sourceType && options.sourceType !== 'all') {
    filtered = filtered.filter(product => product.sourceType === options.sourceType);
  }
  
  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
    }
  }
  
  return filtered;
};