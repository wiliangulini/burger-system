import { AuthError } from "next-auth";

import { loginAdmin, logoutAdmin } from "@/actions/auth";
import { signIn, signOut } from "../../auth";

jest.mock("../../auth", () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

jest.mock("next-auth", () => ({
  AuthError: class AuthError extends Error {},
}));

const signInMock = signIn as jest.Mock;
const signOutMock = signOut as jest.Mock;

describe("admin auth actions", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits credentials with a fixed admin redirect", async () => {
    signInMock.mockResolvedValue(undefined);
    const formData = new FormData();
    formData.set("email", "owner@example.com");
    formData.set("password", "senha-forte");

    await expect(
      loginAdmin({ error: null }, formData),
    ).resolves.toEqual({
      error: null,
    });
    expect(signInMock).toHaveBeenCalledWith("credentials", {
      email: "owner@example.com",
      password: "senha-forte",
      redirectTo: "/admin",
    });
  });

  it("returns a generic message for authentication errors", async () => {
    signInMock.mockRejectedValue(new AuthError());
    const formData = new FormData();
    formData.set("email", "missing@example.com");
    formData.set("password", "senha-incorreta");

    await expect(
      loginAdmin({ error: null }, formData),
    ).resolves.toEqual({
      error: "Email ou senha inválidos.",
    });
  });

  it("does not hide unexpected infrastructure errors", async () => {
    const infrastructureError = new Error("database unavailable");
    signInMock.mockRejectedValue(infrastructureError);

    await expect(
      loginAdmin({ error: null }, new FormData()),
    ).rejects.toBe(infrastructureError);
  });

  it("signs out with a fixed login redirect", async () => {
    signOutMock.mockResolvedValue(undefined);

    await logoutAdmin();

    expect(signOutMock).toHaveBeenCalledWith({
      redirectTo: "/admin/login",
    });
  });
});
