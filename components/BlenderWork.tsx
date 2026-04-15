"use client";
import { useState } from "react";
import ModelViewer from "@/components/ModelViewer";

const renders = [
  {
    src: "/images/A Room 1.png",
    title: "A Room — Scene 01",
    caption:
      "Initial pitch concept. Spatial design built entirely in Blender for a dramatic interior narrative.",
  },
  {
    src: "/images/A Room 2.png",
    title: "A Room — Scene 02",
    caption:
      "Second angle. Lighting studies exploring the emotional temperature of the space.",
  },
  {
    src: "/images/A Room 3.png",
    title: "A Room — Scene 03",
    caption:
      "Final pre-vis render. Used in a production pitch to communicate mood, set design and camera language.",
  },
];

export default function BlenderWork() {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<string | null>(null);

  return (
    <section
      id="3d-work"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent top line */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.25), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">3D Pre-Visualisation</p>
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
            Worlds Built{" "}
            <em style={{ color: "#d4af37" }}>in Blender</em>
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.85rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(240,236,228,0.45)",
              maxWidth: "560px",
              margin: "1.5rem auto 0",
            }}
          >
            Before a film is shot it must be imagined in three dimensions.
            RA-Film uses Blender to construct full scenes, lighting setups
            and spatial narratives for production pitches and pre-visualisation.
          </p>
        </div>

        {/* Interactive 3D Model */}
        <div style={{ marginBottom: "5rem" }}>

          {/* Label */}
          <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
            <p className="section-label">Interactive Model</p>
            <span className="gold-line" />
          </div>

          {/* Bio block */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 2px 1fr",
              gap: "0 2.5rem",
              alignItems: "start",
              marginBottom: "3rem",
            }}
            className="aw-bio-grid"
          >
            {/* Left — name & title */}
            <div style={{ textAlign: "right" }}>
              <h3
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                  fontWeight: 300,
                  color: "#f0ece4",
                  lineHeight: 1.1,
                  marginBottom: "0.5rem",
                }}
              >
                Alan{" "}
                <em style={{ color: "#d4af37" }}>Williams</em>
              </h3>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.25em",
                  textTransform: "uppercase",
                  color: "rgba(212,175,55,0.6)",
                  marginBottom: "1.2rem",
                }}
              >
                Liverpool · The First Manager
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "rgba(240,236,228,0.5)",
                }}
              >
                Alan Williams was the first manager of The Beatles — a Liverpool
                entrepreneur who recognised something extraordinary in the young
                band before the world did. Alongside his partner{" "}
                <span style={{ color: "rgba(212,175,55,0.8)" }}>Lord Woodbine</span>,
                he put the group on the road to a life of music.
              </p>
            </div>

            {/* Divider */}
            <div
              style={{
                width: "1px",
                alignSelf: "stretch",
                background:
                  "linear-gradient(to bottom, transparent, rgba(212,175,55,0.3), transparent)",
              }}
            />

            {/* Right — story */}
            <div>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  lineHeight: 1.9,
                  color: "rgba(240,236,228,0.5)",
                  marginBottom: "1.5rem",
                }}
              >
                In 1960, Williams and Woodbine took The Beatles to Hamburg —
                a pivotal journey that would forge the band&apos;s sound, stamina
                and stage presence. Night after night on the Reeperbahn,
                The Beatles became the musicians the world would come to know.
                Without those early decisions made in Liverpool, the story may
                never have been told.
              </p>
              <div
                style={{
                  display: "flex",
                  gap: "2rem",
                  flexWrap: "wrap",
                }}
              >
                {[
                  { label: "City", value: "Liverpool" },
                  { label: "Role", value: "First Manager" },
                  { label: "Year", value: "1960" },
                  { label: "Destination", value: "Hamburg" },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p
                      style={{
                        fontFamily: "'Montserrat', sans-serif",
                        fontSize: "0.52rem",
                        letterSpacing: "0.2em",
                        textTransform: "uppercase",
                        color: "rgba(240,236,228,0.25)",
                        marginBottom: "0.25rem",
                      }}
                    >
                      {label}
                    </p>
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1rem",
                        color: "#d4af37",
                        fontStyle: "italic",
                      }}
                    >
                      {value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* 3D Viewer */}
          <ModelViewer src="/3DObjects/AW3D.glb" />

          {/* Hint */}
          <p
            style={{
              textAlign: "center",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.55rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.2)",
              marginTop: "1rem",
            }}
          >
            Drag to rotate · Scroll to zoom
          </p>
        </div>

        {/* Main layout: large image + side panel */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "2fr 1fr",
            gap: "2rem",
            alignItems: "start",
          }}
          className="blender-main"
        >
          {/* Large active render */}
          <div
            style={{ position: "relative", cursor: "zoom-in" }}
            onClick={() => setLightbox(renders[active].src)}
          >
            {/* Gold corner accents */}
            {["topLeft", "topRight", "bottomLeft", "bottomRight"].map((c) => (
              <div
                key={c}
                style={{
                  position: "absolute",
                  width: "20px",
                  height: "20px",
                  borderColor: "rgba(212,175,55,0.4)",
                  borderStyle: "solid",
                  borderWidth: 0,
                  ...(c === "topLeft" && {
                    top: "-6px",
                    left: "-6px",
                    borderTopWidth: "1px",
                    borderLeftWidth: "1px",
                  }),
                  ...(c === "topRight" && {
                    top: "-6px",
                    right: "-6px",
                    borderTopWidth: "1px",
                    borderRightWidth: "1px",
                  }),
                  ...(c === "bottomLeft" && {
                    bottom: "-6px",
                    left: "-6px",
                    borderBottomWidth: "1px",
                    borderLeftWidth: "1px",
                  }),
                  ...(c === "bottomRight" && {
                    bottom: "-6px",
                    right: "-6px",
                    borderBottomWidth: "1px",
                    borderRightWidth: "1px",
                  }),
                  zIndex: 2,
                  pointerEvents: "none",
                }}
              />
            ))}

            <div style={{ overflow: "hidden" }}>
              <img
                src={renders[active].src}
                alt={renders[active].title}
                style={{
                  width: "100%",
                  display: "block",
                  aspectRatio: "16/9",
                  objectFit: "cover",
                  filter: "brightness(0.85) saturate(0.9)",
                  transition: "transform 0.6s ease, filter 0.4s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1.03)";
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "brightness(1) saturate(1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLImageElement).style.transform =
                    "scale(1)";
                  (e.currentTarget as HTMLImageElement).style.filter =
                    "brightness(0.85) saturate(0.9)";
                }}
              />
            </div>

            {/* Caption overlay */}
            <div
              style={{
                background: "#0d0d0d",
                padding: "1.5rem",
                border: "1px solid rgba(184,151,42,0.1)",
                borderTop: "none",
              }}
            >
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.4rem",
                  fontWeight: 300,
                  color: "#f0ece4",
                  marginBottom: "0.4rem",
                }}
              >
                {renders[active].title}
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.78rem",
                  fontWeight: 300,
                  lineHeight: 1.7,
                  color: "rgba(240,236,228,0.45)",
                }}
              >
                {renders[active].caption}
              </p>
            </div>
          </div>

          {/* Thumbnail stack */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1rem",
            }}
          >
            {renders.map((r, i) => (
              <div
                key={i}
                onClick={() => setActive(i)}
                style={{
                  position: "relative",
                  cursor: "pointer",
                  overflow: "hidden",
                  border: `1px solid ${
                    i === active
                      ? "rgba(212,175,55,0.5)"
                      : "rgba(184,151,42,0.08)"
                  }`,
                  transition: "border-color 0.3s",
                }}
              >
                <img
                  src={r.src}
                  alt={r.title}
                  style={{
                    width: "100%",
                    aspectRatio: "16/9",
                    objectFit: "cover",
                    display: "block",
                    filter:
                      i === active
                        ? "brightness(0.9)"
                        : "brightness(0.45) saturate(0.3)",
                    transition: "filter 0.4s",
                  }}
                />
                {/* Index tag */}
                <div
                  style={{
                    position: "absolute",
                    top: "0.6rem",
                    left: "0.6rem",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.52rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: i === active ? "#d4af37" : "rgba(240,236,228,0.3)",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </div>
                {/* Active underline */}
                {i === active && (
                  <div
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      height: "2px",
                      background: "#d4af37",
                    }}
                  />
                )}
              </div>
            ))}

            {/* Side descriptor */}
            <div
              style={{
                marginTop: "1rem",
                padding: "1.5rem",
                border: "1px solid rgba(184,151,42,0.1)",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.55rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,228,0.3)",
                  marginBottom: "0.75rem",
                }}
              >
                Software
              </p>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  color: "#d4af37",
                  fontStyle: "italic",
                  marginBottom: "1.2rem",
                }}
              >
                Blender 3D
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.72rem",
                  fontWeight: 300,
                  lineHeight: 1.8,
                  color: "rgba(240,236,228,0.4)",
                }}
              >
                All pre-vis and concept renders are built in-house using Blender.
                Scenes are shared with directors and producers during
                development to shape final production decisions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          onClick={() => setLightbox(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.97)",
            zIndex: 9000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <img
            src={lightbox}
            alt="3D render"
            style={{
              maxWidth: "92vw",
              maxHeight: "88vh",
              objectFit: "contain",
              border: "1px solid rgba(184,151,42,0.15)",
            }}
          />
          <button
            onClick={() => setLightbox(null)}
            style={{
              position: "absolute",
              top: "2.5rem",
              right: "2.5rem",
              background: "none",
              border: "1px solid rgba(240,236,228,0.2)",
              color: "#f0ece4",
              width: "40px",
              height: "40px",
              cursor: "pointer",
              fontSize: "0.9rem",
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
          .blender-main {
            grid-template-columns: 1fr !important;
          }
          .aw-bio-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem 0 !important;
          }
          .aw-bio-grid > div:first-child {
            text-align: left !important;
          }
          .aw-bio-grid > div:nth-child(2) {
            display: none !important;
          }
        }
      `}</style>
    </section>
  );
}
