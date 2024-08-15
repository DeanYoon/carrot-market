interface FormButtonProps {
  loading: boolean;
  text: string;
}

export default function FormButton({ loading, text }: FormButtonProps) {
  return (
    <button
      disabled={loading}
      className="primary-btn disabled:bg-neutral-400 disabled:cursor-not-allowed disabled:text-gray-200"
    >
      {loading ? "Loading..." : text}
    </button>
  );
}
