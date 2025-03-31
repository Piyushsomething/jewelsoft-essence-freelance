import { Product, ProductCategory } from "@/types/product";

// Helper function to generate random prices
const generatePrice = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1) + min) * 100;
};

// Helper function to generate a product
const createProduct = (
  id: string,
  name: string,
  category: ProductCategory,
  price: number,
  description: string,
  images: string[],
  material: string,
  inStock = true,
  isNew = false,
  isFeatured = false,
  tags: string[] = []
): Product => {
  return {
    id,
    name,
    category,
    price,
    description,
    images,
    material,
    inStock,
    isNew,
    isFeatured,
    tags,
    rating: Math.floor(Math.random() * 5) + 1,
    reviewCount: Math.floor(Math.random() * 100),
    createdAt: new Date(Date.now() - Math.floor(Math.random() * 10000000000)).toISOString(),
    weight: `${(Math.random() * 10 + 1).toFixed(2)}g`,
    dimensions: `${Math.floor(Math.random() * 5 + 1)}cm x ${Math.floor(Math.random() * 5 + 1)}cm`,
  };
};

// Generate placeholder image URLs
const getImageUrl = (id: number, category: string) => {
  return `/images/${category}/${id}.jpg`;
};

// Create placeholder image URLs for different product types
const ringImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,ring&sig=${i}`
);

const necklaceImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,necklace&sig=${i+20}`
);

const earringImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,earring&sig=${i+40}`
);

const braceletImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,bracelet&sig=${i+60}`
);

const ankletImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,anklet&sig=${i+80}`
);

const pendantImages = Array.from({ length: 12 }, (_, i) => 
  `https://source.unsplash.com/random/300x300/?silver,pendant&sig=${i+100}`
);

// Generate product names
const ringNames = [
  "Royal Elegance Ring", "Silver Moon Ring", "Infinity Band", 
  "Celestial Diamond Ring", "Eternal Promise Ring", "Ocean Wave Ring",
  "Mountain Peak Band", "Desert Rose Ring", "Starlight Silver Ring",
  "Harmony Band", "Echo Silver Ring", "Whisper Thin Band"
];

const necklaceNames = [
  "Cascade Pendant Necklace", "Silver Rain Necklace", "Ocean Waves Chain",
  "Mountain Echo Necklace", "Stardust Silver Chain", "Midnight Moon Necklace",
  "Eternal Locket", "Silver Whispers Chain", "Harmony Pendant",
  "Royal Silver Necklace", "Infinity Silver Chain", "Silver Dreams Necklace"
];

const earringNames = [
  "Celestial Drops", "Silver Cascade Earrings", "Moonlight Studs",
  "Ocean Wave Dangles", "Starlight Silver Hoops", "Mountain Echo Earrings",
  "Silver Whisper Studs", "Royal Dangle Earrings", "Infinity Silver Hoops",
  "Harmony Studs", "Echo Silver Drops", "Eternity Earrings"
];

const braceletNames = [
  "Silver Cascade Bracelet", "Ocean Link Chain", "Mountain Cuff",
  "Starlight Silver Bangle", "Midnight Chain Bracelet", "Eternal Silver Cuff",
  "Royal Charm Bracelet", "Infinity Chain", "Silver Dreams Bangle",
  "Harmony Silver Bracelet", "Echo Chain Link", "Whisper Thin Bangle"
];

const ankletNames = [
  "Silver Beach Anklet", "Ocean Waves Chain", "Summer Silver Anklet",
  "Starlight Foot Chain", "Midnight Silver Anklet", "Cascading Charms Anklet",
  "Royal Silver Foot Chain", "Infinity Anklet", "Silver Dreams Chain",
  "Harmony Foot Jewelry", "Echo Silver Anklet", "Whisper Thin Chain"
];

const pendantNames = [
  "Celestial Silver Pendant", "Ocean Teardrop", "Mountain Silver Charm",
  "Starlight Medallion", "Midnight Moon Pendant", "Eternal Silver Locket",
  "Royal Insignia Pendant", "Infinity Silver Charm", "Silver Dreams Locket",
  "Harmony Medallion", "Echo Silver Pendant", "Whisper Charm"
];

// Materials
const materials = [
  "Sterling Silver", "Silver with Gold Plating", "Pure Silver", 
  "Silver with Gemstones", "Silver with Pearl", "Oxidized Silver"
];

// Product descriptions
const descriptions = [
  "This exquisite piece showcases the finest craftsmanship with ethically sourced materials. Each detail is carefully crafted to create a timeless piece of jewelry that will be cherished for generations.",
  "Inspired by nature's beauty, this stunning piece combines traditional techniques with modern design. The perfect balance of elegance and contemporary style.",
  "Handcrafted with meticulous attention to detail, this piece embodies luxury and sophistication. Each curve and facet is designed to catch the light beautifully.",
  "This statement piece blends artisanal craftsmanship with bold design. A perfect addition to your jewelry collection that elevates any outfit.",
  "Combining traditional silversmithing with contemporary aesthetics, this piece represents the perfect harmony between heritage and innovation.",
  "Created with the modern minimalist in mind, this elegant piece features clean lines and subtle detailing that make a sophisticated statement."
];

// Create products
export const products: Product[] = [
  // Rings
  ...ringNames.map((name, i) => createProduct(
    `ring-${i+1}`,
    name,
    'rings',
    generatePrice(499, 2999),
    descriptions[i % descriptions.length],
    [ringImages[i], ringImages[(i+1) % ringImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1, // 90% in stock
    i < 3, // First 3 are new
    i < 2, // First 2 are featured
    ["silver", "ring", i % 2 === 0 ? "gemstone" : "plain"]
  )),
  
  // Necklaces
  ...necklaceNames.map((name, i) => createProduct(
    `necklace-${i+1}`,
    name,
    'necklaces',
    generatePrice(999, 4999),
    descriptions[i % descriptions.length],
    [necklaceImages[i], necklaceImages[(i+1) % necklaceImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1,
    i < 2,
    i < 3,
    ["silver", "necklace", i % 3 === 0 ? "pendant" : "chain"]
  )),
  
  // Earrings
  ...earringNames.map((name, i) => createProduct(
    `earring-${i+1}`,
    name,
    'earrings',
    generatePrice(399, 1999),
    descriptions[i % descriptions.length],
    [earringImages[i], earringImages[(i+1) % earringImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1,
    i < 2,
    i < 2,
    ["silver", "earrings", i % 2 === 0 ? "stud" : "dangle"]
  )),
  
  // Bracelets
  ...braceletNames.map((name, i) => createProduct(
    `bracelet-${i+1}`,
    name,
    'bracelets',
    generatePrice(699, 2499),
    descriptions[i % descriptions.length],
    [braceletImages[i], braceletImages[(i+1) % braceletImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1,
    i < 2,
    i < 2,
    ["silver", "bracelet", i % 3 === 0 ? "cuff" : "chain"]
  )),
  
  // Anklets
  ...ankletNames.map((name, i) => createProduct(
    `anklet-${i+1}`,
    name,
    'anklets',
    generatePrice(299, 999),
    descriptions[i % descriptions.length],
    [ankletImages[i], ankletImages[(i+1) % ankletImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1,
    i < 1,
    i < 1,
    ["silver", "anklet", i % 2 === 0 ? "charm" : "plain"]
  )),
  
  // Pendants
  ...pendantNames.map((name, i) => createProduct(
    `pendant-${i+1}`,
    name,
    'pendants',
    generatePrice(399, 1499),
    descriptions[i % descriptions.length],
    [pendantImages[i], pendantImages[(i+1) % pendantImages.length]],
    materials[i % materials.length],
    Math.random() > 0.1,
    i < 2,
    i < 2,
    ["silver", "pendant", i % 3 === 0 ? "locket" : "charm"]
  ))
];

// Function to get filtered products
export const getFilteredProducts = (filters: {
  category?: string;
  categories?: ProductCategory[];
  priceRange?: [number, number];
  materials?: string[];
  onlyInStock?: boolean;
  searchQuery?: string;
  sortBy?: "newest" | "price-low-high" | "price-high-low" | "popular";
}) => {
  let filtered = [...products];
  
  // Filter by category or categories
  if (filters.categories && filters.categories.length > 0) {
    filtered = filtered.filter(product => 
      filters.categories!.includes(product.category)
    );
  } else if (filters.category && filters.category !== 'all') {
    filtered = filtered.filter(product => product.category === filters.category);
  }
  
  // Filter by price range
  if (filters.priceRange) {
    const [min, max] = filters.priceRange;
    filtered = filtered.filter(product => product.price >= min && product.price <= max);
  }
  
  // Filter by materials
  if (filters.materials && filters.materials.length > 0) {
    filtered = filtered.filter(product => 
      filters.materials!.some(material => 
        product.material.toLowerCase().includes(material.toLowerCase())
      )
    );
  }
  
  // Filter by in stock
  if (filters.onlyInStock) {
    filtered = filtered.filter(product => product.inStock);
  }
  
  // Filter by search query
  if (filters.searchQuery) {
    const query = filters.searchQuery.toLowerCase();
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(query) || 
      product.description.toLowerCase().includes(query) ||
      product.tags.some(tag => tag.toLowerCase().includes(query))
    );
  }
  
  // Sort products
  if (filters.sortBy) {
    switch (filters.sortBy) {
      case 'price-low-high':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high-low':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'popular':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
    }
  }
  
  return filtered;
};

export const getFeaturedProducts = () => {
  return products.filter(product => product.isFeatured);
};

export const getNewProducts = () => {
  return products.filter(product => product.isNew);
};

export const getRelatedProducts = (productId: string, category: ProductCategory, limit = 4) => {
  return products
    .filter(p => p.id !== productId && p.category === category)
    .sort(() => 0.5 - Math.random())
    .slice(0, limit);
};

export const getProductById = (id: string) => {
  return products.find(product => product.id === id);
};

export const getProductCategories = () => {
  return Array.from(new Set(products.map(product => product.category)));
};

export const getMaterials = () => {
  return Array.from(new Set(products.map(product => product.material)));
};

export const getPriceRange = () => {
  const prices = products.map(product => product.price);
  return [Math.min(...prices), Math.max(...prices)];
};
