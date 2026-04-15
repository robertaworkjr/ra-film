"use client";
import { useState } from "react";
import PanoModal from "./PanoModal";

const shots = [
  {
    src: "/images/360RA/exhibition01.png",
    title: "Exhibition Install — Space 01",
    caption: "Projection-mapped 360° environment. The room becomes the film.",
  },
  {
    src: "/images/360RA/exhibition02.png",
    title: "Exhibition Install — Space 02",
    caption: "Audience inside the image. No screen — only immersion.",
  },
  {
    src: "/images/360RA/exhibition03.png",
    title: "Exhibition Install — Space 03",
    caption: "Multi-surface installation with spatial audio array.",
  },
];

export default function ExhibitionGallery() {
  const [active, setActive] = useState(0);
  const [pano, setPano] = useState<{ src: string; title: string } | null>(null);

  return (
    <section
      id="exhibition"
      style={{
        background: "#050505",
        padding: "8rem 0",
        position: "relative",
      }}
    >
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "4rem" }}>
          <p className="section-label">In the Space</p>
          <span className="gold-line" />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 300,
            color: "#f0ece4",
            marginTop: "0.5rem",
          }}>
            Exhibition &amp; <em style={{ color: "#d4af37" }}>Installation</em>
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.9,
            color: "rgba(240,236,228,0.45)",
            maxWidth: "520px", margin: "1.5rem auto 0",
          }}>
            Taking 360° film beyond the headset — into galleries, events and
            architectural spaces. The audience doesn&apos;t watch the film.
            They stand inside it.
          </p>

          {/* 360 hint */}
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.6rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#d4af37",
            marginTop: "1rem",
            opacity: 0.7,
          }}>
            ↓ Click any image to explore in 360°
          </p>
        </div>

        {/* Large feature image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            aspectRatio: "16/7",
            overflow: "hidden",
            cursor: "pointer",
            marginBottom: "1.5px",
            border: "1px solid rgba(184,151,42,0.1)",
          }}
          onClick={() => setPano({ src: shots[active].src, title: shots[active].title })}
        >
          <img
            src={shots[active].src}
            alt={shots[active].title}
            style={{
              width: "100%", height: "100%",
              objectFit: "cover",
              filter: "brightness(0.75) saturate(0.85)",
              transition: "transform 0.6s ease, filter 0.4s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.88) saturate(1)";
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1.02)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLImageElement).style.filter = "brightness(0.75) saturate(0.85)";
              (e.currentTarget as HTMLImageElement).style.transform = "scale(1)";
            }}
          />

          {/* Caption */}
          <div style={{
            position: "absolute",
            bottom: 0, left: 0, right: 0,
            padding: "3rem 2.5rem 2rem",
            background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          }}>
            <p style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "1.5rem", fontWeight: 300,
              color: "#f0ece4", marginBottom: "0.3rem",
            }}>
              {shots[active].title}
            </p>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.75rem", fontWeight: 300,
              color: "rgba(240,236,228,0.5)",
              letterSpacing: "0.05em",
            }}>
              {shots[active].caption}
            </p>
          </div>

          {/* 360° badge — top right */}
          <div style={{
            position: "absolute",
            top: "1.25rem", right: "1.25rem",
            display: "flex", alignItems: "center", gap: "0.5rem",
            background: "rgba(0,0,0,0.55)",
            border: "1px solid rgba(212,175,55,0.45)",
            padding: "0.4rem 0.9rem",
            backdropFilter: "blur(4px)",
          }}>
            {/* 360 sphere icon */}
            <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.2" width="14" height="14">
              <ellipse cx="12" cy="12" rx="10" ry="10" />
              <ellipse cx="12" cy="12" rx="4" ry="10" />
              <line x1="2" y1="12" x2="22" y2="12" />
            </svg>
            <span style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.52rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "#d4af37",
            }}>
              View 360°
            </span>
          </div>
        </div>

        {/* Thumbnails */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5px",
        }}>
          {shots.map((s, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                aspectRatio: "16/9",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
                border: `1px solid ${i === active ? "rgba(184,151,42,0.5)" : "rgba(184,151,42,0.08)"}`,
              }}
            >
              <img
                src={s.src}
                alt={s.title}
                style={{
                  width: "100%", height: "100%",
                  objectFit: "cover",
                  filter: i === active ? "brightness(0.85) saturate(0.9)" : "brightness(0.45) saturate(0.35)",
                  transition: "all 0.4s",
                }}
              />

              {/* Active indicator */}
              {i === active && (
                <div style={{
                  position: "absolute",
                  bottom: 0, left: 0, right: 0,
                  height: "2px",
                  background: "#d4af37",
                }} />
              )}

              {/* 360 badge on thumbnail */}
              <div style={{
                position: "absolute",
                top: "0.6rem", right: "0.6rem",
                background: "rgba(0,0,0,0.6)",
                border: "1px solid rgba(212,175,55,0.3)",
                padding: "0.25rem 0.5rem",
                display: "flex", alignItems: "center", gap: "0.3rem",
              }}>
                <svg viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="1.4" width="9" height="9">
                  <ellipse cx="12" cy="12" rx="10" ry="10" />
                  <ellipse cx="12" cy="12" rx="4" ry="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                </svg>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.45rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.7)",
                }}>360°</span>
              </div>

              {/* Index */}
              <div style={{
                position: "absolute",
                top: "0.75rem", left: "0.75rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.55rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: i === active ? "#d4af37" : "rgba(240,236,228,0.3)",
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 360° Modal */}
      {pano && (
        <PanoModal
          src={pano.src}
          title={pano.title}
          onClose={() => setPano(null)}
        />
      )}
    </section>
  );
}
