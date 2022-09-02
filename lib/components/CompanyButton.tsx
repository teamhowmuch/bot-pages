import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  emoji: string;
  active: boolean;
  color: "red" | "green" | "gray";
};

export function CompanyButton({ label, emoji, active, color, ...rest }: Props) {
  return (
    <button
      className={`p-4 rounded-md w-32 cursor-pointer transform transition duration-100 hover:scale-105 ${
        color === "green"
          ? "bg-green-400"
          : color === "gray"
          ? "bg-gray-300"
          : "bg-red-400"
      }`}
      {...rest}
    >
      <div className="text-center">
        <h3 className="text-4xl">{emoji}</h3>
        <strong>{label}</strong>
      </div>
    </button>
  );
}
