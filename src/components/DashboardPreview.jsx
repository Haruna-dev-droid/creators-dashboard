import { useState } from "react";
import { PenTool, BarChart3, CalendarClock } from "lucide-react";

import EditorMock from "./UI/EditorMock";
import AnalyticsMock from "./UI/AnalyticsMock";
import ScheduleMock from "./UI/ScheduleMock";

const tabs = [
  {
    id: "editor",
    label: "Content Editor",
    icon: PenTool,
    component: EditorMock,
    title: "Create content effortlessly",
    description:
      "Write, edit, and organize your content in a focused workspace.",
  },
  {
    id: "analytics",
    label: "Analytics",
    icon: BarChart3,
    component: AnalyticsMock,
    title: "Understand what works",
    description: "Track performance and engagement with clear visual insights.",
  },
  {
    id: "schedule",
    label: "Scheduling",
    icon: CalendarClock,
    component: ScheduleMock,
    title: "Plan ahead with ease",
    description:
      "Schedule content in advance and stay consistent without stress.",
  },
];

export default function DashboardPreview() {
  const [activeTab, setActiveTab] = useState(tabs[0]);

  const ActiveComponent = activeTab.component;

  return (
    <section className="py-24 bg-gradient-to-t from-blue-100 to-white">
      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
        {/* LEFT */}
        <div>
          <h2 className="text-4xl font-bold mb-4 text-blue-950">
            Everything creators need in one place
          </h2>
          <p className="text-gray-600 mb-8 max-w-md">
            Create, analyze, and schedule content without juggling tools.
          </p>

          {/* TABS */}
          <div className="flex gap-3 mb-6 flex-wrap">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab.id === tab.id;

              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition
                    ${
                      isActive
                        ? "bg-blue-900 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-200"
                    }
                  `}
                >
                  <Icon size={16} />
                  {tab.label}
                </button>
              );
            })}
          </div>

          <h3 className="text-xl font-semibold mb-2">{activeTab.title}</h3>
          <p className="text-gray-600 max-w-md">{activeTab.description}</p>
        </div>

        {/* RIGHT – LIVE MOCKUP */}
        <div className="relative">
          <div className="rounded-2xl bg-white shadow-2xl overflow-hidden">
            <ActiveComponent />
          </div>

          <div className="absolute -inset-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 blur-3xl -z-10" />
        </div>
      </div>
    </section>
  );
}
