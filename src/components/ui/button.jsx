import React from "react"; // ✅ this line is required

export function Button({ children, className = '', ...props }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded-md border transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
