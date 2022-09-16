import classNames from "classnames";
import { ReactNode } from "react";

type Props = {
  variant?: "h1" | "h2" | "h3";
  children: ReactNode;
  align?: "center" | "left" | "right";
};

export function Title({ variant = "h1", children, align }: Props) {
  const Component = variant;

  return (
    <Component
      className={classNames([`text-${align}`], {
        "text-3xl": variant === "h1",
        "text-2xl": variant === "h2",
        "text-l": variant === "h3",
      })}
    >
      {children}
    </Component>
  );
}
