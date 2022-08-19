import { HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement> & {};

export function Container({ children }: Props) {
  return (
    <div style={{ backgroundColor: "#f0f0ed" }}>
      <div className="max-w-screen-lg mx-auto">{children}</div>
    </div>
  );
}
