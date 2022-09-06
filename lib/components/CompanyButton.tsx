import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  emoji: string;
  active: boolean;
  color: "red" | "green" | "gray";
};

export function CompanyButton({ label, emoji, active, color, ...rest }: Props) {
  return (
    <div className="">
      <button
        className={`p-4 rounded-md w-32 h-32 cursor-pointer transform transition duration-100 hover:scale-105 ${
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
      <div
        className={`m-auto rounded w-1/2 h-1 mt-2  ${
          active ? "bg-slate-300" : ""
        }`}
      ></div>
    </div>
  );
}
