import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const pointsRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const { viewport } = useThree();

  useEffect(() => {
    const handleMouseMove = (event) => {
      mouseRef.current.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Create positions and colors
  const [positions, colors] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const spread = Math.min(viewport.width, viewport.height) * 2;
    
    // Theme colors with more vibrant options
    const themeColors = [
      new THREE.Color('#60A5FA').multiplyScalar(1.2), // bright blue
      new THREE.Color('#818CF8').multiplyScalar(1.2), // bright indigo
      new THREE.Color('#A78BFA').multiplyScalar(1.2), // bright purple
      new THREE.Color('#C084FC').multiplyScalar(1.2), // bright violet
      new THREE.Color('#E879F9').multiplyScalar(1.2), // bright pink
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Create a more uniform distribution in a disc
      const radius = Math.sqrt(Math.random()) * spread;
      const theta = Math.random() * Math.PI * 2;
      
      positions[i3] = radius * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 5;
      
      // Random color from theme
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return [positions, colors];
  });

  // Create a circular texture for particles
  const particleTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext('2d');
    
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.8)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 32, 0, Math.PI * 2);
    ctx.fill();
    
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    return texture;
  }, []);

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime();
      
      // Smooth mouse following
      const targetRotationX = mouseRef.current.y * 0.2;
      const targetRotationY = mouseRef.current.x * 0.2;
      
      pointsRef.current.rotation.x += (targetRotationX - pointsRef.current.rotation.x) * 0.05;
      pointsRef.current.rotation.y += (targetRotationY - pointsRef.current.rotation.y) * 0.05;
      
      // Gentle floating motion
      pointsRef.current.position.y = Math.sin(time * 0.2) * 0.3;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={count}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.2}
        vertexColors
        transparent
        opacity={0.8}
        sizeAttenuation={true}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        map={particleTexture}
        alphaMap={particleTexture}
      />
    </points>
  );
}

export default function Scene3D() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 w-full h-full" style={{ zIndex: -1 }}>
      <Canvas
        className="w-full h-full"
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 5]
        }}
      >
        <color attach="background" args={['#030712']} />
        <ParticleField />
      </Canvas>
    </div>
  );
} 