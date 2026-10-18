import { createFileRoute } from "@tanstack/react-router";
import { privacySections } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/privacidade")({
  head: () => ({
    meta: [
      { title: "Privacidade — Growth" },
      {
        name: "description",
        content: "Como a página da Growth trata dados e pagamentos.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <h1 className="font-display text-4xl">Privacidade</h1>
        <div className="mt-8 flex flex-col gap-8">
          {privacySections.map((section) => (
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
