import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const AnimatedShowcase = () => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const categories = [
    {
      id: "rings",
      name: "Rings",
      description: "Exquisite rings for every occasion",
      images: [
        "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1609587312208-cea744558a14?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "necklaces",
      name: "Necklaces",
      description: "Stunning necklaces that make a statement",
      images: [
        "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1526355430414-a67999cb98e8?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "earrings",
      name: "Earrings",
      description: "Beautiful earrings for everyday elegance",
      images: [
        "https://images.unsplash.com/photo-1619259942293-f8664710498f?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1630019852942-f89202989a61?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "bracelets",
      name: "Bracelets",
      description: "Handcrafted bracelets that captivate",
      images: [
        "https://images.unsplash.com/photo-1635349052244-2c9145c5ef84?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1573408301828-9219d9e3c843?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1626784215021-2e895cd330e9?ixlib=rb-4.0.3&w=400&q=80"
      ]
    },
    {
      id: "stones",
      name: "Stones",
      description: "Healing crystals and precious stones",
      images: [
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1518051803018-40988b2df310?ixlib=rb-4.0.3&w=400&q=80",
        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&w=400&q=80"
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

  const handleCategoryClick = (categoryId: string) => {
    navigate(`/products?category=${categoryId}`);
  };

  return (
    <div className="py-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">
           Exquisite Craftsmanship
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our curated collections of handcrafted jewelry
          </p>
        </motion.div>

        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <div className="overflow-hidden rounded-2xl shadow-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="relative h-[500px] bg-white dark:bg-gray-800"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 h-full">
                  {/* Content Side */}
                  <div className="flex flex-col justify-center p-8 md:p-12">
                    <motion.h3 
                      className="font-playfair text-3xl md:text-4xl font-bold mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {categories[currentIndex].name}
                    </motion.h3>
                    <motion.p 
                      className="text-muted-foreground text-lg mb-8"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {categories[currentIndex].description}
                    </motion.p>
                    <motion.button
                      className="bg-gold text-black px-8 py-3 rounded-md font-medium hover:bg-gold/90 transition-colors w-fit"
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
                  <div className="grid grid-cols-2 gap-4 p-6">
                    {categories[currentIndex].images.map((image, idx) => (
                      <motion.div
                        key={idx}
                        className={`relative overflow-hidden rounded-lg ${
                          idx === 0 ? 'col-span-2 h-48' : 'h-32'
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
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {categories.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  idx === currentIndex ? 'bg-gold' : 'bg-gray-300 dark:bg-gray-600'
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