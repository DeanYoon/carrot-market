import { InputHTMLAttributes } from "react";

interface InputProps {
  type: string;
  placeholder: string;
  required: boolean;
  errors?: string[];
  name: string;
}

export default function Input({
  errors = [],
  name,
  ...rest
}: InputProps & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="flex flex-col gap-2">
      <input
        name={name}
        className="bg-transparent rounded-md w-full h-10 focus:outline-none ring-1 ring-neutral-200
             focus:ring-2 focus:ring-orange-500 border-none transition "
        {...rest}
      />
      {errors.map((error, index) => (
        <div key={index} className="text-red-500">
          {error}
        </div>
      ))}
    </div>
  );
}
