import { createFileRoute } from "@tanstack/react-router";
import { termsSections } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/termos")({
  head: () => ({
    meta: [
      { title: "Termos — Growth" },
      {
        name: "description",
        content: "Condições de uso e compra das ofertas da Growth.",
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-display text-4xl">Termos</h1>
        <div className="mt-8 flex flex-col gap-8">
          {termsSections.map((section) => (
            <section key={section.heading}>
              <h2 className="text-base font-medium">{section.heading}</h2>
              <p className="mt-2 text-muted">{section.body}</p>
            </section>
          ))}
        </div>
      </main>
    </PageShell>
  );
}
