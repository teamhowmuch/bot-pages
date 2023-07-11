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
import { User, UserValue } from "../../lib/models";
import { Slider } from "primereact/slider";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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

type UserValueInput = {
  equality_score: number;
  fair_pay_score: number;
  climate_score: number;
  anti_weapons_score: number;
  animal_score: number;
  nature_score: number;
  anti_tax_avoidance_score: number;
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

  const [userValues, setUserValues] = useState<UserValueInput>({
    equality_score: 0,
    fair_pay_score: 0,
    climate_score: 0,
    anti_weapons_score: 0,
    animal_score: 0,
    nature_score: 0,
    anti_tax_avoidance_score: 0,
  });

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
    if (user) {
      setUserValues({
        equality_score: user.equality_score,
        fair_pay_score: user.fair_pay_score,
        climate_score: user.climate_score,
        anti_weapons_score: user.anti_weapons_score,
        animal_score: user.animal_score,
        nature_score: user.nature_score,
        anti_tax_avoidance_score: user.anti_tax_avoidance_score,
      });
    }
  }, [user, setUserValues]);

  useEffect(() => {
    if (saveProfileSuccess) {
      setTimeout(() => {
        setSaveProfileSuccess(false);
      }, 3000);
    }
  }, [saveProfileSuccess]);

  // ------
  // event handles
  const onChangeUserValue = async (
    valueLabel: keyof UserValueInput,
    value: number | number[]
  ) => {
    if (Array.isArray(value)) {
      return;
    }

    setUserValues({ ...userValues, [valueLabel]: value });
    await updateProfile(userValues);
  };

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
      setValueOtp("otp", "");
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
            className="flex justify-center items-center max-h-60 aspect-square"
          >
            <h1 className="uppercase text-9xl">{user?.email.slice(0, 1)}</h1>
          </Card>
        </div>
        <div className="col-span-12 md:col-span-9">
          <Card className="mb-3">
            <Title variant="h3" className="pb-6">
              Your values
            </Title>
            <div className="mb-3  max-w-xs">
              <Title variant="h2" className="mb-2">
                Climate
              </Title>
              <Slider
                step={1}
                min={1}
                max={5}
                value={userValues.climate_score}
                onChange={(e) => {
                  onChangeUserValue("climate_score", e.value);
                }}
              />
            </div>
            <div className="mb-3 max-w-xs">
              <Title variant="h2" className="mb-2">
                Biodiversity
              </Title>
              <Slider
                step={1}
                min={1}
                max={5}
                value={userValues.nature_score}
                onChange={(e) => {
                  onChangeUserValue("nature_score", e.value);
                }}
              />
            </div>
            <div className="mb-3  max-w-xs">
              <Title variant="h2" className="mb-2">
                Animal pay
              </Title>
              <Slider
                step={1}
                min={1}
                max={5}
                value={userValues.animal_score}
                onChange={(e) => {
                  onChangeUserValue("animal_score", e.value);
                }}
              />
            </div>
          </Card>
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
