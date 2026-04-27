import { motion, useScroll, useTransform } from 'framer-motion';
import { PORTFOLIO_DATA } from '../../utils/data';
import { Code2, Mail, Camera, MessageCircle, ChevronDown } from 'lucide-react';
import { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, useGLTF, useAnimations, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import ParallaxWrapper from '../ParallaxWrapper';

/* ========== ROBOT CHARACTER ========== */
function RobotCharacter() {
  const group = useRef();
  const { scene, animations } = useGLTF('/robot.glb');
  const { actions, names } = useAnimations(animations, group);
  const { size } = useThree();
  const isMobile = size.width < 768;
  const scale = isMobile ? 0.48 : 0.55;
  // Shift right slightly on mobile to optically center the body since the left hand sticks out
  const xOffset = isMobile ? 0.3 : 0;

  useEffect(() => {
    const animName = names.includes('Wave') ? 'Wave' : names.includes('Idle') ? 'Idle' : names[0];
    if (actions && actions[animName]) {
      actions[animName].reset().fadeIn(0.5).play();
    }
  }, [actions, names]);

  useFrame((state) => {
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, state.pointer.x * 0.8, 0.03);
    }
  });

  return (
    <>
      <Float speed={1.5} rotationIntensity={0.03} floatIntensity={0.2}>
        <group ref={group} position={[xOffset, -1.4, 0]} scale={scale}>
          <primitive object={scene} />
        </group>
      </Float>
      <ContactShadows position={[0, -1.4, 0]} scale={15} resolution={1024} blur={2} opacity={0.4} far={10} color="#f97316" />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[xOffset, -1.39, 0]}>
        <ringGeometry args={[isMobile ? 0.7 : 0.8, isMobile ? 0.75 : 0.85, 64]} />
        <meshBasicMaterial color="#f97316" transparent opacity={0.3} />
      </mesh>
    </>
  );
}

useGLTF.preload('/robot.glb');

const iconMap = {
  Github: Code2,
  Mail,
  Instagram: Camera,
  WhatsApp: MessageCircle
};

const letterVariants = {
  hidden: { y: 100, opacity: 0 },
  visible: (i) => ({
    y: 0,
    opacity: 1,
    transition: { delay: 0.8 + i * 0.04, duration: 0.6, ease: [0.215, 0.61, 0.355, 1] }
  })
};

const AnimatedText = ({ text, className }) => (
  <span className={`inline-flex flex-wrap overflow-hidden ${className}`}>
    {text.split("").map((char, i) => (
      <motion.span
        key={i}
        custom={i}
        variants={letterVariants}
        initial="hidden"
        animate="visible"
        className={char === " " ? "mr-2" : ""}
      >
        {char === " " ? "\u00A0" : char}
      </motion.span>
    ))}
  </span>
);

export default function Hero() {
  const { hero } = PORTFOLIO_DATA;
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  
  // Custom parallax using the single scrollYProgress to avoid jitter
  const yText = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const yRobot = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={sectionRef} className="relative min-h-[100dvh] w-full flex flex-col justify-start lg:justify-center px-6 sm:px-12 lg:px-24 pt-32 lg:pt-28 pb-20 overflow-x-clip">
      <motion.div style={{ opacity }} className="max-w-6xl mx-auto w-full z-10 flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-8 mt-4 lg:mt-0">

        {/* 3D Robot — Top on Mobile (order-first), Right on Desktop (order-last) */}
        <motion.div style={{ y: yRobot }} className="order-first lg:order-last flex-shrink-0 flex justify-center w-full lg:w-auto">
          <motion.div
             className="w-full max-w-[360px] sm:max-w-[420px] lg:w-[480px] relative z-20 flex flex-col items-center justify-center gap-6"
          >
            <div className="w-full h-[280px] sm:h-[320px] lg:h-[450px]">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5.5], fov: 32 }} style={{ background: 'transparent' }}>
                  <ambientLight intensity={1.2} />
                  <directionalLight position={[5, 8, 5]} intensity={3} color="#ffffff" castShadow />
                  <pointLight position={[-3, 3, 5]} intensity={2} color="#f97316" />
                  <pointLight position={[3, -2, -3]} intensity={1} color="#f59e0b" />
                  <RobotCharacter />
                </Canvas>
              </Suspense>
            </div>
            {/* Available for work badge — Moved below robot */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card"
            >
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(249,115,22,0.8)]" />
              <span className="text-xs text-zinc-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                Available for work
              </span>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Left Text Content — Bottom on Mobile (order-last), Left on Desktop (order-first) */}
        <motion.div style={{ y: yText }} className="flex-1 order-last lg:order-first w-full max-w-2xl">
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left w-full">

            {/* Name */}
            <div className="mb-4">
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold leading-[1.05] tracking-tight flex flex-wrap justify-center lg:justify-start" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
                <AnimatedText text="Aditya Kumar" className="text-gradient" />
              </h1>
            </div>

            {/* Subtitle line */}
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              transition={{ delay: 1.8, duration: 0.8, ease: "easeOut" }}
              className="overflow-hidden mb-6"
            >
              <div className="flex items-center gap-4">
                <div className="h-px w-8 lg:w-12 bg-primary" />
                <span className="text-primary text-[10px] sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] uppercase text-center" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                  Turning ideas into reality 💡
                </span>
                <div className="h-px w-8 lg:w-12 bg-primary lg:hidden" />
              </div>
            </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.2, duration: 0.8 }}
            className="text-zinc-500 text-base sm:text-lg lg:text-xl max-w-xl leading-relaxed mb-8"
          >
            Full-Stack Developer crafting modern Frontend & Backend solutions 💻
          </motion.p>

          {/* Social links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.6, duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center lg:justify-start mb-8 lg:mb-12"
          >
            {hero.socials.map((social, idx) => {
              const IconComponent = iconMap[social.name] || Mail;
              return (
                <motion.a
                  key={idx}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group flex items-center gap-2.5 px-5 py-3 rounded-xl glass-card text-zinc-400 hover:text-primary transition-all duration-300 hover:shadow-[0_0_20px_rgba(249,115,22,0.1)]"
                >
                  <IconComponent size={16} className="group-hover:rotate-12 transition-transform duration-300" />
                  <span className="text-sm" style={{ fontFamily: 'JetBrains Mono, monospace' }}>{social.name}</span>
                </motion.a>
              );
            })}
          </motion.div>

          {/* Code block + Quote — side by side on desktop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 items-center lg:items-start"
          >
            {/* Code block */}
            <div className="glass-card rounded-xl p-3 sm:p-4 border border-zinc-800/50 hover:border-primary/30 transition-colors duration-500 text-left max-w-sm w-full">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/70" />
                <span className="text-zinc-700 text-[9px] ml-2" style={{ fontFamily: 'JetBrains Mono, monospace' }}>~/aditya/stack.js</span>
              </div>
              <div className="text-[10px] sm:text-[11px] leading-[1.8]" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <div><span className="text-purple-400">const</span> <span className="text-blue-400">stack</span> <span className="text-zinc-500">=</span> <span className="text-yellow-400">{'{'}</span></div>
                <div className="ml-4"><span className="text-zinc-500">frontend:</span> <span className="text-emerald-400">[</span></div>
                <div className="ml-8"><span className="text-emerald-400">"React", "Next.js", "Vue",</span></div>
                <div className="ml-8"><span className="text-emerald-400">"TypeScript", "Tailwind"</span></div>
                <div className="ml-4"><span className="text-emerald-400">],</span></div>
                <div className="ml-4"><span className="text-zinc-500">backend:</span> <span className="text-emerald-400">[</span></div>
                <div className="ml-8"><span className="text-emerald-400">"Node", "Express", "PHP",</span></div>
                <div className="ml-8"><span className="text-emerald-400">"Laravel", "Flask"</span></div>
                <div className="ml-4"><span className="text-emerald-400">],</span></div>
                <div className="ml-4"><span className="text-zinc-500">deploy:</span> <span className="text-orange-400">[</span></div>
                <div className="ml-8"><span className="text-orange-400">"AWS", "Vercel", "Netlify",</span></div>
                <div className="ml-8"><span className="text-orange-400">"GoDaddy", "Hostinger"</span></div>
                <div className="ml-4"><span className="text-orange-400">]</span></div>
                <div><span className="text-yellow-400">{'}'}</span><span className="text-zinc-600">;</span></div>
              </div>
            </div>

            {/* Quote card */}
            <div className="glass-card rounded-xl p-4 border border-zinc-800/50 max-w-xs w-full flex flex-col justify-center">
              <p className="text-zinc-500 text-[11px] italic leading-relaxed mb-3" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
                <span className="text-primary text-lg leading-none">"</span>
                It works on my machine — then we ship the machine 🚀
                <span className="text-primary text-lg leading-none">"</span>
              </p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-primary text-[10px] font-bold">A</span>
                </div>
                <div>
                  <div className="text-[10px] text-zinc-400" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Aditya Kumar</div>
                  <div className="text-[9px] text-zinc-600" style={{ fontFamily: 'JetBrains Mono, monospace' }}>Full-Stack Dev</div>
                </div>
              </div>
            </div>
          </motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Decorative side element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-3"
      >
        <div className="w-px h-24 bg-gradient-to-b from-transparent to-zinc-700" />
        <span className="text-zinc-700 text-[10px] tracking-widest uppercase" style={{ writingMode: 'vertical-rl', fontFamily: 'JetBrains Mono, monospace' }}>
          scroll to explore
        </span>
        <div className="w-px h-24 bg-gradient-to-b from-zinc-700 to-transparent" />
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <ChevronDown size={20} className="text-zinc-600" />
        </motion.div>
      </motion.div>
    </section>
  );
}
