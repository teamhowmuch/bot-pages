import { HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement> & {};

export function Container({ children }: Props) {
  return (
    <div className="w-full">
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  );
}
