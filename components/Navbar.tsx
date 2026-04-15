"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const sectionIds: Record<string, string> = {
    Showreel: "showreel",
    "Film Cell": "film-cell",
    "AI Art": "ai-artwork",
    Drone: "drone",
    "3D Work": "3d-work",
    Contact: "contact",
  };

  const handleNavClick = (label: string) => {
    setMenuOpen(false);
    if (label === "About") {
      router.push("/about");
      return;
    }
    if (label === "360°") {
      router.push("/360-film");
      return;
    }
    const id = sectionIds[label] ?? label.toLowerCase();
    if (pathname === "/") {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push(`/#${id}`);
    }
  };

  const navItems = ["About", "360°", "Showreel", "Film Cell", "AI Art", "Drone", "3D Work", "Contact"];

  return (
    <nav
      className="nav-root"
      style={{
        position: "fixed",
        top: "32px",
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "1.2rem 3rem",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        transition: "background 0.4s ease",
        background: scrolled ? "rgba(5,5,5,0.92)" : "transparent",
        borderBottom: scrolled ? "1px solid rgba(184,151,42,0.15)" : "none",
        backdropFilter: scrolled ? "blur(8px)" : "none",
      }}
    >
      {/* Logo */}
      <Link
        href="/"
        style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "1.6rem",
          fontWeight: 300,
          letterSpacing: "0.15em",
          color: "#d4af37",
          textDecoration: "none",
          userSelect: "none",
        }}
      >
        RA<span style={{ color: "#f0ece4", fontWeight: 600 }}>Film</span>
      </Link>

      {/* Desktop links */}
      <ul
        style={{
          display: "flex",
          gap: "2.5rem",
          listStyle: "none",
          margin: 0,
          padding: 0,
          alignItems: "center",
        }}
        className="desktop-nav"
      >
        {navItems.map((l) => (
          <li key={l}>
            <button
              onClick={() => handleNavClick(l)}
              style={{
                background: "none",
                border: "none",
                color: (pathname === "/about" && l === "About") || (pathname === "/360-film" && l === "360°") ? "#d4af37" : "#f0ece4",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.7rem",
                fontWeight: 400,
                letterSpacing: "0.25em",
                textTransform: "uppercase",
                cursor: "pointer",
                padding: "0.25rem 0",
                opacity: pathname === "/about" && l === "About" ? 1 : 0.85,
                transition: "opacity 0.3s, color 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.opacity = "1";
                (e.currentTarget as HTMLButtonElement).style.color = "#d4af37";
              }}
              onMouseLeave={(e) => {
                const isActive = (pathname === "/about" && l === "About") || (pathname === "/360-film" && l === "360°");
                (e.currentTarget as HTMLButtonElement).style.opacity = isActive ? "1" : "0.85";
                (e.currentTarget as HTMLButtonElement).style.color = isActive ? "#d4af37" : "#f0ece4";
              }}
            >
              {l}
            </button>
          </li>
        ))}
      </ul>

      {/* Mobile hamburger */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          display: "none",
          background: "none",
          border: "none",
          cursor: "pointer",
          flexDirection: "column",
          gap: "5px",
          padding: "4px",
        }}
        className="hamburger"
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: "block",
              width: "24px",
              height: "1px",
              background: "#d4af37",
              transition: "all 0.3s",
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "rgba(5,5,5,0.97)",
            padding: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
            borderTop: "1px solid rgba(184,151,42,0.2)",
          }}
        >
          {navItems.map((l) => (
            <button
              key={l}
              onClick={() => handleNavClick(l)}
              style={{
                background: "none",
                border: "none",
                color: "#f0ece4",
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {l}
            </button>
          ))}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; }
          .nav-root {
            top: 20px !important;
            padding: 1rem 1.25rem !important;
          }
        }
      `}</style>
    </nav>
  );
}
