export default function AnalyticsMock() {
  return (
    <div className="h-[420px] p-6 space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-4 rounded-xl bg-blue-100">
            <div className="h-3 w-1/2 bg-blue-300 rounded mb-2" />
            <div className="h-5 w-2/3 bg-blue-200 rounded" />
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="h-48 rounded-xl bg-gradient-to-t from-blue-200 to-blue-100 flex items-end gap-3 p-4">
        {[40, 70, 50, 90, 60].map((h, i) => (
          <div
            key={i}
            style={{ height: `${h}%` }}
            className="w-6 bg-blue-800/70 rounded-md"
          />
        ))}
      </div>
    </div>
  );
}
