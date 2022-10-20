import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { AuthContext } from "../providers/AuthProvider";

type UseAuthOptions = {
  redirectTo?: string;
  redirect?: boolean;
  inverseRedirectTo?: string;
};

export function useAuth(options?: UseAuthOptions) {
  const router = useRouter();
  const {
    isLoggedIn,
    requestOtp,
    login,
    logout,
    user,
    loading,
    loadingInitial,
    reloadProfile,
  } = useContext(AuthContext);

  useEffect(() => {
    if (typeof window === "undefined" || loadingInitial) {
      return;
    }

    if (isLoggedIn && options?.inverseRedirectTo) {
      router.replace(options.inverseRedirectTo);
    } else if (!isLoggedIn) {
      if (options?.redirectTo) {
        router.replace(options.redirectTo);
      } else if (options?.redirect) {
        router.replace("/auth/login");
      }
    }
  }, [loadingInitial, isLoggedIn, options, router]);

  return {
    isLoggedIn,
    requestOtp,
    login,
    logout,
    user,
    loading,
    loadingInitial,
    reloadProfile,
  };
}
