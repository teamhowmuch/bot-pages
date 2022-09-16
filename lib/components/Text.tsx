import { ReactNode } from "react";

type Props = { children: ReactNode };

export function Text({ children }: Props) {
  return <span>{children}</span>;
}
