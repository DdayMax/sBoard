import { FC, ReactNode } from "react";

interface IFormFieldProps {
  label: string;
  children: ReactNode;
  errorMessage?: string;
}

const FormField: FC<IFormFieldProps> = ({ children, label, errorMessage }) => {
  return (
    <label className="flex flex-col space-y-1">
      <span className="text-sm font-medium text-gray-700">{label}</span>

      {children}

      {errorMessage && (
        <span className="text-xs text-red-500">{errorMessage}</span>
      )}
    </label>
  );
};

export default FormField;
