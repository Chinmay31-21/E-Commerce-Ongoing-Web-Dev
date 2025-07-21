import { Product } from '../types';

export const products: Product[] = [
  {
    id: '1',
    name: 'Vintage Rose Afghan Pattern',
    description: 'A stunning vintage-inspired afghan pattern featuring intricate rose motifs. This intermediate-level pattern includes detailed instructions, stitch diagrams, and color suggestions. Perfect for creating a family heirloom piece.',
    price: 12.99,
    compareAtPrice: 18.99,
    images: [
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
      'https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg',
    ],
    category: 'crochet-patterns',
    tags: ['pattern', 'afghan', 'vintage', 'roses', 'intermediate'],
    featured: true,
    sourceType: 'own',
    stock: 999,
    rating: 4.9,
    reviewCount: 156,
    createdAt: '2024-01-15T10:30:00Z',
  },
  {
    id: '2',
    name: 'Handmade Baby Blanket - Ocean Dreams',
    description: 'Soft and cozy baby blanket crocheted with premium cotton yarn in soothing ocean colors. Features a beautiful wave pattern and measures 36" x 36". Machine washable and perfect for newborns.',
    price: 89.99,
    compareAtPrice: 120.00,
    images: [
      'https://images.pexels.com/photos/6474465/pexels-photo-6474465.jpeg',
      'https://images.pexels.com/photos/6474466/pexels-photo-6474466.jpeg',
    ],
    category: 'baby-items',
    tags: ['baby', 'blanket', 'handmade', 'cotton', 'ocean'],
    featured: true,
    sourceType: 'own',
    stock: 8,
    rating: 4.8,
    reviewCount: 89,
    createdAt: '2024-02-10T14:45:00Z',
  },
  {
    id: '3',
    name: 'Premium Merino Wool Yarn Set',
    description: 'Luxurious merino wool yarn in 12 beautiful colors. Each skein contains 220 yards of DK weight yarn. Perfect for sweaters, blankets, and accessories. Sourced from sustainable farms.',
    price: 156.99,
    compareAtPrice: 189.99,
    images: [
      'https://images.pexels.com/photos/6474464/pexels-photo-6474464.jpeg',
      'https://images.pexels.com/photos/6474463/pexels-photo-6474463.jpeg',
    ],
    category: 'yarn-supplies',
    tags: ['yarn', 'merino', 'wool', 'premium', 'dk-weight'],
    featured: true,
    sourceType: 'own',
    stock: 25,
    rating: 4.9,
    reviewCount: 203,
    createdAt: '2024-01-20T09:15:00Z',
  },
  {
    id: '4',
    name: 'Boho Macrame Wall Hanging',
    description: 'Stunning handcrafted macrame wall hanging with crochet accents. Features natural cotton cord and wooden beads. Measures 24" wide x 36" long. Perfect for modern bohemian home decor.',
    price: 78.99,
    compareAtPrice: 95.99,
    images: [
      'https://images.pexels.com/photos/6474466/pexels-photo-6474466.jpeg',
      'https://images.pexels.com/photos/6474467/pexels-photo-6474467.jpeg',
    ],
    category: 'home-decor',
    tags: ['macrame', 'wall-hanging', 'boho', 'handmade', 'cotton'],
    featured: false,
    sourceType: 'own',
    stock: 12,
    rating: 4.7,
    reviewCount: 67,
    createdAt: '2024-02-05T16:20:00Z',
  },
  {
    id: '5',
    name: 'Crochet Market Bag Pattern Bundle',
    description: 'Collection of 5 eco-friendly market bag patterns in various styles. Includes mesh bags, solid bags, and drawstring designs. All patterns are beginner-friendly with video tutorials included.',
    price: 19.99,
    compareAtPrice: 29.99,
    images: [
      'https://images.pexels.com/photos/6474467/pexels-photo-6474467.jpeg',
      'https://images.pexels.com/photos/6474468/pexels-photo-6474468.jpeg',
    ],
    category: 'crochet-patterns',
    tags: ['pattern', 'market-bag', 'eco-friendly', 'beginner', 'bundle'],
    featured: true,
    sourceType: 'own',
    stock: 999,
    rating: 4.6,
    reviewCount: 124,
    createdAt: '2024-01-25T11:30:00Z',
  },
  {
    id: '6',
    name: 'Ergonomic Crochet Hook Set',
    description: 'Professional 14-piece ergonomic crochet hook set with comfortable grip handles. Includes sizes B-N (2.25mm-10mm) with a beautiful storage case. Reduces hand fatigue during long projects.',
    price: 45.99,
    compareAtPrice: 65.99,
    images: [
      'https://images.pexels.com/photos/6474463/pexels-photo-6474463.jpeg',
      'https://images.pexels.com/photos/6474464/pexels-photo-6474464.jpeg',
    ],
    category: 'yarn-supplies',
    tags: ['hooks', 'ergonomic', 'tools', 'professional', 'set'],
    featured: false,
    sourceType: 'own',
    stock: 34,
    rating: 4.8,
    reviewCount: 178,
    createdAt: '2024-02-15T13:45:00Z',
  },
  {
    id: '7',
    name: 'Chunky Knit Throw Blanket',
    description: 'Luxurious chunky knit throw blanket in cream color. Hand-crocheted with premium acrylic yarn for durability and softness. Measures 50" x 60" and perfect for cozy evenings.',
    price: 129.99,
    compareAtPrice: 159.99,
    images: [
      'https://images.pexels.com/photos/6474472/pexels-photo-6474472.jpeg',
      'https://images.pexels.com/photos/6474471/pexels-photo-6474471.jpeg',
    ],
    category: 'finished-products',
    tags: ['blanket', 'chunky', 'throw', 'handmade', 'cream'],
    featured: true,
    sourceType: 'own',
    stock: 6,
    rating: 4.9,
    reviewCount: 92,
    createdAt: '2024-02-20T15:10:00Z',
  },
  {
    id: '8',
    name: 'Christmas Ornament Pattern Collection',
    description: 'Festive collection of 20 Christmas ornament patterns including snowflakes, angels, trees, and stars. Each pattern includes detailed instructions and suggested color schemes. Perfect for holiday crafting.',
    price: 24.99,
    compareAtPrice: 39.99,
    images: [
      'https://images.pexels.com/photos/6474468/pexels-photo-6474468.jpeg',
      'https://images.pexels.com/photos/6474469/pexels-photo-6474469.jpeg',
    ],
    category: 'seasonal-items',
    tags: ['christmas', 'ornaments', 'patterns', 'holiday', 'collection'],
    featured: false,
    sourceType: 'own',
    stock: 999,
    rating: 4.7,
    reviewCount: 145,
    createdAt: '2024-01-30T09:25:00Z',
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