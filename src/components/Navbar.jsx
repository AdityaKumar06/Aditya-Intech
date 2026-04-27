import { motion, AnimatePresence, useMotionValueEvent, useScroll } from 'framer-motion';
import { useState } from 'react';

const navItems = [
  { label: "Home", href: "#home", num: "01" },
  { label: "About", href: "#about", num: "02" },
  { label: "Skills", href: "#skills", num: "03" },
  { label: "Services", href: "#services", num: "04" },
  { label: "Experience", href: "#experience", num: "05" },
  { label: "Works", href: "#works", num: "06" },
  { label: "Contact", href: "#contact", num: "07" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    // Just close mobile menu on scroll, don't hide navbar
    const prev = scrollY.getPrevious();
    if (latest > prev && latest > 150) {
      setMenuOpen(false);
    }
  });

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 w-full z-40 py-4 px-4 sm:px-12 lg:px-20"
      >
        {/* Soft blackout gradient behind the floating island to hide scrolling text seamlessly */}
        <div className="absolute inset-0 top-0 w-full h-[80px] sm:h-[120px] bg-gradient-to-b from-[#000000] via-[#000000]/90 to-transparent pointer-events-none -z-10" />
        
        <div className="max-w-7xl mx-auto flex justify-between items-center glass-card rounded-2xl px-5 sm:px-6 py-3">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <span className="text-2xl font-bold tracking-tighter" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              <span className="text-gradient">Aditya</span>
              <span className="text-zinc-600">.</span>
            </span>
          </motion.div>

          {/* Desktop nav */}
          <div className="hidden md:flex gap-1 items-center">
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative px-4 py-2 text-sm text-zinc-400 hover:text-foreground transition-colors duration-300 group rounded-lg"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}
              >
                <span className="text-primary mr-1">{item.num}.</span>
                {item.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-primary group-hover:w-3/4 transition-all duration-300" />
              </motion.a>
            ))}
            <motion.a
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              href="mailto:adityakumar.connect2@gmail.com"
              className="ml-4 px-5 py-2 border border-primary/40 text-primary rounded-lg text-xs hover:bg-primary/10 transition-all duration-300 hover:border-primary hover:shadow-[0_0_15px_rgba(249,115,22,0.15)]"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              Let's Talk
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-2"
          >
            <motion.span animate={menuOpen ? { rotate: 45, y: 6.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-foreground block" />
            <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="w-6 h-0.5 bg-foreground block" />
            <motion.span animate={menuOpen ? { rotate: -45, y: -6.5 } : { rotate: 0, y: 0 }} className="w-6 h-0.5 bg-foreground block" />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 left-4 right-4 z-50 glass-card rounded-2xl p-6 md:hidden"
          >
            {navItems.map((item, i) => (
              <motion.a
                key={item.label}
                href={item.href}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-3 py-3 text-zinc-300 hover:text-primary transition-colors border-b border-zinc-800/50 last:border-0"
                style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.85rem' }}
              >
                <span className="text-primary text-xs">{item.num}.</span>
                {item.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
