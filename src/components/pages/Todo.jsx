import React, { useState, useEffect, useRef } from "react";

import { Trash2 } from "lucide-react";

const filter = ["All", "Pending", "Completed"];

function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const inputRef = useRef(null);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodo([...todo, { id: Date.now(), text: input, completed: false }]);
    setInput("");
    inputRef.current.focus();
  };

  const removeTodo = (id) => {
    setTodo(todo.filter((item) => item.id !== id));
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
              className="p-2 bg-gray-100 rounded-lg flex items-center justify-between"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="mr-2"
                  checked={item.completed}
                  onChange={() => toggleTodo(item.id)}
                />
                <li
                  key={index}
                  className={`p-2 bg-gray-100 rounded-lg ${item.completed ? "line-through text-gray-500" : ""}`}
                >
                  {item.text}
                </li>
              </div>
              <button
                onClick={() => removeTodo(item.id)}
                className="ml-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
