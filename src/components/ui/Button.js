import React from "react";
import LoadingSpinner from "../LoadingSpinner";

export default function Button({ type = "button", children, isLoading, ...props }) {
  return (
    <button
      type={type}
      className="flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-800 outline-0 cursor-pointer"
      {...props}
    >
      {children}
      {isLoading && <LoadingSpinner />}
    </button>
  );
}
