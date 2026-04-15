"use client";

const steps = [
  {
    num: "01",
    title: "Spatial Capture",
    body: "Shooting with multi-lens 360° rigs — Insta360, Ricoh Theta, GoPro Max, and custom multi-camera arrays. Every angle, simultaneously. No blind spots.",
    icon: "⊙",
  },
  {
    num: "02",
    title: "Stitching & Alignment",
    body: "Raw footage is processed through Autopano Video, PTGui and proprietary pipelines to produce seamless equirectangular masters — geometrically correct, colour-matched.",
    icon: "⊕",
  },
  {
    num: "03",
    title: "AI-Enhanced Stabilisation",
    body: "Neural stabilisation removes rig movement, corrects horizon drift and eliminates stitch lines using AI-powered optical flow and depth estimation.",
    icon: "◈",
  },
  {
    num: "04",
    title: "Spatial Audio",
    body: "Ambisonic sound recorded alongside the image. First-order and higher-order ambisonics processed for head-tracked playback — the sound moves with the viewer.",
    icon: "◎",
  },
  {
    num: "05",
    title: "Immersive Grading",
    body: "360° colour grading requires painting every pixel of a sphere. We use Resolve with 360° plugins and custom LUTs built for the specific display environment.",
    icon: "▣",
  },
  {
    num: "06",
    title: "Delivery & Distribution",
    body: "Output as equirectangular video for YouTube 360, Meta Quest, Apple Vision Pro, WebGL viewers, and custom installation builds for gallery or event use.",
    icon: "⬡",
  },
];

const tech = [
  { category: "Cameras", items: ["Insta360 Pro 2", "GoPro Max", "Ricoh Theta Z1", "Custom Rigs"] },
  { category: "Stitching", items: ["Autopano Video", "PTGui Pro", "Mistika VR", "Custom Pipeline"] },
  { category: "AI Tools", items: ["Optical Flow AI", "Neural Depth", "Stable Diffusion 360", "ControlNet Pano"] },
  { category: "Delivery", items: ["YouTube 360", "Meta Quest", "Apple Vision Pro", "WebGL / Three.js"] },
];

export default function ProcessSection() {
  return (
    <section
      id="process"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle sphere background */}
      <div style={{
        position: "absolute",
        width: "700px", height: "700px",
        borderRadius: "50%",
        border: "1px solid rgba(184,151,42,0.04)",
        top: "50%", right: "-200px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
        boxShadow: "0 0 200px rgba(184,151,42,0.02) inset",
      }} />
      <div style={{
        position: "absolute",
        width: "500px", height: "500px",
        borderRadius: "50%",
        border: "1px solid rgba(184,151,42,0.03)",
        top: "50%", right: "-100px",
        transform: "translateY(-50%)",
        pointerEvents: "none",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "6rem" }}>
          <p className="section-label">How We Work</p>
          <span className="gold-line" />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#f0ece4",
            marginTop: "0.5rem",
          }}>
            The 360° <em style={{ color: "#d4af37" }}>Production Process</em>
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.85rem", fontWeight: 300, lineHeight: 1.9,
            color: "rgba(240,236,228,0.45)",
            maxWidth: "560px", margin: "1.5rem auto 0",
          }}>
            From a single spatial capture to a fully immersive experience — every stage
            is deliberate, technical, and driven by the story we&apos;re trying to tell.
          </p>
        </div>

        {/* Steps — alternating timeline */}
        <div style={{ position: "relative", marginBottom: "7rem" }}>
          {/* Centre line — hidden on mobile */}
          <div className="timeline-line" style={{
            position: "absolute",
            left: "50%",
            top: 0, bottom: 0,
            width: "1px",
            background: "linear-gradient(to bottom, transparent, rgba(184,151,42,0.3) 10%, rgba(184,151,42,0.3) 90%, transparent)",
            transform: "translateX(-50%)",
          }} />

          <div style={{ display: "flex", flexDirection: "column", gap: "4rem" }}>
            {steps.map((s, i) => (
              <div
                key={s.num}
                className="step-row"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 80px 1fr",
                  gap: "0",
                  alignItems: "center",
                }}
              >
                {/* Left content (even) */}
                <div style={{
                  textAlign: "right",
                  paddingRight: "3rem",
                  opacity: i % 2 === 0 ? 1 : 0,
                  pointerEvents: i % 2 === 0 ? "auto" : "none",
                }}>
                  {i % 2 === 0 && <StepCard s={s} align="right" />}
                </div>

                {/* Centre node */}
                <div style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  <div style={{
                    width: "44px", height: "44px",
                    borderRadius: "50%",
                    border: "1px solid rgba(184,151,42,0.4)",
                    background: "#0d0d0d",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#d4af37",
                    fontSize: "1.1rem",
                    flexShrink: 0,
                    zIndex: 1,
                  }}>
                    {s.icon}
                  </div>
                </div>

                {/* Right content (odd) */}
                <div style={{
                  paddingLeft: "3rem",
                  opacity: i % 2 !== 0 ? 1 : 0,
                  pointerEvents: i % 2 !== 0 ? "auto" : "none",
                }}>
                  {i % 2 !== 0 && <StepCard s={s} align="left" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tech stack grid */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <p className="section-label">Technology Stack</p>
          <span className="gold-line" />
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "1.5px",
          background: "rgba(184,151,42,0.1)",
        }} className="tech-grid">
          {tech.map((t) => (
            <div key={t.category} style={{
              background: "#0d0d0d",
              padding: "2rem 1.5rem",
            }}>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                color: "#d4af37",
                marginBottom: "1.25rem",
                paddingBottom: "0.75rem",
                borderBottom: "1px solid rgba(184,151,42,0.15)",
              }}>
                {t.category}
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.6rem" }}>
                {t.items.map((item) => (
                  <li key={item} style={{
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.78rem",
                    fontWeight: 300,
                    color: "rgba(240,236,228,0.5)",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                  }}>
                    <span style={{ color: "rgba(184,151,42,0.4)", fontSize: "0.5rem" }}>◆</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .step-row {
            grid-template-columns: 40px 1fr !important;
          }
          .step-row > div:first-child {
            display: none !important;
          }
          .step-row > div:last-child {
            opacity: 1 !important;
            pointer-events: auto !important;
            padding-left: 1.25rem !important;
          }
          .timeline-line {
            left: 20px !important;
            transform: none !important;
          }
          .tech-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 480px) {
          .tech-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}

function StepCard({ s, align }: { s: typeof steps[0]; align?: "left" | "right" }) {
  return (
    <div style={{ textAlign: align === "right" ? "right" : "left" }}>
      <span style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "3.5rem",
        fontWeight: 300,
        color: "rgba(184,151,42,0.12)",
        lineHeight: 1,
        display: "block",
        marginBottom: "0.25rem",
      }}>
        {s.num}
      </span>
      <h3 style={{
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "1.4rem",
        fontWeight: 400,
        color: "#f0ece4",
        marginBottom: "0.75rem",
        letterSpacing: "0.02em",
      }}>
        {s.title}
      </h3>
      <p style={{
        fontFamily: "'Montserrat', sans-serif",
        fontSize: "0.8rem",
        fontWeight: 300,
        lineHeight: 1.8,
        color: "rgba(240,236,228,0.45)",
      }}>
        {s.body}
      </p>
    </div>
  );
}
