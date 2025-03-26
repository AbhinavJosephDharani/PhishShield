import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Generate random particles in a sphere
function generateParticles(count, radius) {
  const positions = new Float32Array(count * 3);
  const colors = new Float32Array(count * 3);
  const scales = new Float32Array(count);
  const speeds = new Float32Array(count);
  
  const color = new THREE.Color();
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random positions in a sphere
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = Math.pow(Math.random(), 0.5) * radius;
    
    positions[i3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = r * Math.cos(phi);
    
    // Dynamic color range from blue to purple
    color.setHSL(0.6 + Math.random() * 0.1, 0.8, 0.5 + Math.random() * 0.3);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    // Random sizes and speeds
    scales[i] = Math.random() * 0.5 + 0.5;
    speeds[i] = (Math.random() - 0.5) * 0.02;
  }
  
  return { positions, colors, scales, speeds };
}

function ParticleField({ count = 3000, size = 25, speed = 0.2, radius = 15 }) {
  const pointsRef = useRef();
  const [data, setData] = useState(null);
  const { mouse, viewport, clock } = useThree();
  
  useEffect(() => {
    setData(generateParticles(count, radius));
  }, [count, radius]);
  
  useFrame((state) => {
    if (!pointsRef.current || !data) return;
    
    const time = clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array;
    
    // Animate each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Spiral motion
      positions[i3] += Math.sin(time + data.speeds[i]) * 0.02;
      positions[i3 + 1] += Math.cos(time + data.speeds[i]) * 0.02;
      positions[i3 + 2] += data.speeds[i];
      
      // Reset particles that go too far
      if (Math.abs(positions[i3 + 2]) > radius) {
        positions[i3 + 2] *= -0.9;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Follow mouse with smooth movement
    pointsRef.current.rotation.x += (mouse.y * 0.2 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (mouse.x * 0.2 - pointsRef.current.rotation.y) * 0.05;
  });
  
  if (!data) return null;
  
  return (
    <Points
      ref={pointsRef}
      positions={data.positions}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={size * 0.01}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.8}
      />
    </Points>
  );
}

function Scene({ scrollY }) {
  const { viewport } = useThree();
  const cameraPositionZ = 20 - scrollY * 0.015;
  
  useFrame(({ camera }) => {
    camera.position.z = Math.max(12, cameraPositionZ);
    camera.rotation.x = scrollY * -0.0002;
  });
  
  return (
    <>
      <color attach="background" args={['#020617']} />
      <fog attach="fog" args={['#020617', 20, 30]} />
      <ambientLight intensity={0.5} />
      <ParticleField count={3000} size={25} speed={0.2} radius={15} />
    </>
  );
}

export default function AnimatedBackground({ scrollY = 0 }) {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0">
      <Canvas
        dpr={[1, 2]}
        camera={{ position: [0, 0, 20], fov: 50, near: 0.1, far: 1000 }}
        gl={{ antialias: true, alpha: false }}
      >
        <Scene scrollY={scrollY} />
      </Canvas>
    </div>
  );
} 