import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { createChat } from "../lib/api/createChat";
import { login } from "../lib/api/login";
import {
  banks,
  healthSorted,
  travelSorted,
} from "../lib/botRelated/companyNames";
import { USER_VALUES } from "../lib/models";

type AuthInputs = {
  email: string;
  password: string;
};

type Inputs = {
  auth_token: string;

  travel_insurance: string;
  health_insurance: string;
  banks: string;

  biodiversity: number;
  climate: number;
  fair_pay: number;
  animal_welfare: number;
  tax_evasion_sucks: number;
  weapons_are_ok: number;
  gender_equality: number;

  most_important: string;
};

const SecretTestPage: NextPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    watch,
    formState: { errors: errorsLogin },
  } = useForm<AuthInputs>();

  const onSubmitLogin: SubmitHandler<AuthInputs> = async (data) => {
    const res = await login(data.email, data.password);
    if (res.status === 404) {
      alert(`error loggin in ${JSON.stringify(res)}`);
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await createChat({
      bot_version: "4.0.0",

      chat_id: "123",
      email: "daanaerts@gmail.com",
      name: "Daan Aerts",

      companies: {
        travel_insurance: data.travel_insurance,
        health_insurance: data.health_insurance,
        banks: [data.banks],
      },
      values: {
        biodiversity: data.biodiversity,
        climate: data.climate,
        fair_pay: data.fair_pay,
        animal_welfare: data.animal_welfare,
        tax_evasion_sucks: data.tax_evasion_sucks,
        weapons_are_ok: data.weapons_are_ok,
        gender_equality: data.gender_equality,
      },

      most_important: data.most_important,
    });

    if (res.id) {
      Router.push(`/me/${res.id}`);
    } else {
      alert(JSON.stringify(res));
    }
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    if (typeof window) {
      if (localStorage.getItem("jwt")) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Secret test page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <form onSubmit={handleSubmitLogin(onSubmitLogin)}>
          <h1>Log in</h1>
          <p>
            It seems you are <strong>{isLoggedIn ? "already" : "not"}</strong>{" "}
            logged in.
          </p>
          <div>
            <label>Email</label>
            <input
              type="email"
              {...registerLogin("email")}
              defaultValue="bot@howmuch.how"
            />
          </div>
          <div>
            <label>Password</label>
            <input type="password" {...registerLogin("password")} />
          </div>
          <input type="submit" />
        </form>

        <form onSubmit={handleSubmit(onSubmit)}>
          <h1>Companies</h1>
          <div>
            <label>Travel insurance</label>
            <select {...register("travel_insurance")}>
              {travelSorted.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Health insurance</label>
            <select {...register("health_insurance")}>
              {healthSorted.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Banks</label>
            <select {...register("banks")}>
              {banks.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <h1>Values</h1>
          <div>
            <label>Q1 Oil and Gas</label>
            <input
              type="number"
              defaultValue={3}
              {...register("climate")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q2 CEO pay</label>
            <input
              type="number"
              defaultValue={3}
              {...register("fair_pay")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q3 Industrial Animal farming</label>
            <input
              type="number"
              defaultValue={3}
              {...register("animal_welfare")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q4 Tax evasion</label>
            <input
              type="number"
              defaultValue={3}
              {...register("tax_evasion_sucks")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q5 Weapons</label>
            <input
              type="number"
              defaultValue={3}
              {...register("weapons_are_ok")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q6 Gender equality</label>
            <input
              type="number"
              defaultValue={3}
              {...register("gender_equality")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Q7 Biodiversity</label>
            <input
              type="number"
              defaultValue={3}
              {...register("biodiversity")}
              min={1}
              max={5}
            />
          </div>

          <div>
            <label>Most important</label>
            <select {...register("most_important")}>
              {USER_VALUES.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </div>

          <input type="submit" />
        </form>
      </main>
    </div>
  );
};

export default SecretTestPage;
