"use client";
import { useRef, useState, useEffect } from "react";

const videos = [
  {
    src: "/videoRA/AworkBeatles1.mp4",
    title: "The Beatles — AI Reimagined",
    subtitle: "Generative Art · Music Video",
    desc: "Classic iconography reconstructed through neural style transfer and AI-driven motion synthesis.",
  },
  {
    src: "/videoRA/AworkFIlmed_Ai_001.mp4",
    title: "Filmed AI — Study 001",
    subtitle: "AI Cinema · Experimental",
    desc: "An exploration of AI-generated cinematography — where the model learns to see like a director.",
  },
  {
    src: "/videoRA/AworkFIlmed_Ai_002.mp4",
    title: "Filmed AI — Study 002",
    subtitle: "AI Cinema · Generative VFX",
    desc: "Layering live-action with AI-generated environments. The boundary between real and rendered dissolves.",
  },
  {
    src: "/videoRA/Bring_to_life_202511130008_269r6 (1).mp4",
    title: "Bring to Life",
    subtitle: "AI Animation · Character",
    desc: "Still portraits animated through AI — breath, movement and emotion drawn from a single frame.",
  },
  {
    src: "/videoRA/RunBlackbirdIntroRA.mp4",
    title: "Blackbird — RA Intro",
    subtitle: "Branding · Title Sequence",
    desc: "A cinematic identity film. Motion design meets AI aesthetics in a single unbroken sequence.",
  },
];

function VideoCard({ video, index }: { video: typeof videos[0]; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  // Auto-play when scrolled into view
  useEffect(() => {
    const el = videoRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
          el.play().then(() => setPlaying(true)).catch(() => {});
        } else {
          el.pause();
          setPlaying(false);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    const el = videoRef.current;
    if (!el) return;
    if (el.paused) { el.play(); setPlaying(true); }
    else { el.pause(); setPlaying(false); }
  };

  const toggleFullscreen = () => {
    const el = videoRef.current;
    if (!el) return;
    if (!document.fullscreenElement) {
      el.requestFullscreen();
      setFullscreen(true);
    } else {
      document.exitFullscreen();
      setFullscreen(false);
    }
  };

  const handleTimeUpdate = () => {
    const el = videoRef.current;
    if (!el) return;
    setProgress((el.currentTime / el.duration) * 100 || 0);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = videoRef.current;
    if (!el) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    el.currentTime = (x / rect.width) * el.duration;
  };

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        overflow: "hidden",
        display: "flex",
        alignItems: "flex-end",
        background: "#050505",
      }}
    >
      {/* Video */}
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={() => setDuration(videoRef.current?.duration || 0)}
        onClick={togglePlay}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          cursor: "pointer",
        }}
      >
        <source src={video.src} type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 40%, rgba(0,0,0,0.1) 100%)",
        zIndex: 1, pointerEvents: "none",
      }} />

      {/* Index number */}
      <div style={{
        position: "absolute", top: "6rem", right: "3rem", zIndex: 2,
        fontFamily: "'Cormorant Garamond', serif",
        fontSize: "8rem", fontWeight: 300,
        color: "rgba(212,175,55,0.07)", lineHeight: 1,
        userSelect: "none", pointerEvents: "none",
      }}>
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content overlay — bottom */}
      <div style={{
        position: "relative", zIndex: 2,
        width: "100%",
        padding: "0 3rem 3rem",
      }}>
        {/* Progress bar */}
        <div
          onClick={handleSeek}
          style={{
            width: "100%", height: "2px",
            background: "rgba(255,255,255,0.1)",
            marginBottom: "1.5rem",
            cursor: "pointer",
            position: "relative",
          }}
        >
          <div style={{
            width: `${progress}%`, height: "100%",
            background: "#d4af37",
            transition: "width 0.1s linear",
          }} />
        </div>

        <div style={{
          display: "flex", alignItems: "flex-end",
          justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          {/* Text info */}
          <div>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem", letterSpacing: "0.3em",
              textTransform: "uppercase", color: "#d4af37",
              marginBottom: "0.4rem",
            }}>
              {video.subtitle}
            </p>
            <h3 style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(1.8rem, 4vw, 3rem)",
              fontWeight: 300, color: "#f0ece4",
              lineHeight: 1.1, marginBottom: "0.75rem",
            }}>
              {video.title}
            </h3>
            <p style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.8rem", fontWeight: 300,
              lineHeight: 1.7,
              color: "rgba(240,236,228,0.5)",
              maxWidth: "480px",
            }}>
              {video.desc}
            </p>
          </div>

          {/* Controls */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            {/* Time */}
            <span style={{
              fontFamily: "'Montserrat', monospace",
              fontSize: "0.7rem", letterSpacing: "0.1em",
              color: "rgba(240,236,228,0.35)",
            }}>
              {fmt((progress / 100) * duration)} / {fmt(duration)}
            </span>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              style={{
                width: "52px", height: "52px", borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.4)",
                background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "all 0.3s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "rgba(212,175,55,0.1)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "#d4af37";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.4)";
              }}
            >
              {playing ? (
                <svg viewBox="0 0 24 24" fill="#d4af37" width="18" height="18">
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="#d4af37" width="18" height="18" style={{ marginLeft: "3px" }}>
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              style={{
                width: "40px", height: "40px",
                border: "1px solid rgba(240,236,228,0.15)",
                background: "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", transition: "border-color 0.3s",
              }}
              onMouseEnter={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(212,175,55,0.5)")
              }
              onMouseLeave={(e) =>
                ((e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(240,236,228,0.15)")
              }
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="rgba(240,236,228,0.5)" strokeWidth="1.5" width="16" height="16">
                <path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function VideoShowcase() {
  return (
    <section id="video-showcase" style={{ background: "#050505" }}>
      {/* Section intro */}
      <div style={{
        textAlign: "center",
        padding: "7rem 2rem 5rem",
        borderBottom: "1px solid rgba(184,151,42,0.1)",
      }}>
        <p className="section-label">Selected Works</p>
        <span className="gold-line" />
        <h2 style={{
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: "clamp(2rem, 5vw, 3.8rem)",
          fontWeight: 300,
          color: "#f0ece4",
          marginTop: "0.5rem",
          lineHeight: 1.2,
        }}>
          AI-Crafted{" "}
          <em style={{ color: "#d4af37" }}>Moving Image</em>
        </h2>
        <p style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "0.82rem", fontWeight: 300, lineHeight: 1.9,
          color: "rgba(240,236,228,0.45)",
          maxWidth: "520px", margin: "1.5rem auto 0",
        }}>
          Scroll through the work. Each film below plays automatically as you arrive — click to pause, drag the bar to seek.
        </p>
      </div>

      {/* Videos stacked fullscreen */}
      {videos.map((v, i) => (
        <VideoCard key={i} video={v} index={i} />
      ))}
    </section>
  );
}
