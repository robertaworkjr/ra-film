"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface PanoModalProps {
  src: string;
  title: string;
  onClose: () => void;
}

export default function PanoModal({ src, title, onClose }: PanoModalProps) {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ lon: 0, lat: 0 });
  const autoRotate = useRef(true);
  const frameRef = useRef<number>(0);
  const lastPinchDist = useRef<number | null>(null);

  const [loading, setLoading] = useState(true);
  const [fov, setFov] = useState(75);
  const [autoOn, setAutoOn] = useState(true);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(fov, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.01);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load texture
    setLoading(true);
    new THREE.TextureLoader().load(src, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      (mesh.material as THREE.MeshBasicMaterial).map = texture;
      (mesh.material as THREE.MeshBasicMaterial).needsUpdate = true;
      setLoading(false);
    });

    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (autoRotate.current) rotation.current.lon += 0.03;
      const lat = Math.max(-85, Math.min(85, rotation.current.lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(rotation.current.lon);
      camera.lookAt(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      renderer.render(scene, camera);
    };
    animate();

    const onResize = () => {
      camera.aspect = el.clientWidth / el.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(el.clientWidth, el.clientHeight);
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(frameRef.current);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    autoRotate.current = false;
    setAutoOn(false);
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    rotation.current.lon -= (e.clientX - prevMouse.current.x) * 0.2;
    rotation.current.lat += (e.clientY - prevMouse.current.y) * 0.2;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging.current = false; };

  const getPinchDist = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };
  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) { lastPinchDist.current = getPinchDist(e); return; }
    isDragging.current = true;
    autoRotate.current = false;
    setAutoOn(false);
    prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getPinchDist(e);
      if (lastPinchDist.current !== null) {
        const newFov = Math.max(30, Math.min(100, fov + (lastPinchDist.current - dist) * 0.1));
        setFov(newFov);
        if (cameraRef.current) { cameraRef.current.fov = newFov; cameraRef.current.updateProjectionMatrix(); }
      }
      lastPinchDist.current = dist;
      return;
    }
    if (!isDragging.current) return;
    rotation.current.lon -= (e.touches[0].clientX - prevMouse.current.x) * 0.2;
    rotation.current.lat += (e.touches[0].clientY - prevMouse.current.y) * 0.2;
    prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onWheel = (e: React.WheelEvent) => {
    const newFov = Math.max(30, Math.min(100, fov + e.deltaY * 0.05));
    setFov(newFov);
    if (cameraRef.current) { cameraRef.current.fov = newFov; cameraRef.current.updateProjectionMatrix(); }
  };

  const toggleAuto = () => { autoRotate.current = !autoRotate.current; setAutoOn(autoRotate.current); };
  const zoomIn  = () => { const nf = Math.max(30, fov - 10); setFov(nf); if (cameraRef.current) { cameraRef.current.fov = nf; cameraRef.current.updateProjectionMatrix(); } };
  const zoomOut = () => { const nf = Math.min(100, fov + 10); setFov(nf); if (cameraRef.current) { cameraRef.current.fov = nf; cameraRef.current.updateProjectionMatrix(); } };

  const btnBase: React.CSSProperties = {
    background: "transparent",
    border: "1px solid rgba(240,236,228,0.15)",
    color: "rgba(240,236,228,0.5)",
    width: "38px", height: "38px",
    cursor: "pointer",
    display: "flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.25s",
    backdropFilter: "blur(6px)",
    fontSize: "1rem",
  };

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9500,
        background: "rgba(0,0,0,0.97)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Top bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "1.25rem 1.5rem",
        borderBottom: "1px solid rgba(184,151,42,0.15)",
        flexShrink: 0,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "#d4af37",
          }}>
            RA-Film · 360° Exhibition
          </span>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            fontWeight: 300,
            color: "rgba(240,236,228,0.6)",
          }}>
            {title}
          </span>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: "0.4rem", alignItems: "center" }}>
          <span style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.5rem",
            letterSpacing: "0.1em",
            color: "rgba(240,236,228,0.2)",
            marginRight: "0.5rem",
          }} className="fov-label">
            FOV {Math.round(fov)}°
          </span>

          <button
            onClick={toggleAuto}
            title={autoOn ? "Pause rotation" : "Resume rotation"}
            style={{
              ...btnBase,
              background: autoOn ? "rgba(212,175,55,0.1)" : "transparent",
              border: `1px solid ${autoOn ? "rgba(212,175,55,0.45)" : "rgba(240,236,228,0.15)"}`,
              color: autoOn ? "#d4af37" : "rgba(240,236,228,0.4)",
            }}
          >
            {autoOn ? "⏸" : "▶"}
          </button>

          <button onClick={zoomIn} style={btnBase}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#d4af37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.5)"; }}
          >+</button>
          <button onClick={zoomOut} style={btnBase}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#d4af37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.5)"; }}
          >−</button>

          <button
            onClick={onClose}
            style={{
              ...btnBase,
              marginLeft: "0.5rem",
              border: "1px solid rgba(240,236,228,0.2)",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.5)"; (e.currentTarget as HTMLButtonElement).style.color = "#d4af37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.2)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.5)"; }}
          >✕</button>
        </div>
      </div>

      {/* Viewport */}
      <div style={{ position: "relative", flex: 1, overflow: "hidden" }}>
        <div
          ref={mountRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onMouseUp}
          onWheel={onWheel}
          style={{
            width: "100%",
            height: "100%",
            cursor: isDragging.current ? "grabbing" : "grab",
            background: "#000",
            touchAction: "none",
          }}
        />

        {/* Loading spinner */}
        {loading && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "rgba(0,0,0,0.8)",
            zIndex: 10,
          }}>
            <div style={{ textAlign: "center" }}>
              <div style={{
                width: "40px", height: "40px",
                border: "1px solid rgba(184,151,42,0.2)",
                borderTop: "1px solid #d4af37",
                borderRadius: "50%",
                animation: "spin 1s linear infinite",
                margin: "0 auto 1rem",
              }} />
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem", letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,236,228,0.35)",
              }}>Loading 360°</p>
            </div>
          </div>
        )}

        {/* Bottom hint */}
        <div style={{
          position: "absolute",
          bottom: "1.5rem", left: "50%",
          transform: "translateX(-50%)",
          pointerEvents: "none",
        }}>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem", letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.2)",
            whiteSpace: "nowrap",
          }}>
            <span className="hint-d">Drag to look around · Scroll to zoom · Esc to close</span>
            <span className="hint-m">Drag to look around · Pinch to zoom</span>
          </p>
        </div>

        {/* HUD corner */}
        <div style={{
          position: "absolute", top: "1rem", left: "1rem",
          pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: "'Montserrat', monospace",
            fontSize: "0.55rem", letterSpacing: "0.15em",
            color: "rgba(212,175,55,0.35)",
            textTransform: "uppercase",
          }}>
            360° · Exhibition
          </span>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        .hint-d { display: inline; }
        .hint-m { display: none; }
        .fov-label { display: inline; }
        @media (max-width: 640px) {
          .hint-d { display: none; }
          .hint-m { display: inline; }
          .fov-label { display: none; }
        }
      `}</style>
    </div>
  );
}
