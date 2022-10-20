import { HTMLAttributes, ReactNode } from "react";

type TextSpanProps = HTMLAttributes<HTMLSpanElement>;

export function TextSpan({ children }: TextSpanProps) {
  return <span>{children}</span>;
}
