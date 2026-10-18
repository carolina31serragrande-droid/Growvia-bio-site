import { createFileRoute } from "@tanstack/react-router";
import { activeSocials, site } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: "Contato — Growth" },
      {
        name: "description",
        content: "Como falar com a Growth.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const email = site.contactEmail.trim();
  const tiktok = activeSocials().find((item) => item.id === "tiktok");
  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-display text-4xl">Contato</h1>
        <p className="mt-4 text-muted">
          Para reembolso ou qualquer falha no pagamento, entre em contato com o suporte.
        </p>
        {validEmail ? (
          <a
            href={`mailto:${email}`}
            className="mt-8 inline-flex min-h-12 items-center bg-paper px-5 text-sm font-medium text-ink"
          >
            {email}
          </a>
        ) : (
          <p className="mt-6 text-sm text-faint">O e-mail de contato ainda não foi publicado.</p>
        )}
        {tiktok ? (
          <p className="mt-6 text-muted">
            O perfil oficial no TikTok é{" "}
            <a href={tiktok.href} className="underline underline-offset-4" rel="noopener noreferrer">
              @growthoficial
            </a>
            .
          </p>
        ) : null}
      </main>
    </PageShell>
  );
}
