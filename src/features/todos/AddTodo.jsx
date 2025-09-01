import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

const AddTodo = () => {
    const [text, setText] = useState("");
    const [priority, setPriority] = useState("Medium");
    const [dueDate, setDueDate] = useState("");
    const dispatch = useDispatch();

    const handleAdd = () => {
        if (!text.trim()) return alert("Todo cannot be empty");
        dispatch(addTodo({ text, priority, dueDate }));
        setText("");
        setPriority("Medium");
        setDueDate("");
    };

    return (
        <div className="w-full max-w-md bg-white shadow-md rounded-lg p-6 flex flex-col gap-4">
            <input
                type="text"
                placeholder="Enter your todo"
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <div className="flex gap-2">
                <select
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                </select>

                <input
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 flex-1"
                />
            </div>

            <button
                onClick={handleAdd}
                className="bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
                Add Todo
            </button>
        </div>
    );
};

export default AddTodo;
