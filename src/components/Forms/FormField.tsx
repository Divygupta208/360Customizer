import React from "react";
import type { FieldError, UseFormRegisterReturn } from "react-hook-form";

type FieldType = "input" | "textarea" | "select";

interface Props {
  label: string;
  type?: string;
  inputType?: FieldType;
  options?: string[];
  registration: UseFormRegisterReturn;
  error?: FieldError;
}

const FormField: React.FC<Props> = ({
  label,
  type = "text",
  inputType = "input",
  options = [],
  registration,
  error,
}) => {
  return (
    <div className="flex flex-col">
      <label className="font-medium">{label}</label>

      {inputType === "textarea" && (
        <textarea
          {...registration}
          rows={4}
          className="w-full border border-gray-300 py-2 rounded px-4  resize-none focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      {inputType === "select" && (
        <select
          {...registration}
          className="w-full border border-gray-300 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-black"
        >
          <option value="">Choose Budget</option>
          {options.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}

      {inputType === "input" && (
        <input
          type={type}
          {...registration}
          className="w-full border border-gray-300 rounded px-4 focus:outline-none focus:ring-2 focus:ring-black"
        />
      )}

      {error && (
        <p className="text-red-500 text-sm font-bold">{error.message}</p>
      )}
    </div>
  );
};

export default FormField;
