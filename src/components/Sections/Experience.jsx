import { motion } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { Briefcase, GraduationCap } from 'lucide-react';

const timelineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.2 } }
};

const itemVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(10px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: { duration: 0.7, ease: [0.215, 0.61, 0.355, 1] }
  }
};

function TimelineCard({ item, icon: Icon, idx }) {
  return (
    <motion.div variants={itemVariants} className="relative group">
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/40 to-zinc-800/20 hidden md:block" />
      
      <div className="flex gap-6 md:gap-8">
        {/* Timeline dot */}
        <div className="hidden md:flex flex-col items-center pt-2">
          <motion.div
            whileHover={{ scale: 1.3 }}
            className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center z-10 group-hover:bg-primary/20 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(249,115,22,0.2)] transition-all duration-500"
          >
            <Icon size={18} className="text-primary" />
          </motion.div>
        </div>

        {/* Content */}
        <motion.div
          whileHover={{ x: 5 }}
          transition={{ duration: 0.3 }}
          className="flex-1 glass-card rounded-2xl p-6 md:p-8 group-hover:shadow-[0_0_30px_rgba(249,115,22,0.05)] transition-all duration-500 mb-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div className="flex-1">
              <h3 className="text-xl font-bold text-foreground leading-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                {item.role || item.degree}
              </h3>
              <p className="text-primary text-sm mt-1">
                {item.company || item.institution}
              </p>
            </div>
            <span className="text-xs text-zinc-500 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 whitespace-nowrap" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              {item.duration}
            </span>
          </div>
          <p className="text-zinc-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const { experience, education } = PORTFOLIO_DATA;

  return (
    <section className="py-32 px-6 sm:px-12 lg:px-24" id="experience">
      <div className="max-w-6xl mx-auto z-10 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-20">
          {/* Experience */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>03.</span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Experience
              </h2>
              <div className="flex-1 h-px bg-zinc-800/50 ml-4" />
            </motion.div>

            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {experience.map((exp, idx) => (
                <TimelineCard key={idx} item={exp} icon={Briefcase} idx={idx} />
              ))}
            </motion.div>
          </div>

          {/* Education */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-4 mb-12"
            >
              <span className="text-primary text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>04.</span>
              <h2 className="text-3xl md:text-4xl font-bold" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                Education
              </h2>
              <div className="flex-1 h-px bg-zinc-800/50 ml-4" />
            </motion.div>

            <motion.div
              variants={timelineVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
            >
              {education.map((edu, idx) => (
                <TimelineCard key={idx} item={edu} icon={GraduationCap} idx={idx} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
