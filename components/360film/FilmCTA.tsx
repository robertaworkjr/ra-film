"use client";
import Link from "next/link";

export default function FilmCTA() {
  return (
    <section style={{
      background: "#050505",
      padding: "7rem 2rem",
      textAlign: "center",
      borderTop: "1px solid rgba(184,151,42,0.1)",
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "20rem", fontWeight: 300,
        color: "rgba(184,151,42,0.02)",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
        letterSpacing: "-0.05em",
      }}>
        360°
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p className="section-label">Commission a Project</p>
        <span className="gold-line" />
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          fontWeight: 300, color: "#f0ece4",
          lineHeight: 1.2, marginTop: "0.5rem", marginBottom: "1.5rem",
        }}>
          Create Your Own<br /><em style={{ color: "#d4af37" }}>Immersive World</em>
        </h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.87rem", fontWeight: 300, lineHeight: 1.9,
          color: "rgba(240,236,228,0.45)",
          maxWidth: "500px", margin: "0 auto 3rem",
        }}>
          Have a space, a story, or an event that deserves to be experienced
          from the inside? Let&apos;s talk about what 360° can do for your vision.
        </p>
        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link href="/#contact" style={{
            background: "transparent", border: "1px solid #d4af37",
            color: "#d4af37", fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.7rem", fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "0.9rem 2.5rem", textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "#d4af37"; (e.currentTarget as HTMLAnchorElement).style.color = "#050505"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; (e.currentTarget as HTMLAnchorElement).style.color = "#d4af37"; }}>
            Start a Project
          </Link>
          <Link href="/about" style={{
            background: "transparent", border: "1px solid rgba(240,236,228,0.2)",
            color: "rgba(240,236,228,0.6)", fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.7rem", fontWeight: 500,
            letterSpacing: "0.25em", textTransform: "uppercase",
            padding: "0.9rem 2.5rem", textDecoration: "none",
            transition: "all 0.3s", display: "inline-block",
          }}
          onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,236,228,0.5)"; (e.currentTarget as HTMLAnchorElement).style.color = "#f0ece4"; }}
          onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,236,228,0.2)"; (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,236,228,0.6)"; }}>
            View Our AI Work
          </Link>
        </div>
      </div>
    </section>
  );
}
