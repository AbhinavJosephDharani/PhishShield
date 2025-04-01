import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const count = 2000;
  const { viewport } = useThree();
  const [positions, colors] = useState(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const spread = Math.max(viewport.width, viewport.height) * 1.5;
    
    // Theme colors
    const themeColors = [
      new THREE.Color('#60A5FA'), // blue
      new THREE.Color('#A855F7'), // purple
      new THREE.Color('#EC4899')  // pink
    ];
    
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      
      // Position - create a more layered distribution
      const radius = Math.random() * spread;
      const theta = Math.random() * 2 * Math.PI;
      const phi = Math.acos((Math.random() * 2) - 1);
      
      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);
      
      // Color - randomly select from theme colors
      const color = themeColors[Math.floor(Math.random() * themeColors.length)];
      colors[i3] = color.r;
      colors[i3 + 1] = color.g;
      colors[i3 + 2] = color.b;
    }
    return [positions, colors];
  });

  const pointsRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
  });

  // Create a circular point material
  const material = new THREE.PointsMaterial({
    size: 0.3,
    vertexColors: true,
    transparent: true,
    opacity: 0.9,
    sizeAttenuation: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <primitive object={material} />
    </points>
  );
}

function MainScene({ scrollY }) {
  const { camera, viewport, size } = useThree();
  
  useEffect(() => {
    const updateCamera = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', updateCamera);
    updateCamera();
    
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera]);

  useFrame(() => {
    camera.position.y = -(scrollY * 0.01);
    camera.position.z = 20 - Math.min(scrollY * 0.01, 5);
  });

  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 15, 35]} />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[10, 10, 10]} intensity={2.5} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} />
      
      <ParticleField />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
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
        setMounted(state => !state); // Force Three.js canvas update
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
          dpr={window.devicePixelRatio}
          camera={{ 
            position: [0, 0, 15], 
            fov: 75, 
            near: 0.1, 
            far: 1000,
            aspect: dimensions.width / dimensions.height 
          }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
            logarithmicDepthBuffer: true
          }}
          style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0
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