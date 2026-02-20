// Stats.jsx
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
      color: "from-purple-700 to-purple-900",
      icon: MessageCircle,
      followers: "89K",
      engagement: "5.1%",
    },
    {
      name: "LinkedIn",
      value: 65,
      growth: 8.7,
      color: "from-yellow-500 to-yellow-700",
      icon: Users,
      followers: "45K",
      engagement: "6.8%",
    },
    {
      name: "Facebook",
      value: 58,
      growth: 4.3,
      color: "from-green-800 to-green-950",
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
    <div className="bg-white rounded-2xl p-3 sm:p-6 shadow-lg w-full flex justify-around items-end">
      {platforms.map((platform, index) => {
        const Icon = platform.icon;
        const barHeight = platform.value * 2;

        return (
          <div
            key={platform.name}
            className="flex flex-col items-center flex-1 min-w-0"
          >
            {/* Growth indicator */}
            <div
              className={`flex items-center gap-0.5 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-md mb-2 text-xs ${
                platform.growth >= 0
                  ? "bg-black text-white"
                  : "bg-blue-900 text-white"
              }`}
            >
              {platform.growth >= 0 ? (
                <TrendingUp className="w-3 h-3" />
              ) : (
                <TrendingDown className="w-3 h-3" />
              )}
              <span className="text-[10px] sm:text-xs">
                {platform.growth > 0 ? "+" : ""}
                {platform.growth}%
              </span>
            </div>

            {/* Bar */}
            <div
              className="relative w-6 sm:w-10"
              style={{ height: `${barHeight}px` }}
            >
              <div
                className={`absolute bottom-0 w-full bg-gradient-to-t ${platform.color} rounded-t-lg transition-all duration-700`}
                style={{
                  height: animateIn ? `${barHeight}px` : "0px",
                  transitionDelay: `${index * 0.1}s`,
                }}
              />
            </div>

            {/* Platform icon & info */}
            <div className="text-center mt-2">
              <div
                className={`p-1.5 sm:p-2 rounded-lg bg-gradient-to-br ${platform.color} shadow-md inline-flex mb-1`}
              >
                <Icon className="w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" />
              </div>
              <h3 className="text-[10px] sm:text-xs font-bold truncate w-full">
                {platform.name}
              </h3>
              <p className="text-[10px] sm:text-xs text-neutral-600">
                {platform.followers}
              </p>
              <p className="text-[10px] sm:text-xs text-neutral-500 mt-0.5 hidden sm:block">
                {platform.engagement}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
