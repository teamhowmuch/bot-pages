import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  emoji: string;
  active: boolean;
  color: "red" | "green";
};

export function CompanyButton({ label, emoji, active, color, ...rest }: Props) {
  return (
    <button
      className={`p-4 bg-green-400 rounded-md w-32 cursor-pointer transform transition duration-100 hover:scale-105`}
      {...rest}
    >
      <div className="text-center">
        <h3 className="text-4xl">{emoji}</h3>
        <strong>{label}</strong>
      </div>
    </button>
  );
}
