import {
  faEnvelope,
  faEnvelopeOpen,
} from "@fortawesome/free-regular-svg-icons";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateProfile, verifyChangeEmail } from "../../lib/api/profile";
import {
  Button,
  Card,
  Container,
  Icon,
  Navbar,
  TextBlock,
  TextInput,
  Title,
} from "../../lib/components";
import { useAuth } from "../../lib/hooks";
import { User } from "../../lib/models";

type Props = {
  user: User;
};

type ProfileInput = {
  email: string;
  name: string;
};

type OtpInput = {
  otp: string;
};

const Profile: NextPage<Props> = () => {
  const { user, loadingInitial, logout, reloadProfile } = useAuth({
    redirect: true,
  });

  const [changeEmailRequest, setChangeEmailRequest] = useState<string | null>(
    null
  );
  const [saveProfileLoading, setSaveProfileLoading] = useState(false);
  const [saveProfileSuccess, setSaveProfileSuccess] = useState(false);

  const [saveProfileError, setSaveProfileError] = useState<null | any>(null);
  const [saveOtpLoading, setSaveOtpLoading] = useState(false);
  const [saveOtpError, setSaveOtpError] = useState<null | any>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileInput>();

  const {
    register: registerOtp,
    handleSubmit: handleSubmitOtp,
    setValue: setValueOtp,
    formState: { errors: otpErrors },
  } = useForm<OtpInput>();

  // -----
  // Effects
  useEffect(() => {
    if (user?.email) {
      setValue("email", user.email);
    }
    if (user?.name) {
      setValue("name", user.name);
    }
  }, [user, setValue]);

  useEffect(() => {
    if (saveProfileSuccess) {
      setTimeout(() => {
        setSaveProfileSuccess(false);
      }, 3000);
    }
  }, [saveProfileSuccess]);

  // ------
  // event handles
  const onSubmitProfile: SubmitHandler<ProfileInput> = async (data) => {
    try {
      setSaveProfileLoading(true);
      const res = await updateProfile(data);
      const profile = await reloadProfile();
      if (data.email.toLowerCase() !== user?.email.toLowerCase()) {
        setChangeEmailRequest(data.email.toLowerCase());
      }
    } catch (error) {
      setSaveProfileError(error);
    } finally {
      setSaveProfileLoading(false);
    }
  };

  const onSubmitOtp: SubmitHandler<OtpInput> = async (data) => {
    try {
      setSaveOtpLoading(true);
      await verifyChangeEmail(data);
      await reloadProfile();
      setValueOtp("");
      setSaveOtpError(null);
      setChangeEmailRequest(null);
    } catch (error) {
      setSaveOtpError(error);
    } finally {
      setSaveOtpLoading(false);
    }
  };

  function onClickLogout() {
    logout();
  }

  function renderLoading() {
    return <div>Loading</div>;
  }

  function renderOtpForm() {
    return (
      <form key={2} onSubmit={handleSubmitOtp(onSubmitOtp)}>
        <div className="text-left grid gap-3">
          <div>
            <Title variant="h3">
              Please enter the code I just sent to {changeEmailRequest}
            </Title>
            <TextInput
              id="otp"
              minLength={5}
              maxLength={5}
              type="text"
              placeholder="01234"
              inputMode="numeric"
              fullWidth
              {...registerOtp("otp")}
            />
            {saveOtpError && (
              <TextBlock className="text-red-500 font-bold mt-3">
                {saveOtpError?.error?.message || "Something went wrong"}
              </TextBlock>
            )}
          </div>
          <div>
            <Button type="submit" mode="solid" working={saveOtpLoading}>
              Save
            </Button>
          </div>
        </div>
      </form>
    );
  }

  function renderSettingsForm() {
    return (
      <form key={1} onSubmit={handleSubmit(onSubmitProfile)}>
        <div className="text-left grid gap-3">
          <div>
            <Title variant="h3">Email</Title>
            <TextInput id="email" fullWidth {...register("email")} />
          </div>
          <div>
            <Title variant="h3">Name</Title>
            <TextInput id="name" fullWidth {...register("name")} />
          </div>

          <div>
            <Button type="submit" mode="solid" working={saveProfileLoading}>
              Save
            </Button>
            {saveProfileError && (
              <TextBlock>
                Error saving profile {saveProfileError?.error?.message}
              </TextBlock>
            )}
          </div>
        </div>
      </form>
    );
  }

  function renderProfile() {
    return (
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mx-3">
        <div className="col-span-12 md:col-span-3">
          <Card
            variant="action"
            className="h-full flex justify-center items-center w-full"
          >
            <h1 className="uppercase text-9xl">{user?.email.slice(0, 1)}</h1>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Card>
            <Title variant="h3" className="pb-6">
              Settings
            </Title>
            {changeEmailRequest ? renderOtpForm() : renderSettingsForm()}
          </Card>
        </div>
      </div>
    );
  }

  function renderMain() {
    if (typeof "window" === "undefined" || loadingInitial) {
      return renderLoading();
    } else {
      return renderProfile();
    }
  }

  return (
    <div className="bg-yellow-300 min-h-screen">
      <Head>
        <title>Grobot</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main>
        <Container>
          <div className="py-6">{renderMain()}</div>
        </Container>
      </main>
    </div>
  );
};

export default Profile;
