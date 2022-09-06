import { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {};

export function TextInput(props: Props) {
  return <input {...props} />;
}
