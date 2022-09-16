import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export function Card({ children }: Props) {
  return <div className="bg-white rounded-xl p-3">{children}</div>;
}
