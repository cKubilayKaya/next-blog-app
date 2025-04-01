import React from "react";
import LoadingSpinner from "../LoadingSpinner";
import classNames from "classnames";

export default function Button({ type = "button", variant, children, isLoading, ...props }) {
  return (
    <button
      type={type}
      className={classNames({
        "flex justify-center items-center gap-2 rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-800 outline-0 cursor-pointer": true,
        "inline-flex w-full gap-2 justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto":
          variant === "cancel",
      })}
      {...props}
    >
      {children}
      {isLoading && <LoadingSpinner />}
    </button>
  );
}
