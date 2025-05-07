
import { getNewProducts } from "@/data/productData";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const newProducts = getNewProducts();

  return (
    <section className="py-16 md:py-24 bg-light dark:bg-dark">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-center mb-12">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-2">
              New Arrivals
            </h2>
            <p className="text-muted-foreground max-w-xl">
              Be the first to discover our latest jewelry pieces, fresh from our artisan workshops.
            </p>
          </div>
          <Button asChild className="mt-4 md:mt-0 bg-gold text-darkText hover:bg-gold/90">
            <Link to="/products">View All</Link>
          </Button>
        </div>

        <ProductGrid products={newProducts} />
      </div>
    </section>
  );
};

export default NewArrivals;
