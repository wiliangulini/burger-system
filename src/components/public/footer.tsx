export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto w-full max-w-6xl px-6 py-6 text-sm text-stone-600">
        <p>&copy; {year} Burger Shop. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}
