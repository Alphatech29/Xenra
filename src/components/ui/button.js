import React from "react";

export default function Button({
  children,
  type = "button",
  disabled = false,
  className = "",
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        w-full bg-(--color-primary) text-white py-3
        rounded-lg font-semibold transition
        hover:opacity-90
        focus:outline-none
        disabled:opacity-60 disabled:cursor-not-allowed
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
}
