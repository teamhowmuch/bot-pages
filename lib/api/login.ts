import { User } from "../models";
import { api } from "./api";

type LoginDto = {
  access_token: string;
  user: User;
};

export async function login(email: string, password: string) {
  return api<LoginDto>(`/auth/login`, {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function requestOtp(email: string) {
  return api<void>(`/auth/request-otp`, {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function getProfile() {
  return await api<User>(`/profile`);
}
