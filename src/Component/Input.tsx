import React from "react";

export const Input = ({ type, placeholder, onChange, name, value, error }) => {
  return (
    <div className="form">
      <input
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        name={name}
        value={value}
      />
      <p>{error}</p>
    </div>
  );
};
