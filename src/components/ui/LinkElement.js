import classNames from "classnames";
import Link from "next/link";
import React from "react";

export default function LinkElement({ href, children, primary, secondary, link, primaryCircle, secondaryCircle, className, ...props }) {
  return (
    <Link
      href={href}
      className={classNames(
        "text-sm/6 font-semibold rounded transition duration-300 block",
        {
          "text-sm/6 font-semibold text-white bg-indigo-600 p-2 px-4 transition duration-300 hover:bg-indigo-800": primary,
          "text-sm/6 font-semibold text-white bg-indigo-600 p-2 px-4 rounded-full transition duration-300 hover:bg-indigo-800": primaryCircle,
          "text-indigo-600 border p-2 px-4 border-indigo-200 hover:bg-indigo-200": secondary,
          "text-indigo-600 border p-2 px-4 border-indigo-200 hover:bg-indigo-200 rounded-full": secondaryCircle,
          "text-indigo-600 p-0 hover:underline": link,
        },
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
