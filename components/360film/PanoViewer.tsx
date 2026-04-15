"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

const panoramas = [
  {
    src: "/images/360RA/360_0473_stitched_straightened_injected 2020-10-18 18.12.26.jpg",
    label: "Location 01 — Stitched & Injected",
  },
  {
    src: "/images/360RA/360001.jpg",
    label: "Location 02 — Scene Overview",
  },
  {
    src: "/images/360RA/360002.jpg",
    label: "Location 03 — Wide Capture",
  },
  {
    src: "/images/360RA/360003.jpg",
    label: "Location 04 — Ambient Survey",
  },
];

export default function PanoViewer() {
  const mountRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const rotation = useRef({ lon: 0, lat: 0 });
  const autoRotate = useRef(true);
  const frameRef = useRef<number>(0);

  const [activePano, setActivePano] = useState(0);
  const [loading, setLoading] = useState(true);
  const [fov, setFov] = useState(75);
  const [autoOn, setAutoOn] = useState(true);

  const loadTexture = (src: string) => {
    setLoading(true);
    const loader = new THREE.TextureLoader();
    loader.load(src, (texture) => {
      // No colorSpace override — let the texture load as-is for true brightness
      texture.mapping = THREE.EquirectangularReflectionMapping;
      if (meshRef.current) {
        (meshRef.current.material as THREE.MeshBasicMaterial).map = texture;
        (meshRef.current.material as THREE.MeshBasicMaterial).needsUpdate = true;
      }
      setLoading(false);
    });
  };

  useEffect(() => {
    const el = mountRef.current;
    if (!el) return;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(fov, el.clientWidth / el.clientHeight, 0.1, 1000);
    camera.position.set(0, 0, 0.01);
    cameraRef.current = camera;

    // Renderer — no tone mapping, no colour correction, pure passthrough
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(el.clientWidth, el.clientHeight);
    renderer.setClearColor(0x000000);
    renderer.toneMapping = THREE.NoToneMapping;
    renderer.outputColorSpace = THREE.LinearSRGBColorSpace;
    el.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Sphere geometry (inside-out)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    // Pure white — texture renders at 100% brightness, no colour multiplication
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Load initial texture
    loadTexture(panoramas[0].src);

    // Animate
    const animate = () => {
      frameRef.current = requestAnimationFrame(animate);
      if (autoRotate.current) rotation.current.lon += 0.03;
      const lat = Math.max(-85, Math.min(85, rotation.current.lat));
      const phi = THREE.MathUtils.degToRad(90 - lat);
      const theta = THREE.MathUtils.degToRad(rotation.current.lon);
      const target = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );
      camera.lookAt(target);
      renderer.render(scene, camera);
    };
    animate();

    // Resize
    const onResize = () => {
      if (!el) return;
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
  }, []);

  // Mouse drag
  const onMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true;
    autoRotate.current = false;
    setAutoOn(false);
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current) return;
    const dx = e.clientX - prevMouse.current.x;
    const dy = e.clientY - prevMouse.current.y;
    rotation.current.lon -= dx * 0.2;
    rotation.current.lat += dy * 0.2;
    prevMouse.current = { x: e.clientX, y: e.clientY };
  };
  const onMouseUp = () => { isDragging.current = false; };

  // Pinch-to-zoom
  const lastPinchDist = useRef<number | null>(null);

  const getPinchDist = (e: React.TouchEvent) => {
    const dx = e.touches[0].clientX - e.touches[1].clientX;
    const dy = e.touches[0].clientY - e.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      lastPinchDist.current = getPinchDist(e);
      return;
    }
    isDragging.current = true;
    autoRotate.current = false;
    setAutoOn(false);
    prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = getPinchDist(e);
      if (lastPinchDist.current !== null) {
        const delta = lastPinchDist.current - dist;
        const newFov = Math.max(30, Math.min(100, fov + delta * 0.1));
        setFov(newFov);
        if (cameraRef.current) {
          cameraRef.current.fov = newFov;
          cameraRef.current.updateProjectionMatrix();
        }
      }
      lastPinchDist.current = dist;
      return;
    }
    if (!isDragging.current) return;
    const dx = e.touches[0].clientX - prevMouse.current.x;
    const dy = e.touches[0].clientY - prevMouse.current.y;
    rotation.current.lon -= dx * 0.2;
    rotation.current.lat += dy * 0.2;
    prevMouse.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  };

  // Zoom scroll
  const onWheel = (e: React.WheelEvent) => {
    const newFov = Math.max(30, Math.min(100, fov + e.deltaY * 0.05));
    setFov(newFov);
    if (cameraRef.current) {
      cameraRef.current.fov = newFov;
      cameraRef.current.updateProjectionMatrix();
    }
  };

  const switchPano = (i: number) => {
    setActivePano(i);
    loadTexture(panoramas[i].src);
  };

  const toggleAuto = () => {
    autoRotate.current = !autoRotate.current;
    setAutoOn(autoRotate.current);
  };

  return (
    <section
      id="viewer"
      style={{ background: "#050505", padding: "0 0 6rem" }}
    >
      {/* Viewer label */}
      <div style={{
        textAlign: "center",
        padding: "5rem 2rem 2rem",
      }}>
        <p className="section-label">Interactive Viewer</p>
        <span className="gold-line" />
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(1.8rem, 4vw, 3rem)",
          fontWeight: 300,
          color: "#f0ece4",
          marginTop: "0.5rem",
        }}>
          Step <em style={{ color: "#d4af37" }}>Inside</em> the Frame
        </h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.78rem", fontWeight: 300,
          color: "rgba(240,236,228,0.4)",
          letterSpacing: "0.1em",
          marginTop: "0.75rem",
        }}>
          <span className="hint-desktop">Drag to look around · Scroll to zoom · </span>
          <span className="hint-mobile">Drag to look around · Pinch to zoom · </span>
          Select a scene below
        </p>
        <style>{`
          .hint-desktop { display: inline; }
          .hint-mobile  { display: none; }
          @media (max-width: 768px) {
            .hint-desktop { display: none; }
            .hint-mobile  { display: inline; }
            .hud-fov { display: none; }
          }
        `}</style>
      </div>

      {/* Three.js mount */}
      <div style={{ position: "relative", maxWidth: "1400px", margin: "0 auto", padding: "0 2rem" }}>
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
          height: "70vh",
          cursor: isDragging.current ? "grabbing" : "grab",
          border: "1px solid rgba(184,151,42,0.15)",
          position: "relative",
          overflow: "hidden",
          background: "#000",
          touchAction: "none",
          }}
        />

        {/* Loading overlay */}
        {loading && (
          <div style={{
            position: "absolute",
            inset: "0 2rem",
            background: "rgba(5,5,5,0.85)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
                fontSize: "0.65rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "rgba(240,236,228,0.4)",
              }}>Loading Scene</p>
            </div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          </div>
        )}

        {/* HUD overlay — top left */}
        <div style={{
          position: "absolute",
          top: "1rem", left: "1rem",
          display: "flex", flexDirection: "column", gap: "0.35rem",
          zIndex: 5, pointerEvents: "none",
        }}>
          <span style={{
            fontFamily: "'Montserrat', monospace",
            fontSize: "0.6rem", letterSpacing: "0.15em",
            color: "rgba(212,175,55,0.5)",
            textTransform: "uppercase",
          }}>
            RA-Film · 360°
          </span>
          <span className="hud-fov" style={{
            fontFamily: "'Montserrat', monospace",
            fontSize: "0.55rem", letterSpacing: "0.1em",
            color: "rgba(240,236,228,0.2)",
          }}>
            FOV: {Math.round(fov)}° · {panoramas[activePano].label}
          </span>
        </div>

        {/* Controls — top right */}
        <div style={{
          position: "absolute",
          top: "1rem", right: "1rem",
          display: "flex", gap: "0.4rem",
          zIndex: 5,
        }}>
          {/* Auto-rotate toggle */}
          <button
            onClick={toggleAuto}
            title={autoOn ? "Pause rotation" : "Start rotation"}
            style={{
              background: autoOn ? "rgba(212,175,55,0.12)" : "transparent",
              border: `1px solid ${autoOn ? "rgba(212,175,55,0.5)" : "rgba(240,236,228,0.15)"}`,
              color: autoOn ? "#d4af37" : "rgba(240,236,228,0.4)",
              width: "36px", height: "36px",
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              transition: "all 0.3s",
              fontSize: "0.8rem",
            }}
          >
            {autoOn ? "⏸" : "▶"}
          </button>

          {/* Zoom in */}
          <button
            onClick={() => {
              const nf = Math.max(30, fov - 10);
              setFov(nf);
              if (cameraRef.current) { cameraRef.current.fov = nf; cameraRef.current.updateProjectionMatrix(); }
            }}
            style={{
              background: "transparent",
              border: "1px solid rgba(240,236,228,0.15)",
              color: "rgba(240,236,228,0.4)",
              width: "36px", height: "36px",
              cursor: "pointer", fontSize: "1rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#d4af37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.4)"; }}
          >+</button>

          {/* Zoom out */}
          <button
            onClick={() => {
              const nf = Math.min(100, fov + 10);
              setFov(nf);
              if (cameraRef.current) { cameraRef.current.fov = nf; cameraRef.current.updateProjectionMatrix(); }
            }}
            style={{
              background: "transparent",
              border: "1px solid rgba(240,236,228,0.15)",
              color: "rgba(240,236,228,0.4)",
              width: "36px", height: "36px",
              cursor: "pointer", fontSize: "1.2rem",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)"; (e.currentTarget as HTMLButtonElement).style.color = "#d4af37"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.15)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.4)"; }}
          >−</button>
        </div>

        {/* Scene selector — bottom */}
        <div style={{
          position: "absolute",
          bottom: "1rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.4rem",
          flexWrap: "wrap",
          justifyContent: "center",
          zIndex: 5,
          padding: "0 1rem",
          width: "100%",
        }}>
          {panoramas.map((p, i) => (
            <button
              key={i}
              onClick={() => switchPano(i)}
              style={{
                background: i === activePano ? "rgba(212,175,55,0.15)" : "rgba(0,0,0,0.6)",
                border: `1px solid ${i === activePano ? "#d4af37" : "rgba(240,236,228,0.15)"}`,
                color: i === activePano ? "#d4af37" : "rgba(240,236,228,0.35)",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                padding: "0.5rem 1rem",
                cursor: "pointer",
                transition: "all 0.3s",
                backdropFilter: "blur(4px)",
                minWidth: "64px",
                WebkitTapHighlightColor: "transparent",
              }}
            >
              Scene {String(i + 1).padStart(2, "0")}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
