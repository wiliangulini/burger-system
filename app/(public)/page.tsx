export default function Home() {
  return (
    <div className="mx-auto flex w-full max-w-5xl flex-col justify-center px-6 py-12">
      <section className="space-y-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-red-700">
          Setup inicial
        </p>
        <div className="space-y-4">
          <h1 className="text-4xl font-bold text-stone-950 sm:text-5xl">
            Burger Shop System
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-stone-700">
            Base Next.js App Router pronta para evoluir o MVP com qualidade,
            testes e CI, sem regras de negocio implementadas nesta etapa.
          </p>
        </div>
      </section>
    </div>
  );
}
