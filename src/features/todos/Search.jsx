import React from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "./todoSlice";

const Search = () => {
    const dispatch = useDispatch();

    return (
        <input
            type="text"
            placeholder="Search todos..."
            onChange={(e) => dispatch(setSearch(e.target.value))}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
        />
    );
};

export default Search;
