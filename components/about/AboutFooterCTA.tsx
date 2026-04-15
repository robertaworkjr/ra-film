"use client";
import Link from "next/link";

export default function AboutFooterCTA() {
  return (
    <section style={{
      background: "#0d0d0d",
      padding: "7rem 2rem",
      textAlign: "center",
      borderTop: "1px solid rgba(184,151,42,0.12)",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Decorative bg text */}
      <div style={{
        position: "absolute", inset: 0,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "22rem", fontWeight: 300,
        color: "rgba(184,151,42,0.025)",
        userSelect: "none", pointerEvents: "none", lineHeight: 1,
      }}>
        RA
      </div>

      <div style={{ position: "relative", zIndex: 1 }}>
        <p className="section-label">Ready to Create?</p>
        <span className="gold-line" />

        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          fontWeight: 300, color: "#f0ece4",
          lineHeight: 1.2, marginTop: "0.5rem",
          marginBottom: "1.5rem",
        }}>
          Let&apos;s Make Something<br />
          <em style={{ color: "#d4af37" }}>Extraordinary</em>
        </h2>

        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.87rem", fontWeight: 300, lineHeight: 1.9,
          color: "rgba(240,236,228,0.5)",
          maxWidth: "480px", margin: "0 auto 3rem",
        }}>
          Whether you have a fully-formed concept or just an instinct — bring it.
          We&apos;ll develop it, visualise it, and shoot it.
        </p>

        <div style={{ display: "flex", gap: "1.5rem", justifyContent: "center", flexWrap: "wrap" }}>
          <Link
            href="/#contact"
            style={{
              background: "transparent",
              border: "1px solid #d4af37",
              color: "#d4af37",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem", fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "0.9rem 2.5rem",
              textDecoration: "none",
              transition: "all 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "#d4af37";
              (e.currentTarget as HTMLAnchorElement).style.color = "#050505";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
              (e.currentTarget as HTMLAnchorElement).style.color = "#d4af37";
            }}
          >
            Get in Touch
          </Link>
          <Link
            href="/"
            style={{
              background: "transparent",
              border: "1px solid rgba(240,236,228,0.2)",
              color: "rgba(240,236,228,0.6)",
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.7rem", fontWeight: 500,
              letterSpacing: "0.25em", textTransform: "uppercase",
              padding: "0.9rem 2.5rem",
              textDecoration: "none",
              transition: "all 0.3s",
              display: "inline-block",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,236,228,0.5)";
              (e.currentTarget as HTMLAnchorElement).style.color = "#f0ece4";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(240,236,228,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,236,228,0.6)";
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </section>
  );
}
