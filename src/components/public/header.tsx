import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-stone-200 bg-white">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
        <Link className="text-xl font-bold text-stone-950" href="/">
          Burger Shop
        </Link>

        <nav aria-label="Navegação principal" className="flex items-center gap-4">
          <Link
            className="text-sm font-medium text-stone-700 hover:text-red-700"
            href="/"
          >
            Início
          </Link>
        </nav>
      </div>
    </header>
  );
}
