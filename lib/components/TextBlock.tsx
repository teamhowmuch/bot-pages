import { HTMLAttributes, ReactNode } from "react";

type TextBlockProps = HTMLAttributes<HTMLParagraphElement> & {};

export function TextBlock({ children, ...restProps }: TextBlockProps) {
  return <p {...restProps}>{children}</p>;
}
