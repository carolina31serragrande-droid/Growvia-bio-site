import { createFileRoute } from "@tanstack/react-router";
import { site } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre nós — Growth Growvia" },
      {
        name: "description",
        content: "O que a Growth Growvia propõe: disciplina, foco e a passagem da intenção para a ação.",
      },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <main className="mx-auto max-w-2xl px-5 py-10 md:px-8 md:py-14">
        <p className="text-xs tracking-[0.16em] text-faint uppercase">{site.name}</p>
        <h1 className="mt-3 font-display text-4xl leading-tight">Sobre nós</h1>
        <p className="mt-6 text-[1.125rem] leading-relaxed">{site.tagline.join(" ")}</p>
        <p className="mt-4 text-muted leading-relaxed">
          A Growth Growvia é uma marca de desenvolvimento pessoal. Ela trata de disciplina, foco,
          produtividade e da passagem da intenção para a ação.
        </p>
        <p className="mt-4 text-muted leading-relaxed">
          A evolução, aqui, não depende de um pico de motivação. Ela acontece em ações pequenas,
          decisões conscientes e tempo. Os conteúdos e os materiais práticos existem para
          aproximar o que você quer daquilo que você faz no dia a dia.
        </p>
      </main>
    </PageShell>
  );
}
