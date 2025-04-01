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
  const gradientColors = [
    { h: 0.6, s: 0.8, l: 0.5 },  // Blue
    { h: 0.7, s: 0.8, l: 0.5 },  // Purple
    { h: 0.85, s: 0.8, l: 0.5 }, // Pink
    { h: 0.95, s: 0.8, l: 0.5 }  // Red
  ];
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Create a more layered distribution
    const layer = Math.floor(Math.random() * 3); // 0, 1, or 2
    const layerRadius = radius * (0.3 + layer * 0.3); // 30%, 60%, or 90% of radius
    
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    
    positions[i3] = layerRadius * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = layerRadius * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = layerRadius * Math.cos(phi);
    
    // Gradient color based on position
    const heightFactor = (positions[i3 + 1] / radius + 1) / 2; // 0 to 1 based on height
    const colorIndex = Math.floor(heightFactor * gradientColors.length);
    const { h, s, l } = gradientColors[colorIndex];
    
    // Add slight variation to color
    color.setHSL(
      h + (Math.random() - 0.5) * 0.05,
      s,
      l + (Math.random() - 0.5) * 0.1
    );
    
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    // Smaller, more uniform sizes
    scales[i] = 0.5 + Math.random() * 0.2;
    speeds[i] = (Math.random() - 0.5) * 0.002; // Much slower movement
  }
  
  return { positions, colors, scales, speeds };
}

function ParticleField({ count = 2000, size = 6, radius = 15 }) {
  const pointsRef = useRef();
  const [data, setData] = useState(null);
  const { clock } = useThree();
  
  useEffect(() => {
    setData(generateParticles(count, radius));
  }, [count, radius]);
  
  useFrame((state) => {
    if (!pointsRef.current || !data) return;
    
    const time = clock.getElapsedTime() * 0.1; // Slower time scale
    const positions = pointsRef.current.geometry.attributes.position.array;
    const colors = pointsRef.current.geometry.attributes.color.array;
    
    // Gentle floating motion
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Subtle circular motion
      const angle = time + i * 0.0001;
      positions[i3] += Math.sin(angle) * 0.002;
      positions[i3 + 1] += Math.cos(angle) * 0.002;
      
      // Very subtle color pulse
      const color = new THREE.Color();
      const hue = 0.6 + Math.sin(time + i * 0.01) * 0.05;
      color.setHSL(hue, 0.8, 0.5 + Math.sin(time + i * 0.02) * 0.1);
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Very subtle rotation
    pointsRef.current.rotation.y = Math.sin(time * 0.1) * 0.1;
  });
  
  if (!data) return null;
  
  return (
    <Points
      ref={pointsRef}
      positions={data.positions}
      colors={data.colors}
      stride={3}
      frustumCulled={false}
    >
      <PointMaterial
        transparent
        vertexColors
        size={size * 0.003}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.4}
      />
    </Points>
  );
}

function Scene({ scrollY }) {
  const { viewport } = useThree();
  const cameraPositionZ = 20 - scrollY * 0.01; // Reduced scroll effect
  
  useFrame(({ camera }) => {
    camera.position.z = Math.max(15, cameraPositionZ);
    camera.rotation.x = scrollY * -0.0001; // Reduced rotation effect
  });
  
  return (
    <>
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 15, 25]} />
      <ParticleField count={2000} size={6} radius={15} />
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