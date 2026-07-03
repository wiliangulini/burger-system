"use client";

import { useActionState } from "react";

import {
  loginAdmin,
  type LoginActionState,
} from "@/actions/auth";

const INITIAL_STATE: LoginActionState = {
  error: null,
};

export function LoginForm() {
  const [state, formAction, isPending] = useActionState(
    loginAdmin,
    INITIAL_STATE,
  );

  return (
    <form action={formAction} className="space-y-5">
      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-stone-800"
          htmlFor="email"
        >
          Email
        </label>
        <input
          autoComplete="email"
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-100"
          id="email"
          maxLength={254}
          name="email"
          required
          type="email"
        />
      </div>

      <div className="space-y-2">
        <label
          className="block text-sm font-medium text-stone-800"
          htmlFor="password"
        >
          Senha
        </label>
        <input
          autoComplete="current-password"
          className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2.5 text-stone-950 outline-none transition focus:border-red-700 focus:ring-2 focus:ring-red-100"
          id="password"
          maxLength={128}
          name="password"
          required
          type="password"
        />
      </div>

      <p
        aria-live="polite"
        className="min-h-6 text-sm text-red-700"
        role={state.error ? "alert" : undefined}
      >
        {state.error}
      </p>

      <button
        className="w-full rounded-lg bg-red-700 px-4 py-3 font-semibold text-white transition hover:bg-red-800 disabled:cursor-not-allowed disabled:opacity-60"
        disabled={isPending}
        type="submit"
      >
        {isPending ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
