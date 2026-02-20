import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [todo, setTodo] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
    setTodo(JSON.parse(localStorage.getItem("todo") || "[]"));
    setActivities(JSON.parse(localStorage.getItem("activities") || "[]"));
  }, []);

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem("todo", JSON.stringify(todo));
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [notes, todo, activities]);

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
