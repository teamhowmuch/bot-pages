import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLProps,
  ReactNode,
} from "react";
import classnames from "classnames";

type Props = {
  variant?: "action";
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
  type?: "button" | "a";
};

export function Button({
  variant = "action",
  size = "md",
  children,
  type = "button",
  ...rest
}: Props) {
  const className = classnames(
    "bg-blue-500 text-white rounded hover:opacity-90",
    {
      "p-2": size === "sm",
      "p-3": size === "md",
      "p-5": size === "lg",
    }
  );

  let Element: "button" | "a" = type === "button" ? "button" : "a";

  return (
    <Element className={className} {...rest}>
      {children}
    </Element>
  );
}
