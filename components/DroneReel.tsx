"use client";
import { useRef, useState, useEffect } from "react";

export default function DroneReel() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const update = () => setProgress((v.currentTime / v.duration) * 100 || 0);
    v.addEventListener("timeupdate", update);
    return () => v.removeEventListener("timeupdate", update);
  }, []);

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
      id="drone"
      style={{
        background: "#050505",
        padding: "0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Full-bleed video container */}
      <div
        style={{
          position: "relative",
          width: "100%",
          cursor: "pointer",
        }}
        onClick={toggle}
      >
        <video
          ref={videoRef}
          src="/videoRA/DronebIt.mp4"
          loop
          playsInline
          style={{
            width: "100%",
            display: "block",
            maxHeight: "80vh",
            objectFit: "cover",
            filter: "brightness(0.75) saturate(0.85)",
          }}
          onEnded={() => setPlaying(false)}
        />

        {/* Dark gradient top */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "30%",
            background: "linear-gradient(to bottom, #050505, transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Dark gradient bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "40%",
            background: "linear-gradient(to top, #050505, transparent)",
            pointerEvents: "none",
          }}
        />

        {/* Play / Pause button */}
        {!playing && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              pointerEvents: "none",
            }}
          >
            <div
              style={{
                width: "90px",
                height: "90px",
                borderRadius: "50%",
                border: "1px solid rgba(212,175,55,0.5)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background: "rgba(0,0,0,0.4)",
              }}
            >
              <svg
                viewBox="0 0 24 24"
                fill="#d4af37"
                width="30"
                height="30"
                style={{ marginLeft: "5px" }}
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        )}

        {/* Scanlines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 3px)",
            pointerEvents: "none",
          }}
        />

        {/* Overlay text — bottom left */}
        <div
          style={{
            position: "absolute",
            bottom: "3.5rem",
            left: "3rem",
            pointerEvents: "none",
          }}
          className="drone-text"
        >
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.6rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "#d4af37",
              marginBottom: "0.75rem",
            }}
          >
            Aerial Cinematography
          </p>
          <h2
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "clamp(2rem, 5vw, 4.5rem)",
              fontWeight: 300,
              color: "#f0ece4",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            From Above.
            <br />
            <em style={{ color: "#d4af37" }}>The World Entire.</em>
          </h2>
          <p
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontSize: "0.82rem",
              fontWeight: 300,
              lineHeight: 1.8,
              color: "rgba(240,236,228,0.55)",
              maxWidth: "420px",
            }}
          >
            Flyover sequences from the RA-Film drone unit. Landscape, scale
            and atmosphere — shot for a narrative feature.
          </p>
        </div>

        {/* Progress bar */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: "2px",
            background: "rgba(255,255,255,0.1)",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height: "100%",
              width: `${progress}%`,
              background: "#d4af37",
              transition: "width 0.5s linear",
            }}
          />
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .drone-text {
            left: 1.5rem !important;
            bottom: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
