"use client";
import { useState } from "react";

const jsonExample = `{
  "project": "RA-Film Production",
  "pipeline": {
    "concept": {
      "prompt": "cinematic noir, golden hour, 
                 urban isolation",
      "style_refs": ["Tarkovsky", "Wong Kar-wai"],
      "mood": "melancholic, intimate"
    },
    "generation": {
      "model": "stable-diffusion-xl",
      "frames": 120,
      "fps": 24,
      "resolution": "4K"
    },
    "composition": {
      "color_grade": "teal-orange",
      "grain": 0.15,
      "vignette": 0.4,
      "aspect_ratio": "2.39:1"
    },
    "output": {
      "format": "ProRes 4444",
      "delivery": ["theatrical", "streaming"]
    }
  }
}`;

const specialisms = [
  {
    title: "AI-Driven Storyboarding",
    desc: "Using generative models to visualise shots before a single frame is filmed. Pitch-perfect briefs, zero ambiguity.",
    icon: "◈",
  },
  {
    title: "JSON Pipeline Architecture",
    desc: "Every creative decision — mood, palette, motion, grade — encoded as structured data. Reproducible, scalable, version-controlled art.",
    icon: "{ }",
  },
  {
    title: "Generative VFX",
    desc: "AI-generated textures, environments and motion elements woven seamlessly into live-action footage.",
    icon: "◎",
  },
  {
    title: "Style Transfer & Grading",
    desc: "Reference a director's visual signature or a painting's palette — applied with neural precision across an entire edit.",
    icon: "▣",
  },
  {
    title: "Prompt Engineering for Film",
    desc: "Crafting structured prompts that translate a director's vision into consistent, controllable visual outputs.",
    icon: "≋",
  },
  {
    title: "Human-AI Collaboration",
    desc: "Technology serves the story — never the other way around. AI as a tool in the hands of a filmmaker, not a replacement.",
    icon: "⬡",
  },
];

export default function AiTechnology() {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonExample);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="ai-technology"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background grid lines */}
      <div style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: `
          linear-gradient(rgba(184,151,42,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(184,151,42,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "60px 60px",
      }} />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem", position: "relative", zIndex: 1 }}>

        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">Specialisation</p>
          <span className="gold-line" />
          <h2 style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(2.2rem, 5vw, 4rem)",
            fontWeight: 300,
            color: "#f0ece4",
            lineHeight: 1.2,
            marginTop: "0.5rem",
          }}>
            Art Technology &amp;{" "}
            <em style={{ color: "#d4af37" }}>AI for Film</em>
          </h2>
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.88rem",
            fontWeight: 300,
            lineHeight: 1.9,
            color: "rgba(240,236,228,0.5)",
            maxWidth: "620px",
            margin: "1.5rem auto 0",
          }}>
            The convergence of artificial intelligence and cinematic craft opens
            a new creative frontier. RA-Film operates at that intersection —
            treating AI not as automation, but as a new artistic medium.
          </p>
        </div>

        {/* Two column: JSON block + intro text */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "1.1fr 1fr",
          gap: "5rem",
          alignItems: "center",
          marginBottom: "7rem",
        }} className="ai-intro-grid">

          {/* JSON code block */}
          <div style={{ position: "relative" }}>
            {/* Terminal chrome */}
            <div style={{
              background: "#080808",
              border: "1px solid rgba(184,151,42,0.2)",
              borderRadius: "2px",
              overflow: "hidden",
            }}>
              {/* Title bar */}
              <div style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.75rem 1.25rem",
                borderBottom: "1px solid rgba(184,151,42,0.15)",
                background: "#0a0a0a",
              }}>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  {["#ff5f56","#ffbd2e","#27c93f"].map((c) => (
                    <div key={c} style={{
                      width: "10px", height: "10px",
                      borderRadius: "50%", background: c, opacity: 0.7,
                    }} />
                  ))}
                </div>
                <span style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  color: "rgba(240,236,228,0.25)",
                  textTransform: "uppercase",
                }}>
                  ra-film-pipeline.json
                </span>
                <button
                  onClick={handleCopy}
                  style={{
                    background: "none",
                    border: "1px solid rgba(184,151,42,0.25)",
                    color: copied ? "#27c93f" : "rgba(240,236,228,0.35)",
                    fontFamily: "'Montserrat', sans-serif",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    padding: "0.3rem 0.75rem",
                    cursor: "pointer",
                    transition: "all 0.3s",
                  }}
                >
                  {copied ? "Copied ✓" : "Copy"}
                </button>
              </div>

              {/* Code */}
              <pre style={{
                padding: "1.5rem",
                margin: 0,
                fontFamily: "'Montserrat', monospace",
                fontSize: "0.72rem",
                lineHeight: 1.75,
                color: "rgba(240,236,228,0.75)",
                overflowX: "auto",
                whiteSpace: "pre",
              }}>
                {jsonExample.split("\n").map((line, i) => {
                  // Highlight keys in gold, strings in warm white, numbers in blue-ish
                  const highlighted = line
                    .replace(/"([^"]+)":/g, '<span style="color:#d4af37">"$1"</span>:')
                    .replace(/: "([^"]+)"/g, ': <span style="color:#c8b89a">"$1"</span>')
                    .replace(/: (\d+\.?\d*)/g, ': <span style="color:#7eb8c9">$1</span>');
                  return (
                    <span
                      key={i}
                      dangerouslySetInnerHTML={{ __html: highlighted + "\n" }}
                    />
                  );
                })}
              </pre>
            </div>

            {/* Gold accent corner */}
            <div style={{
              position: "absolute", bottom: "-12px", right: "-12px",
              width: "60px", height: "60px",
              borderRight: "1px solid rgba(184,151,42,0.3)",
              borderBottom: "1px solid rgba(184,151,42,0.3)",
              pointerEvents: "none",
            }} />
          </div>

          {/* Text side */}
          <div>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
              fontWeight: 300,
              color: "#f0ece4",
              lineHeight: 1.3,
              marginBottom: "1.5rem",
            }}>
              The <em style={{ color: "#d4af37" }}>JSON Approach</em>
              <br />to Cinematic AI
            </h3>

            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.87rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(240,236,228,0.6)",
              marginBottom: "1.25rem",
            }}>
              Every creative vision can be expressed as structured data. A JSON
              pipeline defines the DNA of a production — from the conceptual mood
              and reference directors, down to frame rate, grain level and
              delivery format.
            </p>

            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.87rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(240,236,228,0.6)",
              marginBottom: "1.25rem",
            }}>
              This approach makes AI generation <em style={{ color: "#d4af37" }}>
              reproducible and collaborative</em>. Share a JSON file and any
              team member — or any model — can reconstruct the exact visual
              intent of the director. No lost briefs. No lost tone.
            </p>

            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.87rem",
              fontWeight: 300,
              lineHeight: 1.9,
              color: "rgba(240,236,228,0.6)",
            }}>
              It bridges the gap between the <em style={{ color: "#d4af37" }}>
              artist&apos;s instinct</em> and the machine&apos;s precision — a new
              language for a new era of filmmaking.
            </p>

            {/* Tags */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.6rem", marginTop: "2rem" }}>
              {["Stable Diffusion", "Runway ML", "ComfyUI", "ControlNet", "LoRA Fine-tuning", "Sora", "ElevenLabs"].map((tag) => (
                <span key={tag} style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(184,151,42,0.8)",
                  border: "1px solid rgba(184,151,42,0.25)",
                  padding: "0.35rem 0.85rem",
                }}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* 6 Specialisms grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: "1.5px",
          background: "rgba(184,151,42,0.12)",
        }} className="specialism-grid">
          {specialisms.map((s) => (
            <div
              key={s.title}
              style={{
                background: "#0d0d0d",
                padding: "2.5rem 2rem",
                transition: "background 0.3s",
                cursor: "default",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background = "#111111")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLDivElement).style.background = "#0d0d0d")
              }
            >
              <div style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.8rem",
                color: "#d4af37",
                marginBottom: "1rem",
                lineHeight: 1,
              }}>
                {s.icon}
              </div>
              <h4 style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.2rem",
                fontWeight: 400,
                color: "#f0ece4",
                marginBottom: "0.75rem",
                letterSpacing: "0.02em",
              }}>
                {s.title}
              </h4>
              <p style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.78rem",
                fontWeight: 300,
                lineHeight: 1.8,
                color: "rgba(240,236,228,0.45)",
              }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .ai-intro-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
          .specialism-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 560px) {
          .specialism-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
}
