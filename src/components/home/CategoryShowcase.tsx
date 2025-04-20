// src/components/home/CategoryShowcase.tsx
import { Link } from "react-router-dom";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  slug: string;
}

const categories: Category[] = [
  {
    id: "1",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800&q=80",
    description: "Elegant necklaces for every occasion",
    slug: "necklaces",
  },
  {
    id: "2",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800&q=80",
    description: "Stunning rings crafted with precision",
    slug: "rings",
  },
  {
    id: "3",
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=800&q=80",
    description: "Beautiful earrings to complement your style",
    slug: "earrings",
  },
];

const CategoryShowcase = () => {
  return (
    <section className="py-16 bg-neutral-50 dark:bg-neutral-900">
      <div className="container-custom">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-4">
            Explore Our Collections
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Discover timeless pieces from our carefully curated categories
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, idx) => (
            <ScrollReveal key={category.id} delay={idx * 0.2} direction={idx % 2 === 0 ? "up" : "down"}>
              <Link 
                to={`/products?category=${category.slug}`} 
                className="group block relative h-80 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <h3 className="text-2xl font-playfair font-medium mb-2 group-hover:translate-y-0 translate-y-2 transition-transform duration-300">
                    {category.name}
                  </h3>
                  <p className="text-white/80 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {category.description}
                  </p>
                  <span className="inline-flex items-center text-gold group-hover:translate-x-2 transition-transform duration-300">
                    Shop Now <span className="ml-2">→</span>
                  </span>
                </div>
              </Link>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;