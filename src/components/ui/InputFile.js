import classNames from "classnames";
import React from "react";

export default function InputFile({ label, name, touched, errors, ...props }) {
  return (
    <div>
      <label
        htmlFor={name}
        className={classNames({
          "block text-sm/6 font-medium text-gray-900 mb-2": true,
          "text-red-500": errors,
        })}
      >
        {label}
      </label>
      <input
        type="file"
        name={name}
        id={name}
        className={classNames({
          "block cursor-pointer w-full border border-gray-200 shadow-sm rounded-lg text-sm disabled:opacity-50 disabled:pointer-events-none bg-gray-50  me-4 py-2 px-4 mb-0": true,
          "border border-red-500 focus:border-red-500": errors,
        })}
        {...props}
      />
      <p className="mt-1 text-xs text-gray-500 font-light">PNG, JPG or JPEG (MAX. 2MB)</p>
      {touched && errors && <span className={classNames({ "text-xs text-red-500": errors })}>{errors}</span>}
    </div>
  );
}
