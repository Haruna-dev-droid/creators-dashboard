import React from "react";
import Stats from "./Stats";

function LandingPage() {
  return (
    <div className="min-h-screen  items-center justify-center bg-gradient-to-t from-blue-200 via-blue-100 to-blue-50">
      <div className="py-50">
        <h1 className="text-center  text-black text-7xl font-bold">
          All Your Projects,
          <br />
          One <span className="">Dashboard.</span>
        </h1>
        <p className="text-center text-2xl">
          Track your projects, analytics, and earnings in one place. <br />
          Designed to help creators focus on what matters most. Insights, stats,
          and tools <br />
          at your fingertips.
        </p>
        <div className="flex justify-center mt-5 items-center gap-4 w-44 p-3 mx-auto bg-blue-700/50 shadow-lg rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
          <button className="font-bold text-black">Get Started</button>

          <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-lg">
            &rarr;
          </span>
        </div>
      </div>
      <Stats className="w-sm" />
    </div>
  );
}

export default LandingPage;
