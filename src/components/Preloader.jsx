import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function Preloader() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame;
    let start = Date.now();
    const duration = 2200; // 2.2 seconds loading
    
    const tick = () => {
      const elapsed = Date.now() - start;
      const p = Math.min(elapsed / duration, 1);
      // Easing curve (ease-out cubic)
      const eased = 1 - Math.pow(1 - p, 3);
      
      setProgress(Math.round(eased * 100));
      
      if (p < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setIsLoading(false), 800);
      }
    };
    
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <AnimatePresence mode="wait">
      {isLoading && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-between overflow-hidden bg-black py-12 md:py-20"
          exit={{
            opacity: 0,
            y: "-100%",
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          {/* Backside dim & glow light */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] rounded-full bg-primary/20 blur-[100px] pointer-events-none" />

          {/* Top spacer */}
          <div className="flex-1" />

          {/* BIG BOLD NUMBER */}
          <div className="relative z-10 flex items-baseline justify-center">
            <motion.span 
              className="text-[100px] sm:text-[140px] md:text-[180px] font-black leading-none text-zinc-100 tracking-tighter"
              style={{ 
                fontFamily: 'Space Grotesk, sans-serif',
                textShadow: '0 0 50px rgba(249,115,22,0.4)',
              }}
            >
              {progress}
            </motion.span>
            <motion.span 
              className="text-3xl sm:text-5xl md:text-6xl text-primary font-bold ml-2 sm:ml-4"
              style={{ fontFamily: 'Space Grotesk, sans-serif' }}
            >
              %
            </motion.span>
          </div>

          {/* Bottom spacer */}
          <div className="flex-1" />

          {/* Down progress bar and text */}
          <div className="w-full max-w-sm sm:max-w-md px-8 relative z-10 flex flex-col items-center gap-6">
            <motion.span 
              className="text-[10px] sm:text-xs tracking-[0.4em] uppercase text-zinc-400 font-medium"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Initializing Experience
            </motion.span>
            
            {/* Smooth glowing progress bar */}
            <div className="w-full h-[3px] bg-zinc-900 overflow-hidden relative rounded-full">
              <motion.div
                className="absolute top-0 left-0 h-full bg-gradient-to-r from-orange-600 to-yellow-400 rounded-full shadow-[0_0_15px_rgba(249,115,22,1)]"
                style={{ width: `${progress}%` }}
              />
              <motion.div
                className="absolute top-0 left-0 h-full w-20 bg-white/40 blur-sm"
                animate={{ x: ['-100%', '400%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
