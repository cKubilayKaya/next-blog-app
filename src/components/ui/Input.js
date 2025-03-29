import classNames from "classnames";
import React from "react";
import LinkElement from "./LinkElement";

export default function Input({ label, name, type, touched, errors, forgotpassword, ...props }) {
  return (
    <div>
      {forgotpassword ? (
        <div className="flex items-center justify-between">
          <label
            htmlFor={name}
            className={classNames({
              "block text-sm/6 font-medium text-gray-900": true,
              "text-red-500": errors,
            })}
          >
            {label}
          </label>
          <LinkElement href="/change-password" link>
            Forgot Password
          </LinkElement>
        </div>
      ) : (
        <label
          htmlFor={name}
          className={classNames({
            "block text-sm/6 font-medium text-gray-900": true,
            "text-red-500": errors,
          })}
        >
          {label}
        </label>
      )}

      <div className="mt-2">
        <input
          id={name}
          name={name}
          type={type || "text"}
          className={classNames({
            "border border-gray-400 outline-0 focus:border-indigo-600 block w-full rounded-md bg-white px-3 py-1.5 text-base transitions duration-300 text-gray-900 placeholder:text-gray-400 sm:text-sm/6": true,
            "border border-red-500 focus:border-red-500": errors,
          })}
          {...props}
        />
        {touched && errors && <span className={classNames({ "text-xs text-red-500": errors })}>{errors}</span>}
      </div>
    </div>
  );
}
