import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Text, MeshDistortMaterial, Environment, Sphere } from '@react-three/drei';

const FloatingShapes = () => {
  const group = useRef();
  
  useFrame((state) => {
    group.current.rotation.x = state.clock.elapsedTime * 0.1;
    group.current.rotation.y = state.clock.elapsedTime * 0.15;
  });

  return (
    <group ref={group}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
        <Text fontSize={3.5} letterSpacing={0.1} color="#ffffff" opacity={0.3} transparent anchorX="center" anchorY="middle" position={[0, 0, -8]} font="https://fonts.gstatic.com/s/outfit/v36/QGYvz_MVcBeNP4NJtEtq.woff">
          I N T E R A C T I V E
        </Text>
      </Float>
      
      <Float speed={4} rotationIntensity={2} floatIntensity={2} position={[-4, 2, -3]}>
         <Sphere args={[1.2, 64, 64]}>
            <MeshDistortMaterial color="#4f00ff" speed={3} distort={0.6} metalness={0.9} roughness={0.0} />
         </Sphere>
      </Float>

      <Float speed={3} rotationIntensity={3} floatIntensity={1} position={[6, -2, -4]}>
         <Sphere args={[1.8, 64, 64]}>
            <MeshDistortMaterial color="#00ffcc" speed={4} distort={0.4} metalness={1} roughness={0.1} />
         </Sphere>
      </Float>

      <Float speed={2} rotationIntensity={1} floatIntensity={3} position={[-5, -3, -6]}>
         <Sphere args={[2.5, 64, 64]}>
            <MeshDistortMaterial color="#ffffff" speed={2} distort={0.2} metalness={0.5} roughness={0.5} opacity={0.1} transparent />
         </Sphere>
      </Float>
    </group>
  );
};

export default function Background3D() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: -1, background: '#020202' }}>
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={1} />
        <directionalLight position={[10, 10, 5]} intensity={2} color="#4f00ff" />
        <directionalLight position={[-10, -10, -5]} intensity={2} color="#00ffcc" />
        <Stars radius={100} depth={50} count={3000} factor={4} saturation={0} fade speed={1.5} />
        <FloatingShapes />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
