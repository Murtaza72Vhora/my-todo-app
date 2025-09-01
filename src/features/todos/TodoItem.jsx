import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "./todoSlice";

const TodoItem = ({ todo }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState(todo.text);
    const [priority, setPriority] = useState(todo.priority);
    const [dueDate, setDueDate] = useState(todo.dueDate || "");

    const handleEdit = () => {
        if (!text.trim()) return alert("Todo cannot be empty");
        dispatch(editTodo({ id: todo.id, text, priority, dueDate }));
        setIsEditing(false);
    };

    const priorityColors = {
        High: "bg-red-500",
        Medium: "bg-yellow-400",
        Low: "bg-green-400",
    };

    return (
        <li className="bg-white shadow rounded-md p-4 mb-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
            {isEditing ? (
                <div className="flex flex-col md:flex-row md:items-center gap-2 w-full">
                    <input
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                        onClick={handleEdit}
                        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => setIsEditing(false)}
                        className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            ) : (
                <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full gap-2">
                    <div
                        onClick={() => dispatch(toggleTodo(todo.id))}
                        className={`flex-1 cursor-pointer ${todo.completed ? "line-through text-gray-400" : ""
                            }`}
                    >
                        <span className="font-medium">{todo.text}</span>
                        {dueDate && <span className="ml-2 text-sm text-gray-500">(Due: {dueDate})</span>}
                        <span
                            className={`ml-2 text-white text-xs font-semibold px-2 py-1 rounded ${priorityColors[priority]}`}
                        >
                            {priority}
                        </span>
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-yellow-400 text-white px-3 py-1 rounded-md hover:bg-yellow-500 transition-colors text-sm"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => dispatch(deleteTodo(todo.id))}
                            className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition-colors text-sm"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            )}
        </li>
    );
};

export default TodoItem;
