/** @jest-environment node */

import type { Session } from "next-auth";

import {
  isAdminRequestAuthorized,
  isOwnerSession,
  resolveCurrentAdmin,
} from "@/lib/auth/policy";

const ownerSession: Session = {
  expires: "2099-01-01T00:00:00.000Z",
  user: {
    id: "7",
    name: "Dona da loja",
    email: "owner@example.com",
    role: "OWNER",
  },
};

describe("admin authorization policy", () => {
  it("allows the login route without a session", () => {
    expect(isAdminRequestAuthorized("/admin/login", null)).toBe(true);
  });

  it("allows protected admin paths only for an OWNER session", () => {
    expect(isAdminRequestAuthorized("/admin", ownerSession)).toBe(true);
    expect(isAdminRequestAuthorized("/admin", null)).toBe(false);
    expect(
      isAdminRequestAuthorized("/admin", {
        ...ownerSession,
        user: {
          ...ownerSession.user,
          role: "MANAGER",
        },
      }),
    ).toBe(false);
  });

  it("recognizes only OWNER as an admin session", () => {
    expect(isOwnerSession(ownerSession)).toBe(true);
    expect(isOwnerSession(null)).toBe(false);
  });

  it("revalidates and returns an active OWNER from the database", async () => {
    const findAdminById = jest.fn().mockResolvedValue({
      id: 7,
      nome: "Dona da loja",
      email: "owner@example.com",
      role: "OWNER",
      ativo: true,
    });

    await expect(
      resolveCurrentAdmin(ownerSession, findAdminById),
    ).resolves.toEqual({
      id: 7,
      name: "Dona da loja",
      email: "owner@example.com",
      role: "OWNER",
    });
    expect(findAdminById).toHaveBeenCalledWith(7);
  });

  it.each([
    ["missing user", null],
    [
      "inactive user",
      {
        id: 7,
        nome: "Dona da loja",
        email: "owner@example.com",
        role: "OWNER",
        ativo: false,
      },
    ],
    [
      "changed role",
      {
        id: 7,
        nome: "Dona da loja",
        email: "owner@example.com",
        role: "MANAGER",
        ativo: true,
      },
    ],
  ])("rejects a stale session for %s", async (_label, databaseUser) => {
    const findAdminById = jest.fn().mockResolvedValue(databaseUser);

    await expect(
      resolveCurrentAdmin(ownerSession, findAdminById),
    ).resolves.toBeNull();
  });

  it("rejects an invalid session id without querying the database", async () => {
    const findAdminById = jest.fn();
    const invalidIdSession: Session = {
      ...ownerSession,
      user: {
        ...ownerSession.user,
        id: "not-a-number",
      },
    };

    await expect(
      resolveCurrentAdmin(invalidIdSession, findAdminById),
    ).resolves.toBeNull();
    expect(findAdminById).not.toHaveBeenCalled();
  });
});
