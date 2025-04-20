import { getFeaturedProducts } from "@/data/products";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/animated-section";

const FeaturedProducts = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <section className="py-16 bg-light dark:bg-dark">
      <div className="container-custom">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-playfair font-bold text-center mb-4">
            Featured Collection
          </h2>
          <p className="text-center text-muted-foreground mb-10 max-w-2xl mx-auto">
            Discover our carefully selected pieces that represent the epitome of craftsmanship and style.
          </p>
        </AnimatedSection>

        <ProductGrid products={featuredProducts} />

        <AnimatedSection delay={0.4}>
          <div className="text-center mt-10">
            <Button asChild variant="outline" size="lg">
              <Link to="/products">View All Products</Link>
            </Button>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};

export default FeaturedProducts;
