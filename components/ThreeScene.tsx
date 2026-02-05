import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

const StarField = (props: any) => {
  const ref = useRef<THREE.Points>(null!);
  
  const [sphere] = useMemo(() => {
    const positions = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
        const r = 1.5;
        const theta = 2 * Math.PI * Math.random();
        const phi = Math.acos(2 * Math.random() - 1);
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        // Distribute them in a larger sphere
        positions[i * 3] = x + (Math.random() - 0.5) * 2; 
        positions[i * 3 + 1] = y + (Math.random() - 0.5) * 2;
        positions[i * 3 + 2] = z + (Math.random() - 0.5) * 2;
    }
    return [positions];
  }, []);

  useFrame((state, delta) => {
    if (ref.current) {
        ref.current.rotation.x -= delta / 10;
        ref.current.rotation.y -= delta / 15;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#bc13fe"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

export const ThreeScene: React.FC = () => {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full bg-dark-bg">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <StarField />
      </Canvas>
    </div>
  );
};
