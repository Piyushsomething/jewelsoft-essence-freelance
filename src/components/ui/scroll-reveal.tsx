// src/components/ui/scroll-reveal.tsx
import { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

type Direction = "up" | "down" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: Direction;
  duration?: number;
  delay?: number;
  distance?: number;
  className?: string;
}

export const ScrollReveal = ({
  children,
  direction = "up",
  duration = 0.5,
  delay = 0,
  distance = 50,
  className = "",
}: ScrollRevealProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const getDirection = () => {
    switch (direction) {
      case "up":
        return { y: distance };
      case "down":
        return { y: -distance };
      case "left":
        return { x: distance };
      case "right":
        return { x: -distance };
      default:
        return { y: distance };
    }
  };

  useEffect(() => {
    if (inView) {
      controls.start({
        x: 0,
        y: 0,
        opacity: 1,
        transition: {
          duration,
          delay,
          ease: "easeOut",
        },
      });
    }
  }, [controls, inView, duration, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ ...getDirection(), opacity: 0 }}
      animate={controls}
      className={className}
    >
      {children}
    </motion.div>
  );
};