import type { Session } from "next-auth";

export type CurrentAdmin = {
  id: number;
  name: string;
  email: string;
  role: "OWNER";
};

type AdminDatabaseUser = {
  id: number;
  nome: string;
  email: string;
  role: string;
  ativo: boolean;
};

type FindAdminById = (id: number) => Promise<AdminDatabaseUser | null>;

export function isOwnerSession(session: Session | null): boolean {
  return session?.user?.role === "OWNER";
}

export function isAdminRequestAuthorized(
  pathname: string,
  session: Session | null,
): boolean {
  return pathname === "/admin/login" || isOwnerSession(session);
}

export async function resolveCurrentAdmin(
  session: Session | null,
  findAdminById: FindAdminById,
): Promise<CurrentAdmin | null> {
  if (!isOwnerSession(session)) {
    return null;
  }

  const userId = Number(session?.user?.id);

  if (!Number.isSafeInteger(userId) || userId <= 0) {
    return null;
  }

  const user = await findAdminById(userId);

  if (!user || !user.ativo || user.role !== "OWNER") {
    return null;
  }

  return {
    id: user.id,
    name: user.nome,
    email: user.email,
    role: user.role,
  };
}
