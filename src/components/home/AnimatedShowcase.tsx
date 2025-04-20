import React, { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const AnimatedShowcase = () => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true });
  
  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);
  
  return (
    <div className="py-16 overflow-hidden relative">
      <div className="container-custom">
        <motion.div
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { duration: 0.5 } }
          }}
          className="text-center mb-12"
        >
          <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-4">Exquisite Craftsmanship</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">Discover the art of jewelry making through our rotating showcase</p>
        </motion.div>
        
        <div className="flex justify-center">
          <motion.div 
            className="w-72 h-72 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          >
            {[0, 60, 120, 180, 240, 300].map((degree, i) => (
              <motion.div
                key={i}
                className="absolute top-0 left-0 right-0 w-28 h-28 mx-auto"
                style={{ transformOrigin: "bottom center" }}
                initial={{ rotate: degree, y: -120 }}
              >
                <div className="bg-card shadow-lg rounded-full p-3 border border-gold/30 hover:border-gold transition-all duration-300">
                  <img 
                    src={`https://picsum.photos/seed/${i}/100/100`}
                    alt="Jewelry piece" 
                    className="rounded-full w-full h-full object-cover"
                  />
                </div>
              </motion.div>
            ))}
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-gold/20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-gold/30 flex items-center justify-center">
                  <div className="w-10 h-10 rounded-full bg-gold"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedShowcase;