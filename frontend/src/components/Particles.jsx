import React, { useEffect, useRef } from 'react';
import { Renderer, Camera, Transform, Mesh, Geometry, Program } from 'ogl';

const Particles = ({
  particleColors = ['#ffffff', '#ffffff'],
  particleCount = 200,
  particleSpread = 10,
  speed = 0.1,
  particleBaseSize = 100,
  moveParticlesOnHover = true,
  alphaParticles = false,
  disableRotation = false,
  className = ''
}) => {
  const canvasRef = useRef();
  const animationFrameRef = useRef();
  const rendererRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const particlesRef = useRef();
  const mouseRef = useRef({ x: 0, y: 0 });
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize OGL renderer
    const renderer = new Renderer({ canvas, alpha: true });
    const gl = renderer.gl;
    
    // Set canvas size
    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement;
      canvas.width = clientWidth;
      canvas.height = clientHeight;
      gl.viewport(0, 0, clientWidth, clientHeight);
      
      if (cameraRef.current) {
        cameraRef.current.perspective({
          aspect: clientWidth / clientHeight
        });
      }
    };

    // Create camera
    const camera = new Camera(gl);
    camera.position.set(0, 0, 5);

    // Create scene
    const scene = new Transform();

    // Vertex shader
    const vertex = `
      attribute vec3 position;
      attribute vec3 offset;
      attribute float scale;
      attribute float alpha;
      
      uniform mat4 modelViewMatrix;
      uniform mat4 projectionMatrix;
      uniform float uTime;
      uniform vec2 uMouse;
      uniform bool uMoveOnHover;
      uniform float uSpeed;
      uniform bool uDisableRotation;
      
      varying float vAlpha;
      
      void main() {
        vec3 pos = position;
        
        // Apply offset and time-based movement
        pos += offset;
        pos.y += sin(uTime * uSpeed + offset.x) * 0.1;
        pos.x += cos(uTime * uSpeed + offset.y) * 0.05;
        
        // Mouse interaction
        if (uMoveOnHover) {
          vec2 mouseEffect = (uMouse - offset.xy) * 0.1;
          pos.xy += mouseEffect * 0.2;
        }
        
        // Rotation
        if (!uDisableRotation) {
          float rotation = uTime * uSpeed + offset.z;
          pos.x += cos(rotation) * 0.02;
          pos.z += sin(rotation) * 0.02;
        }
        
        // Scale
        pos *= scale;
        
        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        gl_PointSize = scale * 2.0;
        
        vAlpha = alpha;
      }
    `;

    // Fragment shader
    const fragment = `
      precision highp float;
      
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform bool uAlphaParticles;
      
      varying float vAlpha;
      
      void main() {
        // Create circular particle
        vec2 center = gl_PointCoord - 0.5;
        float dist = length(center);
        
        if (dist > 0.5) discard;
        
        // Color gradient
        vec3 color = mix(uColor1, uColor2, dist * 2.0);
        
        // Alpha based on distance from center
        float alpha = 1.0 - (dist * 2.0);
        
        if (uAlphaParticles) {
          alpha *= vAlpha;
        }
        
        gl_FragColor = vec4(color, alpha * 0.8);
      }
    `;

    // Create geometry
    const geometry = new Geometry(gl, {
      position: { size: 3, data: new Float32Array([0, 0, 0]) }
    });

    // Generate particle data
    const offsets = new Float32Array(particleCount * 3);
    const scales = new Float32Array(particleCount);
    const alphas = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      
      // Random positions
      offsets[i3] = (Math.random() - 0.5) * particleSpread;
      offsets[i3 + 1] = (Math.random() - 0.5) * particleSpread;
      offsets[i3 + 2] = (Math.random() - 0.5) * particleSpread;
      
      // Random scales
      scales[i] = Math.random() * 0.5 + 0.5;
      
      // Random alphas
      alphas[i] = Math.random() * 0.5 + 0.5;
    }

    // Add instanced attributes
    geometry.addAttribute('offset', {
      instanced: 1,
      size: 3,
      data: offsets
    });
    
    geometry.addAttribute('scale', {
      instanced: 1,
      size: 1,
      data: scales
    });
    
    geometry.addAttribute('alpha', {
      instanced: 1,
      size: 1,
      data: alphas
    });

    // Convert hex colors to RGB
    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? [
        parseInt(result[1], 16) / 255,
        parseInt(result[2], 16) / 255,
        parseInt(result[3], 16) / 255
      ] : [1, 1, 1];
    };

    // Create program
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: [0, 0] },
        uColor1: { value: hexToRgb(particleColors[0]) },
        uColor2: { value: hexToRgb(particleColors[1]) },
        uMoveOnHover: { value: moveParticlesOnHover },
        uSpeed: { value: speed },
        uAlphaParticles: { value: alphaParticles },
        uDisableRotation: { value: disableRotation }
      }
    });

    // Create mesh
    const particles = new Mesh(gl, { geometry, program, mode: gl.POINTS });
    particles.setParent(scene);

    // Store references
    rendererRef.current = renderer;
    sceneRef.current = scene;
    cameraRef.current = camera;
    particlesRef.current = particles;

    // Mouse move handler
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      mouseRef.current = { x, y };
      
      if (particlesRef.current && moveParticlesOnHover) {
        particlesRef.current.program.uniforms.uMouse.value = [x, y];
      }
    };

    // Animation loop
    const animate = () => {
      timeRef.current += 0.016; // ~60fps
      
      if (particlesRef.current) {
        particlesRef.current.program.uniforms.uTime.value = timeRef.current;
      }
      
      renderer.render({ scene, camera });
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    window.addEventListener('resize', resize);
    canvas.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Cleanup OGL resources
      if (geometry) geometry.dispose();
      if (program) program.dispose();
      if (renderer) renderer.dispose();
    };
  }, [
    particleColors, 
    particleCount, 
    particleSpread, 
    speed, 
    particleBaseSize, 
    moveParticlesOnHover, 
    alphaParticles, 
    disableRotation
  ]);

  return (
    <div className={`absolute inset-0 ${className}`} style={{ pointerEvents: 'none' }}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          display: 'block'
        }}
      />
    </div>
  );
};

export default Particles;