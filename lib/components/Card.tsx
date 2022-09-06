import { ReactElement } from "react";

type Props = {
  children?: ReactElement;
};

export function Card({ children }: Props) {
  return <div className="bg-white rounded p-3">{children}</div>;
}
