import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { LoginForm } from "@/components/admin/login-form";
import { getCurrentAdmin } from "@/lib/auth/authorization";

export const metadata: Metadata = {
  title: "Login administrativo | Burger Shop System",
};

export default async function AdminLoginPage() {
  const admin = await getCurrentAdmin();

  if (admin) {
    redirect("/admin");
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-md rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
        <div className="mb-8 space-y-2">
          <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
            Área administrativa
          </p>
          <h1 className="text-3xl font-bold text-stone-950">Acessar painel</h1>
          <p className="text-sm leading-6 text-stone-600">
            Entre com as credenciais administrativas da loja.
          </p>
        </div>

        <LoginForm />
      </section>
    </main>
  );
}
