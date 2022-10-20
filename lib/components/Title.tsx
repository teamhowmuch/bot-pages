import classNames from "classnames";
import { HTMLAttributes, ReactNode } from "react";

type Props = HTMLAttributes<HTMLHeadingElement> & {
  variant?: "h1" | "h2" | "h3" | "h6";
  children: ReactNode;
  align?: "center" | "left" | "right";
  color?: "default" | "inverse" | "gray";
  uppercase?: boolean;
};

export function Title({
  variant = "h1",
  color = "default",
  children,
  uppercase,
  align,
  className,
}: Props) {
  const Component = variant;

  return (
    <Component
      className={classNames(
        [`text-${align}`],
        variant === "h1" && "text-3xl font-bold",
        variant === "h2" && "text-2xl font-bold",
        variant === "h3" && "text-lg font-bold",
        {
          "text-gray-400": color === "gray",
          uppercase: uppercase,
        },
        className
      )}
    >
      {children}
    </Component>
  );
}
