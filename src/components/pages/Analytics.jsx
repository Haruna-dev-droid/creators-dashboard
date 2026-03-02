import React, { useState, useMemo } from "react";
import { useApp } from "../contexts/AppContext";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ACTIVITIES = [
  { key: "note_created", label: "Created", color: "#3B82F6" },
  { key: "note_edited", label: "Edited", color: "#8B5CF6" },
  { key: "note_deleted", label: "Deleted", color: "#EF4444" },
  { key: "note_published", label: "Published", color: "#10B981" },
  { key: "todo_completed", label: "Completed", color: "#F59E0B" },
];

function getTodayKey() {
  return new Date().toISOString().split("T")[0];
}

// Converts the flat activities array → 24-row array for Recharts
function buildChartData(activities) {
  const todayKey = getTodayKey();

  // Build a nested map: hour -> activityKey -> count
  const hourMap = {};
  activities.forEach(({ type, timestamp }) => {
    if (!timestamp) return;
    const date = timestamp.split("T")[0];
    if (date !== todayKey) return;

    const hour = new Date(timestamp).getHours();
    if (!hourMap[hour]) hourMap[hour] = {};
    hourMap[hour][type] = (hourMap[hour][type] || 0) + 1;
  });

  return Array.from({ length: 24 }, (_, h) => {
    const hourData = hourMap[h] || {};
    const label =
      h === 0 ? "12am" : h < 12 ? `${h}am` : h === 12 ? "12pm" : `${h - 12}pm`;

    const entry = { hour: label };
    ACTIVITIES.forEach(({ key }) => {
      entry[key] = hourData[key] || 0;
    });
    return entry;
  });
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  const hasData = payload.some((p) => p.value > 0);
  if (!hasData) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-4 py-3 shadow-lg text-sm">
      <p className="text-gray-400 font-semibold mb-2">{label}</p>
      {payload.map((entry) =>
        entry.value > 0 ? (
          <div key={entry.dataKey} className="flex items-center gap-2 mb-1">
            <span
              className="inline-block w-2.5 h-2.5 rounded-sm"
              style={{ background: entry.color }}
            />
            <span className="text-gray-600">{entry.name}:</span>
            <span className="font-bold" style={{ color: entry.color }}>
              {entry.value} {entry.value === 1 ? "time" : "times"}
            </span>
          </div>
        ) : null,
      )}
    </div>
  );
}

export default function Analytics() {
  const [activeFilter, setActiveFilter] = useState("all");
  const { activities } = useApp();

  const { chartData, totals } = useMemo(() => {
    const data = buildChartData(activities);

    const totals = {};
    ACTIVITIES.forEach(({ key }) => {
      totals[key] = data.reduce((sum, row) => sum + (row[key] || 0), 0);
    });

    return { chartData: data, totals };
  }, [activities]); // ✅ re-runs when activities changes

  const totalActions = Object.values(totals).reduce((a, b) => a + b, 0);
  const displayData = chartData.filter((_, i) => i >= 0);

  const visibleActivities =
    activeFilter === "all"
      ? ACTIVITIES
      : ACTIVITIES.filter((a) => a.key === activeFilter);

  return (
    <div className="p-4 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1">
        Analytics
      </h1>
      <p className="text-gray-400 text-sm mb-6 sm:mb-8">
        {new Date().toLocaleDateString("en-US", {
          weekday: "long",
          year: "numeric",
          month: "long",
          day: "numeric",
        })}
      </p>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm">
          <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
            Total
          </p>
          <p className="text-2xl font-bold text-blue-500">{totalActions}</p>
        </div>
        {ACTIVITIES.map(({ key, label, color }) => (
          <div
            key={key}
            className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-100 shadow-sm"
          >
            <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-1">
              {label}
            </p>
            <p className="text-2xl font-bold" style={{ color }}>
              {totals[key] || 0}
            </p>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Activity Usage</h2>
            <p className="text-sm text-gray-400">Actions per hour · Today</p>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => setActiveFilter("all")}
              className={`px-3 sm:px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                activeFilter === "all"
                  ? "bg-blue-500/90 text-white border-blue-500 shadow-sm"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-300 hover:text-blue-500"
              }`}
            >
              All
            </button>
            {ACTIVITIES.map(({ key, label, color }) => (
              <button
                key={key}
                onClick={() => setActiveFilter(key)}
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-all ${
                  activeFilter === key
                    ? "text-white border-transparent shadow-sm"
                    : "bg-white text-gray-500 border-gray-200 hover:text-gray-700"
                }`}
                style={activeFilter === key ? { background: color } : {}}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        <ResponsiveContainer width="100%" height={240}>
          <BarChart
            data={displayData}
            barGap={2}
            barCategoryGap="30%"
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#F3F4F6"
              vertical={false}
            />
            <XAxis
              dataKey="hour"
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              interval={2}
            />
            <YAxis
              tick={{ fill: "#9CA3AF", fontSize: 11 }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F9FAFB" }} />
            {visibleActivities.map(({ key, label, color }) => (
              <Bar
                key={key}
                dataKey={key}
                name={label}
                fill={color}
                radius={[4, 4, 0, 0]}
                maxBarSize={24}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Breakdown */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6">
        <h3 className="text-base font-bold text-gray-800 mb-4">Breakdown</h3>
        <div className="flex flex-col gap-3 sm:gap-4">
          {ACTIVITIES.map(({ key, label, color }) => {
            const count = totals[key] || 0;
            const pct =
              totalActions > 0 ? Math.round((count / totalActions) * 100) : 0;
            return (
              <div key={key} className="flex items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium text-gray-600 w-16 sm:w-24 shrink-0">
                  {label}
                </span>
                <div className="flex-1 bg-gray-100 rounded-full h-2 overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${pct}%`, background: color }}
                  />
                </div>
                <span
                  className="text-sm font-bold w-20 sm:w-24 text-right text-nowrap"
                  style={{ color }}
                >
                  {count} · {pct}%
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
