"use client";

export default function Footer() {
  return (
    <footer
      style={{
        background: "#050505",
        borderTop: "1px solid rgba(184,151,42,0.12)",
        padding: "2.5rem 2rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "1rem",
      }}
    >
      <div
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.3rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          color: "#d4af37",
        }}
      >
        RA<span style={{ color: "#f0ece4", fontWeight: 600 }}>Film</span>
      </div>

      <p
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.6rem",
          fontWeight: 300,
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "rgba(240,236,228,0.25)",
        }}
      >
        &copy; {new Date().getFullYear()} RA-Film. All rights reserved.
      </p>

      <div
        style={{
          display: "flex",
          gap: "1.5rem",
        }}
      >
        {["Instagram", "Vimeo", "YouTube"].map((s) => (
          <a
            key={s}
            href="#"
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              color: "rgba(240,236,228,0.3)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "#d4af37")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLAnchorElement).style.color = "rgba(240,236,228,0.3)")
            }
          >
            {s}
          </a>
        ))}
      </div>
    </footer>
  );
}
