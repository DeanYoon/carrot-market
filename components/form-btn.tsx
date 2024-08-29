"use client";
import { useFormStatus } from "react-dom";

interface FormButtonProps {
  text: string;
}

export default function FormButton({ text }: FormButtonProps) {
  const { pending } = useFormStatus();

  return (
    <button
      disabled={pending}
      className="primary-btn disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-gray-200"
    >
      {pending ? "Loading..." : text}
    </button>
  );
}
