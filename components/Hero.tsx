"use client";
import { useEffect, useState } from "react";

const slides = [
  "/images/Me001.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.04.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.18.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.22.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.23.jpeg",
];

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % slides.length);
        setFading(false);
      }, 800);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section
      id="hero"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Background image slideshow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url('${slides[current]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "opacity 0.8s ease",
          opacity: fading ? 0 : 1,
          transform: "scale(1.03)",
          filter: "brightness(0.45)",
        }}
      />

      {/* Cinematic gradient overlay */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to bottom, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.1) 40%, rgba(0,0,0,0.6) 100%)",
          zIndex: 1,
        }}
      />

      {/* Vignette */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)",
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          padding: "0 2rem",
        }}
      >
        <p className="section-label fade-up" style={{ marginBottom: "1rem" }}>
          Cinematic Storytelling
        </p>

        <h1
          className="fade-up-delay"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(4rem, 10vw, 9rem)",
            fontWeight: 300,
            letterSpacing: "0.1em",
            lineHeight: 1,
            color: "#f0ece4",
            marginBottom: "0.25rem",
          }}
        >
          RA
          <span
            style={{
              color: "#d4af37",
              fontStyle: "italic",
            }}
          >
            Film
          </span>
        </h1>

        <span className="gold-line fade-up-delay-2" style={{ marginTop: "1.5rem" }} />

        <p
          className="fade-up-delay-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.75rem, 1.5vw, 0.95rem)",
            letterSpacing: "clamp(0.1em, 1.5vw, 0.3em)",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.7)",
            marginTop: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          Every Frame Matters
        </p>

        <div
          className="fade-up-delay-2"
          style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}
        >
          <button
            onClick={() => document.getElementById("showreel")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid #d4af37",
              color: "#d4af37",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "0.9rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "#d4af37";
              (e.currentTarget as HTMLButtonElement).style.color = "#050505";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.background = "transparent";
              (e.currentTarget as HTMLButtonElement).style.color = "#d4af37";
            }}
          >
            Watch Showreel
          </button>
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            style={{
              background: "transparent",
              border: "1px solid rgba(240,236,228,0.3)",
              color: "rgba(240,236,228,0.7)",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem",
              fontWeight: 500,
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              padding: "0.9rem 2.5rem",
              cursor: "pointer",
              transition: "all 0.3s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.7)";
              (e.currentTarget as HTMLButtonElement).style.color = "#f0ece4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.3)";
              (e.currentTarget as HTMLButtonElement).style.color = "rgba(240,236,228,0.7)";
            }}
          >
            Get in Touch
          </button>
        </div>
      </div>

      {/* Slide indicators */}
      <div
        style={{
          position: "absolute",
          bottom: "3rem",
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: "0.5rem",
          zIndex: 3,
        }}
      >
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            style={{
              width: i === current ? "24px" : "6px",
              height: "2px",
              background: i === current ? "#d4af37" : "rgba(240,236,228,0.3)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.4s ease",
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div
        className="scroll-indicator"
        style={{
          position: "absolute",
          bottom: "3rem",
          right: "2rem",
          zIndex: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.55rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.4)",
            writingMode: "vertical-rl",
          }}
        >
          Scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "50px",
            background: "linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)",
            animation: "scrollPulse 2s ease infinite",
          }}
        />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; transform: scaleY(1); }
            50% { opacity: 1; transform: scaleY(1.1); }
          }
          @media (max-width: 480px) {
            .scroll-indicator { display: none !important; }
          }
        `}</style>
      </div>
    </section>
  );
}
