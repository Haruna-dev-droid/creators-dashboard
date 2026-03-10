import React, { useState, useEffect } from "react";
import { useApp } from "../contexts/AppContext";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

// initial map of built‑in types; users can extend this at runtime
const defaultContentTypes = {
  blog: {
    label: "Blog Post",
    dot: "bg-rose-400",
    badge: "bg-rose-50 text-rose-500 border border-rose-200",
  },
  social: {
    label: "Social",
    dot: "bg-cyan-400",
    badge: "bg-cyan-50 text-cyan-600 border border-cyan-200",
  },
  video: {
    label: "Video",
    dot: "bg-amber-400",
    badge: "bg-amber-50 text-amber-600 border border-amber-200",
  },
  newsletter: {
    label: "Newsletter",
    dot: "bg-violet-400",
    badge: "bg-violet-50 text-violet-600 border border-violet-200",
  },
  podcast: {
    label: "Podcast",
    dot: "bg-orange-400",
    badge: "bg-orange-50 text-orange-600 border border-orange-200",
  },
};

let nextId = 10;

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const getDaysInMonth = (month, year) => {
  return new Date(year, month + 1, 0).getDate();
};

const getFirstDayOfMonth = (month, year) => {
  return new Date(year, month, 1).getDay();
};

const initialContent = [];

function ContentCalendar() {
  const { posts, setPosts } = useApp();
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth());
  // const [posts, setPosts] = useState(initialContent);
  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({
    title: "",
    type: "blog",
    status: "draft",
  });
  const [filter, setFilter] = useState("all");
  const [selectedDate, setSelectedDate] = useState(null);

  // --- custom content type support ----------------------------------
  const [contentTypes, setContentTypes] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("contentTypes")) || defaultContentTypes
      );
    } catch {
      return defaultContentTypes;
    }
  });

  const deleteContentTypes = (key) => {
    setContentTypes((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
    // clear filter if the removed type was active
    setFilter((f) => (f === key ? "all" : f));
  };

  useEffect(() => {
    localStorage.setItem("contentTypes", JSON.stringify(contentTypes));
  }, [contentTypes]);

  const [typeModal, setTypeModal] = useState(false);
  const [newTypeKey, setNewTypeKey] = useState("");
  const [newTypeLabel, setNewTypeLabel] = useState("");

  const saveNewType = () => {
    const key = newTypeKey.trim().toLowerCase().replace(/\s+/g, "-");
    if (!key || contentTypes[key]) return; // prevent duplicates/empty
    setContentTypes((prev) => ({
      ...prev,
      [key]: {
        label: newTypeLabel || key,
        dot: "bg-green-400",
        badge: "bg-green-50 text-green-500 border-green-200",
      },
    }));
    setTypeModal(false);
    setNewTypeKey("");
    setNewTypeLabel("");
  };

  // ------------------------------------------------------------------

  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);
  const totalCells = Math.ceil((firstDay + daysInMonth) / 7) * 7;

  const prevMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((y) => y - 1);
    } else setMonth((m) => m - 1);
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((y) => y + 1);
    } else setMonth((m) => m + 1);
  };

  const dateStr = (d) =>
    `${year}-${String(month + 1).padStart(2, "0")}-${String(d).padStart(2, "0")}`;

  const postsForDay = (d) => {
    const ds = dateStr(d);
    return posts.filter(
      (p) => p.date === ds && (filter === "all" || p.type === filter),
    );
  };

  const thisMonthPrefix = `${year}-${String(month + 1).padStart(2, "0")}`;
  const monthPosts = posts.filter((p) => p.date.startsWith(thisMonthPrefix));

  const openAdd = (d) => {
    setSelectedDate(dateStr(d));
    setForm({ title: "", type: "blog", status: "draft" });
    setModal("add");
  };

  const savePost = () => {
    if (!form.title.trim()) return;
    if (modal === "add") {
      setPosts((p) => [...p, { id: nextId++, ...form, date: selectedDate }]);
    } else {
      setPosts((p) =>
        p.map((x) => (x.id === modal.id ? { ...x, ...form } : x)),
      );
    }
    setModal(null);
  };

  const openEdit = (post, e) => {
    e.stopPropagation();
    setForm({ title: post.title, type: post.type, status: post.status });
    setModal(post);
  };

  const deletePost = (id, e) => {
    e.stopPropagation();
    setPosts((p) => p.filter((x) => x.id !== id));
  };

  const isToday = (d) => {
    const t = new Date();
    return (
      d === t.getDate() && month === t.getMonth() && year === t.getFullYear()
    );
  };

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* ── Header ── */}
      <div className="px-5 pt-5 pb-3 border-b border-blue-100 flex-shrink-0">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-sm font-bold text-gray-800 tracking-tight">
              Content Calendar
            </h2>
            <p className="text-[10px] text-gray-400 mt-0.5">
              Click any day to schedule content
            </p>
          </div>

          {/* Type filters */}
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setFilter("all")}
              className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all ${
                filter === "all"
                  ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                  : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              All Types
            </button>
            {Object.entries(contentTypes).map(([key, val]) => {
              const isCustom = !defaultContentTypes.hasOwnProperty(key);
              return (
                <div key={key} className="relative group inline-block">
                  <button
                    onClick={() => setFilter(filter === key ? "all" : key)}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-semibold transition-all flex items-center gap-1 border ${
                      filter === key
                        ? val.badge
                        : "text-gray-400 border-transparent hover:text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${val.dot}`} />
                    {val.label}
                  </button>

                  {isCustom && (
                    <button
                      onClick={() => deleteContentTypes(key)}
                      className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-blue-500/90 text-white text-[8px] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={8} />
                    </button>
                  )}
                </div>
              );
            })}

            {/* quick action to create a new type */}
            <button
              onClick={() => setTypeModal(true)}
              className="px-2.5 py-1 rounded-md text-[10px] font-semibold bg-gray-100 hover:bg-gray-200"
            >
              +
            </button>
          </div>
        </div>

        {/* Month nav */}
        <div className="flex items-center gap-2 mt-3">
          <button
            onClick={prevMonth}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <ChevronLeft size={13} />
          </button>
          <h3 className="text-xs font-bold text-gray-700 flex-1 text-center">
            {MONTHS[month]}{" "}
            <span className="text-gray-400 font-normal">{year}</span>
          </h3>
          <button
            onClick={nextMonth}
            className="p-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-gray-400 hover:text-blue-500 transition-colors"
          >
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => {
              setYear(today.getFullYear());
              setMonth(today.getMonth());
            }}
            className="px-2.5 py-1.5 rounded-lg bg-gray-100 hover:bg-blue-100 text-[10px] text-gray-400 hover:text-blue-500 font-semibold transition-colors"
          >
            Today
          </button>
        </div>
      </div>

      {/* ── Calendar grid ── */}
      <div className="flex-1 overflow-hidden px-3 pt-2 pb-3 flex flex-col">
        {/* Day labels */}
        <div className="grid grid-cols-7 mb-1">
          {DAYS.map((d) => (
            <div
              key={d}
              className="py-1.5 text-center text-[9px] font-bold uppercase tracking-widest text-gray-400"
            >
              {d}
            </div>
          ))}
        </div>

        {/* Cells */}
        <div className="grid grid-cols-7 grid-rows-6  flex-1 border border-gray-100 rounded-xl overflow-hidden bg-white shadow-sm">
          {Array.from({ length: totalCells }).map((_, i) => {
            const day = i - firstDay + 1;
            const isValid = day >= 1 && day <= daysInMonth;
            const dayPosts = isValid ? postsForDay(day) : [];
            const todayCell = isValid && isToday(day);
            const borderB = i < totalCells - 7 ? "border-b border-gray-50" : "";
            const borderR = i % 7 !== 6 ? "border-r border-gray-50" : "";

            return (
              <div
                key={i}
                onClick={() => isValid && openAdd(day)}
                className={`min-h-16 p-1.5 transition-colors ${borderB} ${borderR} ${
                  isValid
                    ? "cursor-pointer hover:bg-blue-50/60"
                    : "bg-gray-50/50 cursor-default"
                }`}
              >
                {isValid && (
                  <>
                    <div
                      className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-semibold mb-1 transition-colors ${
                        todayCell
                          ? "bg-blue-500 text-white shadow-sm shadow-blue-200"
                          : "text-gray-400 hover:text-gray-600"
                      }`}
                    >
                      {day}
                    </div>
                    <div className="space-y-0.5">
                      {dayPosts.slice(0, 2).map((post) => (
                        <div
                          key={post.id}
                          onClick={(e) => openEdit(post, e)}
                          className={`flex items-center gap-1 px-1 py-0.5 rounded text-[9px] font-medium cursor-pointer hover:brightness-95 transition-all group ${
                            (contentTypes[post.type] &&
                              contentTypes[post.type].badge) ||
                            ""
                          }`}
                        >
                          <span
                            className={`w-1 h-1 rounded-full flex-shrink-0 ${
                              (contentTypes[post.type] &&
                                contentTypes[post.type].dot) ||
                              ""
                            }`}
                          />
                          <span className="truncate flex-1 leading-tight">
                            {post.title}
                          </span>
                          <button
                            onClick={(e) => deletePost(post.id, e)}
                            className="flex-shrink-0 opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-400 transition-all leading-none ml-0.5"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                      {dayPosts.length > 2 && (
                        <div className="text-[9px] text-gray-400 pl-1">
                          +{dayPosts.length - 2} more
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="grid grid-cols-4 gap-1.5 px-4 pb-4 flex-shrink-0">
        {[
          {
            label: "Total",
            value: monthPosts.length,
            color: "text-gray-800",
            bg: "bg-gray-50 border-gray-100",
          },
          {
            label: "Published",
            value: monthPosts.filter((p) => p.status === "published").length,
            color: "text-emerald-600",
            bg: "bg-emerald-50 border-emerald-100",
          },
          {
            label: "Scheduled",
            value: monthPosts.filter((p) => p.status === "scheduled").length,
            color: "text-blue-600",
            bg: "bg-blue-50 border-blue-100",
          },
          {
            label: "Drafts",
            value: monthPosts.filter((p) => p.status === "draft").length,
            color: "text-amber-600",
            bg: "bg-amber-50 border-amber-100",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className={`${stat.bg} border rounded-xl p-2.5 text-center`}
          >
            <div className={`text-xl font-bold tabular-nums ${stat.color}`}>
              {stat.value}
            </div>
            <div className="text-[9px] text-gray-400 mt-0.5 font-semibold uppercase tracking-wide">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* ── Modal ── */}
      {modal !== null && (
        <div
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setModal(null)}
        >
          <div
            className="bg-white border border-gray-200 rounded-2xl w-full max-w-md shadow-xl shadow-gray-200/50 p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-800 mb-0.5">
              {modal === "add" ? "Schedule Content" : "Edit Content"}
            </h3>
            <p className="text-[10px] text-gray-400 mb-4">
              {modal === "add" ? selectedDate : modal.date}
            </p>

            <div className="space-y-4">
              {/* Title */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Title
                </label>
                <input
                  autoFocus
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === "Enter" && savePost()}
                  placeholder="e.g. Product Launch Announcement"
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-sm text-gray-800 placeholder-gray-300 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition-all"
                />
              </div>

              {/* Type */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Content Type
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {Object.entries(contentTypes).map(([key, val]) => (
                    <button
                      key={key}
                      onClick={() => setForm((f) => ({ ...f, type: key }))}
                      className={`py-2 px-2 rounded-xl text-[10px] font-semibold transition-all border flex items-center justify-center gap-1.5 ${
                        form.type === key
                          ? val.badge
                          : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${val.dot}`} />
                      {val.label}
                    </button>
                  ))}{" "}
                </div>
              </div>

              {/* Status */}
              <div>
                <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-widest mb-1.5">
                  Status
                </label>
                <div className="grid grid-cols-3 gap-1.5">
                  {[
                    {
                      val: "draft",
                      label: "Draft",
                      active: "bg-amber-50 text-amber-600 border-amber-200",
                    },
                    {
                      val: "scheduled",
                      label: "Scheduled",
                      active: "bg-blue-50 text-blue-600 border-blue-200",
                    },
                    {
                      val: "published",
                      label: "Published",
                      active:
                        "bg-emerald-50 text-emerald-600 border-emerald-200",
                    },
                  ].map((s) => (
                    <button
                      key={s.val}
                      onClick={() => setForm((f) => ({ ...f, status: s.val }))}
                      className={`py-2 rounded-xl text-[10px] font-semibold transition-all border ${
                        form.status === s.val
                          ? s.active
                          : "bg-gray-50 border-gray-200 text-gray-500 hover:border-gray-300"
                      }`}
                    >
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 mt-5">
              <button
                onClick={() => setModal(null)}
                className="flex-1 py-2.5 rounded-xl bg-gray-100 text-gray-500 text-xs font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={savePost}
                disabled={!form.title.trim()}
                className="flex-1 py-2.5 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 shadow-sm shadow-blue-200 transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                {modal === "add" ? "Add to Calendar" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* type-creation dialog */}
      {typeModal && (
        <div
          className="fixed inset-0 bg-gray-900/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setTypeModal(false)}
        >
          <div
            className="bg-white border border-gray-200 rounded-2xl w-full max-w-sm shadow-xl p-5"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-gray-800 mb-2">
              New content type
            </h3>
            <input
              value={newTypeKey}
              onChange={(e) => setNewTypeKey(e.target.value)}
              placeholder="slug (e.g. announcement)"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-2 text-sm"
            />
            <input
              value={newTypeLabel}
              onChange={(e) => setNewTypeLabel(e.target.value)}
              placeholder="label"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 mb-4 text-sm"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setTypeModal(false)}
                className="flex-1 py-2 rounded-xl bg-gray-100 text-gray-500 text-xs font-semibold hover:bg-gray-200"
              >
                Cancel
              </button>
              <button
                onClick={saveNewType}
                disabled={!newTypeKey.trim() || !newTypeLabel.trim()}
                className="flex-1 py-2 rounded-xl bg-blue-500 text-white text-xs font-semibold hover:bg-blue-600 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                Add type
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ContentCalendar;
