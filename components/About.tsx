"use client";

export default function About() {
  return (
    <section
      id="about"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background texture lines */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 79px, rgba(184,151,42,0.04) 80px)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Grid layout */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "6rem",
            alignItems: "center",
          }}
          className="about-grid"
        >
          {/* Left: Image */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: "-20px",
                left: "-20px",
                right: "20px",
                bottom: "20px",
                border: "1px solid rgba(184,151,42,0.3)",
                zIndex: 0,
              }}
            />
            <div
              style={{
                position: "relative",
                zIndex: 1,
                overflow: "hidden",
                aspectRatio: "3/4",
              }}
            >
              <img
                src="/images/Me001.jpeg"
                alt="RA-Film"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "brightness(0.85) contrast(1.05) saturate(0.9)",
                  transition: "transform 0.6s ease",
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1.03)")
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLImageElement).style.transform = "scale(1)")
                }
              />
              {/* Film grain overlay */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "radial-gradient(ellipse at top left, rgba(184,151,42,0.08) 0%, transparent 60%)",
                  pointerEvents: "none",
                }}
              />
            </div>
          </div>

          {/* Right: Text */}
          <div>
            <p className="section-label">Who We Are</p>
            <span className="gold-line" style={{ margin: "0 0 2rem 0" }} />

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2.2rem, 4vw, 3.5rem)",
                fontWeight: 300,
                lineHeight: 1.15,
                color: "#f0ece4",
                marginBottom: "1.5rem",
              }}
            >
              Crafting Stories
              <br />
              <em style={{ color: "#d4af37" }}>Frame by Frame</em>
            </h2>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(240,236,228,0.65)",
                marginBottom: "1.5rem",
              }}
            >
              RA-Film is a creative production house rooted in visual storytelling.
              We approach every project with a filmmaker's eye — obsessing over
              light, composition, and rhythm to produce work that resonates long
              after the credits roll.
            </p>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.88rem",
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(240,236,228,0.65)",
                marginBottom: "3rem",
              }}
            >
              From documentary and narrative film to branded content and music
              videos — we bring the same commitment to craft and authenticity to
              every single frame.
            </p>

            {/* Stats */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "2rem",
                borderTop: "1px solid rgba(184,151,42,0.2)",
                paddingTop: "2rem",
              }}
            >
              {[
                { num: "50+", label: "Projects" },
                { num: "8+", label: "Years" },
                { num: "3", label: "Continents" },
              ].map((s) => (
                <div key={s.label} style={{ textAlign: "center" }}>
                  <p
                    style={{
                      fontFamily: "'Cormorant Garamond', serif",
                      fontSize: "2.5rem",
                      fontWeight: 300,
                      color: "#d4af37",
                      lineHeight: 1,
                      marginBottom: "0.4rem",
                    }}
                  >
                    {s.num}
                  </p>
                  <p
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(240,236,228,0.4)",
                    }}
                  >
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}
