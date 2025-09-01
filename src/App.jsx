// src/App.jsx
import React from "react";
import AddTodo from "./features/todos/AddTodo";
import TodoList from "./features/todos/TodoList";
import Filters from "./features/todos/Filters";
import Search from "./features/todos/Search";

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-4xl font-bold text-blue-600 mb-6 text-center">
        Todo Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: AddTodo + Search + Filters */}
        <div className="md:col-span-1 space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Add Todo</h2>
            <AddTodo />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Search</h2>
            <Search />
          </div>

          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Filters</h2>
            <Filters />
          </div>
        </div>

        {/* Right Column: Todo List + Stats + Bulk Actions */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white shadow-md rounded-lg p-4">
            <h2 className="text-xl font-semibold mb-2">Todos</h2>
            <TodoList />
          </div>
        </div>
      </div>
    </div>
  );
}
