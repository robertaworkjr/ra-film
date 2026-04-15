"use client";
import { useState } from "react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", project: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Placeholder — wire up your backend / email service here
    setSent(true);
    setTimeout(() => setSent(false), 4000);
    setForm({ name: "", email: "", project: "", message: "" });
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "transparent",
    border: "none",
    borderBottom: "1px solid rgba(184,151,42,0.3)",
    color: "#f0ece4",
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.85rem",
    fontWeight: 300,
    padding: "0.75rem 0",
    outline: "none",
    transition: "border-color 0.3s",
    letterSpacing: "0.05em",
  };

  const labelStyle: React.CSSProperties = {
    fontFamily: "'Montserrat', sans-serif",
    fontSize: "0.6rem",
    letterSpacing: "0.25em",
    textTransform: "uppercase",
    color: "rgba(184,151,42,0.8)",
    display: "block",
    marginBottom: "0.25rem",
    marginTop: "2rem",
  };

  return (
    <section
      id="contact"
      style={{
        background: "#0d0d0d",
        padding: "8rem 0 6rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Large decorative letter */}
      <div
        style={{
          position: "absolute",
          right: "-2rem",
          bottom: "2rem",
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "25rem",
          fontWeight: 300,
          color: "rgba(184,151,42,0.03)",
          lineHeight: 1,
          userSelect: "none",
          pointerEvents: "none",
        }}
      >
        RA
      </div>

      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "0 2rem",
          position: "relative",
          zIndex: 1,
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.4fr",
            gap: "6rem",
            alignItems: "start",
          }}
          className="contact-grid"
        >
          {/* Left */}
          <div>
            <p className="section-label">Let&apos;s Work Together</p>
            <span className="gold-line" style={{ margin: "0 0 2rem 0" }} />

            <h2
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "clamp(2rem, 4vw, 3.2rem)",
                fontWeight: 300,
                lineHeight: 1.2,
                color: "#f0ece4",
                marginBottom: "2rem",
              }}
            >
              Start Your
              <br />
              <em style={{ color: "#d4af37" }}>Next Project</em>
            </h2>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.85rem",
                fontWeight: 300,
                lineHeight: 1.9,
                color: "rgba(240,236,228,0.55)",
                marginBottom: "3rem",
              }}
            >
              Have a story to tell? We&apos;d love to hear about your vision.
              Whether it&apos;s a short film, documentary, commercial, or
              something entirely new — let&apos;s create something unforgettable together.
            </p>

            {/* Contact info lines */}
            <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
              {[
                { label: "Email", value: "hello@rafilm.com" },
                { label: "Location", value: "Available Worldwide" },
                { label: "Social", value: "@rafilm — links coming soon" },
              ].map((item) => (
                <div
                  key={item.label}
                  style={{
                    display: "flex",
                    gap: "1.5rem",
                    alignItems: "flex-start",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.6rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "#d4af37",
                      paddingTop: "0.15rem",
                      minWidth: "70px",
                    }}
                  >
                    {item.label}
                  </span>
                  <span
                    style={{
                      fontFamily: "'Montserrat', sans-serif",
                      fontSize: "0.82rem",
                      fontWeight: 300,
                      color: "rgba(240,236,228,0.6)",
                    }}
                  >
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <form onSubmit={handleSubmit}>
              <div
                className="form-name-email"
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "0 2rem",
                }}
              >
                <div>
                  <label style={labelStyle}>Name</label>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    required
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                        "#d4af37")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                        "rgba(184,151,42,0.3)")
                    }
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    required
                    onFocus={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                        "#d4af37")
                    }
                    onBlur={(e) =>
                      ((e.currentTarget as HTMLInputElement).style.borderBottomColor =
                        "rgba(184,151,42,0.3)")
                    }
                  />
                </div>
              </div>

              <div>
                <label style={labelStyle}>Project Type</label>
                <select
                  style={{
                    ...inputStyle,
                    appearance: "none",
                    cursor: "pointer",
                    color: form.project ? "#f0ece4" : "rgba(240,236,228,0.35)",
                  }}
                  value={form.project}
                  onChange={(e) => setForm({ ...form, project: e.target.value })}
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLSelectElement).style.borderBottomColor =
                      "#d4af37")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLSelectElement).style.borderBottomColor =
                      "rgba(184,151,42,0.3)")
                  }
                >
                  <option value="" disabled style={{ background: "#0d0d0d" }}>
                    Select a project type
                  </option>
                  {[
                    "Short Film",
                    "Documentary",
                    "Music Video",
                    "Commercial",
                    "Event Coverage",
                    "Other",
                  ].map((o) => (
                    <option key={o} value={o} style={{ background: "#0d0d0d" }}>
                      {o}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  style={{
                    ...inputStyle,
                    resize: "none",
                    height: "100px",
                    borderBottom: "1px solid rgba(184,151,42,0.3)",
                  }}
                  placeholder="Tell us about your project..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  required
                  onFocus={(e) =>
                    ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor =
                      "#d4af37")
                  }
                  onBlur={(e) =>
                    ((e.currentTarget as HTMLTextAreaElement).style.borderBottomColor =
                      "rgba(184,151,42,0.3)")
                  }
                />
              </div>

              <button
                type="submit"
                style={{
                  marginTop: "2.5rem",
                  background: "transparent",
                  border: "1px solid #d4af37",
                  color: "#d4af37",
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.7rem",
                  fontWeight: 500,
                  letterSpacing: "0.3em",
                  textTransform: "uppercase",
                  padding: "1rem 3rem",
                  cursor: "pointer",
                  transition: "all 0.3s",
                  width: "100%",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "#d4af37";
                  (e.currentTarget as HTMLButtonElement).style.color = "#050505";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  (e.currentTarget as HTMLButtonElement).style.color = "#d4af37";
                }}
              >
                {sent ? "Message Sent ✓" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
          .form-name-email {
            grid-template-columns: 1fr !important;
          }
        }
        input::placeholder,
        textarea::placeholder {
          color: rgba(240,236,228,0.25);
        }
      `}</style>
    </section>
  );
}
