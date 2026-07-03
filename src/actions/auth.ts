"use server";

import { AuthError } from "next-auth";

import { signIn, signOut } from "../../auth";

const INVALID_CREDENTIALS_MESSAGE = "Email ou senha inválidos.";

export type LoginActionState = {
  error: string | null;
};

export async function loginAdmin(
  _previousState: LoginActionState,
  formData: FormData,
): Promise<LoginActionState> {
  try {
    await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirectTo: "/admin",
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return {
        error: INVALID_CREDENTIALS_MESSAGE,
      };
    }

    throw error;
  }

  return {
    error: null,
  };
}

export async function logoutAdmin(): Promise<void> {
  await signOut({
    redirectTo: "/admin/login",
  });
}
