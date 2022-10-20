import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { ApiError } from "../../lib/api/api";
import { Navbar } from "../../lib/components";
import { useAuth } from "../../lib/hooks";

const Me: NextPage = () => {
  const router = useRouter();
  const { login, isLoggedIn, loadingInitial } = useAuth();
  const [redirAttempted, setRedirAttempted] = useState(false);

  useEffect(() => {
    // If url contains email and otp, login
    async function redirect() {
      if (!router.query.id || loadingInitial) {
        return;
      }

      setRedirAttempted(true);

      if (isLoggedIn) {
        console.log("is logged in redireect to", `/chats/${router.query.id}`);
        router.replace(`/chats/${router.query.id}`);
      } else if (router.query.email && router.query.otp) {
        console.log(
          "has email and otp, try login",
          router.query.email,
          router.query.otp
        );
        try {
          const res = await login(
            router.query.email as string,
            router.query.otp as string
          );

          if (res) {
            router.replace(`/chats/${router.query.id}`);
          } else {
            router.replace({
              pathname: "/auth/login",
              query: {
                redirect: encodeURIComponent(`/chats/${router.query.id}`),
              },
            });
          }
        } catch (error) {
          router.replace("/500");
        }
      } else {
        console.log("not logged in, no email otp, redir to", "/auth/login");
        router.replace({
          pathname: `/chats/${router.query.id}`,
        });
      }
    }

    if (!redirAttempted) {
      redirect();
    }
  }, [router, login, redirAttempted, isLoggedIn, loadingInitial]);

  return (
    <div>
      <Head>
        <title>Gretabot 2000 result</title>
        <meta name="description" content="Some meta" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        <h1>Loading</h1>
      </main>
    </div>
  );
};
export default Me;
