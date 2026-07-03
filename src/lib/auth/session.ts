import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

export function persistUserInToken(token: JWT, user?: User): JWT {
  if (user) {
    token.id = user.id;
    token.role = user.role;
  }

  return token;
}

export function exposeTokenInSession(session: Session, token: JWT): Session {
  if (
    session.user &&
    typeof token.id === "string" &&
    token.role === "OWNER"
  ) {
    session.user.id = token.id;
    session.user.role = token.role;
  }

  return session;
}
