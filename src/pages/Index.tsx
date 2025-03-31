
import React from 'react';
import Layout from "@/components/layout/Layout";
import Hero from "@/components/home/Hero";
import CategoryHighlight from "@/components/home/CategoryHighlight";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import NewArrivals from "@/components/home/NewArrivals";
import Testimonials from "@/components/home/Testimonials";
import Newsletter from "@/components/home/Newsletter";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <CategoryHighlight />
      <FeaturedProducts />
      <div className="py-16 md:py-24 bg-gold/10 dark:bg-gold/5 relative overflow-hidden">
        <div className="container-custom text-center relative z-10">
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
            Craftsmanship & Quality
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every piece in our collection is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations. We use only the finest quality silver to ensure durability and timeless beauty.
          </p>
        </div>
        
        <div className="absolute -right-20 top-1/2 transform -translate-y-1/2 opacity-5">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="400"
            height="400"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <circle cx="12" cy="12" r="6" />
            <circle cx="12" cy="12" r="2" />
          </svg>
        </div>
      </div>
      <NewArrivals />
      <Testimonials />
      <Newsletter />
    </Layout>
  );
};

export default Index;
