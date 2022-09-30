import classNames from "classnames";
import { ButtonHTMLAttributes } from "react";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  emoji: string;
  active: boolean;
  color: "red" | "green" | "gray" | "yellow";
};

export function CompanyButton({ label, emoji, active, color, ...rest }: Props) {
  return (
    <div className="">
      <button
        className={classNames(
          `p-2 md:p-4 rounded-md w-28 h-28 cursor-pointer transform transition duration-100 hover:scale-105`,
          {
            "bg-green-400": color === "green",
            "bg-yellow-400": color === "yellow",
            "bg-red-400": color === "red",
            "bg-gray-300": color === "gray",
          }
        )}
        {...rest}
      >
        <div className="text-center">
          <h3 className="text-4xl">{emoji}</h3>
          <strong>{label}</strong>
        </div>
      </button>
      <div
        className={`m-auto rounded w-1/4 h-1 mt-3  ${
          active ? "bg-slate-300" : ""
        }`}
      ></div>
    </div>
  );
}
