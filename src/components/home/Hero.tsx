import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="relative h-[80vh] min-h-[712px] flex items-center overflow-hidden">
      {/* Background Image with parallax effect */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2 }}
      >
        <img
          // src="https://images.unsplash.com/photo-1601121141461-9d6647bca1ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
          src="https://images.unsplash.com/photo-1693213085235-ea6deadf8cee?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Luxury Jewelry"

          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Content with staggered animations */}
      <div className="container-custom relative z-10 text-lightText">
        <div className="max-w-2xl">
          <motion.h1
            className="font-playfair text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            Elegance in <span className="text-gold">Silver & Stone</span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl opacity-90 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Discover our exquisite collection of handcrafted silver jewelry, where tradition meets contemporary design.
          </motion.p>

          <motion.div
            className="space-x-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Button
              asChild
              size="lg"
              className="bg-gold text-darkText hover:bg-gold/90 shadow-lg hover:shadow-xl transition-all"
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
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
