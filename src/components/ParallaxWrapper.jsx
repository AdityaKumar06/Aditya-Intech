import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ParallaxWrapper({ children, offset = 50, clampInitial = false, className = '' }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // If offset is positive (e.g., 50), the item moves UP over the background (scrolls faster than the page).
  // If offset is negative, the item moves DOWN over the background (scrolls slower than the page).
  const y = useTransform(
    scrollYProgress, 
    [0, 1], 
    clampInitial ? [0, -offset] : [offset, -offset]
  );

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}
