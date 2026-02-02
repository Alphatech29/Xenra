import React from "react";

export default function Input({
  type = "text",
  placeholder,
  value,
  onChange,
  className = "",
  leftIcon,
  rightIcon,
  status,
  errorMessage,
  ...props
}) {
  const borderStyles = {
    error: "border-red-500 focus:ring-red-500",
    success: "border-green-500 focus:ring-green-500",
    default: "border-primary-100 focus:ring-primary-100",
  };

  return (
    <div className="w-full">
      <div className="relative w-full">
        {/* LEFT ICON */}
        {leftIcon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-silver-500">
            {leftIcon}
          </div>
        )}

        <input
          type={type}
          placeholder={placeholder}
          value={value ?? ""}
          onChange={onChange}
          className={`
            w-full text-silver-800 rounded-lg py-3 border
            focus:outline-none focus:ring-2
            ${borderStyles[status] || borderStyles.default}
            ${leftIcon ? "pl-12" : "pl-4"}
            ${rightIcon ? "pr-12" : "pr-4"}
            ${className}
          `}
          {...props}
        />

        {/* RIGHT ICON */}
        {rightIcon && (
          <div className="absolute right-4 top-1/2 -translate-y-1/2 text-silver-700">
            {rightIcon}
          </div>
        )}
      </div>

      {/* ERROR MESSAGE */}
      {status === "error" && errorMessage && (
        <p className="mt-1 text-sm text-red-500">{errorMessage}</p>
      )}
    </div>
  );
}
