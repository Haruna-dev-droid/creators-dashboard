import { createContext, useContext, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [notes, setNotes] = useState([]);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    setNotes(JSON.parse(localStorage.getItem("notes") || "[]"));
    setActivities(JSON.parse(localStorage.getItem("activities") || "[]"));
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(note));
    localStorage.setItem("activities", JSON.stringify(activities));
  }, [note, activities]);

  const logActivity = (type, noteTitle, category) => {
    const entry = {
      type,
      noteTitle,
      category,
      timestamp: new Date().toISOString(),
    };
    setActivities((prev) => [entry, ...prev].slice(0, 100));
  };

  return (
    <AppContext.Provider value={{ notes, activities, setNotes, logActivity }}>
      {children}
    </AppContext.Provider>
  );
}
export const useApp = () => useContext(AppContext);
