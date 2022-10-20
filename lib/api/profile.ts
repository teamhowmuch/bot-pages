import { api } from "./api";

type UpdateProfileOptions = {
  name?: string;
  email?: string;
};

export function updateProfile({ name, email }: UpdateProfileOptions) {
  return api<void>("/profile", {
    method: "PATCH",
    body: JSON.stringify({ name, email_change_request: email }),
  });
}

export function verifyChangeEmail({ otp }: { otp: string }) {
  return api<void>("/profile/verify-email", {
    method: "POST",
    body: JSON.stringify({ otp }),
  });
}
