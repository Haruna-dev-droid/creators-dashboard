import React, { useState, useEffect, useRef } from "react";

const filter = ["All", "Pending", "Completed"];

function Todo() {
  const [todo, setTodo] = useState([]);
  const [input, setInput] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const inputRef = useRef(null);

  const addTodo = () => {
    if (input.trim() === "") return;
    setTodo([...todo, input]);
    setInput("");
    inputRef.current.focus();
  };

  const removeTodo = (index) => {
    setTodo(todo.filter((_, i) => i !== index));
  };

  const toggleTodo = (index) => {
    setTodo(
      todo.map((item, i) =>
        i === index ? { ...item, completed: !item.completed } : item,
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
        {/* {todo.map((item, index) => (
          <div
            key={index}
            className="p-2 bg-gray-100 rounded-lg flex items-center"
          >
            <input
              type="checkbox"
              className="mr-2"
              onClick={() => removeTodo(index)}
            />
            <li key={index} className="p-2 bg-gray-100 rounded-lg">
              {item}
            </li>
          </div>
        ))} */}
        {visibleTodos.length === 0 ? (
          <p className="text-gray-500">No todos to display</p>
        ) : (
          visibleTodos.map((item, index) => (
            <div
              key={index}
              className="p-2 bg-gray-100 rounded-lg flex items-center"
            >
              <input
                type="checkbox"
                className="mr-2"
                onClick={() => toggleTodo(index)}
              />
              <li
                key={index}
                className={`p-2 bg-gray-100 rounded-lg ${item.completed ? "line-through text-gray-500" : ""}`}
              >
                {item}
              </li>
            </div>
          ))
        )}
      </ul>
    </div>
  );
}

export default Todo;
