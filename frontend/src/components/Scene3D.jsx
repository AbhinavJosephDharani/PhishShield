import { useRef, useState, useEffect, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const pointsRef = useRef();
  const { viewport } = useThree();

  // Create positions and colors
  const [positions, colors] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const spread = Math.min(viewport.width, viewport.height) * 1.5;
    
    // Theme colors
    const themeColors = [
      new THREE.Color('#60A5FA'), // blue
      new THREE.Color('#818CF8'), // light indigo
      new THREE.Color('#A78BFA'), // purple
      new THREE.Color('#C084FC'), // bright purple
      new THREE.Color('#E879F9'), // pink
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position - create a more layered distribution
      const radius = Math.random() * spread;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = (Math.random() - 0.5) * 4; // Slightly more depth
      
      // Color - randomly select from theme colors
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
    
    // Draw a circular gradient
    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
    gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
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
      pointsRef.current.rotation.y = time * 0.05; // Slower rotation
      pointsRef.current.position.y = Math.sin(time * 0.3) * 0.2; // Gentle floating
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
        size={0.15}
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

function MainScene({ scrollY }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 5;
    camera.fov = 75;
    camera.updateProjectionMatrix();
  }, [camera]);

  return (
    <>
      <color attach="background" args={['#030712']} />
      <ambientLight intensity={1} />
      <ParticleField />
    </>
  );
}

function getAspectRatioClass() {
  const h = window.innerHeight;
  const w = window.innerWidth;
  const aspect = w / h;
  const ratio43 = 4 / 3;

  if (aspect > ratio43) {
    return 'widescreen';
  } else if (Math.abs(aspect - ratio43) < 0.1) {
    return 'aspect-4-3';
  } else {
    return 'portrait';
  }
}

export default function Scene3D({ scrollY = 0, children }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      requestAnimationFrame(() => {
        setMounted(state => !state);
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return null;

  return (
    <div 
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    >
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
        <MainScene scrollY={scrollY} />
      </Canvas>
      {children}
    </div>
  );
} 