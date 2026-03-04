import React, { useState } from "react";
import { Plus } from "lucide-react";
import { useApp } from "../contexts/AppContext";

// Flame SVG matching the pink/yellow gradient from the reference image — recolored to blue palette
function FlameIcon({ size = 72 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 72 72"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <radialGradient id="flameGlow" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor="#60a5fa" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
        </radialGradient>
        <linearGradient
          id="flameBody"
          x1="36"
          y1="72"
          x2="36"
          y2="8"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#1d4ed8" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#93c5fd" />
        </linearGradient>
        <linearGradient
          id="flameInner"
          x1="36"
          y1="65"
          x2="36"
          y2="30"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#bfdbfe" />
          <stop offset="100%" stopColor="#eff6ff" />
        </linearGradient>
      </defs>
      {/* Glow halo */}
      <ellipse cx="36" cy="58" rx="24" ry="10" fill="url(#flameGlow)" />
      {/* Outer flame */}
      <path
        d="M36 8 C28 20 18 28 20 44 C22 56 30 65 36 65 C42 65 50 56 52 44 C54 28 44 20 36 8Z"
        fill="url(#flameBody)"
      />
      {/* Left flicker */}
      <path
        d="M26 30 C22 36 20 44 24 50 C22 42 26 36 26 30Z"
        fill="#93c5fd"
        opacity="0.7"
      />
      {/* Right flicker */}
      <path
        d="M46 26 C50 34 52 42 48 50 C50 44 48 36 46 26Z"
        fill="#93c5fd"
        opacity="0.6"
      />
      {/* Inner flame */}
      <path
        d="M36 32 C32 40 30 50 33 58 C34 62 36 65 36 65 C36 65 38 62 39 58 C42 50 40 40 36 32Z"
        fill="url(#flameInner)"
      />
    </svg>
  );
}

// Week days for the calendar strip
const DAYS = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

function CalendarStrip({ activeDay = 2 }) {
  const today = new Date();
  const dayOfWeek = today.getDay();
  // Build 7 days centered on today
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (dayOfWeek - i));
    return {
      date: d.getDate(),
      label: DAYS[d.getDay()],
      isToday: i === dayOfWeek,
    };
  });

  return (
    <div
      style={{
        display: "flex",
        gap: 8,
        justifyContent: "center",
        overflowX: "auto",
        padding: "0 4px",
      }}
    >
      {days.map((d, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 44,
            padding: "10px 6px",
            borderRadius: 16,
            background: d.isToday
              ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
              : "rgba(219, 234, 254, 0.5)",
            border: d.isToday ? "none" : "1px solid #bfdbfe",
            cursor: "pointer",
            transition: "transform 0.15s",
          }}
        >
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: d.isToday ? "#fff" : "#1e3a8a",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1,
            }}
          >
            {d.date}
          </span>
          <span
            style={{
              fontSize: 9,
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: d.isToday ? "#bfdbfe" : "#93c5fd",
              marginTop: 4,
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {d.label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── MOBILE CARD (matches the reference design) ──────────────────────────────
function MobileStreakCard({ streak, onAddEntry }) {
  return (
    <div
      style={{
        background:
          "linear-gradient(160deg, #f0f7ff 0%, #e8f0fe 60%, #dbeafe 100%)",
        borderRadius: 32,
        padding: "32px 24px 24px",
        boxShadow:
          "0 20px 60px rgba(37,99,235,0.15), 0 4px 16px rgba(37,99,235,0.08)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        minWidth: 280,
        maxWidth: 340,
        margin: "0 auto",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background circle */}
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 160,
          height: 160,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(147,197,253,0.3) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      {/* Flame */}
      <div
        style={{
          background: "white",
          borderRadius: "50%",
          width: 96,
          height: 96,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 8px 32px rgba(37,99,235,0.2), 0 2px 8px rgba(37,99,235,0.12)",
          marginBottom: 20,
          position: "relative",
          zIndex: 1,
        }}
      >
        <FlameIcon size={60} />
      </div>

      {/* Streak count */}
      <div
        style={{
          fontSize: 64,
          fontWeight: 900,
          color: "#1e3a8a",
          lineHeight: 1,
          fontFamily: "'DM Sans', sans-serif",
          letterSpacing: "-2px",
        }}
      >
        {streak?.count ?? 0}
      </div>
      <div
        style={{
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: "0.18em",
          color: "#3b82f6",
          marginTop: 6,
          marginBottom: 24,
          fontFamily: "'DM Sans', sans-serif",
          textTransform: "uppercase",
        }}
      >
        Day Streak!
      </div>

      {/* Add Entry button */}
      <button
        onClick={onAddEntry}
        style={{
          width: "100%",
          padding: "16px 24px",
          background: "linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%)",
          color: "white",
          border: "none",
          borderRadius: 18,
          fontSize: 16,
          fontWeight: 700,
          fontFamily: "'DM Sans', sans-serif",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          boxShadow: "0 8px 24px rgba(37,99,235,0.35)",
          marginBottom: 20,
          letterSpacing: "0.01em",
          transition: "transform 0.15s, box-shadow 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-1px)";
          e.currentTarget.style.boxShadow = "0 12px 32px rgba(37,99,235,0.45)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow = "0 8px 24px rgba(37,99,235,0.35)";
        }}
      >
        <Plus size={18} strokeWidth={2.5} />
        Add Entry
      </button>

      {/* Calendar strip */}
      <CalendarStrip />
    </div>
  );
}

// ── DESKTOP STATS ROW ────────────────────────────────────────────────────────
function DesktopStatBadge({ label, value, sub }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.7)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(147,197,253,0.4)",
        borderRadius: 20,
        padding: "20px 28px",
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flex: 1,
        minWidth: 120,
      }}
    >
      <div
        style={{
          fontSize: 32,
          fontWeight: 900,
          color: "#1e3a8a",
          fontFamily: "'DM Sans', sans-serif",
          lineHeight: 1,
          letterSpacing: "-1px",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: 12,
          fontWeight: 700,
          color: "#3b82f6",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          fontFamily: "'DM Sans', sans-serif",
        }}
      >
        {label}
      </div>
      {sub && (
        <div
          style={{
            fontSize: 11,
            color: "#93c5fd",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          {sub}
        </div>
      )}
    </div>
  );
}

// ── DESKTOP PANEL ────────────────────────────────────────────────────────────
function DesktopStreaksPanel({ streaks, onAddEntry }) {
  const best =
    streaks.length > 0 ? Math.max(...streaks.map((s) => s.count)) : 0;
  const total = streaks.reduce((a, s) => a + s.count, 0);
  const featured = streaks[0];

  return (
    <div
      style={{
        background:
          "linear-gradient(135deg, #eff6ff 0%, #dbeafe 50%, #e0f2fe 100%)",
        borderRadius: 28,
        overflow: "hidden",
        boxShadow:
          "0 24px 64px rgba(37,99,235,0.12), 0 4px 16px rgba(37,99,235,0.06)",
        border: "1px solid rgba(147,197,253,0.3)",
      }}
    >
      {/* Header bar */}
      <div
        style={{
          background:
            "linear-gradient(135deg, #1d4ed8 0%, #2563eb 50%, #3b82f6 100%)",
          padding: "28px 36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Decorative circles */}
        <div
          style={{
            position: "absolute",
            top: -30,
            right: 60,
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.06)",
            pointerEvents: "none",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: -20,
            right: 20,
            width: 70,
            height: 70,
            borderRadius: "50%",
            background: "rgba(255,255,255,0.08)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{ display: "flex", alignItems: "center", gap: 16, zIndex: 1 }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.15)",
              borderRadius: 16,
              padding: 12,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <FlameIcon size={32} />
          </div>
          <div>
            <h3
              style={{
                margin: 0,
                fontSize: 22,
                fontWeight: 900,
                color: "white",
                fontFamily: "'DM Sans', sans-serif",
                letterSpacing: "-0.5px",
              }}
            >
              Streaks
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 12,
                color: "rgba(191,219,254,0.9)",
                fontFamily: "'DM Sans', sans-serif",
                marginTop: 2,
              }}
            >
              {streaks.length === 0
                ? "No active streaks"
                : `${streaks.length} active streak${streaks.length > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>

        <button
          onClick={onAddEntry}
          style={{
            background: "rgba(255,255,255,0.18)",
            border: "1px solid rgba(255,255,255,0.3)",
            borderRadius: 14,
            padding: "10px 20px",
            color: "white",
            fontSize: 14,
            fontWeight: 700,
            fontFamily: "'DM Sans', sans-serif",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            backdropFilter: "blur(8px)",
            zIndex: 1,
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.28)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.background = "rgba(255,255,255,0.18)")
          }
        >
          <Plus size={15} strokeWidth={2.5} />
          Add Entry
        </button>
      </div>

      {/* Body */}
      <div
        style={{
          padding: "28px 36px",
          display: "flex",
          gap: 28,
          alignItems: "stretch",
        }}
      >
        {/* Left: featured streak card */}
        <div
          style={{
            background: "linear-gradient(160deg, #fff 0%, #f0f7ff 100%)",
            borderRadius: 24,
            padding: "28px 32px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            minWidth: 200,
            boxShadow: "0 8px 32px rgba(37,99,235,0.1)",
            border: "1px solid rgba(147,197,253,0.25)",
            gap: 8,
          }}
        >
          <FlameIcon size={64} />
          <div
            style={{
              fontSize: 56,
              fontWeight: 900,
              color: "#1e3a8a",
              fontFamily: "'DM Sans', sans-serif",
              lineHeight: 1,
              letterSpacing: "-2px",
              marginTop: 4,
            }}
          >
            {featured?.count ?? 0}
          </div>
          <div
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: "0.2em",
              color: "#3b82f6",
              textTransform: "uppercase",
              fontFamily: "'DM Sans', sans-serif",
            }}
          >
            {featured?.label ?? "Day Streak"}
          </div>
          <CalendarStrip />
        </div>

        {/* Right: stats + streak list */}
        <div
          style={{ flex: 1, display: "flex", flexDirection: "column", gap: 16 }}
        >
          {/* Stat badges */}
          <div style={{ display: "flex", gap: 12 }}>
            <DesktopStatBadge label="Best Streak" value={best} sub="days" />
            <DesktopStatBadge label="Total Days" value={total} sub="logged" />
            <DesktopStatBadge
              label="Active"
              value={streaks.length}
              sub="streaks"
            />
          </div>

          {/* Streak list */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
              flex: 1,
            }}
          >
            {streaks.length === 0 && (
              <div
                style={{
                  textAlign: "center",
                  color: "#93c5fd",
                  fontFamily: "'DM Sans', sans-serif",
                  padding: "24px 0",
                  fontSize: 14,
                }}
              >
                No streaks yet — log in daily to build streaks!
              </div>
            )}
            {streaks.map((s) => (
              <div
                key={s.id}
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(147,197,253,0.35)",
                  borderRadius: 16,
                  padding: "14px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  transition: "transform 0.15s, box-shadow 0.15s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateX(4px)";
                  e.currentTarget.style.boxShadow =
                    "0 4px 20px rgba(37,99,235,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateX(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #3b82f6, #1d4ed8)",
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      color: "#1e3a8a",
                      fontFamily: "'DM Sans', sans-serif",
                      fontSize: 15,
                    }}
                  >
                    {s.label}
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span
                    style={{
                      fontSize: 22,
                      fontWeight: 900,
                      color: "#2563eb",
                      fontFamily: "'DM Sans', sans-serif",
                      letterSpacing: "-0.5px",
                    }}
                  >
                    {s.count}
                  </span>
                  <span
                    style={{
                      fontSize: 11,
                      color: "#93c5fd",
                      fontFamily: "'DM Sans', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    days
                  </span>
                  <FlameIcon size={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── MAIN EXPORT ──────────────────────────────────────────────────────────────
export default function StreaksPanel() {
  const { streaks } = useApp();

  const handleAddEntry = () => {
    // Hook into your existing add-entry flow here
    console.log("Add entry clicked");
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;800;900&display=swap');
      `}</style>

      {/* Mobile: single featured card */}
      <div className="block md:hidden mt-6">
        <MobileStreakCard streak={streaks[0]} onAddEntry={handleAddEntry} />
      </div>

      {/* Desktop: full panel */}
      <div className="hidden md:block mt-6">
        <DesktopStreaksPanel streaks={streaks} onAddEntry={handleAddEntry} />
      </div>
    </>
  );
}
