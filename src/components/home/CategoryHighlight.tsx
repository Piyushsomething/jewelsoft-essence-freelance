import { Link } from "react-router-dom";

const categories = [
  {
    id: "rings",
    name: "Rings",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Exquisite rings for every occasion",
  },
  {
    id: "necklaces",
    name: "Necklaces",
    image: "https://images.unsplash.com/photo-1589128777073-263566ae5e4d?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Stunning necklaces that make a statement",
  },
  {
    id: "earrings",
    name: "Earrings",
    image: "https://images.unsplash.com/photo-1714733831162-0a6e849141be?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Beautiful earrings for everyday elegance",
  },
  {
    id: "bracelets",
    name: "Bracelets",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80",
    description: "Handcrafted bracelets that captivate",
  },
  {
    id: "stones",
    name: "Stones",
    image: "https://images.unsplash.com/photo-1740819920986-8462590eccdb?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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