import React, { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

export default function Stats() {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    setAnimateIn(true);
  }, []);

  const platforms = [
    {
      name: "Instagram",
      value: 87,
      growth: 12.5,
      color: "from-blue-600 to-blue-800",
      icon: Heart,
      followers: "124K",
      engagement: "8.2%",
    },
    {
      name: "Twitter",
      value: 72,
      growth: -3.2,
      color: "from-slate-700 to-slate-900",
      icon: MessageCircle,
      followers: "89K",
      engagement: "5.1%",
    },
    {
      name: "LinkedIn",
      value: 65,
      growth: 8.7,
      color: "from-blue-500 to-blue-700",
      icon: Users,
      followers: "45K",
      engagement: "6.8%",
    },
    {
      name: "Facebook",
      value: 58,
      growth: 4.3,
      color: "from-blue-800 to-blue-950",
      icon: Share2,
      followers: "156K",
      engagement: "4.3%",
    },
    {
      name: "TikTok",
      value: 94,
      growth: 23.1,
      color: "from-blue-400 to-blue-600",
      icon: TrendingUp,
      followers: "203K",
      engagement: "12.4%",
    },
  ];

  const maxValue = Math.max(...platforms.map((p) => p.value));

  return (
    <div className="min-h-screen bg-neutral-100 p-8 flex shadow-lg items-center justify-center font-sans">
      <div className="w-full max-w-6xl">
        {/* Header */}
        <div className={`mb-12 ${animateIn ? "animate-in" : "opacity-0"}`}>
          <div className="flex items-center gap-4 mb-3">
            <div className="w-1.5 h-20 bg-gradient-to-b from-blue-600 to-blue-900 rounded-full float-subtle"></div>
            <div>
              <h1 className="text-6xl font-bold text-black tracking-tight">
                Social Analytics
              </h1>
              <p className="text-neutral-600 text-lg mt-2 mono font-normal">
                Platform Performance Overview
              </p>
            </div>
          </div>
        </div>

        {/* Analytics Card */}
        <div className="bg-white rounded-2xl p-10 border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          <div className="relative z-10">
            {/* Vertical bars container */}
            <div className="flex items-end justify-around gap-8 mb-8">
              {platforms.map((platform, index) => {
                const Icon = platform.icon;
                const barHeight = platform.value * 4; // 4px per value point for visible differences

                return (
                  <div
                    key={platform.name}
                    className={`flex flex-col items-center flex-1 ${animateIn ? "animate-in" : "opacity-0"}`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Growth indicator */}
                    <div
                      className={`flex items-center gap-1 px-2.5 py-1 rounded-md mb-3 ${
                        platform.growth >= 0
                          ? "bg-black text-white"
                          : "bg-blue-900 text-white"
                      }`}
                    >
                      {platform.growth >= 0 ? (
                        <TrendingUp className="w-3.5 h-3.5" />
                      ) : (
                        <TrendingDown className="w-3.5 h-3.5" />
                      )}
                      <span className="font-bold mono text-xs">
                        {platform.growth > 0 ? "+" : ""}
                        {platform.growth}%
                      </span>
                    </div>

                    {/* Value label */}
                    <div
                      className="text-2xl font-bold text-black mono mb-2 opacity-0"
                      style={{
                        opacity: animateIn ? 1 : 0,
                        transition: "opacity 0.5s ease-out",
                        transitionDelay: `${index * 0.1 + 1}s`,
                      }}
                    >
                      {platform.value}
                    </div>

                    {/* Vertical Bar */}
                    <div
                      className="relative w-20"
                      style={{ height: `${maxValue * 4}px` }}
                    >
                      <div className="absolute bottom-0 w-full bg-neutral-200 rounded-t-lg overflow-hidden border-2 border-black">
                        {/* Actual bar */}
                        <div
                          className={`w-full bg-gradient-to-t ${platform.color} relative transition-all duration-300 hover:opacity-90`}
                          style={{
                            height: animateIn ? `${barHeight}px` : "0px",
                            transition:
                              "height 1.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                            transitionDelay: `${index * 0.1}s`,
                          }}
                        >
                          {/* Shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/20 to-transparent translate-y-[100%] animate-[shimmer_2.5s_infinite]"></div>
                        </div>
                      </div>
                    </div>

                    {/* Platform info */}
                    <div className="text-center mt-4">
                      <div
                        className={`p-2 rounded-lg bg-gradient-to-br ${platform.color} shadow-md mb-2 inline-flex border-2 border-black`}
                      >
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <h3 className="text-sm font-bold text-black mb-1">
                        {platform.name}
                      </h3>
                      <p className="text-xs text-neutral-600 mono">
                        {platform.followers}
                      </p>
                      <p className="text-xs text-neutral-500 mono mt-0.5">
                        {platform.engagement}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Footer Stats */}
          <div
            className={`pt-8 border-t-2 border-black grid grid-cols-3 gap-8 ${animateIn ? "animate-in" : "opacity-0"}`}
            style={{ animationDelay: "0.6s" }}
          >
            <div className="text-center">
              <div className="text-4xl font-bold text-black mono">617K</div>
              <div className="text-sm text-neutral-600 mt-2">Total Reach</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-700 mono">7.6%</div>
              <div className="text-sm text-neutral-600 mt-2">
                Avg Engagement
              </div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mono">+9.2%</div>
              <div className="text-sm text-neutral-600 mt-2">Growth Rate</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% {
            transform: translateY(-200%);
          }
        }
      `}</style>
    </div>
  );
}
