/** @jest-environment node */

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

import {
  exposeTokenInSession,
  persistUserInToken,
} from "@/lib/auth/session";

describe("Auth.js session callbacks", () => {
  it("persists the user id and role in the JWT", () => {
    const token = {} as JWT;
    const user: User = {
      id: "7",
      name: "Dona da loja",
      email: "owner@example.com",
      role: "OWNER",
    };

    expect(persistUserInToken(token, user)).toEqual({
      id: "7",
      role: "OWNER",
    });
  });

  it("exposes only a valid OWNER identity in the session", () => {
    const session = {
      expires: "2099-01-01T00:00:00.000Z",
      user: {
        name: "Dona da loja",
        email: "owner@example.com",
      },
    } as Session;
    const token = {
      id: "7",
      role: "OWNER",
    } as JWT;

    expect(exposeTokenInSession(session, token).user).toEqual({
      id: "7",
      name: "Dona da loja",
      email: "owner@example.com",
      role: "OWNER",
    });
  });

  it("does not expose an unexpected role from a token", () => {
    const session = {
      expires: "2099-01-01T00:00:00.000Z",
      user: {
        name: "Usuário",
        email: "user@example.com",
      },
    } as Session;
    const token = {
      id: "8",
      role: "MANAGER",
    } as JWT;

    expect(exposeTokenInSession(session, token).user).not.toHaveProperty(
      "role",
    );
  });
});
