import React from "react";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  placeholder = "",
  error = null,
  disabled = false,
  required = false,
  className = "",
  id,
}) => {
  const baseStyles =
    "w-full px-4 py-2 border rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2";

  const stateStyles = error
    ? "border-red-500 focus:border-red-500 focus:ring-red-200"
    : "border-gray-300 focus:border-blue-500 focus:ring-blue-200";

  const disabledStyles = disabled
    ? "bg-gray-100 cursor-not-allowed"
    : "bg-white";

  const inputClasses = `${baseStyles} ${stateStyles} ${disabledStyles} ${className}`;

  return (
    <input
      type={type}
      id={id || name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      className={inputClasses}
    />
  );
};
export default Input;