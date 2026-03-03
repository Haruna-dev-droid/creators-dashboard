import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./ContextAuth";
const AppContext = createContext(null);

// Returns an ISO string for the Monday 00:00:00 of the week for `date` (local time)
function getWeekStartISO(date = new Date()) {
  const d = new Date(date);
  const dayIndex = (d.getDay() + 6) % 7; // Monday -> 0, Sunday -> 6
  d.setDate(d.getDate() - dayIndex);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export function AppProvider({ children }) {
  const { currentUser } = useAuth();
  const uid = currentUser?.id || "guest";

  const [goals, setGoals] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`goals_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  const [streaks, setStreaks] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`streaks_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  const [notes, setNotes] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`notes_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  const [todo, setTodo] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`todo_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  const [posts, setPosts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`posts_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  const [activities, setActivities] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem(`activities_${uid}`) || "[]");
    } catch {
      return [];
    }
  });

  // Re-load when user changes (login/logout)
  useEffect(() => {
    const uid = currentUser?.id || "guest";
    try {
      const loadedNotes = JSON.parse(
        localStorage.getItem(`notes_${uid}`) || "[]",
      );
      const loadedTodo = JSON.parse(
        localStorage.getItem(`todo_${uid}`) || "[]",
      );
      const loadedPosts = JSON.parse(
        localStorage.getItem(`posts_${uid}`) || "[]",
      );
      const loadedActivities = JSON.parse(
        localStorage.getItem(`activities_${uid}`) || "[]",
      );

      // Week rollover check: if stored week-start differs from current, reset weekly data
      const weekKey = `lastWeekStart_${uid}`;
      const currentWeekStart = getWeekStartISO();
      const storedWeekStart = localStorage.getItem(weekKey);

      let finalTodo = loadedTodo;
      let finalActivities = loadedActivities;

      if (storedWeekStart !== currentWeekStart) {
        // New week: clear activities and un-check completed todos
        const resetGoals = loadedGoals.map((g) =>
          g.period === "weekly" ? { ...g, current: 0 } : g,
        );

        finalActivities = [];
        finalTodo = loadedTodo.map((t) => ({ ...t, completed: false }));
        localStorage.setItem(
          `activities_${uid}`,
          JSON.stringify(finalActivities),
        );
        localStorage.setItem(`todo_${uid}`, JSON.stringify(finalTodo));
        localStorage.setItem(weekKey, currentWeekStart);
        localStorage.setItem(`goals_${uid}`, JSON.stringify(resetGoals));
      }

      setNotes(loadedNotes);
      setTodo(finalTodo);
      setPosts(loadedPosts);
      setActivities(finalActivities);
    } catch {
      setNotes([]);
      setTodo([]);
      setPosts([]);
      setActivities([]);
    }
  }, [currentUser]);

  // Save effect — now keyed per user
  useEffect(() => {
    localStorage.setItem(`notes_${uid}`, JSON.stringify(notes));
    localStorage.setItem(`todo_${uid}`, JSON.stringify(todo));
    localStorage.setItem(`posts_${uid}`, JSON.stringify(posts));
    localStorage.setItem(`activities_${uid}`, JSON.stringify(activities));
    localStorage.setItem(`goals_${uid}`, JSON.stringify(goals));
    localStorage.setItem(`streaks_${uid}`, JSON.stringify(streaks));
  }, [notes, todo, posts, activities, goals, streaks, uid]);

  const removeActivity = (text) => {
    setActivities((prev) =>
      prev.filter((a) => a.todo !== text || a.type !== "completed"),
    );
  };

  const createGoal = (title, target, period, category) => {
    const newGoal = {
      id: Date.now(),
      title,
      target,
      period,
      current: 0,
      category,
      createdAt: new Date().toISOString(),
      completed: false,
    };
    setGoals((prev) => [...prev, newGoal]);
  };

  const updateGoalProgress = (goalId, increment = 1) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId && !g.completed) {
          const newCurrent = g.current + increment;
          return {
            ...g,
            current: Math.min(newCurrent, g.target),
            completed: newCurrent >= g.target,
          };
        }
        return g;
      }),
    );
  };

  const deleteGoal = (goalId) => {
    setGoals((prev) => prev.filter((g) => g.id !== goalId));
  };

  // Helper: Get today's ISO date (YYYY-MM-DD)
  const getTodayDateISO = (d = new Date()) => d.toISOString().split("T")[0];

  // Check if a streak should be incremented today
  const updateStreaks = (category) => {
    setStreaks((prev) =>
      prev.map((s) => {
        if (s.category !== category) return s;

        const lastDate = s.lastUpdated;
        const today = getTodayDateISO();
        const yesterday = getTodayDateISO(new Date(Date.now() - 86400000));

        // Increment if last update was yesterday or earlier (new day)
        if (
          lastDate !== today &&
          (lastDate === yesterday || lastDate < yesterday)
        ) {
          return { ...s, count: s.count + 1, lastUpdated: today };
        }

        // Same day: no increment
        if (lastDate === today) return s;

        // Streak broken (gap > 1 day): reset to 1
        return { ...s, count: 1, lastUpdated: today };
      }),
    );
  };

  const createStreak = (label, category) => {
    const newStreak = {
      id: Date.now(),
      label,
      count: 1,
      category,
      lastUpdated: getTodayDateISO(),
      milestone: 10,
    };
    setStreaks((prev) => [...prev, newStreak]);
  };

  const deleteStreak = (streakId) => {
    setStreaks((prev) => prev.filter((s) => s.id !== streakId));
  };

  const logActivity = (type, noteTitle, category, todo) => {
    const entry = {
      type,
      noteTitle,
      category,
      todo,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [entry, ...prev].slice(0, 100));

    // Update streaks based on activity type
    if (type === "todo_completed") {
      updateStreaks("todos");
      updateGoalProgress(/* goal matching "todos" */);
    }
    if (type === "note_created") {
      updateStreaks("notes");
    }
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        todo,
        posts,
        activities,
        goals,
        streaks,
        setNotes,
        setTodo,
        setPosts,
        logActivity,
        removeActivity,
        createGoal,
        updateGoalProgress,
        deleteGoal,
        createStreak,
        deleteStreak,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);
