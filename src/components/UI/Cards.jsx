import React from "react";
import { PenTool, BarChart3, Lightbulb, CalendarClock } from "lucide-react";

function Cards({ icon: Icon, title, description, color }) {
  return (
    <div
      className={`flex flex-col gap-4 p-6 rounded-2xl ${color.bg} border-8 border-white shadow-lg hover:shadow-xl transition`}
    >
      <div
        className={`px-3 rounded-xl  flex items-center justify-center bg-white w-12 h-12`}
      >
        <Icon size={26} strokeWidth={1.5} className={color.icon} />
      </div>

      <div>
        <h3 className="font-semibold text-lg text-blue-700">{title}</h3>
        <p className="text-sm text-black mt-1">{description}</p>
      </div>
    </div>
  );
}

export default Cards;
