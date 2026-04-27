import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 1. Abstract Hexagon (About)
export function AbstractHexagon({ scale = 1 }) {
  const ref = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
      ref.current.rotation.x = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z = -t * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.8}>
      <group scale={scale * 0.8}>
        <mesh ref={ref}>
          <cylinderGeometry args={[1, 1, 0.4, 6]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
          <mesh>
            <cylinderGeometry args={[1.05, 1.05, 0.45, 6]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.3} />
          </mesh>
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.6, 0.02, 16, 100]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}

// 2. Abstract Octahedron (Skills)
export function AbstractOctahedron({ scale = 1 }) {
  const ref = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) ref.current.rotation.y = t * 0.2;
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.z = t * 0.15;
    }
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={1}>
      <group scale={scale * 0.9}>
        <mesh ref={ref}>
          <octahedronGeometry args={[1, 0]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
          <mesh>
            <octahedronGeometry args={[1.1, 0]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.2} />
          </mesh>
        </mesh>
        <mesh ref={ringRef}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.5} />
        </mesh>
      </group>
    </Float>
  );
}

// 3. Abstract Torus Knot (Services)
export function AbstractTorusKnot({ scale = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.15;
      ref.current.rotation.x = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.8}>
      <group scale={scale * 0.7}>
        <mesh ref={ref}>
          <torusKnotGeometry args={[1, 0.3, 100, 16]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.8} />
          <mesh>
            <torusKnotGeometry args={[1.05, 0.32, 100, 16]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.15} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

// 4. Abstract Icosahedron (Experience)
export function AbstractIcosahedron({ scale = 1 }) {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.2;
      ref.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={1}>
      <group scale={scale * 0.8}>
        <mesh ref={ref}>
          <icosahedronGeometry args={[1.2, 0]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
          <mesh>
            <icosahedronGeometry args={[1.3, 0]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.25} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

// 5. Abstract Tetrahedron (Projects)
export function AbstractTetrahedron({ scale = 1 }) {
  const ref = useRef();
  const innerRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
      ref.current.rotation.x = t * 0.1;
    }
    if (innerRef.current) {
      innerRef.current.rotation.y = -t * 0.2;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <group scale={scale * 0.9}>
        <mesh ref={ref}>
          <tetrahedronGeometry args={[1.4, 0]} />
          <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.2} />
        </mesh>
        <mesh ref={innerRef}>
          <tetrahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.8} />
          <mesh>
            <tetrahedronGeometry args={[0.85, 0]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.4} />
          </mesh>
        </mesh>
      </group>
    </Float>
  );
}

// 6. Abstract Rings (Contact)
export function AbstractRings({ scale = 1 }) {
  const refs = [useRef(), useRef(), useRef()];
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.forEach((ref, i) => {
      if (ref.current) {
        ref.current.rotation.x = t * (0.1 + i * 0.05);
        ref.current.rotation.y = t * (0.15 + i * 0.05);
      }
    });
  });

  return (
    <Float speed={1} rotationIntensity={0.2} floatIntensity={0.8}>
      <group scale={scale * 0.8}>
        <mesh>
          <sphereGeometry args={[0.4, 16, 16]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={1} />
        </mesh>
        {[0, 1, 2].map((i) => (
          <mesh key={i} ref={refs[i]} rotation={[Math.PI / (i + 2), i, 0]}>
            <torusGeometry args={[1 + i * 0.4, 0.02, 16, 100]} />
            <meshBasicMaterial color="#f97316" transparent opacity={0.6 - i * 0.15} />
          </mesh>
        ))}
      </group>
    </Float>
  );
}

// 7. Abstract Sphere (Smooth Object)
export function AbstractSphere({ scale = 1 }) {
  const ref = useRef();
  const ringRef = useRef();
  
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (ref.current) {
      ref.current.rotation.y = t * 0.15;
      ref.current.rotation.x = t * 0.1;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x = t * 0.2;
      ringRef.current.rotation.y = t * 0.15;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.15} floatIntensity={0.8}>
      <group scale={scale * 0.8}>
        <mesh ref={ref}>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.1} metalness={0.9} />
          <mesh>
            <sphereGeometry args={[1.1, 16, 16]} />
            <meshBasicMaterial color="#f97316" wireframe transparent opacity={0.15} />
          </mesh>
        </mesh>
        <mesh ref={ringRef} rotation={[Math.PI / 4, 0, 0]}>
          <torusGeometry args={[1.5, 0.02, 16, 100]} />
          <meshBasicMaterial color="#f97316" transparent opacity={0.4} />
        </mesh>
      </group>
    </Float>
  );
}
