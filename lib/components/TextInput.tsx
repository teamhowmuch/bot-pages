import { forwardRef, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export const TextInput = forwardRef<HTMLInputElement, Props>(
  (props: Props, ref) => {
    return <input {...props} ref={ref} className="p-2 bg-gray-100 rounded" />;
  }
);

TextInput.displayName = "TextInput";
