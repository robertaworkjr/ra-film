"use client";

const experiences = [
  {
    title: "VR Headset",
    platforms: ["Meta Quest 2 / 3 / Pro", "Apple Vision Pro", "HTC Vive", "PlayStation VR2"],
    desc: "The purest form of immersive cinema. The viewer puts on a headset and is teleported — physically, perceptually — into the filmed world.",
    icon: "◎",
    tag: "Hardware",
  },
  {
    title: "Dome Projection",
    platforms: ["Full-dome 360°", "Half-dome", "Inflatable domes", "Planetarium retrofit"],
    desc: "A spherical screen surrounds the audience. No headset required — the entire space becomes the image. Ideal for festivals, galleries and public events.",
    icon: "⊙",
    tag: "Installation",
  },
  {
    title: "WebGL / Browser",
    platforms: ["Desktop browsers", "Mobile", "Embedded iframes", "Three.js / A-Frame"],
    desc: "Zero installation. Share a link — the viewer drags to look around inside the film. Works on any device. Shareable, embeddable, scalable.",
    icon: "{ }",
    tag: "Digital",
  },
  {
    title: "Multi-Screen Installation",
    platforms: ["Projection mapping", "LED wall arrays", "Curved surfaces", "Architecture"],
    desc: "360° footage mapped to physical spaces — walls, floors, ceilings. The building becomes the canvas. Each surface a different angle of the same spatial film.",
    icon: "▣",
    tag: "Spatial",
  },
  {
    title: "AI-Generated 360°",
    platforms: ["Stable Diffusion Pano", "Equirectangular diffusion", "360° ControlNet", "Generative environments"],
    desc: "Using AI to generate entirely synthetic 360° environments — historical reconstructions, impossible spaces, or extensions of live-action footage into the unfilmable.",
    icon: "≋",
    tag: "AI / Generative",
  },
  {
    title: "Live 360° Streaming",
    platforms: ["YouTube Live 360", "Facebook 360", "Custom RTMP", "Real-time events"],
    desc: "Broadcasting immersive content in real time. Concerts, performances, ceremonies — experienced spatially by remote audiences, anywhere on earth.",
    icon: "⬡",
    tag: "Live",
  },
];

export default function ImmersiveExperiences() {
  return (
    <section
      id="experiences"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* BG grid */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(184,151,42,0.025) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,151,42,0.025) 1px, transparent 1px)
        `,
        backgroundSize: "80px 80px",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">Delivery Formats</p>
          <span className="gold-line" />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 300, color: "#f0ece4",
            lineHeight: 1.2, marginTop: "0.5rem",
          }}>
            New Forms of <em style={{ color: "#d4af37" }}>Immersive Experience</em>
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.9,
            color: "rgba(240,236,228,0.45)",
            maxWidth: "560px", margin: "1.5rem auto 0",
          }}>
            360° film is not a single format — it is a new creative language that
            can be spoken in headsets, galleries, browsers, and buildings.
            RA-Film works across all of them.
          </p>
        </div>

        {/* Cards grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5px",
          background: "rgba(184,151,42,0.08)",
          marginBottom: "6rem",
        }} className="exp-grid">
          {experiences.map((e) => (
            <div
              key={e.title}
              style={{
                background: "#0d0d0d",
                padding: "2.5rem 2rem",
                transition: "background 0.3s",
                cursor: "default",
                position: "relative",
              }}
              onMouseEnter={(el) => ((el.currentTarget as HTMLDivElement).style.background = "#111111")}
              onMouseLeave={(el) => ((el.currentTarget as HTMLDivElement).style.background = "#0d0d0d")}
            >
              {/* Tag */}
              <span style={{
                position: "absolute", top: "1.5rem", right: "1.5rem",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.5rem", letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(184,151,42,0.5)",
                border: "1px solid rgba(184,151,42,0.15)",
                padding: "0.2rem 0.5rem",
              }}>{e.tag}</span>

              {/* Icon */}
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2rem", color: "#d4af37",
                marginBottom: "1rem", lineHeight: 1,
              }}>
                {e.icon}
              </div>

              <h3 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem", fontWeight: 400,
                color: "#f0ece4", marginBottom: "0.75rem",
              }}>
                {e.title}
              </h3>

              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.78rem", fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(240,236,228,0.45)",
                marginBottom: "1.25rem",
              }}>
                {e.desc}
              </p>

              {/* Platform pills */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                {e.platforms.map((p) => (
                  <span key={p} style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.55rem", letterSpacing: "0.1em",
                    color: "rgba(240,236,228,0.3)",
                    border: "1px solid rgba(240,236,228,0.08)",
                    padding: "0.2rem 0.5rem",
                  }}>
                    {p}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Pull quote */}
        <div style={{
          borderLeft: "2px solid #d4af37",
          paddingLeft: "2.5rem",
          maxWidth: "700px",
          margin: "0 auto",
        }}>
          <p style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(1.4rem, 3vw, 2rem)",
            fontWeight: 300,
            fontStyle: "italic",
            color: "rgba(240,236,228,0.75)",
            lineHeight: 1.6,
            marginBottom: "1rem",
          }}>
            &ldquo;The cinema of the future doesn&apos;t ask you to look at the world.
            It asks you to stand inside it.&rdquo;
          </p>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.65rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#d4af37",
          }}>
            — RA-Film
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .exp-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .exp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
