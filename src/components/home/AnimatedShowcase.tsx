import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimatedShowcase = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = [
    {
      id: "rings",
      name: "Rings",
      description: "Exquisite rings for every occasion",
        images: [
        "/images/products/rings/ring-1.jpg",
        "/images/products/rings/ring-2.jpg", 
        "/images/products/rings/ring-3.jpg",
    
      ],
    },
    {
      id: "necklaces",
      name: "Necklaces",
      description: "Stunning necklaces that make a statement",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1680068098868-0f5548165d3d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "earrings",
      name: "Earrings",
      description: "Beautiful earrings for everyday elegance",
      images: [
        "https://images.unsplash.com/photo-1714733831162-0a6e849141be?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1713004539634-a6694a83f3d9?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "bracelets",
      name: "Bracelets",
      description: "Handcrafted bracelets that captivate",
      images: [
         "/images/products/blacelets/sb-1.jpg",
        "/images/products/blacelets/sb-2.jpg", 
        "/images/products/blacelets/sb-3.jpg",
      ]
    },
    {
      id: "stones",
      name: "Stones",
      description: "Healing crystals and precious stones",
      images: [
         "/images/products/stones/stone-1.jpg",
        "/images/products/stones/stone-2.jpg", 
        "/images/products/stones/stone-3.jpg",
      ]
    }
  ];

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % categories.length);
      }, 4000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, categories.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const handleCategoryClick = (categoryId) => {
    console.log(`Navigate to /products?category=${categoryId}`);
  };

  return (
    <div className="py-12 sm:py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">
           Exquisite Craftsmanship
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our curated collections of handcrafted jewelry
          </p>
        </motion.div>

        <div 
          className="relative max-w-6xl mx-auto px-4 sm:px-0"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-xl sm:rounded-2xl shadow-xl sm:shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative min-h-[400px] md:h-[500px] bg-white dark:bg-gray-800"
              >
                <div className="flex flex-col md:grid md:grid-cols-2 h-full">
                  {/* Content Side */}
                  <div className="flex flex-col justify-center p-6 md:p-8 lg:p-12 order-2 md:order-1">
                    <motion.h3 
                      className="font-serif text-2xl sm:text-3xl md:text-4xl font-bold mb-3 md:mb-4 text-center md:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {categories[currentIndex].name}
                    </motion.h3>
                    <motion.p 
                      className="text-gray-600 dark:text-gray-400 text-base md:text-lg mb-6 md:mb-8 text-center md:text-left"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {categories[currentIndex].description}
                    </motion.p>
                    <motion.button
                      className="bg-yellow-500 text-black px-6 md:px-8 py-2.5 md:py-3 rounded-md font-medium hover:bg-yellow-400 transition-colors w-fit mx-auto md:mx-0"
                      onClick={() => handleCategoryClick(categories[currentIndex].id)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Shop {categories[currentIndex].name}
                    </motion.button>
                  </div>

                  {/* Images Side */}
                  <div className="grid grid-cols-2 gap-2 sm:gap-4 p-4 sm:p-6 order-1 md:order-2">
                    {categories[currentIndex].images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className={`relative overflow-hidden rounded-lg ${
                          idx === 0 ? 'col-span-2 h-32 sm:h-40 md:h-48' : 'h-20 sm:h-24 md:h-32'
                        }`}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2 + idx * 0.1 }}
                      >
                        <img
                          src={image}
                          alt={`${categories[currentIndex].name} ${idx + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
          >
            <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-2 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors z-10"
          >
            <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-6 sm:mt-8">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-yellow-500' : 'bg-gray-300 dark:bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedShowcase;