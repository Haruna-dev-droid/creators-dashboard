import React from "react";
import { Zap, Flame } from "lucide-react";
import { useApp } from "../contexts/AppContext";

export default function StreaksPanel() {
  const { streaks, deleteStreak } = useApp();

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-100 overflow-hidden mt-6">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <div className="flex items-center gap-3">
          <div className="bg-blue-500/30 p-2.5 rounded-lg">
            <Zap size={24} className="text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Streaks</h3>
            <p className="text-blue-100 text-xs mt-0.5">
              {streaks.length === 0
                ? "No active streaks"
                : `${streaks.length} active streak${streaks.length > 1 ? "s" : ""}`}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {streaks.length === 0 && (
            <p className="text-gray-500 text-center py-8 col-span-full">
              No streaks yet. Log in daily to build streaks!
            </p>
          )}
          {streaks.map((s) => (
            <div
              key={s.id}
              className="p-5 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-shadow flex items-center justify-between"
            >
              <div>
                <div className="font-bold text-gray-900">{s.label}</div>
                <div className="text-3xl font-bold text-blue-600 mt-2">
                  {s.count}
                </div>
                <div className="text-xs text-gray-500 mt-1">days in a row</div>
              </div>
              <div className="flex flex-col items-center gap-3">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">
                    <Flame />
                  </div>
                </div>
                {/* <button
                  onClick={() => deleteStreak(s.id)}
                  className="p-2 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                  title="Delete streak"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
