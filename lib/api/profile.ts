import { User } from "../models";
import { api } from "./api";

type UpdateProfileOptions = Partial<User>;

export function updateProfile({ email, ...rest }: UpdateProfileOptions) {
  return api<void>("/profile", {
    method: "PATCH",
    body: JSON.stringify({
      email_change_request: email,
      ...rest,
    }),
  });
}

export function verifyChangeEmail({ otp }: { otp: string }) {
  return api<void>("/profile/verify-email", {
    method: "POST",
    body: JSON.stringify({ otp }),
  });
}
