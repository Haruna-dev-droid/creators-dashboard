import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./ContextAuth";
const AppContext = createContext(null);

export function AppProvider({ children }) {
  const { currentUser } = useAuth();
  const uid = currentUser?.id || "guest";

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
      setNotes(JSON.parse(localStorage.getItem(`notes_${uid}`) || "[]"));
      setTodo(JSON.parse(localStorage.getItem(`todo_${uid}`) || "[]"));
      setPosts(JSON.parse(localStorage.getItem(`posts_${uid}`) || "[]"));
      setActivities(
        JSON.parse(localStorage.getItem(`activities_${uid}`) || "[]"),
      );
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
  }, [notes, todo, posts, activities, uid]);

  const removeActivity = (text) => {
    setActivities((prev) =>
      prev.filter((a) => a.todo !== text || a.type !== "completed"),
    );
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
  };

  return (
    <AppContext.Provider
      value={{
        notes,
        todo,
        posts,
        setPosts,
        activities,
        setNotes,
        setTodo,
        logActivity,
        removeActivity,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);
