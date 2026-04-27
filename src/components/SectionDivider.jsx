import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import { AbstractHexagon, AbstractOctahedron, AbstractTorusKnot, AbstractIcosahedron, AbstractTetrahedron, AbstractRings, AbstractSphere } from './Canvas/TechObjects';

export default function SectionDivider({ type }) {
  const getObject = () => {
    switch (type) {
      case 'about': return <AbstractHexagon scale={1.2} />;
      case 'skills': return <AbstractOctahedron scale={1.2} />;
      case 'services': return <AbstractSphere scale={1.2} />;
      case 'experience': return <AbstractIcosahedron scale={1.2} />;
      case 'projects': return <AbstractTetrahedron scale={1.2} />;
      case 'contact': return <AbstractRings scale={1.2} />;
      default: return null;
    }
  };

  return (
    <div className="w-full flex justify-center py-12 md:py-24">
      <motion.div 
        initial={{ opacity: 0, scale: 0.5, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative flex items-center justify-center w-full max-w-4xl"
      >
        {/* Left line */}
        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-zinc-800 to-primary/50" />
        
        {/* Center Object or Glowing Orb */}
        <div className="relative mx-4 sm:mx-8 flex items-center justify-center min-w-[80px] min-h-[80px]">
          {type ? (
            <div className="w-[120px] h-[120px] sm:w-[150px] sm:h-[150px] absolute z-10 pointer-events-auto">
              <Suspense fallback={null}>
                <Canvas camera={{ position: [0, 0, 5], fov: 45 }} style={{ background: 'transparent' }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} intensity={1.5} color="#f97316" />
                  <pointLight position={[-10, -10, -10]} intensity={1} color="#ffffff" />
                  {getObject()}
                </Canvas>
              </Suspense>
            </div>
          ) : (
            <>
              <div className="absolute w-12 h-12 rounded-full bg-primary/20 blur-xl animate-pulse" />
              <div className="absolute w-8 h-8 rounded-full bg-primary/30 blur-md" />
              <div className="w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-primary shadow-[0_0_15px_rgba(249,115,22,1)] flex items-center justify-center">
                <div className="w-1 h-1 bg-white rounded-full opacity-80" />
              </div>
            </>
          )}
        </div>

        {/* Right line */}
        <div className="flex-1 h-px bg-gradient-to-l from-transparent via-zinc-800 to-primary/50" />
      </motion.div>
    </div>
  );
}
