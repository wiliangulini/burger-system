import "server-only";

import { redirect } from "next/navigation";

import { auth } from "../../../auth";
import { prisma } from "@/lib/db";
import {
  resolveCurrentAdmin,
  type CurrentAdmin,
} from "@/lib/auth/policy";

export async function getCurrentAdmin(): Promise<CurrentAdmin | null> {
  const session = await auth();

  return resolveCurrentAdmin(session, async (userId) =>
    prisma.usuario.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
        ativo: true,
      },
    }),
  );
}

export async function requireAdmin(): Promise<CurrentAdmin> {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
