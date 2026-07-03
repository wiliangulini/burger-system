import type { DefaultSession } from "next-auth";

import type { RoleUsuario } from "@/generated/prisma/enums";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: RoleUsuario;
    } & DefaultSession["user"];
  }

  interface User {
    role: RoleUsuario;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: RoleUsuario;
  }
}
