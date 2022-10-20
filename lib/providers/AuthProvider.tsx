import { ApiError } from "next/dist/server/api-utils";
import { createContext, useEffect, useMemo, useState } from "react";
import {
  login as loginApi,
  requestOtp as requestOtpApi,
  getProfile as apiGetProfile,
} from "../api/login";
import { JWT_KEY } from "../contants";
import { User } from "../models";

type AuthContext = {
  isLoggedIn: boolean;
  user: User | null;
  error?: any;
  loading: boolean;
  loadingInitial: boolean;
  requestOtp: (email: string) => Promise<void>;
  login: (email: string, otp: string) => Promise<boolean>;
  logout: () => void;
  reloadProfile: () => Promise<void>;
};

export const AuthContext = createContext<AuthContext>({} as AuthContext);

export const AuthProvider = ({ ...props }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  async function requestOtp(email: string) {
    return requestOtpApi(email);
  }

  async function login(email: string, otp: string): Promise<boolean> {
    setLoading(true);
    try {
      const res = await loginApi(email, otp);
      localStorage.setItem(JWT_KEY, res.access_token);
      setIsLoggedIn(true);
      setUser(res.user);
      return true;
    } catch (error) {
      if (error instanceof ApiError && error.statusCode === 401) {
        setError(error.statusCode);
        return false;
      } else {
        setError(error);
        return false;
      }
    } finally {
      setLoading(false);
      return false;
    }
  }

  function logout() {
    localStorage.removeItem(JWT_KEY);
    setIsLoggedIn(false);
    setUser(null);
  }

  async function reloadProfile() {
    const res = await apiGetProfile();
    setUser(res);
  }

  const memoedValue = useMemo(
    () => ({
      user,
      error,
      isLoggedIn,
      requestOtp,
      loading,
      loadingInitial,
      login,
      logout,
      reloadProfile,
    }),
    [user, isLoggedIn, error, loading, loadingInitial]
  );

  useEffect(() => {
    async function loginFromToken() {
      try {
        setLoadingInitial(true);
        const res = await apiGetProfile();
        setIsLoggedIn(true);
        setUser(res);
      } catch (error) {
        setError(error);
      } finally {
        setLoadingInitial(false);
      }
    }

    const val = localStorage.getItem(JWT_KEY);

    if (val) {
      if (!isLoggedIn || !user) {
        loginFromToken();
      }
    } else {
      setLoadingInitial(false);
    }
  }, [isLoggedIn, user]);

  return <AuthContext.Provider value={memoedValue} {...props} />;
};
