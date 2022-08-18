import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
  HTMLProps,
  ReactNode,
} from "react";

type Props = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
> & {
  variant?: "action";
  children?: ReactNode;
};

export function Button({
  variant = "action",
  children,
  type = "button",
  ...rest
}: Props) {
  const className = "p-3 bg-blue-500 text-white rounded";

  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
