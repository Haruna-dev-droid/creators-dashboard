import React, { useState, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import ContentCalendar from "./ContentCalendar";
import { Trash2, X, Check, Calendar, Target, Edit2 } from "lucide-react";

const filter = ["All", "Pending", "Completed"];

function CircularProgress({ percent, size = 40, stroke = 4 }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = (percent / 100) * c;
  return (
    <svg width={size} height={size} className="block">
      <g transform={`translate(${size / 2}, ${size / 2})`}>
        <circle
          r={r}
          fill="transparent"
          stroke="#e0e7ff"
          strokeWidth={stroke}
        />
        <circle
          r={r}
          fill="transparent"
          stroke="url(#progressGrad40)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90)"
        />
        <defs>
          <linearGradient
            id="progressGrad40"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="5"
          textAnchor="middle"
          className="text-[8px] font-bold text-blue-600"
          style={{ fontSize: 8 }}
        >
          {Math.round(percent)}%
        </text>
      </g>
    </svg>
  );
}

function Todo() {
  const {
    todo,
    setTodo,
    goals,
    createGoal,
    updateGoalProgress,
    deleteGoal,
    logActivity,
    removeActivity,
  } = useApp();
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [viewMode, setViewMode] = useState("todos"); // "todos" or "goals"
  const [goalTitle, setGoalTitle] = useState("");
  const [goalTarget, setGoalTarget] = useState(5);
  const [goalPeriod, setGoalPeriod] = useState("daily");
  const inputRef = useRef(null);
  const goalInputRef = useRef(null);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: input,
      description,
      date,
      completed: false,
    };
    setTodo([...todo, newTodo]);
    setInput("");
    setDescription("");
    setDate("");
    inputRef.current.focus();
  };

  const addGoal = () => {
    if (goalTitle.trim() === "") return;
    createGoal(goalTitle, Number(goalTarget), goalPeriod, "general");
    setGoalTitle("");
    setGoalTarget(5);
    setGoalPeriod("daily");
    goalInputRef.current?.focus();
  };

  const visibleTodos = todo.filter((item) => {
    if (filterStatus === "All") return true;
    if (filterStatus === "Pending") return !item.completed;
    if (filterStatus === "Completed") return item.completed;
    return true;
  });

  return (
    <div
      className="min-h-screen text-gray-800"
      style={{
        fontFamily: "'DM Sans', system-ui, sans-serif",
        background: "",
      }}
    >
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 min-h-screen lg:h-screen flex flex-col p-4 sm:p-6">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-4 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-blue-500 shadow-md shadow-blue-200 flex items-center justify-center">
              <div className="w-3.5 h-3.5 rounded-sm bg-white/90" />
            </div>
            <div>
              <h1 className="text-base font-bold text-gray-800 tracking-tight leading-none">
                Workspace
              </h1>
              <p className="text-[10px] text-gray-400 mt-0.5">
                {new Date().toLocaleDateString("en-US", {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 bg-white border border-gray-100 rounded-lg px-2.5 py-1.5 shadow-sm">
            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-[10px] text-gray-500 font-medium">Live</span>
          </div>
        </div>

        {/* Side-by-side panels */}
        <div className="flex flex-col lg:flex-row gap-4 flex-1 min-h-0 overflow-hidden">
          {/* ── TODO/GOALS PANEL ── */}
          <div className="w-full lg:w-80 lg:flex-shrink-0 bg-white/80 border border-blue-100 rounded-2xl shadow-sm shadow-blue-100/50 backdrop-blur-sm overflow-hidden flex flex-col">
            {/* Panel header with tabs */}
            <div className="px-4 sm:px-5 pt-4 sm:pt-5 pb-3 border-b border-blue-100 flex-shrink-0">
              <div className="flex items-center justify-between gap-2 flex-col sm:flex-row mb-3">
                <div>
                  <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                    {viewMode === "todos" ? "Todo List" : "Goals"}
                  </h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {viewMode === "todos"
                      ? `${todo.filter((t) => !t.completed).length} remaining`
                      : `${goals.filter((g) => !g.completed).length} active`}
                  </p>
                </div>
                {/* View mode tabs */}
                <div className="flex gap-1 w-full sm:w-auto">
                  <button
                    onClick={() => setViewMode("todos")}
                    className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all flex-1 sm:flex-none ${
                      viewMode === "todos"
                        ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Todos
                  </button>
                  <button
                    onClick={() => setViewMode("goals")}
                    className={`px-3 py-1 rounded-md text-[10px] font-semibold transition-all flex-1 sm:flex-none ${
                      viewMode === "goals"
                        ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                        : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    Goals
                  </button>
                </div>
              </div>
              {/* Filter tabs (todos only) */}
              {viewMode === "todos" && (
                <div className="flex gap-1 w-full">
                  {filter.map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all flex-1 ${
                        filterStatus === status
                          ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Add task/goal form */}
            {viewMode === "todos" ? (
              <div className="mx-3 sm:mx-4 mt-3 bg-blue-50/60 border border-blue-100 rounded-xl p-3 space-y-2 flex-shrink-0">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
                  New Task
                </p>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  className="w-full bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="What needs to be done?"
                />
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addTodo()}
                  className="w-full bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-500 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Add a note (optional)..."
                />
                <div className="flex gap-2 flex-col sm:flex-row">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="flex-1 bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  />
                  <button
                    onClick={addTodo}
                    className="px-3 sm:px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-200 transition-all"
                  >
                    + Add
                  </button>
                </div>
              </div>
            ) : (
              <div className="mx-3 sm:mx-4 mt-3 bg-blue-50/60 border border-blue-100 rounded-xl p-3 space-y-2 shrink-0">
                <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest mb-2">
                  New Goal
                </p>
                <input
                  ref={goalInputRef}
                  type="text"
                  value={goalTitle}
                  onChange={(e) => setGoalTitle(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && addGoal()}
                  className="w-full bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-700 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                  placeholder="Goal title..."
                />
                <div className="flex gap-2 flex-col">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goalTarget}
                      onChange={(e) => setGoalTarget(e.target.value)}
                      className="w-24 bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                      placeholder="Target"
                    />
                    <select
                      value={goalPeriod}
                      onChange={(e) => setGoalPeriod(e.target.value)}
                      className="flex-1 bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                    >
                      <option value="daily">Daily</option>
                      <option value="weekly">Weekly</option>
                      <option value="monthly">Monthly</option>
                    </select>
                  </div>
                  <button
                    onClick={addGoal}
                    className="w-full px-3 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-200 transition-all"
                  >
                    + Create
                  </button>
                </div>
              </div>
            )}

            {/* Todo/Goals list — scrollable */}
            {viewMode === "todos" ? (
              <ul className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-1.5">
                {visibleTodos.length === 0 ? (
                  <p className="text-gray-300 text-xs text-center py-8">
                    No todos to display
                  </p>
                ) : (
                  visibleTodos.map((item, index) => (
                    <div
                      key={index}
                      className={`group relative flex items-center justify-between px-4 py-3 rounded-2xl border transition-all duration-200 ${
                        item.completed
                          ? "bg-blue-500 border-blue-500 shadow-md shadow-blue-200 text-white"
                          : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100"
                      }`}
                    >
                      {/* Left accent bar */}
                      {!item.completed && (
                        <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
                      )}

                      <div className="flex items-center gap-3 flex-1 min-w-0">
                        {/* Checkbox */}
                        <button
                          onClick={() => {
                            const toggledItem = todo.find(
                              (t) => t.id === item.id,
                            );
                            setTodo(
                              todo.map((t) =>
                                t.id === item.id
                                  ? { ...t, completed: !t.completed }
                                  : t,
                              ),
                            );
                            if (!toggledItem?.completed) {
                              logActivity(
                                "todo_completed",
                                null,
                                null,
                                item.text,
                              );
                            } else {
                              removeActivity(item.text);
                            }
                          }}
                          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 ${
                            item.completed
                              ? "bg-white border-white"
                              : "border-gray-300 hover:border-blue-400 bg-white"
                          }`}
                        >
                          {item.completed && (
                            <Check
                              size={10}
                              className="text-blue-500"
                              strokeWidth={3}
                            />
                          )}
                        </button>

                        {/* Text content */}
                        <div className="flex justify-between items-start w-full min-w-0">
                          <div className="flex flex-col min-w-0">
                            <li
                              className={`list-none text-xs font-semibold truncate ${
                                item.completed
                                  ? "line-through text-blue-100"
                                  : "text-gray-800"
                              }`}
                            >
                              {item.text}
                            </li>
                            {item.description && (
                              <p
                                className={`text-[10px] mt-0.5 truncate ${
                                  item.completed
                                    ? "text-blue-200"
                                    : "text-gray-400"
                                }`}
                              >
                                {item.description}
                              </p>
                            )}
                          </div>
                          {item.date && (
                            <span
                              className={`inline-flex items-center gap-1 ml-2 flex-shrink-0 text-[9px] px-1.5 py-0.5 rounded-full border ${
                                item.completed
                                  ? "bg-blue-400/30 border-blue-300/30 text-blue-100"
                                  : "bg-gray-50 border-gray-100 text-gray-400"
                              }`}
                            >
                              <Calendar size={8} />
                              {new Date(item.date).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Remove button */}
                      <button
                        onClick={() =>
                          setTodo(todo.filter((t) => t.id !== item.id))
                        }
                        className={`flex-shrink-0 ml-2 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-150 ${
                          item.completed
                            ? "hover:bg-blue-400 text-blue-100 hover:text-white"
                            : "text-gray-300 hover:bg-red-50 hover:text-red-400 opacity-0 group-hover:opacity-100"
                        }`}
                      >
                        <X size={13} strokeWidth={2.5} />
                      </button>
                    </div>
                  ))
                )}
              </ul>
            ) : (
              <ul className="flex-1 overflow-y-auto px-3 sm:px-4 py-3 space-y-1.5">
                {goals.length === 0 ? (
                  <p className="text-gray-300 text-xs text-center py-8">
                    No goals yet — create one to start!
                  </p>
                ) : (
                  goals.map((goal) => {
                    const pct = Math.min(
                      (goal.current / Math.max(goal.target, 1)) * 100,
                      100,
                    );
                    return (
                      <div
                        key={goal.id}
                        className="group relative flex items-center gap-3 px-4 py-3 rounded-2xl border bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100 transition-all duration-200"
                      >
                        {/* Left accent bar */}
                        <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />

                        {/* Circular progress */}
                        <div className="flex-shrink-0">
                          <CircularProgress percent={pct} size={40} />
                        </div>

                        {/* Goal info */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-1">
                            <p className="text-xs font-semibold text-gray-800 truncate">
                              {goal.title}
                            </p>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full border bg-gray-50 border-gray-100 text-gray-400 flex-shrink-0">
                              {goal.period}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <div className="flex-1 h-1.5 bg-blue-100 rounded-full overflow-hidden">
                              <div
                                className="bg-gradient-to-r from-blue-500 to-blue-600 h-1.5 rounded-full transition-all"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                            <span className="text-[9px] text-gray-500 flex-shrink-0">
                              {goal.current}/{goal.target}
                            </span>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex gap-1 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => updateGoalProgress(goal.id, 1)}
                            className="px-2 py-1 text-[10px] font-semibold bg-blue-500 hover:bg-blue-600 text-white rounded-md transition-colors"
                          >
                            +1
                          </button>
                          <button
                            onClick={() => deleteGoal(goal.id)}
                            className="w-6 h-6 rounded-full flex items-center justify-center text-gray-300 hover:bg-red-50 hover:text-red-400 transition-colors"
                          >
                            <X size={13} strokeWidth={2.5} />
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </ul>
            )}

            {/* Footer */}
            <div className="px-4 sm:px-5 py-3 border-t border-blue-50 flex-shrink-0">
              <p className="text-[10px] text-gray-400">
                {todo.filter((t) => !t.completed).length} remaining ·{" "}
                {todo.filter((t) => t.completed).length} done
              </p>
            </div>
          </div>

          {/* ── CALENDAR PANEL ── */}
          <div className="flex-1 bg-white/80 border border-blue-100 rounded-2xl shadow-sm shadow-blue-100/50 backdrop-blur-sm overflow-hidden flex flex-col">
            <ContentCalendar />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Todo;
