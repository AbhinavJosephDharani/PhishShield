import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const pointsRef = useRef();
  const { viewport } = useThree();

  // Create static positions with viewport-aware spread
  const positions = new Float32Array(count * 3);
  const spread = Math.min(viewport.width, viewport.height) * 0.8; // Adjust spread based on viewport
  
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
    positions[i * 3 + 2] = (Math.random() - 0.5) * spread * 0.5; // Less depth spread
  }

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      const time = clock.getElapsedTime();
      pointsRef.current.rotation.y = time * 0.1;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#60A5FA"
        transparent
        opacity={0.8}
        sizeAttenuation={true}
      />
    </points>
  );
}

function MainScene({ scrollY }) {
  const { camera } = useThree();
  
  useEffect(() => {
    camera.position.z = 8; // Closer camera position
    camera.fov = 50; // Narrower field of view
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
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });

  useEffect(() => {
    setMounted(true);
    
    const updateDimensions = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setDimensions({ width, height });
    };

    // Handle window resize
    const handleResize = () => {
      requestAnimationFrame(() => {
        updateDimensions();
        setMounted(state => !state);
      });
    };

    // Initial setup
    updateDimensions();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className="scene-container">
      <div className="canvas-wrapper">
        <Canvas
          className="w-full h-full"
          camera={{
            fov: 50,
            near: 0.1,
            far: 1000,
            position: [0, 0, 8]
          }}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%'
          }}
        >
          <MainScene scrollY={scrollY} />
        </Canvas>
      </div>
      <div className="content-overlay">
        {children}
      </div>
    </div>
  );
} 