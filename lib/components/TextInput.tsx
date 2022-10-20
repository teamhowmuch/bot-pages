import classNames from "classnames";
import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  fullWidth?: boolean;
};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  ({ fullWidth = false, ...rest }: Props, ref) => {
    return (
      <input
        ref={ref}
        className={classNames("p-2 bg-gray-100 rounded", fullWidth && "w-full")}
        {...rest}
      />
    );
  }
);

TextInput.displayName = "TextInput";
