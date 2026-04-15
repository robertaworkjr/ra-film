"use client";
import { useRef, useState } from "react";

export default function FilmCell() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);

  function toggle() {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
      setPlaying(false);
    } else {
      videoRef.current.play();
      setPlaying(true);
    }
  }

  return (
    <section
      id="film-cell"
      style={{
        background: "#060606",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Horizontal rule accent */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: "1px",
          background:
            "linear-gradient(to right, transparent, rgba(212,175,55,0.3), transparent)",
        }}
      />

      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 2rem" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="section-label">AI Generated Art</p>
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
            <em style={{ color: "#d4af37" }}>Film Cell</em>
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
            Where cinematic instinct meets generative intelligence. RA-Film
            explores AI as a creative tool — producing visuals, moods and
            narratives that exist beyond the possible.
          </p>
        </div>

        {/* Two-column layout: video left, text right */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "4rem",
            alignItems: "center",
          }}
          className="filmcell-grid"
        >
          {/* Video */}
          <div style={{ position: "relative" }}>
            {/* Gold frame */}
            <div
              style={{
                position: "absolute",
                top: "-16px",
                left: "-16px",
                right: "16px",
                bottom: "16px",
                border: "1px solid rgba(184,151,42,0.25)",
                zIndex: 0,
                pointerEvents: "none",
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                background: "#000",
                cursor: "pointer",
              }}
              onClick={toggle}
            >
              <video
                ref={videoRef}
                src="/videoRA/prisionCell01.mp4"
                loop
                playsInline
                style={{
                  width: "100%",
                  display: "block",
                  filter: "brightness(0.9) contrast(1.05)",
                }}
                onEnded={() => setPlaying(false)}
              />

              {/* Play/Pause overlay */}
              {!playing && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(0,0,0,0.45)",
                  }}
                >
                  <div
                    style={{
                      width: "72px",
                      height: "72px",
                      borderRadius: "50%",
                      border: "1px solid rgba(212,175,55,0.6)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "rgba(0,0,0,0.4)",
                    }}
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="#d4af37"
                      width="26"
                      height="26"
                      style={{ marginLeft: "4px" }}
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
                    "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 3px)",
                  pointerEvents: "none",
                  zIndex: 2,
                }}
              />
            </div>

            {/* Label */}
            <div
              style={{
                marginTop: "1rem",
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "50%",
                  background: playing ? "#d4af37" : "rgba(212,175,55,0.3)",
                  display: "inline-block",
                  transition: "background 0.3s",
                }}
              />
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,228,0.35)",
                }}
              >
                Prison Cell — AI Film Sequence
              </p>
            </div>
          </div>

          {/* Text side */}
          <div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(1.6rem, 3vw, 2.4rem)",
                fontWeight: 300,
                color: "#f0ece4",
                lineHeight: 1.3,
                marginBottom: "2rem",
              }}
            >
              Confinement.
              <br />
              <em style={{ color: "#d4af37" }}>Light. Memory.</em>
            </p>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(240,236,228,0.6)",
                marginBottom: "1.5rem",
              }}
            >
              A prison cell — stripped of everything except light and time. This
              AI-generated sequence was created by RA-Film as part of an ongoing
              exploration into generative cinema: what the camera cannot reach,
              the algorithm can imagine.
            </p>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(240,236,228,0.6)",
              }}
            >
              The result sits somewhere between memory and document — a visual
              grammar for stories that have no footage, only feeling.
            </p>

            <div
              style={{
                marginTop: "3rem",
                paddingTop: "2rem",
                borderTop: "1px solid rgba(184,151,42,0.15)",
                display: "flex",
                gap: "2.5rem",
              }}
            >
              {[
                { label: "Medium", value: "AI Video" },
                { label: "Style", value: "Cinematic" },
                { label: "Tech", value: "Generative" },
              ].map((t) => (
                <div key={t.label}>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.55rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,236,228,0.3)",
                      marginBottom: "0.3rem",
                    }}
                  >
                    {t.label}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "1rem",
                      color: "#d4af37",
                      fontStyle: "italic",
                    }}
                  >
                    {t.value}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .filmcell-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
