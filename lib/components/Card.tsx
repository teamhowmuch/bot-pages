import classNames from "classnames";
import { HTMLAttributes } from "react";

export type Props = HTMLAttributes<HTMLDivElement> & {
  variant?: "action" | "default";
  size?: "sm" | "md" | "lg";
};

export function Card({ children, variant = "default", size = "md" }: Props) {
  return (
    <div
      className={classNames(
        variant === "default" ? "bg-white text-black" : null,
        variant === "action" ? "bg-blue-400 text-white" : null,
        'rounded-xl p-3'
      )}
    >
      {children}
    </div>
  );
}
