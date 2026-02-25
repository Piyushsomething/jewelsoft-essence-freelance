import { getFeaturedProducts } from "@/data/productData";
import ProductGrid from "@/components/products/ProductGrid";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { AnimatedSection } from "@/components/ui/animated-section";
import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedProducts } from "@/lib/productService";

const FeaturedProducts = () => {
  const { data: supabaseFeatured } = useQuery({
    queryKey: ['products', 'featured'],
    queryFn: fetchFeaturedProducts,
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });

  // Use Supabase data if available, otherwise fall back to local
  const featuredProducts = supabaseFeatured && supabaseFeatured.length > 0
    ? supabaseFeatured
    : getFeaturedProducts();

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
