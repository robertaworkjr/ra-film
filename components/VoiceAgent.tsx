"use client";
import { useEffect, useRef, useState, useCallback } from "react";

// ── Types ──────────────────────────────────────────────────────────────────
type AgentState = "idle" | "listening" | "thinking" | "speaking" | "error";

interface Message {
  role: "user" | "assistant";
  content: string;
}

// ── System prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Samantha, the friendly and professional voice assistant for RA Film — an independent creative studio specialising in cinematic storytelling, 360° immersive film, drone cinematography, AI artwork, and 3D/Blender production.

The creative behind RA Film is an independent professional who is always open to collaboration — both on a business level (commissions, productions, partnerships) and on a community level (creative exchanges, shared projects, mentorship).

They are fully qualified and experienced. When users ask about qualifications, skills, or a CV, let them know that full details are available on request via the Contact section of this site.

Your role:
- Warmly greet visitors when they first speak to you
- Answer questions about the studio, its work, and the services offered
- Guide visitors to the right section of the site (Showreel, About, 360° Film, Contact)
- Encourage collaboration — always end with an invitation to get in touch if relevant
- Keep answers concise and conversational (2–4 sentences max unless more detail is requested)
- Speak in a warm, confident, cinematic tone — no jargon, no waffle`;

// ── SpeechRecognition shim ─────────────────────────────────────────────────
declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    SpeechRecognition: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    webkitSpeechRecognition: any;
  }
}

export default function VoiceAgent() {
  const [state, setState] = useState<AgentState>("idle");
  const [open, setOpen] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reply, setReply] = useState("");
  const [history, setHistory] = useState<Message[]>([]);
  const [supported, setSupported] = useState(true);
  const [hasGreeted, setHasGreeted] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const recognitionRef = useRef<any>(null);
  const synthRef = useRef<SpeechSynthesisUtterance | null>(null);
  const abortRef = useRef(false);
  // ref to sendToLLM to avoid stale closures inside recognition callbacks
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const sendToLLMRef = useRef<any>(null);

  // ── Check browser support ────────────────────────────────────────────────
  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR || !window.speechSynthesis) {
      setSupported(false);
    }
  }, []);

  // ── Auto-greet when panel opens for the first time ───────────────────────
  useEffect(() => {
    if (open && !hasGreeted && supported) {
      setHasGreeted(true);
      const greeting =
        "Welcome to RA Film. I'm Samantha. Feel free to ask me about the work, the services, or how to get in touch. Just tap the mic and speak.";
      setReply(greeting);
      speakText(greeting);
    }
  }, [open, hasGreeted, supported]);

  // ── Speak helper ─────────────────────────────────────────────────────────
  const speakText = useCallback((text: string) => {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);

    // Try to find Samantha or fall back to any en-US female voice
    const voices = window.speechSynthesis.getVoices();
    const samantha =
      voices.find((v) => v.name === "Samantha") ||
      voices.find((v) => v.lang === "en-US" && v.name.toLowerCase().includes("female")) ||
      voices.find((v) => v.lang === "en-US") ||
      null;

    if (samantha) utter.voice = samantha;
    utter.rate = 0.96;
    utter.pitch = 1.0;

    utter.onstart = () => setState("speaking");
    utter.onend = () => setState("idle");
    utter.onerror = () => setState("idle");

    synthRef.current = utter;
    window.speechSynthesis.speak(utter);
    setState("speaking");
  }, []);

  // Voices load async in some browsers — re-run after they load
  useEffect(() => {
    window.speechSynthesis?.addEventListener("voiceschanged", () => {});
  }, []);

  // ── Stop everything ───────────────────────────────────────────────────────
  const stopAll = useCallback(() => {
    abortRef.current = true;
    window.speechSynthesis?.cancel();
    recognitionRef.current?.abort();
    setState("idle");
  }, []);

  // ── Start listening ───────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    if (state !== "idle") return;
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SR) return;

    abortRef.current = false;
    window.speechSynthesis.cancel();
    setTranscript("");
    setState("listening");

    const rec = new SR();
    rec.lang = "en-US";
    rec.interimResults = true;
    rec.continuous = false;
    recognitionRef.current = rec;

    rec.onstart = () => setState("listening");

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    rec.onresult = (e: any) => {
      let interim = "";
      let final = "";
      for (let i = e.resultIndex; i < e.results.length; i++) {
        const t = e.results[i][0].transcript;
        if (e.results[i].isFinal) final += t;
        else interim += t;
      }
      setTranscript(final || interim);
    };

    rec.onend = () => {
      if (abortRef.current) return;
      setTranscript((t) => {
        const text = t.trim();
        if (text) {
          // Use a ref-based call to avoid stale closure
          sendToLLMRef.current(text);
        } else {
          setState("idle");
        }
        return text;
      });
    };

    rec.onerror = (e: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const err = e as any;
      console.error("SpeechRecognition error:", err.error);
      if (err.error === "not-allowed" || err.error === "permission-denied") {
        setReply("Microphone access was blocked. Please allow mic access in your browser and try again.");
      } else if (err.error === "no-speech") {
        setReply("No speech detected. Tap the mic and try speaking again.");
        setState("idle");
        return;
      } else if (err.error === "network") {
        setReply("Network error with speech recognition. Make sure you're online and try again.");
      } else {
        setReply(`Speech error: ${err.error}. Please try again.`);
      }
      setState("error");
    };
    rec.start();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  // ── Call our API route ─────────────────────────────────────────────────────
  const sendToLLM = useCallback(
    async (userText: string) => {
      setState("thinking");
      const updatedHistory: Message[] = [...history, { role: "user", content: userText }];
      setHistory(updatedHistory);

      try {
        const res = await fetch("/api/voice", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: updatedHistory }),
        });

        if (!res.ok) throw new Error(`API error ${res.status}`);
        const data = await res.json();
        const assistantReply: string = data.reply ?? "Sorry, I didn't catch that.";

        setReply(assistantReply);
        setHistory((h) => [...h, { role: "assistant", content: assistantReply }]);
        speakText(assistantReply);
      } catch {
        setState("error");
        setReply("Sorry, something went wrong. Please try again.");
      }
    },
    [history, speakText]
  );

  // Keep ref always pointing to latest sendToLLM
  useEffect(() => {
    sendToLLMRef.current = sendToLLM;
  }, [sendToLLM]);

  // ── Icon helpers ──────────────────────────────────────────────────────────
  const pulseStyle: React.CSSProperties =
    state === "listening"
      ? { animation: "vaPulse 1s ease infinite" }
      : state === "thinking"
      ? { animation: "vaSpin 1.2s linear infinite" }
      : {};

  const buttonBg =
    state === "listening"
      ? "#c0392b"
      : state === "thinking"
      ? "#555"
      : state === "speaking"
      ? "#1a6b3c"
      : "#d4af37";

  const stateLabel =
    state === "listening"
      ? "Listening..."
      : state === "thinking"
      ? "Thinking..."
      : state === "speaking"
      ? "Speaking..."
      : state === "error"
      ? "Error — tap to retry"
      : "Tap to speak";

  if (!supported) return null;

  return (
    <>
      {/* Floating trigger button */}
      <button
        onClick={() => setOpen((o) => !o)}
        title="Talk to Samantha"
        style={{
          position: "fixed",
          bottom: "2rem",
          right: "2rem",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: open ? "#1a1a1a" : "#d4af37",
          border: open ? "1px solid #d4af37" : "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
          transition: "background 0.3s",
        }}
        aria-label="Open voice assistant"
      >
        {open ? (
          // X icon
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d4af37" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          // Mic icon
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2">
            <rect x="9" y="2" width="6" height="12" rx="3" />
            <path d="M5 10a7 7 0 0 0 14 0" />
            <line x1="12" y1="17" x2="12" y2="21" />
            <line x1="9" y1="21" x2="15" y2="21" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "6.5rem",
            right: "2rem",
            zIndex: 9998,
            width: "min(340px, calc(100vw - 2rem))",
            background: "rgba(10,10,10,0.96)",
            border: "1px solid rgba(212,175,55,0.25)",
            borderRadius: "12px",
            padding: "1.5rem",
            boxShadow: "0 8px 40px rgba(0,0,0,0.7)",
            backdropFilter: "blur(12px)",
          }}
        >
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.25rem" }}>
            <div
              style={{
                width: "36px",
                height: "36px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #d4af37 0%, #a08020 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
              }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2.5">
                <rect x="9" y="2" width="6" height="12" rx="3" />
                <path d="M5 10a7 7 0 0 0 14 0" />
                <line x1="12" y1="17" x2="12" y2="21" />
                <line x1="9" y1="21" x2="15" y2="21" />
              </svg>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.1rem",
                  color: "#d4af37",
                  margin: 0,
                  lineHeight: 1.2,
                }}
              >
                Samantha
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.6rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "rgba(240,236,228,0.4)",
                  margin: 0,
                }}
              >
                RA Film Voice Assistant
              </p>
            </div>
          </div>

          {/* Transcript */}
          {transcript && (
            <div
              style={{
                background: "rgba(212,175,55,0.08)",
                border: "1px solid rgba(212,175,55,0.15)",
                borderRadius: "8px",
                padding: "0.75rem",
                marginBottom: "0.75rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(240,236,228,0.55)",
                  margin: "0 0 0.25rem",
                  letterSpacing: "0.05em",
                }}
              >
                You said
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.82rem",
                  color: "#f0ece4",
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                {transcript}
              </p>
            </div>
          )}

          {/* Reply */}
          {reply && (
            <div
              style={{
                background: "rgba(255,255,255,0.03)",
                borderRadius: "8px",
                padding: "0.75rem",
                marginBottom: "1rem",
              }}
            >
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.75rem",
                  color: "rgba(212,175,55,0.6)",
                  margin: "0 0 0.25rem",
                  letterSpacing: "0.05em",
                }}
              >
                Samantha
              </p>
              <p
                style={{
                  fontFamily: "'Montserrat', sans-serif",
                  fontSize: "0.82rem",
                  color: "rgba(240,236,228,0.85)",
                  margin: 0,
                  lineHeight: 1.6,
                }}
              >
                {reply}
              </p>
            </div>
          )}

          {/* Mic / stop button */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.6rem" }}>
            <button
              onClick={state === "idle" || state === "error" ? startListening : stopAll}
              style={{
                width: "60px",
                height: "60px",
                borderRadius: "50%",
                background: buttonBg,
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "background 0.3s",
                ...pulseStyle,
              }}
              aria-label={state === "idle" ? "Start listening" : "Stop"}
            >
              {state === "thinking" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#f0ece4" strokeWidth="2">
                  <circle cx="12" cy="12" r="10" strokeDasharray="60" strokeDashoffset="15" />
                </svg>
              ) : state === "speaking" ? (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#050505" strokeWidth="2.5">
                  <rect x="6" y="6" width="4" height="12" rx="1" />
                  <rect x="14" y="6" width="4" height="12" rx="1" />
                </svg>
              ) : (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke={state === "listening" ? "#fff" : "#050505"} strokeWidth="2.5">
                  <rect x="9" y="2" width="6" height="12" rx="3" />
                  <path d="M5 10a7 7 0 0 0 14 0" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                  <line x1="9" y1="21" x2="15" y2="21" />
                </svg>
              )}
            </button>

            <p
              style={{
                fontFamily: "'Montserrat', sans-serif",
                fontSize: "0.62rem",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "rgba(240,236,228,0.4)",
                margin: 0,
              }}
            >
              {stateLabel}
            </p>
          </div>
        </div>
      )}

      <style>{`
        @keyframes vaPulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(192,57,43,0.4); }
          50% { transform: scale(1.06); box-shadow: 0 0 0 8px rgba(192,57,43,0); }
        }
        @keyframes vaSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}
