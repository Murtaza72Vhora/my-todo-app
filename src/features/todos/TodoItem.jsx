import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toggleTodo, deleteTodo, editTodo } from "./todoSlice";
import { Edit3, Trash2, Save, X } from "lucide-react";

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
        High: "bg-red-500/90",
        Medium: "bg-yellow-400/90",
        Low: "bg-green-500/90",
    };

    if (isEditing) {
        return (
            <tr className="border border-gray-300">
                <td colSpan="5" className="p-4">
                    <div className="flex flex-wrap gap-3 items-center">
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2 flex-1"
                        />
                        <select
                            value={priority}
                            onChange={(e) => setPriority(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        >
                            <option value="High">High</option>
                            <option value="Medium">Medium</option>
                            <option value="Low">Low</option>
                        </select>
                        <input
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            className="border border-gray-300 rounded-lg p-2"
                        />
                        <button
                            onClick={handleEdit}
                            className="flex items-center gap-1 bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition"
                        >
                            <Save className="w-4 h-4" /> Save
                        </button>
                        <button
                            onClick={() => setIsEditing(false)}
                            className="flex items-center gap-1 bg-gray-300 text-gray-800 px-3 py-2 rounded-lg hover:bg-gray-400 transition"
                        >
                            <X className="w-4 h-4" /> Cancel
                        </button>
                    </div>
                </td>
            </tr>
        );
    }

    return (
        <tr className="group hover:shadow-md hover:bg-gray-50 transition rounded-lg overflow-hidden">
            {/* Completed Checkbox */}
            <td className="px-4 py-4 text-center">
                <label className="flex items-center justify-center cursor-pointer">
                    <input
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => dispatch(toggleTodo(todo.id))}
                        className="peer hidden"
                    />
                    <span className="w-5 h-5 flex items-center justify-center rounded border-2 border-gray-300 peer-checked:bg-blue-600 peer-checked:border-blue-600 transition">
                        {todo.completed && (
                            <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                <path d="M5 13l4 4L19 7" />
                            </svg>
                        )}
                    </span>
                </label>
            </td>

            {/* Task Text */}
            <td
                className={`px-4 py-4 text-sm md:text-base cursor-pointer transition ${todo.completed ? "line-through text-gray-400" : "text-gray-900 group-hover:text-blue-600"
                    }`}
                onClick={() => dispatch(toggleTodo(todo.id))}
            >
                {todo.text}
            </td>

            {/* Priority */}
            <td className="px-4 py-4">
                <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full border ${priorityColors[priority]} shadow-sm`}
                >
                    {priority}
                </span>
            </td>

            {/* Due Date */}
            <td
                className={`px-4 py-4 text-sm ${todo.completed
                    ? "text-gray-400"
                    : new Date(dueDate) < new Date()
                        ? "text-red-500 font-medium"
                        : "text-gray-700"
                    }`}
            >
                {dueDate || "N/A"}
            </td>

            {/* Actions */}
            <td className="px-4 py-4 flex gap-3 justify-center">
                <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 rounded-full bg-yellow-50 hover:bg-yellow-100 transition relative group cursor-pointer"
                >
                    <Edit3 className="w-5 h-5 text-yellow-500" />
                </button>
                <button
                    onClick={() => dispatch(deleteTodo(todo.id))}
                    className="p-2 rounded-full bg-red-50 hover:bg-red-100 transition relative group cursor-pointer"
                >
                    <Trash2 className="w-5 h-5 text-red-500" />
                </button>
            </td>
        </tr>

    );
};

export default TodoItem;
