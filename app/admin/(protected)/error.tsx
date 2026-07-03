"use client";

type AdminErrorProps = {
  readonly reset: () => void;
};

export default function AdminError({ reset }: AdminErrorProps) {
  return (
    <section className="rounded-2xl border border-red-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-bold text-stone-950">
        Não foi possível carregar o painel
      </h1>
      <p className="mt-3 text-stone-600">
        Tente novamente. Se o problema persistir, contate o responsável pelo
        sistema.
      </p>
      <button
        className="mt-6 rounded-lg bg-red-700 px-4 py-2 font-semibold text-white hover:bg-red-800"
        onClick={reset}
        type="button"
      >
        Tentar novamente
      </button>
    </section>
  );
}
