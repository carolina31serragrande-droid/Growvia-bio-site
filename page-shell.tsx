import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { activeSocials } from "@/data/catalog";
import { cn } from "@/lib/cn";
import { Logo } from "@/components/logo";
import { WelcomeDialog } from "@/components/welcome";

export function SiteHeader() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex w-full max-w-[1120px] flex-col gap-4 px-5 py-5 md:flex-row md:items-center md:justify-between md:px-8">
        <Link to="/" aria-label="Growth Growvia, início" className="inline-flex min-h-12 items-center">
          <Logo />
        </Link>
        <nav aria-label="Seções" className="flex flex-wrap gap-x-6 gap-y-2">
          <Link to="/sobre" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Sobre nós
          </Link>
          <Link to="/contato" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Contato
          </Link>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const socials = activeSocials();
  const year = new Date().getFullYear();

  return (
    <footer className="mt-32 border-t border-line md:mt-40">
      <div className="mx-auto w-full max-w-[1120px] px-5 py-10 md:px-8">
        <nav aria-label="Informações" className="flex flex-wrap gap-x-8 gap-y-2">
          <Link to="/contato" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Contato
          </Link>
          <Link to="/privacidade" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Privacidade
          </Link>
          <Link to="/termos" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Termos
          </Link>
          <Link to="/reportar" className="inline-flex min-h-12 items-center text-sm hover:text-accent">
            Reportar um problema
          </Link>
          {socials.map((item) => (
            <a
              key={item.id}
              href={item.href}
              className="inline-flex min-h-12 items-center text-sm hover:text-accent"
              rel="noopener noreferrer"
            >
              {item.label}
            </a>
          ))}
        </nav>
        <p className="mt-6 text-sm text-faint">© {year} Growth Growvia</p>
      </div>
    </footer>
  );
}

export function PageShell({
  children,
  dock = false,
  chrome = true,
}: {
  children: ReactNode;
  dock?: boolean;
  chrome?: boolean;
}) {
  return (
    <div className={cn("min-h-dvh bg-bg text-fg", dock && "pb-32 md:pb-0")}>
      {chrome ? <SiteHeader /> : null}
      {children}
      {chrome ? <SiteFooter /> : null}
      <WelcomeDialog />
    </div>
  );
}

export function NotFoundView() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h1 className="font-display text-4xl">Página não encontrada</h1>
        <p className="mt-4 max-w-md text-muted">Esse endereço não corresponde a uma oferta da Growth.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center bg-paper px-5 text-sm font-medium text-ink"
        >
          Ver as ofertas
        </Link>
      </main>
    </PageShell>
  );
}
