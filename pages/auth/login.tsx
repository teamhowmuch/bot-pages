import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Button,
  Card,
  Container,
  Navbar,
  TextInput,
  Title,
} from "../../lib/components";
import { useAuth } from "../../lib/hooks/auth";
import { User } from "../../lib/models";

type Props = {};

type EmailInput = {
  email: string;
};

type OtpInput = {
  otp: string;
};

const Login: NextPage<Props> = () => {
  const router = useRouter();
  const { isLoggedIn, requestOtp, login } = useAuth({
    inverseRedirectTo: decodeURIComponent(router.query.redirect as string) || "/home",
  });

  const [emailSubmitted, setEmailSubmitted] = useState<string | null>(null);
  const [emailWorking, setEmailWorking] = useState(false);
  const [emailError, setEmailError] = useState<any>();
  const [otpSubmitted, setOtpSubmitted] = useState(false);
  const [otpWorking, setOtpWorking] = useState(false);
  const [otpError, setOtpError] = useState<any>();

  const { register: registerEmail, handleSubmit: handleSubmitEmail } =
    useForm<EmailInput>();
  const { register: registerOtp, handleSubmit: handleSubmitOtp } =
    useForm<OtpInput>();

  const onSubmitEmail: SubmitHandler<EmailInput> = async ({ email }) => {
    setEmailWorking(true);
    try {
      await requestOtp(email);
      console.log("success");
      setEmailSubmitted(email);
    } catch (error) {
      console.log("error");
      console.error(error);
      setEmailError(true);
    }
    console.log("done");

    setEmailWorking(false);
  };

  const onSubmitOtp: SubmitHandler<OtpInput> = async ({ otp }) => {
    setOtpWorking(true);

    if (!emailSubmitted) {
      throw new Error("ERROR NO EMAIL!");
    }

    try {
      await login(emailSubmitted, otp);
      console.log("logged in!");
    } catch (error) {
      console.log("error");
      console.error(error);
      setEmailError(true);
    }
    console.log("done");

    setEmailWorking(false);
  };

  function renderEmailForm() {
    return (
      <form onSubmit={handleSubmitEmail(onSubmitEmail)}>
        <TextInput
          placeholder="example@email.com"
          type="email"
          autoFocus
          {...registerEmail("email")}
        />
        <Button type="submit" working={emailWorking}>
          Next
        </Button>
      </form>
    );
  }

  function renderOtpForm() {
    return (
      <div>
        <Button
          onClick={() => {
            setEmailSubmitted(null);
          }}
          iconLeft={faArrowLeft}
          variant="neutral"
          mode="default"
        >
          Back
        </Button>
        <form onSubmit={handleSubmitOtp(onSubmitOtp)}>
          <Title variant="h3">Enter the code I sent you</Title>
          <TextInput
            placeholder="12345"
            type="text"
            autoFocus
            maxLength={5}
            minLength={5}
            {...registerOtp("otp")}
          />
          <Button type="submit">Next</Button>
        </form>
      </div>
    );
  }

  function renderMain() {
    return (
      <div>
        <Head>
          <title>Grobot</title>
          <meta name="description" content="Some meta" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>
          <Container>
            <div className="h-screen flex justify-center items-center p-3">
              <Card className="w-96">
                <Title>Login</Title>
                <p>is logged in? {isLoggedIn ? "yes" : "no"}</p>
                {emailSubmitted ? renderOtpForm() : renderEmailForm()}
              </Card>
            </div>
          </Container>
        </main>
      </div>
    );
  }

  return renderMain();
};

export default Login;
