"use client";

import { forwardRef, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes } from "react";

type FieldProps = {
  label: string;
  error?: string;
  hint?: string;
  id: string;
  children: ReactNode;
};

export function Field({ label, error, hint, id, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[14px] font-medium">
        {label}
        {hint && <span className="font-normal opacity-65"> {hint}</span>}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="field-error">
          {error}
        </p>
      )}
    </div>
  );
}

export const Input = forwardRef<HTMLInputElement, InputHTMLAttributes<HTMLInputElement>>(function Input(props, ref) {
  return <input ref={ref} className="field-input" {...props} />;
});

export const Select = forwardRef<HTMLSelectElement, SelectHTMLAttributes<HTMLSelectElement>>(function Select(props, ref) {
  return <select ref={ref} className="field-input" {...props} />;
});
