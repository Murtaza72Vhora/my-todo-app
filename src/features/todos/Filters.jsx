import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./todoSlice";

const Filters = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.todos.filter);

    const filters = ["all", "active", "completed"];

    return (
        <div className="flex gap-2 justify-center">
            {filters.map((f) => (
                <button
                    key={f}
                    onClick={() => dispatch(setFilter(f))}
                    disabled={filter === f}
                    className={`px-4 py-2 rounded-md font-medium transition-colors
            ${filter === f
                            ? "bg-blue-600 text-white cursor-not-allowed"
                            : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                        }`}
                >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                </button>
            ))}
        </div>
    );
};

export default Filters;
