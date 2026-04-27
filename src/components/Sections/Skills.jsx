import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { Monitor, Server, Database, Cloud, CreditCard, Shield, BrainCircuit, Layout } from 'lucide-react';
import { useState } from 'react';

const categoryIcons = {
  "Frontend": Monitor,
  "Backend": Server,
  "Databases": Database,
  "Cloud & DevOps": Cloud,
  "Payments": CreditCard,
  "Auth & APIs": Shield,
  "AI": BrainCircuit,
  "CMS": Layout,
};

const categoryColors = {
  "Frontend": "#3b82f6",
  "Backend": "#f97316",
  "Databases": "#f59e0b",
  "Cloud & DevOps": "#f97316",
  "Payments": "#ec4899",
  "Auth & APIs": "#ef4444",
  "AI": "#06b6d4",
  "CMS": "#f97316",
};

const techIcons = {
  "React.js": "⚛️", "Next.js": "▲", "TypeScript": "𝗧𝗦", "Vue.js": "🟢",
  "Redux": "🔄", "Tailwind CSS": "🌊", "Bootstrap": "🅱️", "jQuery": "💲", "AJAX": "⚡",
  "Node.js": "🟩", "Express.js": "🚂", "PHP (Laravel, CodeIgniter)": "🐘", "Python (Flask basics)": "🐍",
  "MySQL": "🐬", "MongoDB": "🍃", "PostgreSQL basics": "🐘",
  "AWS (EC2, S3, Lambda)": "☁️", "Vercel": "▲", "Netlify": "🔷", "Docker basics": "🐳", "GitHub Actions (CI/CD)": "🔁",
  "Stripe": "💳", "PayPal": "🅿️", "Razorpay": "💰", "PhonePe": "📱",
  "Auth0": "🔐", "Firebase": "🔥", "SendGrid": "📧", "Mailgun": "✉️",
  "Twilio": "📞", "Cloudinary": "☁️", "Google Maps": "📍", "OpenWeatherMap": "🌤️",
  "OpenAI API": "🤖", "GPT integrations": "🧠", "AI recommendation engines": "💡",
  "WordPress": "📝", "Shopify": "🛒", "Headless CMS": "🔗",
};

export default function Skills() {
  const { skills } = PORTFOLIO_DATA;
  const [activeCategory, setActiveCategory] = useState(0);

  const activeSkill = skills[activeCategory];
  const Icon = categoryIcons[activeSkill.category] || Monitor;
  const color = categoryColors[activeSkill.category] || "#f97316";

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-24" id="skills">
      <div className="max-w-6xl mx-auto z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16"
        >
          <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>02.</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Tech Arsenal
          </h2>
          <div className="flex-1 h-px bg-zinc-800/50 ml-4" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          {/* Category selector — left sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-2 pb-4 lg:pb-0"
          >
            {skills.map((skillGroup, idx) => {
              const CatIcon = categoryIcons[skillGroup.category] || Monitor;
              const catColor = categoryColors[skillGroup.category] || "#f97316";
              const isActive = activeCategory === idx;
              return (
                <motion.button
                  key={skillGroup.category}
                  onClick={() => setActiveCategory(idx)}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative flex items-center gap-2 sm:gap-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-xl text-left transition-all duration-300 ${
                    isActive ? 'glass-card text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                  style={isActive ? { boxShadow: `0 0 30px ${catColor}15`, borderColor: `${catColor}30` } : {}}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeCatBg"
                      className="absolute inset-0 rounded-xl"
                      style={{ background: `${catColor}08`, border: `1px solid ${catColor}25` }}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  <div
                    className="relative z-10 w-8 h-8 rounded-lg flex items-center justify-center transition-all shrink-0"
                    style={isActive ? { background: `${catColor}20` } : { background: 'transparent' }}
                  >
                    <CatIcon size={16} style={{ color: isActive ? catColor : '#71717a' }} />
                  </div>
                  <div className="relative z-10">
                    <div className="text-xs sm:text-sm font-medium" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                      {skillGroup.category}
                    </div>
                    <div className="text-[9px] sm:text-[10px] text-zinc-600 hidden sm:block" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                      {skillGroup.items.length} technologies
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Active category display — right panel */}
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.215, 0.61, 0.355, 1] }}
            className="glass-card rounded-2xl p-4 sm:p-6 lg:p-8 relative overflow-hidden min-h-[250px] sm:min-h-[300px]"
          >
            {/* Accent glow */}
            <div
              className="absolute -top-32 -right-32 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none"
              style={{ background: color }}
            />

            {/* Header */}
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div
                className="w-14 h-14 rounded-xl flex items-center justify-center"
                style={{ background: `${color}15`, border: `1px solid ${color}30` }}
              >
                <Icon size={24} style={{ color }} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                  {activeSkill.category}
                </h3>
                <span className="text-xs text-zinc-500" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  {activeSkill.items.length} technologies
                </span>
              </div>
            </div>

            {/* Skills grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-3 relative z-10">
              {activeSkill.items.map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  whileHover={{
                    y: -4,
                    boxShadow: `0 8px 25px ${color}15`,
                    borderColor: `${color}40`,
                  }}
                  className="flex items-center gap-2.5 px-3 py-3 rounded-xl bg-zinc-900/60 border border-zinc-800/50 cursor-default transition-all duration-300 group"
                >
                  <span className="text-base w-6 text-center shrink-0">{techIcons[item] || "•"}</span>
                  <span className="text-[12px] text-zinc-300 group-hover:text-white transition-colors leading-tight" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                    {item}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
