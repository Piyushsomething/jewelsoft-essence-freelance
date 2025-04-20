import React from 'react';
import { motion } from 'framer-motion';

const AnimatedBackground = () => {
  const particles = Array.from({ length: 20 });
  
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {particles.map((_, i) => {
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const size = Math.random() * 10 + 5;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gold/10 dark:bg-gold/5"
            initial={{ 
              x: `${x}vw`, 
              y: `${y}vh`, 
              width: size, 
              height: size 
            }}
            animate={{ 
              y: [`${y}vh`, `${(y + 20) % 100}vh`],
              opacity: [0, 0.5, 0]
            }}
            transition={{ 
              repeat: Infinity, 
              duration: duration, 
              delay: delay,
              repeatType: 'reverse'
            }}
          />
        );
      })}
    </div>
  );
};

export default AnimatedBackground;