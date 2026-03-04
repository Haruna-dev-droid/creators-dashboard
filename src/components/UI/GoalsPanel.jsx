import React, { useState, useEffect, useRef } from "react";
import { Plus, Trash2, Edit2, Target } from "lucide-react";
import { useApp } from "../contexts/AppContext";
import Confetti, { playConfettiChime } from "./Confetti";

function CircularProgress({ percent, size = 80, stroke = 6 }) {
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
          stroke="url(#progressGrad)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${dash} ${c - dash}`}
          transform="rotate(-90)"
        />
        <defs>
          <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="100%" stopColor="#1e40af" />
          </linearGradient>
        </defs>
        <text
          x="0"
          y="6"
          textAnchor="middle"
          className="text-xs font-bold text-blue-600"
          style={{ fontSize: 13 }}
        >
          {Math.round(percent)}%
        </text>
      </g>
    </svg>
  );
}

export default function GoalsPanel() {
  const { goals, createGoal, updateGoalProgress, deleteGoal } = useApp();
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [target, setTarget] = useState(5);
  const [period, setPeriod] = useState("daily");
  const [celebratingId, setCelebratingId] = useState(null);
  const prevRef = useRef([]);

  useEffect(() => {
    const prev = prevRef.current || [];
    // find newly completed goals
    for (const g of goals) {
      const p = prev.find((x) => x.id === g.id);
      if (p && !p.completed && g.completed) {
        setCelebratingId(g.id);
        playConfettiChime();
        setTimeout(() => setCelebratingId(null), 1900);
        break;
      }
    }
    prevRef.current = goals;
  }, [goals]);

  const [editing, setEditing] = React.useState(null);

  const openEdit = (g) => setEditing({ ...g });
  const closeEdit = () => setEditing(null);
  const saveEdit = () => {
    if (!editing) return;
    updateGoal(editing.id, {
      title: editing.title,
      target: Number(editing.target),
      period: editing.period,
    });
    closeEdit();
  };

  const submit = (e) => {
    e.preventDefault();
    if (!title) return;
    createGoal(title, Number(target), period, "general");
    setTitle("");
    setTarget(5);
    setOpen(false);
  };

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl shadow-md border border-blue-100 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-blue-500/30 p-2.5 rounded-lg">
              <Target size={24} className="text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">Goals</h3>
              <p className="text-blue-100 text-xs mt-0.5">
                {goals.length === 0
                  ? "Create your first goal"
                  : `${goals.filter((g) => !g.completed).length} active`}
              </p>
            </div>
          </div>
          <button
            onClick={() => setOpen((s) => !s)}
            className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-400 text-white px-3 py-2 rounded-lg text-sm font-medium transition-colors"
          >
            <Plus size={16} /> Add
          </button>
        </div>
      </div>

      <div className="p-6">
        {open && (
          <form
            onSubmit={submit}
            className="mb-6 p-4 bg-white rounded-xl border border-blue-200 space-y-3"
          >
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Goal title"
              className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                placeholder="Target"
                className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="flex gap-2 justify-end pt-2">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors text-sm font-medium"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors text-sm font-medium"
              >
                Create Goal
              </button>
            </div>
          </form>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {goals.length === 0 && (
            <p className="text-gray-500 text-center py-8 col-span-full">
              No goals yet. Create one to get started!
            </p>
          )}
          {goals.map((g) => {
            const pct = Math.min(
              (g.current / Math.max(g.target, 1)) * 100,
              100,
            );
            return (
              <div
                key={g.id}
                className="p-5 bg-white rounded-xl border border-blue-100 hover:shadow-md transition-shadow relative flex items-start gap-4"
              >
                {g.completed && (
                  <div className="absolute top-2 right-2 text-green-500">
                    <span className="text-lg">✓</span>
                  </div>
                )}
                <div className="flex-shrink-0">
                  <CircularProgress percent={pct} />
                </div>
                {celebratingId === g.id && <Confetti active={true} />}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <div className="font-bold text-gray-900 text-sm">
                        {g.title}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {g.period} • {g.current}/{g.target}
                      </div>
                    </div>
                    <div className="flex gap-1.5">
                      <button
                        onClick={() => openEdit(g)}
                        className="p-1.5 hover:bg-blue-100 rounded-lg text-blue-600 transition-colors"
                      >
                        {" "}
                        <Edit2 size={16} />{" "}
                      </button>
                      <button
                        onClick={() => deleteGoal(g.id)}
                        className="p-1.5 hover:bg-red-100 rounded-lg text-red-500 transition-colors"
                      >
                        {" "}
                        <Trash2 size={16} />{" "}
                      </button>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="w-full h-2.5 bg-blue-100 rounded-full overflow-hidden mb-3">
                      <div
                        className="bg-gradient-to-r from-blue-500 to-blue-600 h-2.5 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => updateGoalProgress(g.id, 1)}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors"
                      >
                        +1
                      </button>
                      <button
                        onClick={() => updateGoalProgress(g.id, 5)}
                        className="flex-1 px-3 py-2 rounded-lg bg-blue-400 hover:bg-blue-500 text-white text-xs font-medium transition-colors"
                      >
                        +5
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="relative bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl border border-blue-100">
            <h4 className="text-xl font-bold text-gray-900 mb-4">Edit Goal</h4>
            <div className="space-y-2">
              <input
                value={editing.title}
                onChange={(e) =>
                  setEditing((s) => ({ ...s, title: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="number"
                value={editing.target}
                onChange={(e) =>
                  setEditing((s) => ({ ...s, target: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={editing.period}
                onChange={(e) =>
                  setEditing((s) => ({ ...s, period: e.target.value }))
                }
                className="w-full px-4 py-2.5 border border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>
            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={closeEdit}
                className="px-5 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={saveEdit}
                className="px-5 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors font-medium"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
