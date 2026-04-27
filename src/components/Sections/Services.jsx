import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Monitor, Server, Palette, Zap, Globe, Code } from 'lucide-react';

const services = [
  {
    icon: Monitor,
    title: "Web Development",
    description: "Building ultra-fast, responsive, and highly interactive websites and user interfaces using modern tech stacks."
  },
  {
    icon: Code,
    title: "Frontend Engineering",
    description: "Creating seamless SPAs using modern React, Next.js, and ThreeJS."
  },
  {
    icon: Server,
    title: "Backend Architecture",
    description: "Designing scalable robust APIs and database architectures using Node, Express, PHP, and cloud services."
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Crafting beautiful, neon-powered, dark-mode design systems that wow users with sleek animations."
  },
  {
    icon: Zap,
    title: "Performance Optimization",
    description: "Auditing and upgrading applications for lightning-fast load times, SEO, and flawless lighthouse scores."
  },
  {
    icon: Globe,
    title: "API Integration",
    description: "Connecting third-party services, payment gateways, and headless CMS seamlessly into your ecosystem."
  }
];

export default function Services() {
  const sectionRef = useRef(null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100, damping: 15 }
    }
  };

  return (
    <section ref={sectionRef} className="py-24 px-6 sm:px-12 lg:px-24" id="services">
      <div className="max-w-6xl mx-auto z-10 w-full relative">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-20"
        >
          <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>02.</span>
          <h2 className="text-3xl md:text-5xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            My Services
          </h2>
          <div className="flex-1 h-px bg-zinc-800/80 ml-4" />
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {services.map((service, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="glass-card rounded-2xl p-8 h-full relative overflow-hidden group cursor-pointer border border-zinc-800/40 hover:border-primary/40 transition-all duration-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.15)]"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transform scale-150 rotate-12 transition-all duration-500">
                <service.icon size={100} className="text-primary" />
              </div>
              
              <div className="w-14 h-14 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                <service.icon size={28} className="text-primary" />
              </div>
              
              <h3 className="text-2xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {service.title}
              </h3>
              
              <p className="text-zinc-400 text-sm leading-relaxed">
                {service.description}
              </p>
              
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-yellow-500 group-hover:w-full transition-all duration-700 delay-100 ease-out" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
