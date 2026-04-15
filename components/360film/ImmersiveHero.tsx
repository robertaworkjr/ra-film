"use client";
import { useEffect, useRef } from "react";

export default function ImmersiveHero() {
  const lineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame: number;
    let angle = 0;
    const animate = () => {
      angle += 0.002;
      if (lineRef.current) {
        lineRef.current.style.transform = `rotate(${angle}rad) scale(1.5)`;
      }
      frame = requestAnimationFrame(animate);
    };
    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#050505",
      }}
    >
      {/* Animated rotating equirectangular grid lines */}
      <div
        ref={lineRef}
        style={{
          position: "absolute",
          inset: "-50%",
          backgroundImage: `
            radial-gradient(ellipse 120% 60% at 50% 50%, transparent 30%, rgba(184,151,42,0.04) 31%, transparent 32%),
            radial-gradient(ellipse 80% 40% at 50% 50%, transparent 45%, rgba(184,151,42,0.03) 46%, transparent 47%),
            radial-gradient(ellipse 160% 80% at 50% 50%, transparent 20%, rgba(184,151,42,0.03) 21%, transparent 22%),
            repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(184,151,42,0.025) 80px),
            repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(184,151,42,0.025) 80px)
          `,
          pointerEvents: "none",
        }}
      />

      {/* Sphere wireframe hint */}
      <div style={{
        position: "absolute",
        width: "600px",
        height: "600px",
        borderRadius: "50%",
        border: "1px solid rgba(184,151,42,0.06)",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
        boxShadow: "0 0 120px rgba(184,151,42,0.04) inset",
      }} />
      <div style={{
        position: "absolute",
        width: "400px",
        height: "400px",
        borderRadius: "50%",
        border: "1px solid rgba(184,151,42,0.05)",
        top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        pointerEvents: "none",
      }} />

      {/* Background image with extreme desaturation */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "url('/images/360RA/360001.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        filter: "brightness(0.2) saturate(0.3)",
        zIndex: 0,
      }} />

      {/* Overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, rgba(5,5,5,0.3) 0%, rgba(5,5,5,0.85) 100%)",
        zIndex: 1,
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 3px)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 3, textAlign: "center", padding: "0 2rem" }}>

        {/* 360 badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          width: "72px", height: "72px",
          borderRadius: "50%",
          border: "1px solid rgba(184,151,42,0.5)",
          marginBottom: "2rem",
          position: "relative",
        }}>
          <span style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            fontWeight: 300,
            color: "#d4af37",
            letterSpacing: "0.05em",
          }}>360°</span>
          {/* Orbit ring */}
          <div style={{
            position: "absolute",
            inset: "-10px",
            borderRadius: "50%",
            border: "1px dashed rgba(184,151,42,0.15)",
            animation: "orbit 8s linear infinite",
          }} />
          <style>{`@keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
        </div>

        <p className="section-label fade-up">Immersive Cinema</p>

        <h1
          className="fade-up-delay"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 9vw, 8.5rem)",
            fontWeight: 300,
            letterSpacing: "0.06em",
            lineHeight: 0.95,
            color: "#f0ece4",
            marginBottom: "0.5rem",
          }}
        >
          See Every
          <br />
          <em style={{ color: "#d4af37" }}>Direction</em>
        </h1>

        <span className="gold-line fade-up-delay-2" style={{ marginTop: "2rem" }} />

        <p
          className="fade-up-delay-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.55)",
            margin: "1.5rem auto 0",
            maxWidth: "480px",
            lineHeight: 1.9,
          }}
        >
          360° Filmmaking · Spatial Storytelling · Immersive Experiences
        </p>

        {/* Scroll hint */}
        <p style={{
          position: "absolute",
          bottom: "-6rem",
          left: "50%",
          transform: "translateX(-50%)",
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(240,236,228,0.25)",
          whiteSpace: "nowrap",
        }}>
          ↓ &nbsp; Explore the viewer below
        </p>
      </div>
    </section>
  );
}
