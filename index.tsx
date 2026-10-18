import { createFileRoute, Link } from "@tanstack/react-router";
import { canPurchase, site, visibleProducts } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { PageShell } from "@/components/page-shell";
import { BrandVideo } from "@/components/brand-video";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Growth Growvia — Cresça. Monetize. Evolua." },
      { name: "description", content: site.statement },
      { property: "og:title", content: "Growth Growvia" },
      { property: "og:description", content: `${site.tagline.join(" ")} ${site.statement}` },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "Growth Growvia" },
      { name: "twitter:description", content: site.statement },
    ],
  }),
  component: Home,
});

/**
 * Links da bio. Troque os endereços aqui.
 * "livro" e "contato" são páginas deste site. Os outros abrem fora.
 */
const bioLinks = [
  { id: "livro", label: "Conhecer o livro", href: "/produto/construa-em-silencio", internal: true },
  { id: "video", label: "Vídeo de apresentação", href: "#video", internal: false },
  { id: "tiktok", label: "TikTok", href: "https://www.tiktok.com/@growthoficial", internal: false },
  { id: "youtube", label: "Canal no YouTube", href: "https://www.youtube.com/@foco_inabalavel-0", internal: false },
  { id: "sobre", label: "Sobre nós", href: "/sobre", internal: true },
  { id: "contato", label: "Contato", href: "/contato", internal: true },
  { id: "reportar", label: "Reportar um problema", href: "/reportar", internal: true },
] as const;

function Icon({ id }: { id: (typeof bioLinks)[number]["id"] | "arrow" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (id === "arrow") {
    return (
      <svg viewBox="0 0 24 24" className="size-4" aria-hidden="true">
        <path {...common} d="M9 6l6 6-6 6" />
      </svg>
    );
  }
  if (id === "livro") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path {...common} d="M5 5.5h9.5A2.5 2.5 0 0 1 17 8v11H7.5A2.5 2.5 0 0 0 5 21.5z" />
        <path {...common} d="M5 5.5A2.5 2.5 0 0 1 7.5 3H19v16" />
      </svg>
    );
  }
  if (id === "video") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <rect {...common} x="3.5" y="6" width="17" height="12" rx="2" />
        <path {...common} d="M11 9.5v5l4-2.5z" />
      </svg>
    );
  }
  if (id === "tiktok") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path {...common} d="M14 6.5c.4 2 1.7 3.5 3.6 3.8v2.2a6 6 0 0 1-3.4-1.1v5.4a4.6 4.6 0 1 1-4.6-4.6" />
      </svg>
    );
  }
  if (id === "youtube") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <rect {...common} x="3" y="7" width="18" height="10" rx="2" />
        <path {...common} d="M11 10v4l3.5-2z" />
      </svg>
    );
  }
  if (id === "sobre") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path {...common} d="M6 6.5h12" />
        <path {...common} d="M6 12h12" />
        <path {...common} d="M6 17.5h8" />
      </svg>
    );
  }
  if (id === "reportar") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path {...common} d="M12 4.5v9" />
        <path {...common} d="M12 17.5h.01" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path {...common} d="M5 7.5h14v9H5z" />
      <path {...common} d="M5 8l7 5 7-5" />
    </svg>
  );
}

const linkClass =
  "rise flex h-[60px] w-full items-center gap-3 rounded-xl border border-line px-4 text-[15px] transition-colors duration-150 hover:border-paper hover:bg-paper hover:text-ink";

function Home() {
  const book = visibleProducts()[0];
  const cover = book?.images[0];
  const open = book ? canPurchase(book) : false;

  return (
    <PageShell chrome={false}>
      <main className="mx-auto w-full max-w-[480px] px-6 pt-12 pb-10">
        <header className="rise text-center" style={{ animationDelay: "0ms" }}>
          <h1 className="font-display text-[30px] leading-none font-medium">Growth Growvia</h1>
          <p className="mt-4 text-[17px] leading-snug">{site.tagline.join(" ")}</p>
          <p className="mx-auto mt-2 max-w-[34ch] text-[16px] leading-relaxed text-muted">{site.statement}</p>
        </header>

        {book ? (
          <article id="livro" className="rise mt-10 scroll-mt-6 rounded-2xl border border-line p-4" style={{ animationDelay: "70ms" }}>
            <div className="flex gap-4">
              {cover ? (
                <img
                  src={cover}
                  alt="Capa do livro Construa em Silêncio"
                  width={168}
                  height={264}
                  className="h-[112px] w-[84px] shrink-0 object-cover grayscale"
                  decoding="async"
                  fetchPriority="high"
                />
              ) : null}
              <div className="min-w-0">
                <h2 className="font-display text-[22px] leading-tight font-medium">{book.name}</h2>
                <p className="mt-2 text-[15px] leading-snug text-muted">{book.shortDescription}</p>
                {book.priceCents != null ? (
                  <p className="mt-3 text-[17px] font-medium tabular-nums">{formatMoney(book.priceCents)}</p>
                ) : null}
              </div>
            </div>
            {open ? (
              <a
                href={book.checkoutUrl.trim()}
                className="mt-4 flex h-14 w-full items-center justify-center rounded-xl border border-paper bg-paper text-[15px] font-medium text-ink transition-colors duration-150 hover:bg-transparent hover:text-fg"
                rel="noopener noreferrer"
              >
                Comprar
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="mt-4 flex h-14 w-full items-center justify-center rounded-xl border border-paper bg-transparent text-[15px] font-medium text-fg"
              >
                Em breve
              </button>
            )}
          </article>
        ) : null}

        <nav aria-label="Links" className="mt-6 flex flex-col gap-3">
          {bioLinks.map((item, index) => {
            const style = { animationDelay: `${140 + index * 50}ms` };
            const inner = (
              <>
                <Icon id={item.id} />
                <span className="flex-1 text-left">{item.label}</span>
                <Icon id="arrow" />
              </>
            );
            if (item.id === "livro" && book) {
              return (
                <Link
                  key={item.id}
                  to="/produto/$slug"
                  params={{ slug: book.slug }}
                  className={linkClass}
                  style={style}
                >
                  {inner}
                </Link>
              );
            }
            if (item.id === "contato") {
              return (
                <Link key={item.id} to="/contato" className={linkClass} style={style}>
                  {inner}
                </Link>
              );
            }
            if (item.id === "sobre") {
              return (
                <Link key={item.id} to="/sobre" className={linkClass} style={style}>
                  {inner}
                </Link>
              );
            }
            if (item.id === "reportar") {
              return (
                <Link key={item.id} to="/reportar" className={linkClass} style={style}>
                  {inner}
                </Link>
              );
            }
            return (
              <a
                key={item.id}
                href={item.href}
                className={linkClass}
                style={style}
                {...(item.href.startsWith("http") ? { rel: "noopener noreferrer", target: "_blank" } : {})}
              >
                {inner}
              </a>
            );
          })}
        </nav>

        <section id="video" aria-label="Vídeo de apresentação" className="rise mt-8 scroll-mt-6" style={{ animationDelay: "420ms" }}>
          <BrandVideo cover={cover} />
        </section>

        <footer className="rise mt-10 text-center" style={{ animationDelay: "480ms" }}>
          <div className="flex items-center justify-center gap-2">
            <a
              href={bioLinks[2].href}
              aria-label="TikTok"
              className="inline-flex size-12 items-center justify-center text-fg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon id="tiktok" />
            </a>
            <a
              href={bioLinks[3].href}
              aria-label="YouTube"
              className="inline-flex size-12 items-center justify-center text-fg"
              rel="noopener noreferrer"
              target="_blank"
            >
              <Icon id="youtube" />
            </a>
          </div>
          <p className="mt-2 text-[13px] tracking-[0.04em] text-muted">
            <Link to="/privacidade" className="underline-offset-4 hover:underline">
              Privacidade
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="/termos" className="underline-offset-4 hover:underline">
              Termos
            </Link>
            <span aria-hidden="true"> · </span>
            <Link to="/reportar" className="underline-offset-4 hover:underline">
              Reportar um problema
            </Link>
          </p>
          <p className="mt-2 text-[13px] tracking-[0.04em] text-faint">© 2026 Growth Growvia</p>
        </footer>
      </main>
    </PageShell>
  );
}
