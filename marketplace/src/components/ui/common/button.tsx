import React from "react";

export default function Button({
                                 children,
                                 hoverable = true,
                                 variant = 'primary',
                                 className = "",
                                 ...rest
                               }) {
  const variants = {
    primary: `text-white bg-indigo-600 ${hoverable ? "hover:bg-indigo-700" : ""}`,
    purple: `text-white bg-purple-600 ${hoverable ? "hover:bg-purple-700" : ""}`,
    red: `text-white bg-red-600 ${hoverable ? "hover:bg-red-700" : ""}`,
    lightBlue: `text-indigo-700 bg-indigo-100 ${hoverable ? "hover:bg-indigo-200" : ""}`,
  }

  return (
    <button
      {...rest}
      className={`disabled:opacity-50 px-8 py-3 border rounded-md text-base font-medium ${className} ${variants[variant]}`}>
      {children}
    </button>
  )
}
