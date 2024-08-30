"use client";
import { useFormStatus } from "react-dom";

interface ButtonProps {
  text: string;
}

export default function Button({ text }: ButtonProps) {
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
