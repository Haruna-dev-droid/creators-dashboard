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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-t from-blue-200 via-blue-50 to-white px-5 md:px-10 py-10">
        {/* Container holding hero text + stats */}
        <div className="flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl gap-16">
          {/* Hero Text */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="text-5xl lg:text-6xl font-bold text-black leading-tight">
              All Your Projects,
              <br />
              One <span>Dashboard.</span>
            </h1>
            <p className="mt-5 text-xl lg:text-xl text-neutral-700">
              Track your projects, analytics, and earnings in one place. <br />
              Designed to help creators focus on what matters most. Insights,
              stats, and tools at your fingertips.
            </p>
            <NavLink
              to="/signup"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <div className="flex justify-center md:mx-0 mx-auto mt-8 items-center gap-4 w-44 p-3 bg-blue-600 shadow-lg rounded-full cursor-pointer hover:scale-105 transition-transform duration-300">
                <button className="font-bold text-black">Get Started</button>
                <span className="w-8 h-8 bg-black rounded-full flex items-center justify-center text-white text-lg">
                  &rarr;
                </span>
              </div>
            </NavLink>
          </div>

          {/* Stats Card */}
          <div className="flex-1 max-w-xl w-full">
            <Stats />
          </div>
        </div>
      </div>
      {/* Cards Section */}
      <div className="w-full max-w-7xl mt-20 grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 px-8 mx-auto">
        <Cards
          icon={PenTool}
          title="Content Editor"
          description="Create, edit, and polish your content in one distraction-free workspace."
          color={{
            bg: "bg-gradient-to-r from-blue-700 via-blue-600 to-blue-500",
            icon: "text-blue-400",
          }}
        />

        <Cards
          icon={BarChart3}
          title="Analytics"
          description="Track performance, engagement, and audience growth with clarity."
          color={{
            bg: "bg-gradient-to-r from-green-700 via-green-600 to-green-500",
            icon: "text-green-600",
          }}
        />

        <Cards
          icon={Lightbulb}
          title="Ideas Board"
          description="Capture ideas and organize creative concepts effortlessly."
          color={{
            bg: "bg-gradient-to-r from-yellow-700 via-yellow-600 to-yellow-500",
            icon: "text-yellow-600",
          }}
        />

        <Cards
          icon={CalendarClock}
          title="Scheduling"
          description="Plan and schedule content ahead of time without the stress."
          color={{
            bg: "bg-gradient-to-r from-purple-700 via-purple-600 to-purple-500",
            icon: "text-purple-600",
          }}
        />
      </div>
      <DashboardPreview />
      <div className="md:mt-20 mt-15 mx-auto mb-30 px-5 md:px-10 py-10 flex flex-col justify-center items-center">
        <h1 className="md:text-6xl text-5xl text-purple-950/90 text-center font-bold ">
          Try CrtrsHub for free
        </h1>
        <NavLink
          to="/signup"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <div className="flex gap-4 mt-5 items-center">
            <button className=" cursor-pointer border border-purple-400 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
              Sign in
            </button>
            <button className=" cursor-pointer bg-purple-700 px-4 py-2 rounded-lg text-white font-semibold hover:bg-purple-800 transition-colors">
              Sign up
            </button>
          </div>
        </NavLink>
      </div>
    </div>
  );
}

export default LandingPage;
