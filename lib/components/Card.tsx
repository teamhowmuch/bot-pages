import classNames from "classnames";
import { HTMLAttributes } from "react";

export type CardVariant =
  | "action"
  | "default"
  | "gray"
  | "warning"
  | "danger"
  | "orange"
  | "success"
  | "successDark";

export type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: CardVariant;
  size?: "sm" | "md" | "lg";
};

export function Card({
  children,
  variant = "default",
  className,
  size = "md",
  ...rest
}: Props) {
  return (
    <div
      className={classNames(
        variant === "gray" ? "bg-gray-100 text-black" : null,
        variant === "default" ? "bg-white text-black" : null,
        variant === "action" ? "bg-blue-400 text-white" : null,
        variant === "danger" ? "bg-red-400 text-white" : null,
        variant === "orange" ? "bg-orange-400 text-white" : null,
        variant === "warning" ? "bg-yellow-400 text-white" : null,
        variant === "success" ? "bg-green-400 text-white" : null,
        variant === "successDark" ? "bg-green-700 text-white" : null,
        "rounded-xl p-3",
        className
      )}
      {...rest}
    >
      {children}
    </div>
  );
}
