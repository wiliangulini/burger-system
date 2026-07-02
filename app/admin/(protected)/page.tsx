export default function AdminHomePage() {
  return (
    <section className="rounded-2xl border border-stone-200 bg-white p-8 shadow-sm">
      <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
        Painel administrativo
      </p>
      <h1 className="mt-2 text-3xl font-bold text-stone-950">
        Administração da loja
      </h1>
      <p className="mt-4 max-w-2xl leading-7 text-stone-600">
        A autenticação administrativa está ativa. Os módulos operacionais serão
        adicionados nas próximas etapas do MVP.
      </p>
    </section>
  );
}
