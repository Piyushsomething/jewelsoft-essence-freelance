
import { getFeaturedProducts } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 md:py-24">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              Featured Collection
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Our most popular and sought-after pieces, showcasing the finest craftsmanship and design.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-gold text-darkText hover:bg-gold/90">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        <ProductGrid products={featuredProducts} />
      </div>
    </section>
  );
};

export default FeaturedProducts;
