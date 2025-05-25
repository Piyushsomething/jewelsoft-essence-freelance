import { Link } from "react-router-dom";

const categories = [
  {
    id: "rings",
    name: "Rings",
    image: "/images/products/rings/ring-4.jpeg",
    description: "Exquisite rings for every occasion",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: "images/products/necklaces/necklace-5.png",
    description: "Stunning necklaces that make a statement",
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "/images/products/earrings/ear-1.jpeg",
    description: "Beautiful earrings for everyday elegance",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "/images/products/bracelets/sb-3.jpeg",
    description: "Handcrafted bracelets that captivate",
  },
  {
    id: "stones",
    name: "Stones",
    image: "/images/products/stones/stone-6.jpeg",
    description: "Healing crystals and precious stones",
  },
];

const CategoryHighlight = () => {
  return (
    <section className="py-16 md:py-24 bg-light dark:bg-dark">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Explore Our Collections
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of handcrafted jewelry, each piece telling a unique story of craftsmanship and elegance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {categories.map((category) => (
            <Link 
              key={category.id}
              to={`/products?category=${category.id}`}
              className="group"
            >
              <div className="relative overflow-hidden rounded-md hover-shine bg-card aspect-[3/4]">
                <img
                  src={category.image}
                  alt={category.name}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-3 text-center">
                <h3 className="font-semibold text-lg">{category.name}</h3>
                <p className="text-muted-foreground">{category.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlight;