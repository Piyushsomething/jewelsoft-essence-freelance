
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[600px] flex items-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          alt="Luxury Jewelry"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Content */}
      <div className="container-custom relative z-10 text-lightText">
        <div className="max-w-2xl">
          <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in">
            Timeless Elegance in <span className="text-gold">Silver</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in [animation-delay:200ms]">
            Discover our exquisite collection of handcrafted silver jewelry, where tradition meets contemporary design.
          </p>
          <div className="space-x-4 animate-fade-in [animation-delay:400ms]">
            <Button 
              asChild
              size="lg"
              className="bg-gold text-darkText hover:bg-gold/90"
            >
              <Link to="/products">Shop Now</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg"
              className="border-gold text-gold hover:bg-gold/10"
            >
              <Link to="/about">Our Story</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
