import React from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import { clearAll, deleteCompleted, markAllCompleted } from "./todoSlice";

const TodoList = () => {
    const todos = useSelector((state) => state.todos.todos);
    const filter = useSelector((state) => state.todos.filter);
    const search = useSelector((state) => state.todos.search.toLowerCase());
    const dispatch = useDispatch();

    const filteredTodos = todos
        .filter((todo) => {
            if (filter === "completed") return todo.completed;
            if (filter === "active") return !todo.completed;
            return true;
        })
        .filter((todo) => todo.text.toLowerCase().includes(search));

    const total = todos.length;
    const completedCount = todos.filter((t) => t.completed).length;
    const remaining = total - completedCount;

    return (
        <div className="w-full max-w-md mx-auto mt-4">
            {/* Bulk Actions */}
            <div className="flex flex-wrap gap-2 mb-4">
                <button
                    onClick={() => dispatch(clearAll())}
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-colors flex-1"
                >
                    Clear All
                </button>
                <button
                    onClick={() => dispatch(deleteCompleted())}
                    className="bg-yellow-400 text-white px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors flex-1"
                >
                    Delete Completed
                </button>
                <button
                    onClick={() => dispatch(markAllCompleted())}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors flex-1"
                >
                    Mark All Completed
                </button>
            </div>

            {/* Stats */}
            <div className="bg-gray-100 p-3 rounded-md mb-4 text-center font-medium">
                <span>Total: {total}</span> | <span>Completed: {completedCount}</span> |{" "}
                <span>Remaining: {remaining}</span>
            </div>

            {/* Todo Items */}
            <ul>
                {filteredTodos.length ? (
                    filteredTodos.map((todo) => <TodoItem key={todo.id} todo={todo} />)
                ) : (
                    <li className="text-center text-gray-500 py-4">No todos found</li>
                )}
            </ul>
        </div>
    );
};

export default TodoList;
