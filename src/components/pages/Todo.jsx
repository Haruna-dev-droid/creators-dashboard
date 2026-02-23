import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import { Trash2, X, Check, Calendar } from "lucide-react";

const filter = ["All", "Pending", "Completed"];

function Todo() {
  const { todo, setTodo, logActivity, removeActivity } = useApp();
  // const [todo, setTodo] = useState([]);
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
    // logActivity("added", null, null, newTodo.text);
    setInput("");
    setDescription("");
    setDate("");
    inputRef.current.focus();
  };

  const removeTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
    // const removedItem = todo.find((item) => item.id === id);
    // if (removedItem) logActivity("deleted", null, null, removedItem.text);
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
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Todo List</h1>
      <div className="mb-4">
        {filter.map((status) => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`mr-2 px-4 py-2 rounded-xl ${filterStatus === status ? " text-blue-500/90" : " text-gray-700"} hover:text-gray-300 transition-colors text-sm`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-4 mb-5">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3">
          New Task
        </p>

        <div className="flex flex-col gap-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm font-medium text-gray-800 placeholder-gray-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="What needs to be done?"
          />

          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTodo()}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-500 placeholder-gray-300 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Add a note (optional)..."
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-500 focus:outline-none focus:bg-white focus:ring-2 focus:ring-blue-400 transition-all duration-200"
          />

          <button
            onClick={addTodo}
            className="w-full bg-blue-500 hover:bg-blue-600 active:scale-95 text-white text-sm font-semibold py-2.5 rounded-xl transition-all duration-200 mt-1"
          >
            + Add Task
          </button>
        </div>
      </div>
      <ul className="space-y-3">
        {visibleTodos.length === 0 ? (
          <p className="text-gray-400 text-sm text-center py-8">
            No todos to display
          </p>
        ) : (
          visibleTodos.map((item, index) => (
            <div
              key={index}
              className={`group relative flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-200
          ${
            item.completed
              ? "bg-blue-500 border-blue-500 shadow-md shadow-blue-200 text-white"
              : "bg-white border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-0.5 hover:border-blue-100"
          }`}
            >
              {/* Left accent bar on hover (incomplete only) */}
              {!item.completed && (
                <span className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
              )}

              <div className="flex items-center gap-4 flex-1 min-w-0">
                {/* Custom circular checkbox */}
                <button
                  onClick={() => {
                    toggleTodo(item.id);
                    completeTodo(item.id);
                  }}
                  className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200
              ${
                item.completed
                  ? "bg-white border-white"
                  : "border-gray-300 hover:border-blue-400 bg-white"
              }`}
                >
                  {item.completed && (
                    <Check
                      size={11}
                      className="text-blue-500"
                      strokeWidth={3}
                    />
                  )}
                </button>

                {/* Text content */}
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col min-w-0">
                    <li
                      className={`list-none text-sm font-semibold truncate
              ${item.completed ? "line-through text-blue-100" : "text-gray-800"}`}
                    >
                      {item.text}
                    </li>
                    {item.description && (
                      <p
                        className={`text-xs mt-0.5 truncate
                ${item.completed ? "text-blue-200" : "text-gray-400"}`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                  {item.date && (
                    <p
                      className={`text-xs mt-1 truncate bg-gray-100 px-2 py-0.5 rounded-full flex items-center gap-1
                ${item.completed ? "text-blue-500/90" : "text-gray-500"}`}
                    >
                      <Calendar size={12} className="inline mr-1" />{" "}
                      {new Date(item.date).toLocaleDateString()}
                    </p>
                  )}
                </div>
              </div>

              {/* Remove button */}
              <button
                onClick={() => removeTodo(item.id)}
                className={`flex-shrink-0 ml-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-150
            ${
              item.completed
                ? "hover:bg-blue-400 text-blue-100 hover:text-white"
                : "text-gray-300 hover:bg-red-50 hover:text-red-400 opacity-0 group-hover:opacity-100"
            }`}
              >
                <X size={14} strokeWidth={2.5} />
              </button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
