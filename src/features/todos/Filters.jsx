import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFilter } from "./todoSlice";

const Filters = () => {
    const dispatch = useDispatch();
    const filter = useSelector((state) => state.todos.filter);

    const filters = ["all", "active", "completed"];

    const handleChange = (e) => {
        dispatch(setFilter(e.target.value));
    };

    return (
        <div className="w-full">
            <select
                value={filter}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md p-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white shadow-sm cursor-pointer"
            >
                {filters.map((f) => (
                    <option key={f} value={f}>
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;
