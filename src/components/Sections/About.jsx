import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { useRef } from 'react';

const statItems = [
  { value: "3+", label: "Years Experience" },
  { value: "9+", label: "Projects Delivered" },
  { value: "30+", label: "Technologies" },
];

export default function About() {
  const { about, expertise } = PORTFOLIO_DATA;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section ref={sectionRef} className="py-24 px-6 sm:px-12 lg:px-24" id="about">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1 }}
        >
          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-4 mb-16"
          >
            <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>01.</span>
            <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
              About Me
            </h2>
            <div className="flex-1 h-px bg-zinc-800/50 ml-4" />
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-16 items-start">
            {/* Profile picture column — LEFT */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex justify-center lg:justify-start"
            >
              <motion.div style={{ y: imgY }} className="relative group">
                {/* Glow behind */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary/20 to-transparent rounded-3xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Offset border */}
                <div className="absolute inset-0 border-2 border-primary/30 rounded-2xl translate-x-5 translate-y-5 group-hover:translate-x-3 group-hover:translate-y-3 transition-transform duration-500" />

                {/* Image */}
                <div className="relative w-[280px] h-[340px] sm:w-[320px] sm:h-[380px] rounded-2xl overflow-hidden border border-zinc-800 group-hover:border-primary/40 transition-colors duration-500">
                  <img
                    src="https://github.com/AdityaKumar06.png"
                    alt="Aditya Kumar"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                  
                  {/* Bottom label */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-4 left-4 right-4"
                  >
                    <div className="glass-card rounded-lg px-4 py-3">
                      <div className="text-sm font-semibold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>Aditya Kumar</div>
                      <div className="text-xs text-primary" style={{ fontFamily: 'JetBrains Mono, monospace' }}>@AdityaKumar06</div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* Text column — RIGHT */}
            <div>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-zinc-400 text-lg leading-[1.8] mb-10"
              >
                {about.description}
              </motion.p>

              {/* Expertise tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-sm text-zinc-500 tracking-[0.2em] uppercase mb-5" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  What I Do
                </h3>
                <div className="flex flex-wrap gap-3">
                  {expertise.map((item, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + idx * 0.08 }}
                      whileHover={{ scale: 1.05, borderColor: 'rgba(249, 115, 22, 0.5)' }}
                      className="px-4 py-2 rounded-lg glass-card text-zinc-300 text-sm cursor-default transition-all duration-300"
                    >
                      {item}
                    </motion.span>
                  ))}
                </div>
              </motion.div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6">
                {statItems.map((stat, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.6 + idx * 0.15 }}
                    className="text-center p-4 rounded-xl glass-card group hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500"
                  >
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-1" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {stat.value}
                    </div>
                    <div className="text-zinc-500 text-xs" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
