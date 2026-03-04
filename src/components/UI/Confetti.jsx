import React, { useEffect } from "react";

const COLORS = [
  "#EF4444",
  "#F59E0B",
  "#10B981",
  "#3B82F6",
  "#8B5CF6",
  "#EC4899",
];

export default function Confetti({ active = false, count = 18 }) {
  if (!active) return null;

  const pieces = Array.from({ length: count }).map((_, i) => {
    const color = COLORS[i % COLORS.length];
    const left = Math.round(Math.random() * 80 + 10); // percent
    const delay = (Math.random() * 0.6).toFixed(2);
    const duration = (1.2 + Math.random() * 0.8).toFixed(2);
    const rotate = Math.round(Math.random() * 360);
    const scale = (0.7 + Math.random() * 0.6).toFixed(2);
    return (
      <div
        key={i}
        style={{
          position: "absolute",
          left: `${left}%`,
          top: 0,
          width: 8,
          height: 14,
          background: color,
          transform: `rotate(${rotate}deg) scale(${scale})`,
          borderRadius: 2,
          opacity: 0.95,
          animation: `confetti-fall ${duration}s ${delay}s cubic-bezier(.2,.8,.2,1) forwards`,
        }}
      />
    );
  });

  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    >
      <style>{`
        @keyframes confetti-fall {
          0% { transform: translateY(-10%) rotate(0deg) scale(1); opacity: 1 }
          60% { opacity: 1 }
          100% { transform: translateY(140%) rotate(200deg) scale(0.9); opacity: 0 }
        }
      `}</style>
      {pieces}
    </div>
  );
}

// play a short chime using WebAudio when confetti is active
export function playConfettiChime() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.setValueAtTime(720, ctx.currentTime);
    g.gain.setValueAtTime(0, ctx.currentTime);
    g.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);
    o.connect(g);
    g.connect(ctx.destination);
    o.start();
    o.frequency.exponentialRampToValueAtTime(1100, ctx.currentTime + 0.35);
    o.stop(ctx.currentTime + 1);
  } catch (e) {
    // ignore audio errors (e.g., autoplay restrictions)
  }
}
