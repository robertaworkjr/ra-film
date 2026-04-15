"use client";
import { useRef, useState } from "react";

const aiVideos = [
  {
    src: "/videoRA/AWork-Ai001_.mp4",
    title: "AWork AI — 001",
    tag: "AI Artwork",
  },
  {
    src: "/videoRA/AworkFIlmed_Ai_001.mp4",
    title: "AI Film Work — 001",
    tag: "Generative Cinema",
  },
  {
    src: "/videoRA/AworkFIlmed_Ai_002.mp4",
    title: "AI Film Work — 002",
    tag: "Generative Cinema",
  },
  {
    src: "/videoRA/AworkBeatles1.mp4",
    title: "Music x AI — Beatles",
    tag: "Music Visual",
  },
  {
    src: "/videoRA/Bring_to_life_202511130008_269r6 (1).mp4",
    title: "Bring to Life",
    tag: "AI Narrative",
  },
];

function VideoCard({ item, featured = false }: { item: typeof aiVideos[0]; featured?: boolean }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!ref.current) return;
    if (playing) {
      ref.current.pause();
      setPlaying(false);
    } else {
      // pause all others handled at parent; just play this
      ref.current.play();
      setPlaying(true);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#000",
        cursor: "pointer",
        border: "1px solid rgba(184,151,42,0.12)",
      }}
      onClick={toggle}
    >
      <video
        ref={ref}
        src={item.src}
        loop
        playsInline
        style={{
          width: "100%",
          aspectRatio: featured ? "21/9" : "16/9",
          display: "block",
          objectFit: "cover",
          filter: "brightness(0.85) saturate(0.9)",
          transition: "filter 0.4s",
        }}
        onMouseEnter={(e) =>
          ((e.currentTarget as HTMLVideoElement).style.filter =
            "brightness(1) saturate(1)")
        }
        onMouseLeave={(e) =>
          ((e.currentTarget as HTMLVideoElement).style.filter =
            "brightness(0.85) saturate(0.9)")
        }
        onEnded={() => setPlaying(false)}
      />

      {/* Overlay when paused */}
      {!playing && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "rgba(0,0,0,0.35)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              border: "1px solid rgba(212,175,55,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="#d4af37"
              width="18"
              height="18"
              style={{ marginLeft: "3px" }}
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Scanline */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.07) 3px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Caption bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "1.5rem 1rem 0.9rem",
          background: "linear-gradient(to top, rgba(0,0,0,0.85), transparent)",
          zIndex: 3,
        }}
      >
        <p
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.52rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#d4af37",
            marginBottom: "0.25rem",
          }}
        >
          {item.tag}
        </p>
        <p
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "1rem",
            fontWeight: 300,
            color: "#f0ece4",
          }}
        >
          {item.title}
        </p>
      </div>
    </div>
  );
}

export default function AIArtwork() {
  return (
    <section
      id="ai-artwork"
      style={{
        background: "#0a0a0a",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grain texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(184,151,42,0.03) 80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">Technology & Vision</p>
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
            AI{" "}
            <em style={{ color: "#d4af37" }}>Generated Art</em>
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
            RA-Film uses artificial intelligence not as a shortcut but as a
            collaborator — generating worlds, textures and sequences that
            extend the filmmaker&apos;s imagination.
          </p>
        </div>

        {/* Video grid — first item full width, rest 2-col */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Featured first video — full width */}
          <VideoCard key={0} item={aiVideos[0]} featured />

          {/* Remaining videos — 2 col grid */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "1.5rem",
            }}
            className="ai-grid"
          >
            {aiVideos.slice(1).map((v, i) => (
              <VideoCard key={i + 1} item={v} />
            ))}
          </div>
        </div>

        {/* Bottom descriptor */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "2rem",
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(184,151,42,0.15)",
          }}
          className="ai-stats"
        >
          {[
            {
              heading: "Film-First Approach",
              body: "Every AI sequence is directed — with intention, composition and narrative purpose guiding the generation.",
            },
            {
              heading: "Music & Moving Image",
              body: "Generative visuals synced to music and rhythm. AI as a new kind of cinematographer.",
            },
            {
              heading: "Experimental & Evolving",
              body: "We document our AI workflow publicly. The technology changes — our cinematic sensibility does not.",
            },
          ].map((item) => (
            <div key={item.heading}>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.2rem",
                  color: "#d4af37",
                  fontWeight: 300,
                  marginBottom: "0.75rem",
                }}
              >
                {item.heading}
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.8rem",
                  fontWeight: 300,
                  lineHeight: 1.85,
                  color: "rgba(240,236,228,0.5)",
                }}
              >
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ai-grid { grid-template-columns: 1fr !important; }
          .ai-stats { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
