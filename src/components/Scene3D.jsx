import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere({ position, color, speed }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(time * speed) * 0.3;
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.3;
    meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
  });

  return (
    <mesh
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshPhongMaterial
        color={color}
        shininess={100}
        specular={new THREE.Color(0xffffff)}
        emissive={color}
        emissiveIntensity={0.5}
        toneMapped={false}
      />
    </mesh>
  );
}

function ParticleField() {
  const count = 2000;
  const { viewport } = useThree();
  const [positions] = useState(() => {
    const positions = new Float32Array(count * 3);
    const spread = Math.max(viewport.width, viewport.height) * 2;
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
      positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
    }
    return positions;
  });

  const pointsRef = useRef();

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime();
    pointsRef.current.rotation.y = time * 0.1;
    pointsRef.current.rotation.x = Math.sin(time * 0.05) * 0.2;
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
      </bufferGeometry>
      <pointsMaterial
        size={0.15}
        color="#60A5FA"
        transparent
        opacity={0.8}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function MainScene({ scrollY }) {
  const { camera, viewport, size } = useThree();
  
  useEffect(() => {
    const updateCamera = () => {
      camera.aspect = size.width / size.height;
      camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', updateCamera);
    updateCamera();
    
    return () => window.removeEventListener('resize', updateCamera);
  }, [camera, size]);

  useFrame(() => {
    camera.position.y = -(scrollY * 0.01);
    camera.position.z = 15 - Math.min(scrollY * 0.01, 5);
  });

  return (
    <>
      <color attach="background" args={['#030712']} />
      <fog attach="fog" args={['#030712', 10, 50]} />
      
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={2} />
      <pointLight position={[-10, -10, -10]} intensity={1} />
      <spotLight
        position={[0, 5, 0]}
        angle={0.5}
        penumbra={1}
        intensity={1}
        castShadow
      />
      
      <ParticleField />
      
      <group position={[0, 0, 0]} scale={Math.min(1, viewport.width / 10)}>
        <AnimatedSphere position={[-3, 0, 0]} color="#60A5FA" speed={1} />
        <AnimatedSphere position={[0, 0, 0]} color="#818CF8" speed={1.2} />
        <AnimatedSphere position={[3, 0, 0]} color="#6366F1" speed={1.4} />
      </group>
      
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
  const [aspectClass, setAspectClass] = useState('');

  useEffect(() => {
    setMounted(true);
    
    const updateAspect = () => {
      const newClass = getAspectRatioClass();
      setAspectClass(newClass);
      document.body.className = newClass;
    };

    // Initial update
    updateAspect();

    // Update on resize
    const resizeHandler = () => {
      setMounted(state => !state); // Force Three.js canvas update
      updateAspect();
    };

    // Check aspect ratio every 2 seconds
    const aspectInterval = setInterval(updateAspect, 2000);
    window.addEventListener('resize', resizeHandler);

    return () => {
      clearInterval(aspectInterval);
      window.removeEventListener('resize', resizeHandler);
    };
  }, []);

  if (!mounted) return null;

  return (
    <div className={`scene-container ${aspectClass}`}>
      <div className="fixed inset-0 -z-10">
        <Canvas
          className="w-full h-full"
          dpr={[1, 2]}
          camera={{ position: [0, 0, 15], fov: 75, near: 0.1, far: 1000 }}
          gl={{
            antialias: true,
            alpha: false,
            powerPreference: "high-performance",
            stencil: false,
            depth: true,
          }}
        >
          <MainScene scrollY={scrollY} />
        </Canvas>
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
} 