import {
  ButtonHTMLAttributes,
  ComponentProps,
  DetailedHTMLProps,
  HTMLProps,
  ReactNode,
} from "react";
import classnames from "classnames";
import { Icon } from "./Icon";
import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "action" | "neutral" | "passthrough";
  mode?: "outlined" | "solid" | "default";
  iconLeft?: IconDefinition;
  size?: "sm" | "md" | "lg";
  children?: ReactNode;
};

export function Button({
  variant = "action",
  mode = "solid",
  size = "md",
  iconLeft,
  children,
  type = "button",
  ...rest
}: Props) {
  const className = classnames(
    "rounded hover:opacity-90 flex gap-1 items-center",
    mode === "solid" && variant === "action" ? "bg-blue-500 text-white" : null,
    mode === "solid" && variant === "neutral" ? "bg-blue-500 text-white" : null,

    mode === "outlined" && variant === "action"
      ? "bg-transparent border-2 border-blue-500 text-blue-500"
      : null,
    mode === "outlined" && variant === "neutral"
      ? "bg-transparent border-2 border-black text-black"
      : null,

    mode === "default" && variant === "action"
      ? "bg-transparent text-black"
      : null,
    mode === "default" && variant === "neutral"
      ? "bg-transparent text-black"
      : null,
    {
      "p-2": size === "sm",
      "p-3": size === "md",
      "p-5": size === "lg",
    }
  );

  return (
    <button className={className} {...rest}>
      {iconLeft && <Icon icon={iconLeft} />}
      {children}
    </button>
  );
}
