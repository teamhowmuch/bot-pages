import { push } from "@socialgouv/matomo-next";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { signupNovemberReminder } from "../api/sendEmail";
import { Button } from "./Button";
import { Icon } from "./Icon";
import { TextInput } from "./TextInput";

type Props = {
  emailTemplate: string;
  prefill?: string;
  buttonLabel?: string;
  placeholder?: string;
};

type FormInputs = {
  email: string;
};

export function SendEmail({
  placeholder = "your@email.com",
  prefill,
  buttonLabel = "Send",
  emailTemplate,
}: Props) {
  const [signupLoading, setSignupLoading] = useState(false);
  const [signupComplete, setSignupComplete] = useState(false);
  const [signupError, setSignupError] = useState<any>(null);

  const {
    register: register,
    handleSubmit: handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormInputs>();

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    try {

      push([
        "trackEvent",
        "Results",
        "Signup health insurance november"
      ])

      setSignupLoading(true);
      await signupNovemberReminder(data.email);
      setSignupLoading(false);
      setSignupComplete(true);
    } catch (error) {
      setSignupError(error);
    }
  };

  useEffect(() => {
    if (prefill) {
      setValue("email", prefill);
    }
  }, [setValue, prefill]);
  // ------
  // rendering

  function renderSignup() {
    return (
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-1">
          <div>
            <TextInput
              type="email"
              placeholder={placeholder}
              {...register("email")}
            />
          </div>
          <div>
            <Button type="submit" size="sm" working={signupLoading}>
              {buttonLabel}
            </Button>
          </div>
        </div>
      </form>
    );
  }

  function renderSignupComplete() {
    return <h6 className="font-bold">Signup successful ✅</h6>;
  }

  function renderSignupError() {
    return (
      <h6 className="font-bold">
        There was an error signing you up. Sorry! Please try again later.
      </h6>
    );
  }

  if (signupError) {
    return renderSignupError();
  } else if (signupComplete) {
    return renderSignupComplete();
  } else {
    return renderSignup();
  }
}
