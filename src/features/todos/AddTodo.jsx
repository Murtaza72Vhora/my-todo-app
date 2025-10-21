import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addTodo } from "./todoSlice";

// Lucide icons
import { PlusCircle, Calendar, Flag } from "lucide-react";

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
        <div className="w-full max-w-md bg-white rounded-xl flex flex-col gap-5 border border-gray-100">
            {/* Input */}
            <div className="relative">
                <input
                    type="text"
                    placeholder="Enter your todo..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg pl-3 pr-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                />
            </div>

            {/* Priority & Due Date */}
            <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 flex-1 bg-gray-50">
                    <Flag className="w-4 h-4 text-gray-500" />
                    <select
                        value={priority}
                        onChange={(e) => setPriority(e.target.value)}
                        className="w-full bg-transparent py-2 outline-none focus:ring-0 cursor-pointer"
                    >
                        <option value="High">High Priority</option>
                        <option value="Medium">Medium Priority</option>
                        <option value="Low">Low Priority</option>
                    </select>
                </div>

                <div className="flex items-center gap-2 border border-gray-300 rounded-lg px-2 flex-1 bg-gray-50">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <input
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="w-full bg-transparent py-2 outline-none focus:ring-0"
                    />
                </div>
            </div>

            {/* Button */}
            <button
                onClick={handleAdd}
                className="flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium py-2 rounded-lg hover:bg-indigo-700 transition-colors shadow-md cursor-pointer"
            >
                <PlusCircle className="w-5 h-5" />
                Add Todo
            </button>
        </div>
    );
};

export default AddTodo;
