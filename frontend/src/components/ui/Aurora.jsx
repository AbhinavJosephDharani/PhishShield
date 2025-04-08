import React, { useEffect, useRef } from 'react';

const Aurora = ({ colorStops = ["#3A29FF", "#FF94B4", "#FF3232"], blend = 0.5, amplitude = 1.0, speed = 0.5 }) => {
  const containerRef = useRef(null);
  const rendererRef = useRef(null);
  const programRef = useRef(null);
  const meshRef = useRef(null);
  const timeRef = useRef(0);
  const animationFrameRef = useRef(null);

  useEffect(() => {
    const initAurora = async () => {
      if (!containerRef.current) {
        console.error('Aurora: Container ref is not available');
        return;
      }

      try {
        console.log('Aurora: Starting initialization');
        
        // Load OGL from CDN
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/ogl@0.0.79/dist/ogl.min.js';
        script.async = true;
        
        script.onload = () => {
          const { Renderer, Program, Mesh, Triangle } = window.OGL;
          
          // Initialize OGL renderer
          const renderer = new Renderer({
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
            dpr: window.devicePixelRatio,
            alpha: true,
            antialias: true,
          });
          rendererRef.current = renderer;
          console.log('Aurora: Renderer created with dimensions:', {
            width: containerRef.current.clientWidth,
            height: containerRef.current.clientHeight,
            dpr: window.devicePixelRatio
          });

          containerRef.current.appendChild(renderer.gl.canvas);

          // Create program
          const program = new Program(renderer.gl, {
            vertex: `
              attribute vec2 position;
              varying vec2 vUv;
              void main() {
                vUv = position * 0.5 + 0.5;
                gl_Position = vec4(position, 0, 1);
              }
            `,
            fragment: `
              precision highp float;
              uniform float time;
              uniform float blend;
              uniform float amplitude;
              uniform float speed;
              uniform vec3 color1;
              uniform vec3 color2;
              uniform vec3 color3;
              varying vec2 vUv;

              void main() {
                float t = time * speed;
                vec2 uv = vUv * 2.0 - 1.0;
                
                float d1 = length(uv - vec2(sin(t), cos(t)) * 0.3);
                float d2 = length(uv - vec2(cos(t * 0.7), sin(t * 0.7)) * 0.3);
                float d3 = length(uv - vec2(sin(t * 0.5), cos(t * 0.5)) * 0.3);
                
                vec3 c1 = mix(color1, color2, smoothstep(0.0, blend, d1));
                vec3 c2 = mix(c1, color3, smoothstep(0.0, blend, d2));
                vec3 c3 = mix(c2, color1, smoothstep(0.0, blend, d3));
                
                gl_FragColor = vec4(c3, 1.0);
              }
            `,
            uniforms: {
              time: { value: 0 },
              blend: { value: blend },
              amplitude: { value: amplitude },
              speed: { value: speed },
              color1: { value: hexToRgb(colorStops[0]) },
              color2: { value: hexToRgb(colorStops[1]) },
              color3: { value: hexToRgb(colorStops[2]) },
            },
          });
          programRef.current = program;
          console.log('Aurora: Program created successfully');

          // Create mesh
          const geometry = new Triangle(renderer.gl);
          const mesh = new Mesh(renderer.gl, { geometry, program });
          meshRef.current = mesh;
          console.log('Aurora: Mesh created successfully');

          // Animation loop
          const animate = () => {
            timeRef.current += 0.01;
            programRef.current.uniforms.time.value = timeRef.current;
            renderer.render({ scene: meshRef.current });
            animationFrameRef.current = requestAnimationFrame(animate);
          };
          animate();
          console.log('Aurora: Animation started');

          // Handle resize
          const handleResize = () => {
            if (!containerRef.current || !renderer) {
              console.error('Aurora: Resize failed - container or renderer not available');
              return;
            }
            renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
            console.log('Aurora: Resized to:', {
              width: containerRef.current.clientWidth,
              height: containerRef.current.clientHeight
            });
          };
          window.addEventListener('resize', handleResize);

          return () => {
            console.log('Aurora: Cleaning up');
            window.removeEventListener('resize', handleResize);
            if (animationFrameRef.current) {
              cancelAnimationFrame(animationFrameRef.current);
            }
            if (containerRef.current && renderer.gl.canvas) {
              containerRef.current.removeChild(renderer.gl.canvas);
            }
          };
        };

        script.onerror = (error) => {
          console.error('Aurora: Failed to load OGL:', error);
        };

        document.head.appendChild(script);

        return () => {
          if (script.parentNode) {
            script.parentNode.removeChild(script);
          }
        };
      } catch (error) {
        console.error('Aurora: Error during initialization:', error);
      }
    };

    initAurora();
  }, [colorStops, blend, amplitude, speed]);

  const hexToRgb = (hex) => {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    return [r, g, b];
  };

  return (
    <div 
      ref={containerRef} 
      className="aurora-container fixed inset-0 z-[-1] w-full h-full overflow-hidden"
      style={{
        background: 'transparent',
        pointerEvents: 'none',
        mixBlendMode: 'screen',
      }}
    />
  );
};

export default Aurora; 