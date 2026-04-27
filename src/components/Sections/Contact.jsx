import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { Mail, Phone, ArrowUpRight, Heart } from 'lucide-react';

export default function Contact() {
  const { contact } = PORTFOLIO_DATA;

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-24 relative" id="contact">
      
      {/* Background gradient blob */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-primary/[0.03] rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto z-10 w-full relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary text-sm tracking-[0.3em] block mb-4" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            06. What's Next?
          </span>
          <h2 className="text-5xl md:text-7xl font-bold mb-6" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Let's Build <br />
            <span className="text-gradient">Something Great</span>
          </h2>
          <p className="text-zinc-500 text-lg max-w-lg mx-auto leading-relaxed">
            {contact.message}
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-12"
        >
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <Mail size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-zinc-600 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Email</div>
              <div className="text-sm text-zinc-300 truncate group-hover:text-primary transition-colors">{contact.email}</div>
            </div>
            <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
          </motion.a>

          <motion.a
            href={`tel:${contact.phone}`}
            whileHover={{ y: -5 }}
            className="glass-card rounded-2xl p-6 flex items-center gap-4 group hover:shadow-[0_0_30px_rgba(249,115,22,0.08)] transition-all duration-500"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:bg-primary/20 transition-all">
              <Phone size={20} className="text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs text-zinc-600 mb-1" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Phone</div>
              <div className="text-sm text-zinc-300 group-hover:text-primary transition-colors">{contact.phone}</div>
            </div>
            <ArrowUpRight size={16} className="text-zinc-700 group-hover:text-primary group-hover:rotate-45 transition-all duration-300" />
          </motion.a>
        </motion.div>

        {/* CTA button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mb-20"
        >
          <motion.a
            href={`mailto:${contact.email}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-flex items-center gap-3 px-10 py-4 rounded-xl text-primary overflow-hidden group"
            style={{ fontFamily: 'JetBrains Mono, monospace' }}
          >
            {/* Animated border */}
            <span className="absolute inset-0 rounded-xl border border-primary/40 group-hover:border-primary transition-colors duration-500" />
            {/* Hover fill */}
            <span className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-colors duration-500 rounded-xl" />
            <span className="relative z-10">Say Hello</span>
            <ArrowUpRight size={16} className="relative z-10 group-hover:rotate-45 transition-transform duration-300" />
          </motion.a>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center pt-12 border-t border-zinc-800/30"
        >
          <p className="text-zinc-700 text-xs mb-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            Designed & Built with
            <motion.span
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="inline-block mx-1"
            >
              <Heart size={12} className="inline text-primary fill-primary" />
            </motion.span>
            by Aditya
          </p>
          <p className="text-zinc-800 text-[10px]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
            React · Three.js · Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
}
