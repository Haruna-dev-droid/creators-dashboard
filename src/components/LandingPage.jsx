// LandingPage.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import Stats from "./UI/Stats";
import Cards from "./UI/Cards";
import DashboardPreview from "./DashboardPreview";
import { PenTool, BarChart3, Lightbulb, CalendarClock } from "lucide-react";

function LandingPage() {
  return (
    <div>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-500/90 via-blue-50 to-blue-500/90 px-5 md:px-10 py-10 ">
        {/* Container holding hero text + stats */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-16">
          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
              All Your Projects,
              <br />
              One <span>Dashboard.</span>
            </h1>
            <p className="mt-5 text-xl lg:text-[16px] text-neutral-700">
              Track your projects, analytics, and earnings in one place. <br />
              Designed to help creators focus on what matters most. Insights,
              stats, and tools at your fingertips.
            </p>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div
                className="flex justify-center md:mx-0 mx-auto mt-8 items-center gap-4 w-52 p-3
  bg-black/50 backdrop-blur-xl
  border border-white/10
  shadow-2xl shadow-black/40
  rounded-full cursor-pointer
  hover:bg-black/40 hover:scale-105
  transition-all duration-300"
              >
                <button className="font-semibold text-white tracking-wide">
                  Get Started
                </button>

                <span
                  className="w-9 h-9
    bg-white/10 backdrop-blur-md
    border border-white/20
    rounded-full flex items-center justify-center
    text-white text-lg
    transition-all duration-300
    hover:bg-white/20"
                >
                  &rarr;
                </span>
              </div>
            </NavLink>
          </div>

          {/* Stats Card */}
          <div className="flex-1 max-w-xl w-full bg-white/20 backdrop-blur-md border border-gray-200 rounded-[20px] shadow-lg p-6">
            <Stats />
          </div>
        </div>
      </div>
      {/* Cards Section */}
      <div className="bg-blue-50/30 pt-30">
        <h1 className="text-center text-4xl font-bold text-blue-500/90 mb-5">
          Creator Command Center
        </h1>
        <div className="w-full max-w-7xl  grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 px-8 mx-auto  rounded-lg py-20">
          <Cards
            icon={PenTool}
            title="Content Editor"
            description="Create, edit, and polish your content in one distraction-free workspace."
            color={{
              bg: "bg-blue-100/90",
              icon: "text-blue-600",
            }}
          />

          <Cards
            icon={BarChart3}
            title="Analytics"
            description="Track performance, engagement, and audience growth with clarity."
            color={{
              bg: "bg-gradient-to-r from-blue-500/90 to-green-200/90",
              icon: "text-blue-600",
            }}
          />

          <Cards
            icon={Lightbulb}
            title="Ideas Board"
            description="Capture ideas and organize creative concepts effortlessly."
            color={{
              bg: "bg-blue-100/90",
              icon: "text-blue-600",
            }}
          />

          <Cards
            icon={CalendarClock}
            title="Scheduling"
            description="Plan and schedule content ahead of time without the stress."
            color={{
              bg: "bg-gradient-to-r from-blue-500/90 to-green-200/90",
              icon: "text-blue-600",
            }}
          />
        </div>
      </div>
      <DashboardPreview />
      <div className="md:mt-20 mt-15 md:mx-10 mx-5 mb-30 px-5 md:px-10 py-30 flex flex-col justify-center items-center bg-gradient-to-t from-blue-500/90 via-blue-300 to-blue-500/90 rounded-lg">
        <h1 className="md:text-[50px] text-4xl text-white text-center font-bold ">
          All Your Projects, One Dashboard. <br /> Try CrtrsHub for free
        </h1>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="flex gap-4 mt-8 items-center">
            <button
              className="cursor-pointer px-7 py-3 rounded-xl 
  bg-white/10 backdrop-blur-md 
  border border-white/20 
  text-white font-medium
  shadow-lg shadow-blue-500/10
  hover:bg-white/20 hover:shadow-blue-500/20
  transition-all duration-300"
            >
              Sign in
            </button>

            <button
              className="cursor-pointer px-7 py-3 rounded-xl 
  bg-blue-500/70 backdrop-blur-md 
  border border-blue-300/30 
  text-white font-semibold
  shadow-lg shadow-blue-500/20
  hover:bg-blue-500/30 hover:shadow-blue-500/40
  transition-all duration-300"
            >
              Sign up
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
