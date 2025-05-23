import { Product } from "@/types/product";

// Product data - only edit this file for product updates
export const products: Product[] = [
    {
      id: "ring-1",
      name: "Royal Elegance Ring",
      description: "This exquisite piece showcases the finest craftsmanship with ethically sourced sterling silver. Each detail is carefully crafted to create a timeless piece of jewelry that will be cherished for generations.",
      price: 1999,
      discountPrice: 2499,
      category: "rings",
      images: [
        "https://images.unsplash.com/photo-1609587312208-cea744558a14?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1608632298798-41a075f33a86?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1608632298798-41a075f33a86?ixlib=rb-4.0.3&w=500&q=60",
      ],
      material: "Sterling Silver",
      inStock: true,
      isNew: true,
      isFeatured: true,
      weight: "3.5g",
      dimensions: "1.2cm x 1.2cm",
      tags: ["silver", "ring", "gemstone"],
      rating: 4.8,
      reviewCount: 45,
      createdAt: "2023-12-15T12:00:00Z"
    },
    {
      id: "necklace-1",
      name: "Cascade Pendant Necklace",
      description: "Inspired by nature's beauty, this stunning necklace combines traditional techniques with modern design. The perfect balance of elegance and contemporary style.",
      price: 3499,
      category: "necklaces",
      images: [
        "https://images.unsplash.com/photo-1526355430414-a67999cb98e8?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Sterling Silver with Gold Plating",
      inStock: true,
      isNew: true,
      isFeatured: true,
      weight: "5.2g",
      dimensions: "45cm length",
      tags: ["silver", "necklace", "pendant"],
      rating: 4.9,
      reviewCount: 32,
      createdAt: "2023-12-10T14:30:00Z"
    },
    {
      id: "earring-1",
      name: "Celestial Drops",
      description: "Handcrafted with meticulous attention to detail, these earrings embody luxury and sophistication. Each curve and facet is designed to catch the light beautifully.",
      price: 1299,
      category: "earrings",
      images: [
        "https://images.unsplash.com/photo-1619259942293-f8664710498f?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1630019852942-f89202989a61?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Pure Silver",
      inStock: true,
      isNew: false,
      isFeatured: true,
      weight: "2.8g pair",
      dimensions: "3cm drop",
      tags: ["silver", "earrings", "dangle"],
      rating: 4.7,
      reviewCount: 28,
      createdAt: "2023-11-25T09:15:00Z"
    },
    {
      id: "bracelet-1",
      name: "Silver Cascade Bracelet",
      description: "This statement piece blends artisanal craftsmanship with bold design. A perfect addition to your jewelry collection that elevates any outfit.",
      price: 1899,
      category: "bracelets",
      images: [
        "https://images.unsplash.com/photo-1635349052244-2c9145c5ef84?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Sterling Silver",
      inStock: true,
      isNew: false,
      isFeatured: true,
      weight: "12g",
      dimensions: "18cm length",
      tags: ["silver", "bracelet", "chain"],
      rating: 4.6,
      reviewCount: 19,
      createdAt: "2023-11-15T11:20:00Z"
    },
    {
      id: "anklet-1",
      name: "Silver Beach Anklet",
      description: "Combining traditional silversmithing with contemporary aesthetics, this anklet represents the perfect harmony between heritage and innovation.",
      price: 899,
      category: "anklets",
      images: [
        "https://source.unsplash.com/random/300x300/?silver,anklet&sig=80",
        "https://source.unsplash.com/random/300x300/?silver,anklet&sig=81"
      ],
      material: "Silver with Pearl",
      inStock: true,
      isNew: true,
      isFeatured: false,
      weight: "4.5g",
      dimensions: "25cm length",
      tags: ["silver", "anklet", "charm"],
      rating: 4.5,
      reviewCount: 12,
      createdAt: "2023-12-05T10:45:00Z"
    },
    {
      id: "pendant-1",
      name: "Celestial Silver Pendant",
      description: "Created with the modern minimalist in mind, this elegant pendant features clean lines and subtle detailing that make a sophisticated statement.",
      price: 1499,
      category: "pendants",
      images: [
        "https://source.unsplash.com/random/300x300/?silver,pendant&sig=100",
        "https://source.unsplash.com/random/300x300/?silver,pendant&sig=101"
      ],
      material: "Sterling Silver with Gemstones",
      inStock: true,
      isNew: true,
      isFeatured: false,
      weight: "3g",
      dimensions: "2.5cm x 1.5cm",
      tags: ["silver", "pendant", "locket"],
      rating: 4.7,
      reviewCount: 23,
      createdAt: "2023-12-12T09:30:00Z"
    },
    {
      id: "ring-2",
      name: "Silver Moon Ring",
      description: "This ring draws inspiration from lunar phases, capturing the mystery and allure of the moon in solid silver with delicate detailing.",
      price: 1299,
      category: "rings",
      images: [
        "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Pure Silver",
      inStock: false,
      isNew: false,
      isFeatured: false,
      weight: "4g",
      dimensions: "1.8cm diameter",
      tags: ["silver", "ring", "plain"],
      rating: 4.4,
      reviewCount: 15,
      createdAt: "2023-10-20T14:45:00Z"
    },
    {
      id: "necklace-2",
      name: "Silver Rain Necklace",
      description: "Delicate silver drops cascade in this beautifully crafted necklace, capturing the essence of raindrops in sterling silver.",
      price: 2799,
      category: "necklaces",
      images: [
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Sterling Silver",
      inStock: true,
      isNew: false,
      isFeatured: true,
      weight: "6.5g",
      dimensions: "42cm length",
      tags: ["silver", "necklace", "chain"],
      rating: 4.9,
      reviewCount: 38,
      createdAt: "2023-09-15T10:30:00Z"
    },
    {
      id: "earring-2",
      name: "Silver Cascade Earrings",
      description: "These stunning earrings feature flowing silver cascades that move gracefully with every turn of your head, catching light beautifully.",
      price: 1599,
      category: "earrings",
      images: [
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1610694955371-d4a3e0ce4b42?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Oxidized Silver",
      inStock: true,
      isNew: false,
      isFeatured: false,
      weight: "3.2g pair",
      dimensions: "4cm drop",
      tags: ["silver", "earrings", "dangle"],
      rating: 4.5,
      reviewCount: 22,
      createdAt: "2023-10-05T16:20:00Z"
    },
    {
      id: "bracelet-2",
      name: "Ocean Link Chain",
      description: "Inspired by ocean waves, this bracelet features interconnected links that mimic the fluid movement of water, crafted in premium sterling silver.",
      price: 2199,
      category: "bracelets",
      images: [
        "https://images.unsplash.com/photo-1573408301828-9219d9e3c843?ixlib=rb-4.0.3&w=500&q=60",
        "https://images.unsplash.com/photo-1626784215021-2e895cd330e9?ixlib=rb-4.0.3&w=500&q=60"
      ],
      material: "Sterling Silver with Gold Plating",
      inStock: true,
      isNew: false,
      isFeatured: false,
      weight: "14g",
      dimensions: "19cm length",
      tags: ["silver", "bracelet", "chain"],
      rating: 4.8,
      reviewCount: 27,
      createdAt: "2023-11-01T13:15:00Z"
    }
  ];