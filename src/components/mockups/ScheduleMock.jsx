export default function ScheduleMock() {
  return (
    <div className="h-[420px] p-6">
      <div className="grid grid-cols-7 gap-3">
        {Array.from({ length: 14 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl border bg-gray-50 p-2">
            <div className="h-2 w-1/2 bg-gray-300 rounded mb-2" />
            {i % 3 === 0 && <div className="h-3 bg-indigo-400 rounded" />}
          </div>
        ))}
      </div>
    </div>
  );
}
