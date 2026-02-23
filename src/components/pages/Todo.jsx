import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import ContentCalendar from "./ContentCalendar";
import { Trash2, X, Check, Calendar } from "lucide-react";

const filter = ["All", "Pending", "Completed"];

function Todo() {
  const { todo, setTodo, logActivity, removeActivity } = useApp();
  const [input, setInput] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const inputRef = useRef(null);

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

  const removeTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
  };

  const completeTodo = (id) => {
    const itemCompleted = todo.find((item) => item.id === id);
    if (!itemCompleted) return;
    if (!itemCompleted.completed) {
      logActivity("completed", null, null, itemCompleted.text);
    } else {
      removeActivity(itemCompleted.text);
    }
  };

  const toggleTodo = (id) => {
    setTodo(
      todo.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
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
        background:
          "linear-gradient(135deg, #eff6ff 0%, #f8faff 50%, #f0f4ff 100%)",
      }}
    >
      {/* Background glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-100/40 rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/2 w-96 h-96 bg-indigo-100/20 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 h-screen flex flex-col p-4 md:p-6">
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
        <div className="flex gap-4 flex-1 min-h-0">
          {/* ── TODO PANEL ── */}
          <div className="w-80 flex-shrink-0 bg-white/80 border border-blue-100 rounded-2xl shadow-sm shadow-blue-100/50 backdrop-blur-sm overflow-hidden flex flex-col">
            {/* Panel header */}
            <div className="px-5 pt-5 pb-3 border-b border-blue-100 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-sm font-bold text-gray-800 tracking-tight">
                    Todo List
                  </h2>
                  <p className="text-[10px] text-gray-400 mt-0.5">
                    {todo.filter((t) => !t.completed).length} remaining
                  </p>
                </div>
                {/* Filter tabs */}
                <div className="flex gap-1">
                  {filter.map((status) => (
                    <button
                      key={status}
                      onClick={() => setFilterStatus(status)}
                      className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                        filterStatus === status
                          ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                          : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add task form */}
            <div className="mx-4 mt-3 bg-blue-50/60 border border-blue-100 rounded-xl p-3 space-y-2 flex-shrink-0">
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
              <div className="flex gap-2">
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="flex-1 bg-white border border-blue-100 rounded-lg px-3 py-2 text-xs text-gray-500 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
                <button
                  onClick={addTodo}
                  className="px-4 py-2 bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-xs font-bold rounded-lg shadow-sm shadow-blue-200 transition-all"
                >
                  + Add
                </button>
              </div>
            </div>

            {/* Todo list — scrollable */}
            <ul className="flex-1 overflow-y-auto px-4 py-3 space-y-1.5">
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
                          toggleTodo(item.id);
                          completeTodo(item.id);
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
                      onClick={() => removeTodo(item.id)}
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

            {/* Footer */}
            <div className="px-5 py-3 border-t border-blue-50 flex-shrink-0">
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
