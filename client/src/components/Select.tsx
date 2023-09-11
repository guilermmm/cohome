import { Category } from "@/services/routes/category";
import React from "react";

type SelectProps = {
  value: Category;
  elements: Category[] | null;
  allCategories?: Category[] | null;
  onChange: (value: any) => void;
  disabled?: boolean;
};

const Select = ({
  elements,
  allCategories = null,
  value,
  onChange,
  disabled = false,
}: SelectProps) => {
  return (
    <div>
      <select
        className="bg-gray-200 p-2 rounded-md text-slate-700 w-full disabled:text-black disabled:font-bold disabled:text-sm disabled:bg-gray-300 disabled:bg-opacity-30 disabled:text-opacity-80"
        onChange={onChange}
        value={value?.id}
        disabled={disabled}
      >
        <option value={""}>
          {allCategories?.find((category) => value.id === category.id)?.name}
        </option>
        {elements &&
          elements?.map((n) => (
            <option key={n.id} value={n.id}>
              {n.name}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
