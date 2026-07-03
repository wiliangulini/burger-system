import { compare } from "bcryptjs";
import { z } from "zod";

import { prisma } from "@/lib/db";

const DUMMY_PASSWORD_HASH =
  "$2b$12$/dWwEl1EL3AcmO.3713tb.q12.pfLt7Tn4Da0sbHuPL4v7p1HaAaa";

const credentialsSchema = z.object({
  email: z.string().trim().toLowerCase().email().max(254),
  password: z.string().min(1).max(128),
});

export async function authorizeOwnerCredentials(credentials: unknown) {
  const parsedCredentials = credentialsSchema.safeParse(credentials);
  const password = parsedCredentials.success
    ? parsedCredentials.data.password
    : typeof (credentials as { password?: unknown } | null)?.password ===
        "string"
      ? String((credentials as { password: string }).password).slice(0, 128)
      : "";

  const user = parsedCredentials.success
    ? await prisma.usuario.findUnique({
        where: {
          email: parsedCredentials.data.email,
        },
        select: {
          id: true,
          nome: true,
          email: true,
          senhaHash: true,
          role: true,
          ativo: true,
        },
      })
    : null;

  const passwordMatches = await compare(
    password,
    user?.senhaHash ?? DUMMY_PASSWORD_HASH,
  );

  if (
    !parsedCredentials.success ||
    !user ||
    !passwordMatches ||
    !user.ativo ||
    user.role !== "OWNER"
  ) {
    return null;
  }

  return {
    id: String(user.id),
    name: user.nome,
    email: user.email,
    role: user.role,
  };
}
