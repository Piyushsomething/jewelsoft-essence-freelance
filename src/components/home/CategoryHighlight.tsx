
import { Link } from "react-router-dom";

const categories = [
  {
    id: "rings",
    name: "Rings",
    image: "https://source.unsplash.com/random/600x800/?silver,ring",
    description: "Exquisite rings for every occasion",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: "https://source.unsplash.com/random/600x800/?silver,necklace",
    description: "Stunning necklaces that make a statement",
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "https://source.unsplash.com/random/600x800/?silver,earring",
    description: "Beautiful earrings for everyday elegance",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "https://source.unsplash.com/random/600x800/?silver,bracelet",
    description: "Handcrafted bracelets that captivate",
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h3 className="font-playfair text-2xl font-bold mb-2">{category.name}</h3>
                  <p className="text-white/80 mb-4">{category.description}</p>
                  <span className="inline-block text-gold font-medium group-hover:underline transition-all">
                    Explore Collection
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryHighlight;
