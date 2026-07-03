/** @jest-environment node */

import { compare } from "bcryptjs";

import { authorizeOwnerCredentials } from "@/lib/auth/credentials";
import { prisma } from "@/lib/db";

jest.mock("bcryptjs", () => ({
  compare: jest.fn(),
}));

jest.mock("@/lib/db", () => ({
  prisma: {
    usuario: {
      findUnique: jest.fn(),
    },
  },
}));

const compareMock = compare as jest.Mock;
const findUniqueMock = prisma.usuario.findUnique as jest.Mock;

const owner = {
  id: 7,
  nome: "Dona da loja",
  email: "owner@example.com",
  senhaHash: "hash-armazenado",
  role: "OWNER",
  ativo: true,
};

describe("authorizeOwnerCredentials", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    compareMock.mockResolvedValue(true);
  });

  it("returns only the minimal identity for valid active OWNER credentials", async () => {
    findUniqueMock.mockResolvedValue(owner);

    const result = await authorizeOwnerCredentials({
      email: "  OWNER@EXAMPLE.COM ",
      password: "senha-forte",
    });

    expect(findUniqueMock).toHaveBeenCalledWith(
      expect.objectContaining({
        where: {
          email: "owner@example.com",
        },
      }),
    );
    expect(compareMock).toHaveBeenCalledWith(
      "senha-forte",
      "hash-armazenado",
    );
    expect(result).toEqual({
      id: "7",
      name: "Dona da loja",
      email: "owner@example.com",
      role: "OWNER",
    });
    expect(result).not.toHaveProperty("senhaHash");
  });

  it("returns null for an incorrect password", async () => {
    findUniqueMock.mockResolvedValue(owner);
    compareMock.mockResolvedValue(false);

    await expect(
      authorizeOwnerCredentials({
        email: "owner@example.com",
        password: "senha-incorreta",
      }),
    ).resolves.toBeNull();
  });

  it("uses a dummy hash when the email is not found", async () => {
    findUniqueMock.mockResolvedValue(null);

    await expect(
      authorizeOwnerCredentials({
        email: "missing@example.com",
        password: "qualquer-senha",
      }),
    ).resolves.toBeNull();

    expect(compareMock).toHaveBeenCalledTimes(1);
    expect(compareMock.mock.calls[0][0]).toBe("qualquer-senha");
    expect(compareMock.mock.calls[0][1]).not.toBe(owner.senhaHash);
  });

  it("rejects malformed input without querying the database", async () => {
    await expect(
      authorizeOwnerCredentials({
        email: "email-invalido",
        password: "",
      }),
    ).resolves.toBeNull();

    expect(findUniqueMock).not.toHaveBeenCalled();
    expect(compareMock).toHaveBeenCalledTimes(1);
  });

  it.each([
    ["inactive OWNER", { ...owner, ativo: false }],
    ["MANAGER", { ...owner, role: "MANAGER" }],
    ["ATTENDANT", { ...owner, role: "ATTENDANT" }],
    ["KITCHEN", { ...owner, role: "KITCHEN" }],
  ])("rejects %s even when the password matches", async (_label, user) => {
    findUniqueMock.mockResolvedValue(user);

    await expect(
      authorizeOwnerCredentials({
        email: "owner@example.com",
        password: "senha-forte",
      }),
    ).resolves.toBeNull();
  });
});
