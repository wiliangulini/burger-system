import NextAuth, {
  CredentialsSignin,
  type NextAuthConfig,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";

import { authorizeOwnerCredentials } from "@/lib/auth/credentials";
import { isAdminRequestAuthorized } from "@/lib/auth/policy";
import {
  exposeTokenInSession,
  persistUserInToken,
} from "@/lib/auth/session";

export const authConfig = {
  trustHost: true,
  logger: {
    error(error) {
      if (error instanceof CredentialsSignin) {
        return;
      }

      console.error(`[auth][error] ${error.name}`);
    },
  },
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
    maxAge: 8 * 60 * 60,
  },
  providers: [
    Credentials({
      credentials: {
        email: {
          label: "Email",
          type: "email",
        },
        password: {
          label: "Senha",
          type: "password",
        },
      },
      authorize: authorizeOwnerCredentials,
    }),
  ],
  callbacks: {
    jwt({ token, user }) {
      return persistUserInToken(token, user);
    },
    session({ session, token }) {
      return exposeTokenInSession(session, token);
    },
    authorized({ auth, request }) {
      return isAdminRequestAuthorized(request.nextUrl.pathname, auth);
    },
  },
} satisfies NextAuthConfig;

export const { handlers, signIn, signOut, auth } = NextAuth(authConfig);
