"use client";

export default function AboutHero() {
  return (
    <section
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
      {/* Fullscreen background video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          filter: "brightness(0.35) saturate(0.8)",
        }}
      >
        <source src="/videoRA/RunBlackbirdIntroRA.mp4" type="video/mp4" />
      </video>

      {/* Cinematic overlays */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.75) 100%)",
        zIndex: 1,
      }} />
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 35%, rgba(0,0,0,0.65) 100%)",
        zIndex: 2,
      }} />

      {/* Scanlines */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 3,
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 3px)",
        pointerEvents: "none",
      }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 4, textAlign: "center", padding: "0 2rem" }}>
        <p className="section-label fade-up">Art · Technology · Cinema</p>

        <h1
          className="fade-up-delay"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            fontWeight: 300,
            letterSpacing: "0.08em",
            lineHeight: 1,
            color: "#f0ece4",
            marginBottom: "0.5rem",
          }}
        >
          The <em style={{ color: "#d4af37" }}>Mind</em>
          <br />Behind the Lens
        </h1>

        <span className="gold-line fade-up-delay-2" style={{ marginTop: "2rem" }} />

        <p
          className="fade-up-delay-2"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 300,
            fontSize: "clamp(0.75rem, 1.4vw, 0.9rem)",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "rgba(240,236,228,0.6)",
            marginTop: "1.5rem",
            maxWidth: "500px",
            margin: "1.5rem auto 0",
            lineHeight: 1.9,
          }}
        >
          Filmmaker · AI Specialist · Visual Artist
        </p>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: "3rem", right: "3rem", zIndex: 4,
        display: "flex", flexDirection: "column", alignItems: "center", gap: "0.5rem",
      }}>
        <span style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.55rem", letterSpacing: "0.25em",
          textTransform: "uppercase", color: "rgba(240,236,228,0.35)",
          writingMode: "vertical-rl",
        }}>Scroll</span>
        <div style={{
          width: "1px", height: "50px",
          background: "linear-gradient(to bottom, rgba(212,175,55,0.7), transparent)",
          animation: "scrollPulse 2s ease infinite",
        }} />
        <style>{`
          @keyframes scrollPulse {
            0%, 100% { opacity: 0.4; }
            50% { opacity: 1; }
          }
        `}</style>
      </div>
    </section>
  );
}
