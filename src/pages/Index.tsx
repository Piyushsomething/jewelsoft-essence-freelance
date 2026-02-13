import React from 'react';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategoryHighlight from "@/components/home/CategoryHighlight";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
// import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";
import AnimatedShowcase from "@/components/home/AnimatedShowcase";
import AnimatedBackground from "@/components/home/AnimatedBackground";
import CatalogueDownload from "@/components/home/CatalogueDownload";
import AnimatedLogoBg from "@/components/layout/AnimatedLogoBg";
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
      <div className="py-16 md:py-24 relative overflow-hidden" style={{ backgroundColor: '#f4f0e4' }}>
        {/* Animated Logo Watermark - draws itself on scroll */}
        <AnimatedLogoBg variant="dark" align="right" />

        <motion.div
          className="container-custom text-center relative z-10"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true, amount: 0.3 }}
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4 text-gray-800">
            Craftsmanship & Quality
          </h2>
          <p className="text-gray-600 text-sm md:text-base max-w-xl mx-auto">
            Every piece in our collection is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. We use only the finest quality silver to ensure durability and timeless beauty.
          </p>
        </motion.div>

      </div>
      <CatalogueDownload />
      <NewArrivals />
      {/* <Testimonials /> */}
      <Newsletter />
    </Layout>
  );
};

export default Index;
