// src/App.jsx
import React from "react";
import TodoList from "./features/todos/TodoList";
import { ListTodo } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-400 p-6">
      <h1 className="text-4xl font-bold text-indigo-100 mb-8 text-center drop-shadow">
        Todo Dashboard
      </h1>

      <div className="max-w-7xl mx-auto">
        {/* Todo List with Toolbar + Table */}
        <div className="bg-white shadow-lg rounded-xl p-5 border border-indigo-100">
          <h2 className="flex items-center gap-2 text-lg font-semibold text-indigo-600 mb-3 border-b pb-2">
            <ListTodo className="w-5 h-5 text-indigo-500" />
            Todos
          </h2>
          <TodoList />
        </div>
      </div>
    </div>
  );
}
