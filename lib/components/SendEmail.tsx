import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "./Button";
import { TextInput } from "./TextInput";

type Props = {
  emailTemplate: string;
  placeholder?: string;
};

type FormInputs = {
  email: string;
};

export function SendEmail({
  placeholder = "your@email.com",
  emailTemplate,
}: Props) {
  const {
    register: register,
    handleSubmit: handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>();

  function sendEmail() {}

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    console.log("send email");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <TextInput type="email" placeholder={placeholder} className="p-1" />
      </div>
      <div>
        <Button type="submit" size="sm">
          Send
        </Button>
      </div>
    </form>
  );
}
