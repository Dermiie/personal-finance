import type { InputHTMLAttributes } from "react";
import type { UseFormRegisterReturn } from "react-hook-form";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  registration: UseFormRegisterReturn;
}

export default function Input({
  label,
  registration,
  className,

  ...props
}: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      {label && <label>{label}</label>}

      <input
        {...registration}
        {...props}
        className={`rounded-md border border-gray-800 px-3 py-2 ${className}`}
      />
    </div>
  );
}
