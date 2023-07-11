import classNames from "classnames";
import { HTMLProps } from "react";

type Props = HTMLProps<HTMLDivElement> & {};

export function Container({ className, children }: Props) {
  return (
    <div className="w-full">
      <div className={classNames("max-w-screen-lg mx-auto", className)}>
        {children}
      </div>
    </div>
  );
}
