import React from "react";

type InputProps = {
  label: string;
  value: any;
  onChange: (value: any) => void;
  disabled?: boolean;
  type?: "text" | "password" | "date" | "number";
};

const Input = ({
  label,
  value,
  type = "text",
  onChange,
  disabled = false,
}: InputProps) => {
  return (
    <div>
      <label className="text-gray-600 font-bold text-l text-sm">
        {label}
        <input
          className="bg-gray-200 p-2 rounded-md text-slate-700 w-full disabled:bg-opacity-30 disabled:text-opacity-80"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
        />
      </label>
    </div>
  );
};

export default Input;
