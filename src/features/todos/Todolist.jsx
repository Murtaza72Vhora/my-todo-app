import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import TodoItem from "./TodoItem";
import Search from "./Search";
import Filters from "./Filters";
import AddTodo from "./AddTodo";
import Modal from "./Modal";
import { clearAll, deleteCompleted, markAllCompleted } from "./todoSlice";
import { Trash2, CheckSquare, XCircle, PlusCircle } from "lucide-react";

const TodoList = () => {
    const todos = useSelector((state) => state.todos.todos);
    const filter = useSelector((state) => state.todos.filter);
    const search = useSelector((state) => state.todos.search.toLowerCase());
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filtering + search
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
        <div className="w-full mx-auto mt-4 space-y-4">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                {/* Left: Search + Filters */}
                <div className="flex flex-col sm:flex-row gap-4 flex-1">
                    <div className="flex-1">
                        <Search />
                    </div>
                    <div>
                        <Filters />
                    </div>
                </div>

                {/* Right: Bulk Actions + Add Todo */}
                <div className="flex gap-2 flex-wrap justify-end">
                    <button
                        onClick={() => dispatch(clearAll())}
                        className="flex items-center gap-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors text-sm font-medium px-3 py-2 cursor-pointer"
                    >
                        <XCircle className="w-4 h-4" /> Clear All
                    </button>
                    <button
                        onClick={() => dispatch(deleteCompleted())}
                        className="flex items-center gap-1 bg-yellow-400 text-white rounded-md hover:bg-yellow-500 transition-colors text-sm font-medium px-3 py-2 cursor-pointer"
                    >
                        <Trash2 className="w-4 h-4" /> Delete Completed
                    </button>
                    <button
                        onClick={() => dispatch(markAllCompleted())}
                        className="flex items-center gap-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm font-medium px-3 py-2 cursor-pointer"
                    >
                        <CheckSquare className="w-4 h-4" /> Mark All Completed
                    </button>

                    {/* Add Todo (+) */}
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors text-sm font-medium px-3 py-2 cursor-pointer"
                    >
                        <PlusCircle className="w-4 h-4" /> Add Todo
                    </button>
                </div>
            </div>

            {/* Stats */}
            <div className="bg-sky-100 p-3 rounded-md text-center font-medium shadow-sm">
                <span>Total: {total}</span> |{" "}
                <span>Completed: {completedCount}</span> |{" "}
                <span>Remaining: {remaining}</span>
            </div>

            {/* Todo Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-3 text-center w-12">Done</th>
                            <th className="px-4 py-3 text-left">Task</th>
                            <th className="px-4 py-3 text-left">Priority</th>
                            <th className="px-4 py-3 text-left">Due Date</th>
                            <th className="px-4 py-3 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredTodos.length > 0 ? (
                            filteredTodos.map((todo) => (
                                <TodoItem key={todo.id} todo={todo} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5" className="text-center text-gray-500 py-6">
                                    No todos found
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* AddTodo Modal */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <h2 className="text-lg font-semibold text-indigo-600 mb-4 flex items-center gap-2">
                    <PlusCircle className="w-5 h-5" /> Add New Todo
                </h2>
                <AddTodo />
            </Modal>
        </div>
    );
};

export default TodoList;
