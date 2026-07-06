import type { ReactNode } from "react";

import { Footer } from "@/components/public/footer";
import { Header } from "@/components/public/header";

type PublicLayoutProps = {
  readonly children: ReactNode;
};

export default function PublicLayout({ children }: PublicLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-[var(--background)]">
      <a
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-red-700 focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-white"
        href="#conteudo-principal"
      >
        Pular para o conteúdo principal
      </a>

      <Header />

      <main className="flex-1" id="conteudo-principal">
        {children}
      </main>

      <Footer />
    </div>
  );
}
