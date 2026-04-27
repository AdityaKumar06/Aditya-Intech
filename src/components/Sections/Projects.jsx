import { motion, useMotionValue, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { ExternalLink, ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
function ProjectCard({ project, idx }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-100, 100], [5, -5]);
  const rotateY = useTransform(x, [-100, 100], [-5, 5]);

  const handleMouse = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.215, 0.61, 0.355, 1] }}
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouse}
        onMouseLeave={handleMouseLeave}
        whileHover={{ y: -10 }}
        transition={{ duration: 0.3 }}
        className="glass-card rounded-2xl p-6 h-full flex flex-col group cursor-pointer relative overflow-hidden"
      >
        {/* Shine effect on hover */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.07] via-transparent to-transparent" />
        </div>

        <div className="relative z-10 flex flex-col h-full">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <motion.span
              className="px-3 py-1 text-[10px] rounded-md bg-primary/10 text-primary border border-primary/20"
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {project.category}
            </motion.span>
            <a
              href={project.link}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="w-9 h-9 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-primary hover:border-primary/40 hover:bg-primary/10 transition-all duration-300"
            >
              <ArrowUpRight size={15} />
            </a>
          </div>

          {/* Title & description */}
          <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-gradient transition-colors duration-300" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            {project.title}
          </h3>
          <p className="text-zinc-500 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, i) => (
              <span key={i} className="text-[10px] text-zinc-600 px-2 py-0.5 rounded bg-zinc-900/50" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  const { projects } = PORTFOLIO_DATA;
  const [activeTab, setActiveTab] = useState("production");

  const tabs = [
    { id: "production", label: "Production", count: projects.production.length },
    { id: "freelance", label: "Freelance", count: projects.freelance.length },
  ];

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-24" id="works">
      <div className="max-w-6xl mx-auto z-10 w-full">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>05.</span>
          <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            Featured Work
          </h2>
          <div className="flex-1 h-px bg-zinc-800/50 ml-4" />
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex gap-2 mb-12"
        >
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`relative px-5 py-2.5 rounded-xl text-sm transition-all duration-300 ${
                activeTab === tab.id
                  ? "text-primary"
                  : "text-zinc-500 hover:text-zinc-300"
              }`}
              style={{ fontFamily: 'JetBrains Mono, monospace' }}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 glass-card rounded-xl border-primary/30"
                  style={{ borderWidth: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
              <span className="relative z-10 ml-2 text-xs text-zinc-600">({tab.count})</span>
            </button>
          ))}
        </motion.div>

        {/* Project grid */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {projects[activeTab].map((project, idx) => (
            <ProjectCard key={project.title} project={project} idx={idx} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
