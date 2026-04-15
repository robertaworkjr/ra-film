"use client";
import { useState } from "react";

const galleryImages = [
  "/images/WhatsApp Image 2026-04-12 at 21.47.04.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.18.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.22.jpeg",
  "/images/WhatsApp Image 2026-04-12 at 21.47.23.jpeg",
];

export default function Showreel() {
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id="showreel"
      style={{
        background: "#050505",
        padding: "8rem 0",
        position: "relative",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 2rem",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">Our Work</p>
          <span className="gold-line" />
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2.2rem, 5vw, 4rem)",
              fontWeight: 300,
              color: "#f0ece4",
              marginTop: "0.5rem",
            }}
          >
            The{" "}
            <em style={{ color: "#d4af37" }}>Showreel</em>
          </h2>
        </div>

        {/* Showreel Video */}
        <div
          style={{
            position: "relative",
            width: "100%",
            paddingBottom: "56.25%",
            marginBottom: "5rem",
            background: "#0d0d0d",
            border: "1px solid rgba(184,151,42,0.2)",
            overflow: "hidden",
          }}
        >
          <video
            src="/videoRA/RA-FilmTrail.mov"
            controls
            playsInline
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />

          {/* Scanline effect */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage:
                "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.08) 3px)",
              pointerEvents: "none",
              zIndex: 2,
            }}
          />
        </div>

        {/* Photo Gallery */}
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <p className="section-label">Stills & Behind the Scenes</p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.75rem",
          }}
          className="gallery-grid"
        >
          {galleryImages.map((src, i) => (
            <div
              key={i}
              onClick={() => setLightbox(src)}
              style={{
                position: "relative",
                overflow: "hidden",
                aspectRatio: "16/10",
                cursor: "pointer",
                background: "#0d0d0d",
              }}
            >
              <img
                src={src}
                alt={`RA-Film still ${i + 1}`}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.8) saturate(0.85)",
                  transition: "all 0.5s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "brightness(1) saturate(1)";
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1.04)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "brightness(0.8) saturate(0.85)";
                  (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
                }}
              />
              {/* Hover overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "rgba(0,0,0,0)",
                  transition: "background 0.4s",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "rgba(0,0,0,0)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#d4af37"
                  strokeWidth="1"
                  width="32"
                  height="32"
                  style={{ opacity: 0, transition: "opacity 0.3s" }}
                  className="zoom-icon"
                >
                  <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.95)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <img
            src={lightbox}
            alt="Lightbox"
            style={{
              maxWidth: "90vw",
              maxHeight: "85vh",
              objectFit: "contain",
              border: "1px solid rgba(184,151,42,0.2)",
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "2.5rem",
              right: "2.5rem",
              background: "none",
              border: "1px solid rgba(240,236,228,0.3)",
              color: "#f0ece4",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              fontSize: "1rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            ✕
          </button>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .gallery-grid {
            grid-template-columns: 1fr !important;
          }
        }
        .gallery-grid > div:hover .zoom-icon {
          opacity: 1 !important;
        }
      `}</style>
    </section>
  );
}
