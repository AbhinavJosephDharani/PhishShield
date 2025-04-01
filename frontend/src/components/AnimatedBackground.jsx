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
  const originalPositions = new Float32Array(count * 3);
  
  const color = new THREE.Color();
  const gradientColors = [
    { h: 0.6, s: 0.8, l: 0.6 }, // Blue
    { h: 0.7, s: 0.8, l: 0.6 }, // Purple
    { h: 0.8, s: 0.8, l: 0.6 }, // Pink
  ];
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    
    // Random positions in a sphere with better distribution
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos((Math.random() * 2) - 1);
    const r = Math.pow(Math.random(), 0.33) * radius;
    
    // Add minimum radius to prevent particles in center
    const minRadius = radius * 0.2;
    const adjustedR = minRadius + (r * (radius - minRadius) / radius);
    
    positions[i3] = adjustedR * Math.sin(phi) * Math.cos(theta);
    positions[i3 + 1] = adjustedR * Math.sin(phi) * Math.sin(theta);
    positions[i3 + 2] = adjustedR * Math.cos(phi);
    
    // Store original positions for wave effect
    originalPositions[i3] = positions[i3];
    originalPositions[i3 + 1] = positions[i3 + 1];
    originalPositions[i3 + 2] = positions[i3 + 2];
    
    // Random color from gradient
    const colorIndex = Math.floor(Math.random() * gradientColors.length);
    const { h, s, l } = gradientColors[colorIndex];
    color.setHSL(h + Math.random() * 0.1, s, l);
    colors[i3] = color.r;
    colors[i3 + 1] = color.g;
    colors[i3 + 2] = color.b;
    
    // More uniform sizes with smaller range
    scales[i] = 0.6 + Math.random() * 0.2;
    speeds[i] = (Math.random() - 0.5) * 0.01;
  }
  
  return { positions, colors, scales, speeds, originalPositions };
}

function ParticleField({ count = 5000, size = 8, speed = 0.2, radius = 15 }) {
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
    const colors = pointsRef.current.geometry.attributes.color.array;
    
    // Calculate mouse influence
    const mouseX = mouse.x * viewport.width;
    const mouseY = mouse.y * viewport.height;
    const mouseZ = (mouse.x + mouse.y) * 0.5;
    
    // Animate each particle
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Calculate distance to mouse
      const dx = positions[i3] - mouseX;
      const dy = positions[i3 + 1] - mouseY;
      const dz = positions[i3 + 2] - mouseZ;
      const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
      
      // Wave effect based on mouse position
      const wave = Math.sin(distance * 0.5 - time * 2) * 0.3;
      
      // Move particles away from mouse with smooth easing
      const repulsion = Math.max(0, 1 - distance / 5);
      positions[i3] += dx * repulsion * 0.01;
      positions[i3 + 1] += dy * repulsion * 0.01;
      positions[i3 + 2] += dz * repulsion * 0.01;
      
      // Add wave motion
      positions[i3] += Math.sin(time + data.speeds[i]) * 0.01 + wave;
      positions[i3 + 1] += Math.cos(time + data.speeds[i]) * 0.01 + wave;
      positions[i3 + 2] += data.speeds[i] + wave;
      
      // Color shift based on mouse position and time
      const hueOffset = (Math.sin(time * 0.1) * 0.1) + (mouse.x + mouse.y) * 0.05;
      const color = new THREE.Color().setHSL(
        0.6 + hueOffset + (i / count) * 0.2,
        0.8,
        0.6 + Math.sin(time + i * 0.1) * 0.1
      );
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
      
      // Reset particles that go too far
      if (Math.abs(positions[i3 + 2]) > radius) {
        positions[i3 + 2] *= -0.9;
      }
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;
    
    // Rotate based on mouse position with smooth easing
    pointsRef.current.rotation.x += (mouse.y * 0.3 - pointsRef.current.rotation.x) * 0.05;
    pointsRef.current.rotation.y += (mouse.x * 0.3 - pointsRef.current.rotation.y) * 0.05;
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
        opacity={0.6}
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
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 20, 30]} />
      <ambientLight intensity={0.5} />
      <ParticleField count={5000} size={8} speed={0.2} radius={15} />
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