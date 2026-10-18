import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/reportar")({
  head: () => ({
    meta: [
      { title: "Reportar um problema — Growth Growvia" },
      {
        name: "description",
        content: "Informe um problema encontrado no site da Growth Growvia.",
      },
    ],
  }),
  component: ReportPage,
});

function ReportPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-display text-4xl leading-tight">Reportar um problema</h1>
        <p className="mt-4 max-w-xl text-muted leading-relaxed">
          Se uma página não abriu, um botão falhou ou algo apareceu errado, descreva o que
          aconteceu no formulário. Reembolso e falha de pagamento continuam no contato.
        </p>
        <a
          href={site.reportFormUrl}
          className="mt-8 inline-flex min-h-14 items-center justify-center bg-paper px-6 text-sm font-medium text-ink"
          rel="noopener noreferrer"
          target="_blank"
        >
          Reportar um problema
        </a>
      </main>
    </PageShell>
  );
}
