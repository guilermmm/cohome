import React from "react";

type TextAreaProps = {
  label: string;
  value: any;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  disabled?: boolean;
};

const TextArea = ({
  label,
  value,
  onChange,
  disabled = false,
}: TextAreaProps) => {
  return (
    <div>
      <label className="text-gray-600 font-bold text-l text-sm">
        {label}
        <textarea
          className="bg-gray-200 p-2 h-fit rounded-md text-slate-700 w-full disabled:bg-opacity-30 disabled:text-opacity-80 row-auto flex-wrap resize-none"
          value={value}
          onChange={onChange}
          disabled={disabled}
          maxLength={1000}
        />
      </label>
    </div>
  );
};

export default TextArea;
