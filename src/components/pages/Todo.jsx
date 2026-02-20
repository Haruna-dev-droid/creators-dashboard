import React, { useState, useEffect, useRef } from "react";
import { useApp } from "../contexts/AppContext";
import { Trash2, X, Check } from "lucide-react";

const filter = ["All", "Pending", "Completed"];

function Todo() {
  const { todo, setTodo, logActivity, removeActivity } = useApp();
  // const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const inputRef = useRef(null);

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo = { id: Date.now(), text: input, completed: false };
    setTodo([...todo, newTodo]);
    // logActivity("added", null, null, newTodo.text);
    setInput("");
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
            className={`mr-2 px-4 py-2 rounded ${filterStatus === status ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700"} hover:bg-gray-300 transition-colors`}
          >
            {status}
          </button>
        ))}
      </div>
      <div className="flex mb-4">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
          className="border border-gray-300 rounded-l-lg px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Add a new todo..."
        />
        <button
          onClick={addTodo}
          className="bg-blue-600 text-white px-4 py-2 rounded-r-lg hover:bg-blue-700 transition-colors"
        >
          Add
        </button>
      </div>
      <ul className="space-y-2">
        {visibleTodos.length === 0 ? (
          <p className="text-gray-500">No todos to display</p>
        ) : (
          visibleTodos.map((item, index) => (
            <div
              key={index}
              className={`p-2 ${item.completed ? "bg-blue-500/90  text-white" : "bg-blue-100/70"} rounded-full flex items-center justify-between`}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.completed}
                  onChange={() => {
                    toggleTodo(item.id);
                    completeTodo(item.id);
                  }}
                />
                <li key={index} className={`p-2  rounded-lg `}>
                  {item.text}
                </li>
              </div>
              <button
                onClick={() => removeTodo(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                {item.completed ? (
                  <Check size={16} className="text-white" />
                ) : (
                  <X size={16} className="text-gray-500" />
                )}
              </button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
