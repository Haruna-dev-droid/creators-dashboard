import React from "react";
import { NavLink } from "react-router-dom";
import Stats from "./UI/Stats";
import Cards from "./UI/Cards";
import DashboardPreview from "./DashboardPreview";
import {
  PenTool,
  BarChart3,
  Lightbulb,
  CalendarClock,
  ArrowRight,
  Check,
} from "lucide-react";
import { useApp } from "./contexts/AppContext";

export default function LandingPage() {
  const { theme } = useApp();
  return (
    <div
      className={`${theme === "dark" ? "bg-[#050A18] text-white" : "bg-slate-50 text-slate-900"} min-h-screen overflow-x-hidden font-sans`}
    >
      {/* ══════════════════════════════════════
          HERO
      ══════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center px-6 md:px-16 py-28 overflow-hidden">
        {/* Radial glows */}
        <div
          className={`absolute inset-0 pointer-events-none ${
            theme === "dark"
              ? "bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(30,80,220,0.35),transparent)]"
              : "bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(100,180,255,0.55),transparent)]"
          }`}
        />
        <div
          className={`absolute inset-0 pointer-events-none ${
            theme === "dark"
              ? "bg-[radial-gradient(ellipse_50%_40%_at_80%_85%,rgba(10,40,180,0.2),transparent)]"
              : "bg-[radial-gradient(ellipse_50%_40%_at_80%_85%,rgba(80,160,255,0.35),transparent)]"
          }`}
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(rgba(30,100,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(30,100,255,0.06) 1px,transparent 1px)",
            backgroundSize: "60px 60px",
            maskImage:
              "radial-gradient(ellipse 70% 60% at 50% 0%,black 20%,transparent 100%)",
          }}
        />

        {/* Floating glow orb */}
        <div className="float-orb absolute top-1/3 right-8 w-80 h-80 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* ── Left: copy ── */}
          <div>
            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/25 rounded-full px-4 py-1.5 mb-7">
              <span className="pulse-dot w-1.5 h-1.5 rounded-full bg-blue-400 block" />
              <span
                className={`font-body ${theme === "dark" ? " text-blue-400" : " text-slate-900"} text-[11px] font-semibold tracking-[0.15em] uppercase`}
              >
                Creator Platform
              </span>
            </div>

            <h1
              className={`font-display text-5xl lg:text-[62px] font-extrabold leading-[1.05] tracking-tight ${theme === "dark" ? " text-white" : " text-slate-900"}  mb-5`}
            >
              All Your Projects,
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                One Dashboard.
              </span>
            </h1>

            <p
              className={`font-body ${theme === "dark" ? "text-white/50" : "text-slate-600"} text-base leading-relaxed max-w-[420px] mb-9`}
            >
              Track your projects, analytics, and earnings in one place.
              Designed to help creators focus on what matters most.
            </p>

            <div className="flex flex-wrap gap-3">
              <NavLink
                to="/signup"
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold font-body text-sm rounded-xl px-7 py-3.5 shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_44px_rgba(37,99,235,0.65)] transition-all duration-300 hover:-translate-y-0.5"
              >
                Get Started <ArrowRight size={15} />
              </NavLink>
              <NavLink
                to="/login"
                className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-white/80 font-medium font-body text-sm rounded-xl px-7 py-3.5 backdrop-blur-md transition-all duration-300"
              >
                Sign In
              </NavLink>
            </div>
          </div>

          {/* ── Right: stats glass card ── */}
          <div
            className={`relative backdrop-blur-xl rounded-3xl p-8 shadow-2xl overflow-hidden ${theme === "dark" ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-200"}`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent pointer-events-none rounded-3xl" />
            <div className="relative z-10">
              <Stats />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FEATURES
      ══════════════════════════════════════ */}
      <section className="relative px-6 md:px-16 pb-28 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_10%,rgba(30,80,220,0.1),transparent)]" />

        <p className="font-body text-center text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-400 mb-4">
          What we offer
        </p>
        <h2
          className={`font-display text-4xl md:text-[52px] font-extrabold text-center tracking-tight mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
        >
          Creator Command Center
        </h2>
        <p
          className={`font-body text-center ${theme === "dark" ? "text-white/65" : "text-slate-600"} text-[15px] max-w-md mx-auto mb-16 leading-relaxed`}
        >
          Everything you need to build, track, and grow — unified in one
          powerful workspace.
        </p>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              Icon: PenTool,
              title: "Content Editor",
              desc: "Create, edit, and polish your content in one distraction-free workspace.",
              cyan: false,
            },
            {
              Icon: BarChart3,
              title: "Analytics",
              desc: "Track performance, engagement, and audience growth with clarity.",
              cyan: true,
            },
            {
              Icon: Lightbulb,
              title: "Ideas Board",
              desc: "Capture ideas and organize creative concepts effortlessly.",
              cyan: false,
            },
            {
              Icon: CalendarClock,
              title: "Scheduling",
              desc: "Plan and schedule content ahead of time without the stress.",
              cyan: true,
            },
          ].map(({ Icon, title, desc, cyan }) => (
            <div
              key={title}
              className="group relative bg-white/[0.03] hover:bg-blue-600/[0.08] border border-white/[0.07] hover:border-blue-500/30 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 overflow-hidden cursor-default"
            >
              {/* Hover glow */}
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-blue-500/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

              <div
                className={`relative w-12 h-12 rounded-xl flex items-center justify-center mb-6 ${
                  cyan
                    ? "bg-cyan-400/10 border border-cyan-400/20"
                    : "bg-blue-500/10 border border-blue-500/20"
                }`}
              >
                <Icon
                  size={20}
                  className={cyan ? "text-cyan-400" : "text-blue-400"}
                />
              </div>

              <h3
                className={`font-display text-[15px] font-bold mb-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                {title}
              </h3>
              <p
                className={`font-body text-[13px] leading-relaxed ${theme === "dark" ? "text-white/40" : "text-slate-600"}`}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════
          WHY / COMPARISON
      ══════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Headline card */}
          <div
            className={`relative rounded-3xl p-10 overflow-hidden flex flex-col justify-between ${theme === "dark" ? "bg-white/[0.03] border border-white/[0.07]" : "bg-white border border-slate-200"}`}
          >
            <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
            <div className="relative z-10">
              <p className="font-body text-[11px] font-semibold tracking-[0.15em] uppercase text-blue-400 mb-5">
                Why CrtrsHub
              </p>
              <h2
                className={`font-display text-4xl md:text-[46px] font-extrabold leading-[1.1] tracking-tight mb-7 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
              >
                Say goodbye to scattered tools — say hello to CrtrsHub!
              </h2>
              <p
                className={`font-body ${theme === "dark" ? "text-white/45" : "text-slate-600"} text-sm leading-relaxed`}
              >
                No more juggling between apps. No more lost insights. Just
                seamless project management at your fingertips.
              </p>
            </div>
          </div>

          {/* Two comparison cards */}
          <div className="flex flex-col gap-4">
            {[
              {
                title: "Traditional tools are fragmented",
                body: "Managing projects across multiple platforms is slow, expensive, and complicated. You deserve a faster, smarter solution.",
              },
              {
                title: "With CrtrsHub you get everything",
                body: "Instant analytics, transparent reporting, and a user-friendly platform designed specifically for creators like you.",
              },
            ].map(({ title, body }) => (
              <div
                key={title}
                className="group flex gap-4 items-start bg-white/[0.03] hover:bg-blue-600/[0.07] border border-white/[0.07] hover:border-blue-500/25 rounded-2xl p-7 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center shadow-[0_0_14px_rgba(37,99,235,0.5)]">
                  <Check size={13} className="text-white" />
                </div>
                <div>
                  <h3
                    className={`font-display text-[15px] font-bold ${theme === "dark" ? "text-white" : "text-slate-900"} mb-1.5`}
                  >
                    {title}
                  </h3>
                  <p
                    className={`font-body text-[13px] ${theme === "dark" ? "text-white/40" : "text-slate-600"} leading-relaxed`}
                  >
                    {body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════
          DASHBOARD PREVIEW
      ══════════════════════════════════════ */}
      <div className="px-6 md:px-16 pb-28 max-w-7xl mx-auto">
        <DashboardPreview />
      </div>

      {/* ══════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto relative bg-white/[0.03] border border-white/[0.07] rounded-3xl px-8 md:px-14 py-16 overflow-hidden">
          {/* Bottom glow */}
          <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[500px] h-48 rounded-full bg-blue-600/20 blur-3xl pointer-events-none" />

          <h2
            className={`font-display relative z-10 text-4xl md:text-[52px] font-extrabold text-center tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"} leading-[1.1] mb-14`}
          >
            Fast. Insightful. Powerful.
            <br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Welcome to CrtrsHub.
            </span>
          </h2>

          <div className="relative z-10 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                value: "2M+",
                label: "Active Creators",
                desc: "Trusted by individuals and businesses across the globe",
                hi: false,
              },
              {
                value: "99.9%",
                label: "Uptime",
                desc: "Reliable infrastructure, always available",
                hi: false,
              },
              {
                value: "0",
                label: "Hidden Fees",
                desc: "Transparent pricing with no surprises, ever",
                hi: true,
              },
              {
                value: "40%",
                label: "More Efficient",
                desc: "Save time managing projects vs. traditional tools",
                hi: false,
              },
            ].map(({ value, label, desc, hi }) => (
              <div
                key={label}
                className={`rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1 ${
                  hi
                    ? "bg-gradient-to-br from-blue-600/30 to-blue-800/20 border border-blue-500/40"
                    : theme === "dark"
                      ? "bg-white/[0.04] border border-white/[0.08] hover:border-blue-500/25"
                      : "bg-slate-100 border border-slate-200 hover:border-blue-200"
                }`}
              >
                <div
                  className={`font-display text-2xl md:text-4xl font-extrabold mb-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
                >
                  {value}
                </div>
                <div
                  className={`font-body text-[10px] font-semibold tracking-[0.12em] uppercase mb-4 ${theme === "dark" ? "text-white/35" : "text-slate-500"}`}
                >
                  {label}
                </div>
                <div
                  className={`font-body text-[12px] leading-relaxed ${theme === "dark" ? "text-white/35" : "text-slate-600"}`}
                >
                  {desc}
                </div>
              </div>
            ))}
          </div>

          <p className="font-body relative z-10 text-center text-white/20 text-[11px] tracking-[0.15em] uppercase mt-12">
            Join the creator revolution today
          </p>
        </div>
      </section>

      {/* ══════════════════════════════════════
          FINAL CTA
      ══════════════════════════════════════ */}
      <section className="px-6 md:px-16 pb-20">
        <div className="max-w-7xl mx-auto relative bg-gradient-to-br from-blue-600/20 via-blue-800/10 to-cyan-500/10 border border-blue-500/20 rounded-3xl px-8 md:px-16 py-20 text-center overflow-hidden">
          {/* Top glow */}
          <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-48 rounded-full bg-blue-500/30 blur-3xl pointer-events-none" />

          <h2
            className={`font-display relative z-10 text-4xl md:text-[52px] font-extrabold tracking-tight leading-[1.1] mb-4 ${theme === "dark" ? "text-white" : "text-slate-900"}`}
          >
            All Your Projects,
            <br />
            One Dashboard.
          </h2>
          <p
            className={`font-body relative z-10 ${theme === "dark" ? "text-white/45" : "text-slate-600"} text-base mb-10`}
          >
            Try CrtrsHub for free — no credit card required.
          </p>

          <div className="relative z-10 flex justify-center gap-3 flex-wrap">
            <NavLink
              to="/login"
              className="inline-flex items-center gap-2 bg-white/[0.07] hover:bg-white/[0.12] border border-white/15 hover:border-white/25 text-white font-medium font-body text-sm rounded-xl px-8 py-3.5 backdrop-blur-md transition-all duration-300"
            >
              Sign In
            </NavLink>
            <NavLink
              to="/signup"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white font-semibold font-body text-sm rounded-xl px-8 py-3.5 shadow-[0_0_28px_rgba(37,99,235,0.45)] hover:shadow-[0_0_50px_rgba(37,99,235,0.65)] transition-all duration-300 hover:-translate-y-0.5"
            >
              Sign Up Free <ArrowRight size={15} />
            </NavLink>
          </div>
        </div>
      </section>
    </div>
  );
}
