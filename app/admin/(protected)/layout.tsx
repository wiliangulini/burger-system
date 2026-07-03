import Link from "next/link";
import type { ReactNode } from "react";

import { logoutAdmin } from "@/actions/auth";
import { requireAdmin } from "@/lib/auth/authorization";

type AdminLayoutProps = {
  readonly children: ReactNode;
};

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-stone-100">
      <header className="border-b border-stone-200 bg-white">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <Link className="text-xl font-bold text-stone-950" href="/admin">
              Burger Shop Admin
            </Link>
            <p className="text-sm text-stone-600">{admin.name}</p>
          </div>

          <nav
            aria-label="Navegação administrativa"
            className="flex items-center gap-4"
          >
            <Link
              className="text-sm font-medium text-stone-700 hover:text-red-700"
              href="/admin"
            >
              Início
            </Link>
            <form action={logoutAdmin}>
              <button
                className="rounded-lg border border-stone-300 px-4 py-2 text-sm font-semibold text-stone-800 transition hover:border-red-700 hover:text-red-700"
                type="submit"
              >
                Sair
              </button>
            </form>
          </nav>
        </div>
      </header>

      <main className="mx-auto w-full max-w-6xl px-6 py-10">{children}</main>
    </div>
  );
}
