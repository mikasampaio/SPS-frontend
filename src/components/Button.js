export default function Button({ label, className, fullSize, ...props }) {
  return (
    <button
      className={`p-2 bg-cyan-600 text-white font-semibold ${className} ${
        fullSize || "w-full"
      }`}
      {...props}
    >
      {label}
    </button>
  );
}
