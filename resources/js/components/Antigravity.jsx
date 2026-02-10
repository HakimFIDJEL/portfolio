import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef, useState, useEffect } from 'react';
import * as THREE from 'three';
import { useCursorPreference } from '@/hooks/use-cursor-preference';

let globalMouse = { x: 0, y: 0, hasMoved: false };

if (typeof window !== 'undefined') {
  const updateMouse = (e) => {
    globalMouse.x = (e.clientX / window.innerWidth) * 2 - 1;
    globalMouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    globalMouse.hasMoved = true;
  };
  window.addEventListener('mousemove', updateMouse, { passive: true });
}

const AntigravityInner = ({
  count = 300,
  magnetRadius = 10,
  ringRadius = 10,
  waveSpeed = 0.4,
  waveAmplitude = 1,
  idleSize = 0.2,
  activeSize = 0.5,
  idleColorVar = "--foreground",
  activeColorVar = "--primary",
  lerpSpeed = 0.1,
  autoAnimate = false,
  particleVariance = 1,
  rotationSpeed = 0,
  depthFactor = 1,
  pulseSpeed = 3,
  particleShape = 'capsule',
  fieldStrength = 10
}) => {

  const resolveColor = (input) => {
    if (typeof document === 'undefined') return '#000000';
    const div = document.createElement('div');
    div.style.color = input.startsWith('--') ? `var(${input})` : input;
    document.body.appendChild(div);
    const style = getComputedStyle(div).color;
    document.body.removeChild(div);
    
    const ctx = document.createElement('canvas').getContext('2d');
    ctx.fillStyle = style;
    return ctx.fillStyle; 
  };

  const [color, setColor] = useState(() => resolveColor(idleColorVar));
  const [particleSize, setParticleSize] = useState(idleSize);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleInteract = (e) => {
      const target = e.target;
      const isInteractive = target.closest('a') || target.closest('button');
      setColor(resolveColor(isInteractive ? activeColorVar : idleColorVar));
      setParticleSize(isInteractive ? activeSize : idleSize);
    };

    const handleFirstMove = () => setIsVisible(true);

    window.addEventListener('mouseover', handleInteract, { passive: true });
    window.addEventListener('mousemove', handleFirstMove, { once: true });
    
    if (globalMouse.hasMoved) setIsVisible(true);

    return () => {
      window.removeEventListener('mouseover', handleInteract);
      window.removeEventListener('mousemove', handleFirstMove);
    };
  }, [activeColorVar, idleColorVar, activeSize, idleSize]);

  const meshRef = useRef(null);
  const { viewport } = useThree();
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const virtualMouse = useRef({ x: 0, y: 0 });
  const initialized = useRef(false);

  const particles = useMemo(() => {
    const temp = new Array(count);
    const w = viewport.width || 100;
    const h = viewport.height || 100;

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * w;
      const y = (Math.random() - 0.5) * h;
      const z = (Math.random() - 0.5) * 20;
      temp[i] = {
        t: Math.random() * 100,
        speed: 0.01 + Math.random() / 200,
        mx: x, my: y, mz: z,
        cx: x, cy: y, cz: z,
        ro: (Math.random() - 0.5) * 2
      };
    }
    return temp;
  }, [count, viewport.width, viewport.height]);

  useFrame((state) => {
    const mesh = meshRef.current;
    if (!mesh || !isVisible) return;

    const { viewport: v, pointer: m } = state;
    const time = state.clock.getElapsedTime();

    let destX = (globalMouse.hasMoved ? globalMouse.x : m.x) * v.width * 0.5;
    let destY = (globalMouse.hasMoved ? globalMouse.y : m.y) * v.height * 0.5;

    if (autoAnimate && !globalMouse.hasMoved) {
      destX = Math.sin(time * 0.5) * (v.width * 0.25);
      destY = Math.cos(time) * (v.height * 0.25);
    }

    if (!initialized.current) {
      virtualMouse.current.x = destX;
      virtualMouse.current.y = destY;
      initialized.current = true;
    } else {
      virtualMouse.current.x += (destX - virtualMouse.current.x) * 0.08;
      virtualMouse.current.y += (destY - virtualMouse.current.y) * 0.08;
    }

    const tx = virtualMouse.current.x;
    const ty = virtualMouse.current.y;
    const rot = time * rotationSpeed;
    const invStr = 5 / (fieldStrength + 0.1);
    const magSq = magnetRadius * magnetRadius;

    for (let i = 0; i < count; i++) {
      const p = particles[i];
      p.t += p.speed * 0.5;

      const pf = 1 - p.cz / 50;
      const ptx = tx * pf;
      const pty = ty * pf;

      const dx = p.mx - ptx;
      const dy = p.my - pty;
      const distSq = dx * dx + dy * dy;

      let targetX = p.mx;
      let targetY = p.my;
      let targetZ = p.mz * depthFactor;

      if (distSq < magSq) {
        const angle = Math.atan2(dy, dx) + rot;
        const wave = Math.sin(p.t * waveSpeed + angle) * (0.5 * waveAmplitude);
        const rad = ringRadius + wave + (p.ro * invStr);

        targetX = ptx + rad * Math.cos(angle);
        targetY = pty + rad * Math.sin(angle);
        targetZ = p.mz * depthFactor + Math.sin(p.t) * waveAmplitude * depthFactor;
      }

      p.cx += (targetX - p.cx) * lerpSpeed;
      p.cy += (targetY - p.cy) * lerpSpeed;
      p.cz += (targetZ - p.cz) * lerpSpeed;

      dummy.position.set(p.cx, p.cy, p.cz);
      dummy.lookAt(ptx, pty, p.cz);
      dummy.rotateX(Math.PI / 2);

      const dx2 = p.cx - ptx;
      const dy2 = p.cy - pty;
      const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);
      
      let scale = 1 - Math.abs(dist2 - ringRadius) * 0.1;
      scale = scale < 0 ? 0 : scale > 1 ? 1 : scale;
      const s = scale * (0.8 + Math.sin(p.t * pulseSpeed) * 0.2 * particleVariance) * particleSize;
      
      dummy.scale.set(s, s, s);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]} visible={isVisible}>
      {particleShape === 'capsule' && <capsuleGeometry args={[0.1, 0.4, 4, 8]} />}
      {particleShape === 'sphere' && <sphereGeometry args={[0.2, 16, 16]} />}
      {particleShape === 'box' && <boxGeometry args={[0.3, 0.3, 0.3]} />}
      {particleShape === 'tetrahedron' && <tetrahedronGeometry args={[0.3]} />}
      <meshBasicMaterial color={color} toneMapped={false} />
    </instancedMesh>
  );
};

const Antigravity = props => {
  const { isEnabled } = useCursorPreference();
  if (!isEnabled) return null;

  return (
    <Canvas 
      camera={{ position: [0, 0, 50], fov: 35 }}
      eventSource={typeof document !== 'undefined' ? document.body : undefined}
      eventPrefix="client"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', pointerEvents: 'none' }}
    >
      <AntigravityInner {...props} />
    </Canvas>
  );
};

export default Antigravity;