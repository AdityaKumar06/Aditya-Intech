import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useRef, useMemo, Suspense } from 'react';
import * as THREE from 'three';
import { Float, MeshTransmissionMaterial, Sparkles, Stars, Text } from '@react-three/drei';

/* ========== FULL-SCREEN INTERACTIVE PARTICLES ========== */
function InteractiveParticles() {
  const meshRef = useRef();
  const count = 3000;

  const { positions, originalPositions } = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const orig = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 50;
      const y = (Math.random() - 0.5) * 30;
      const z = (Math.random() - 0.5) * 20 - 5;
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;
      orig[i * 3] = x;
      orig[i * 3 + 1] = y;
      orig[i * 3 + 2] = z;
    }
    return { positions: pos, originalPositions: orig };
  }, []);

  const mouse3D = useRef(new THREE.Vector3(0, 0, 0));

  useFrame((state) => {
    const vec = new THREE.Vector3(state.pointer.x, state.pointer.y, 0.5);
    vec.unproject(state.camera);
    const dir = vec.sub(state.camera.position).normalize();
    const dist = -state.camera.position.z / dir.z || 0;
    const target = state.camera.position.clone().add(dir.multiplyScalar(dist));
    mouse3D.current.lerp(target, 0.15);

    if (!meshRef.current) return;
    const posArr = meshRef.current.geometry.attributes.position.array;
    const t = state.clock.elapsedTime;

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      const ox = originalPositions[i3];
      const oy = originalPositions[i3 + 1];
      const oz = originalPositions[i3 + 2];
      const wave = Math.sin(ox * 0.15 + t * 0.4) * Math.cos(oz * 0.15 + t * 0.3) * 0.8;
      const dx = posArr[i3] - mouse3D.current.x;
      const dy = posArr[i3 + 1] - mouse3D.current.y;
      const d = Math.sqrt(dx * dx + dy * dy);
      let ripple = 0;
      if (d < 6) {
        const force = (6 - d) / 6;
        ripple = Math.sin(force * Math.PI * 2) * 3;
      }
      posArr[i3] = THREE.MathUtils.lerp(posArr[i3], ox + (d < 6 ? dx * 0.15 : 0), 0.05);
      posArr[i3 + 1] = THREE.MathUtils.lerp(posArr[i3 + 1], oy + wave + ripple, 0.08);
      posArr[i3 + 2] = THREE.MathUtils.lerp(posArr[i3 + 2], oz, 0.05);
    }
    meshRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.06} color="#ff9900" transparent opacity={0.9} sizeAttenuation blending={THREE.AdditiveBlending} />
    </points>
  );
}

/* ========== SIDE OBJECT: TECH CIRCUIT SPHERE — pushed far right edge ========== */
function CircuitSphere({ position }) {
  const groupRef = useRef();
  const ringRefs = [useRef(), useRef(), useRef()];
  const isDragging = useRef(false);
  const prevPointer = useRef({ x: 0, y: 0 });
  const targetRot = useRef({ x: 0, y: 0 });

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      if (isDragging.current) {
        const dx = state.pointer.x - prevPointer.current.x;
        const dy = state.pointer.y - prevPointer.current.y;
        targetRot.current.y += dx * 4;
        targetRot.current.x += dy * 2;
        prevPointer.current = { x: state.pointer.x, y: state.pointer.y };
      }
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRot.current.y + t * 0.1, 0.06);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRot.current.x, 0.06);
    }
    ringRefs.forEach((ref, i) => {
      if (ref.current) ref.current.rotation.z = t * (0.3 + i * 0.15);
    });
  });

  const onPointerDown = (e) => { e.stopPropagation(); isDragging.current = true; prevPointer.current = { x: e.pointer.x, y: e.pointer.y }; };
  const onPointerUp = () => { isDragging.current = false; };

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={1.5}>
      <group ref={groupRef} position={position} onPointerDown={onPointerDown} onPointerUp={onPointerUp} onPointerLeave={onPointerUp}>
        <mesh>
          <icosahedronGeometry args={[1.2, 2]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
        </mesh>
        <mesh>
          <icosahedronGeometry args={[1.25, 2]} />
          <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.15} />
        </mesh>
        {/* Floating Code Symbol Inside */}
        <Text
          position={[0, 0, 0]}
          fontSize={0.8}
          color="#f97316"
          anchorX="center"
          anchorY="middle"
        >
          {'{ }'}
        </Text>
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={ringRefs[i]} rotation={[Math.PI / (2 + i), i * 0.5, 0]}>
            <torusGeometry args={[1.6 + i * 0.3, 0.015, 8, 80]} />
            <meshStandardMaterial color="#f97316" emissive="#f97316" emissiveIntensity={1 - i * 0.3} transparent opacity={0.5 - i * 0.1} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

function CameraRig() {
  useFrame((state) => {
    state.camera.position.x = THREE.MathUtils.lerp(state.camera.position.x, state.pointer.x * 1.5, 0.05);
    state.camera.position.y = THREE.MathUtils.lerp(state.camera.position.y, state.pointer.y * 1.5, 0.05);
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

function ParallaxBackgroundGroup({ children }) {
  const groupRef = useRef();
  const { viewport } = useThree();
  
  useFrame(() => {
    if (groupRef.current) {
      // scrollY / innerHeight gives exact number of screens scrolled.
      // Multiply by viewport.height so the 3D scene scrolls exactly 1 viewport height per screen!
      const scrollScreens = window.scrollY / window.innerHeight;
      groupRef.current.position.y = THREE.MathUtils.lerp(
        groupRef.current.position.y,
        scrollScreens * viewport.height,
        0.08
      );
    }
  });
  return <group ref={groupRef}>{children}</group>;
}

function ResponsivePlacement({ side, sectionIndex, children, baseZ = -5, offsetYRatio = 0, mobileOffsetYRatio }) {
  const { viewport } = useThree();
  
  // Calculate true width at the given Z depth due to perspective (Camera is at Z=15)
  const depthFactor = (15 - baseZ) / 15;
  const widthAtDepth = viewport.width * depthFactor;
  
  // Detect if mobile based on base viewport width
  const isMobile = viewport.width < 8;
  
  // Calculate X position relative to the screen edge at this specific depth
  // 80% towards the edge on laptops/desktops, 85% on mobile
  const xOffset = isMobile ? (widthAtDepth / 2) * 0.85 : (widthAtDepth / 2) * 0.8;
  const x = side === 'right' ? xOffset : -xOffset;
  
  // Calculate Y position
  const actualOffsetY = isMobile && mobileOffsetYRatio !== undefined ? mobileOffsetYRatio : offsetYRatio;
  const y = -sectionIndex * viewport.height + (viewport.height * actualOffsetY);
  
  // Scale down heavily on mobile to prevent overlapping with text
  const scale = isMobile ? 0.5 : 1;
  
  return (
    <group position={[x, y, baseZ]} scale={scale}>
      {children}
    </group>
  );
}

/* ========== MAIN SCENE ========== */
export default function Scene() {
  return (
    <div className="fixed inset-0 z-[-1]" style={{ background: '#000000' }}>
      <Canvas camera={{ position: [0, 0, 15], fov: 45 }} dpr={[1, 1.5]} gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.3} />
        <spotLight position={[10, 20, 10]} angle={0.2} penumbra={1} intensity={3} color="#f97316" />
        <pointLight position={[-10, -10, -10]} intensity={2} color="#ffffff" />
        <pointLight position={[0, -10, 0]} intensity={1.5} color="#f59e0b" />

        <CameraRig />
        {/* Everything else gets pushed up to simulate depth parallax! */}
        <ParallaxBackgroundGroup>
          <Stars radius={80} depth={60} count={3000} factor={3} saturation={0} fade speed={0.8} />
          <Sparkles count={150} scale={25} size={1.5} speed={0.3} opacity={0.2} color="#f97316" />
          <InteractiveParticles />
          
          <Suspense fallback={null}>
            {/* Section 1: Hero */}
            <ResponsivePlacement side="right" sectionIndex={0} offsetYRatio={-0.35} mobileOffsetYRatio={0.4}>
              <CircuitSphere position={[0, 0, 0]} />
            </ResponsivePlacement>
          </Suspense>
        </ParallaxBackgroundGroup>

        <fog attach="fog" args={['#000000', 8, 40]} />
      </Canvas>
    </div>
  );
}
