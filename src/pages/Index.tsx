import React from 'react';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategoryHighlight from "@/components/home/CategoryHighlight";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import AnimatedShowcase from "@/components/home/AnimatedShowcase";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import { motion } from "framer-motion";

const Index = () => {
  return (
    <Layout>
      <AnimatedBackground />
      <Hero />
      
      {/* Animated scroll indicator */}
      <div className="flex justify-center -mt-16 relative z-10">
        <motion.div 
          className="text-center flex flex-col items-center text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ 
            opacity: [0, 1, 0], 
            y: [0, 10, 0] 
          }}
          transition={{ 
            duration: 2, 
            repeat: Infinity,
            repeatType: "loop"
          }}
        >
          <span className="text-sm mb-2">Scroll to explore</span>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <polyline points="19 12 12 19 5 12"></polyline>
          </svg>
        </motion.div>
      </div>
      
      <CategoryHighlight />
      <AnimatedShowcase />
      <FeaturedProducts />
      <div className="py-16 md:py-24 bg-gold/10 dark:bg-gold/5 relative overflow-hidden">
        <motion.div 
          className="container-custom text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Craftsmanship & Quality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every piece in our collection is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. We use only the finest quality silver to ensure durability and timeless beauty.
          </p>
        </motion.div>
        
        <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-5">
          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            animate={{ rotate: 360 }}
            transition={{ duration: 100, repeat: Infinity, ease: "linear" }}
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </motion.svg>
        </div>
      </div>
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
