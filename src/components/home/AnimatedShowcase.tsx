import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

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
        "/images/products/necklaces/necklace-5.png",
        "/images/products/necklaces/necklace-6.png",
        "/images/products/necklaces/necklace-7.png",
      ]
    },
    {
      id: "earrings",
      name: "Earrings",
      description: "Beautiful earrings for everyday elegance",
      images: [
        "/images/products/earrings/ear-1.jpeg",
        "/images/products/earrings/ear-2.jpeg",
        "/images/products/earrings/ear-3.jpeg",
      ]
    },
    {
      id: "bracelets",
      name: "Bracelets",
      description: "Handcrafted bracelets that captivate",
      images: [
        "/images/products/bracelets/sb-1.png",
        "/images/products/bracelets/sb-2.jpeg",
        "/images/products/bracelets/sb-3.jpeg",
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
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [isAutoPlaying, categories.length]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % categories.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + categories.length) % categories.length);
  };

  const current = categories[currentIndex];

  return (
    <section className="py-16 sm:py-20 bg-gradient-to-b from-background to-muted/30 overflow-x-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="inline-block text-yellow-500 font-medium tracking-widest uppercase text-xs sm:text-sm mb-3">
            Our Collections
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Exquisite Craftsmanship
          </h2>
          <div className="w-16 h-0.5 bg-yellow-500 mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-sm sm:text-base">
            Discover our curated collections of handcrafted jewelry, each piece telling a unique story
          </p>
        </motion.div>

        {/* Showcase Area */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Layout */}
              <div className="flex flex-col gap-6">
                {/* Top: Hero Image with Overlay Text */}
                <div className="relative overflow-hidden rounded-2xl group">
                  <motion.div
                    className="relative h-[280px] sm:h-[360px] md:h-[450px]"
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                  >
                    <img
                      src={current.images[0]}
                      alt={`${current.name} featured`}
                      className="w-full h-full object-scale-down bg-gray-950 p-2"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </motion.div>

                  {/* Overlay Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
                    <motion.span
                      className="inline-block text-yellow-400 text-xs sm:text-sm font-medium tracking-widest uppercase mb-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      Collection
                    </motion.span>
                    <motion.h3
                      className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-2"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {current.name}
                    </motion.h3>
                    <motion.p
                      className="text-gray-200 text-sm sm:text-base max-w-md mb-4"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      {current.description}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Link
                        to={`/products?category=${current.id}`}
                        className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-2.5 rounded-md font-medium transition-all hover:gap-3"
                      >
                        Shop {current.name}
                        <ChevronRight className="w-4 h-4" />
                      </Link>
                    </motion.div>
                  </div>
                </div>

                {/* Bottom: Two Equal Images */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  {current.images.slice(1).map((image, idx) => (
                    <motion.div
                      key={idx}
                      className="relative overflow-hidden rounded-xl group cursor-pointer"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + idx * 0.15, duration: 0.5 }}
                    >
                      <div className="relative h-[160px] sm:h-[200px] md:h-[260px]">
                        <img
                          src={image}
                          alt={`${current.name} ${idx + 2}`}
                          className="w-full h-full object-scale-down bg-gray-950 p-2 group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Subtle gradient on hover */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                      </div>
                      {/* Bottom label */}
                      <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <p className="text-white text-xs sm:text-sm font-medium">
                          {current.name} — Style {idx + 2}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-5 top-[140px] sm:top-[180px] md:top-[225px] -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110 z-10"
            aria-label="Previous category"
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-5 top-[140px] sm:top-[180px] md:top-[225px] -translate-y-1/2 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm p-2.5 sm:p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-800 transition-all hover:scale-110 z-10"
            aria-label="Next category"
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Category Tabs + Progress */}
        <div className="flex flex-col items-center mt-8 sm:mt-10">
          <div className="flex items-center gap-2 sm:gap-3 max-w-full overflow-x-auto pb-2 px-1 scrollbar-hide" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {categories.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`relative px-3 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 whitespace-nowrap shrink-0 ${idx === currentIndex
                  ? 'bg-yellow-500 text-black shadow-md shadow-yellow-500/25'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
              >
                {cat.name}
                {idx === currentIndex && (
                  <motion.div
                    className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full mt-2 w-1 h-1 rounded-full bg-yellow-500"
                    layoutId="activeDot"
                  />
                )}
              </button>
            ))}
          </div>
          {/* Auto-play progress bar */}
          {isAutoPlaying && (
            <div className="w-32 h-0.5 bg-gray-200 dark:bg-gray-700 rounded-full mt-4 overflow-hidden">
              <motion.div
                className="h-full bg-yellow-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 5, ease: "linear" }}
                key={currentIndex}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default AnimatedShowcase;