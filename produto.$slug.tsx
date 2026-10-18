import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ChevronDown } from "lucide-react";
import { canPurchase, productBySlug } from "@/data/catalog";
import { PageShell } from "@/components/page-shell";
import { BuyButton, Price, unavailableCopy } from "@/components/product";
import { ReviewSection } from "@/components/reviews";

export const Route = createFileRoute("/produto/$slug")({
  loader: ({ params }) => {
    const product = productBySlug(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    if (!product) {
      return { meta: [{ title: "Oferta não encontrada — Growth" }] };
    }
    return {
      meta: [
        { title: `${product.name} — Growth` },
        { name: "description", content: product.shortDescription },
      ],
    };
  },
  component: ProductPage,
  notFoundComponent: ProductMissing,
});

function ProductMissing() {
  return (
    <PageShell>
      <main className="mx-auto max-w-6xl px-5 py-16 md:px-8">
        <h1 className="font-display text-4xl">Oferta não encontrada</h1>
        <p className="mt-4 max-w-md text-muted">Esse produto não está publicado.</p>
        <Link
          to="/"
          className="mt-8 inline-flex min-h-12 items-center bg-paper px-5 text-sm font-medium text-ink"
        >
          Voltar às ofertas
        </Link>
      </main>
    </PageShell>
  );
}

function ProductPage() {
  const { product } = Route.useLoaderData();
  const open = canPurchase(product);

  return (
    <PageShell dock>
      <main className="mx-auto max-w-6xl px-5 pt-6 pb-8 md:px-8 md:pt-10">
        <Link to="/" hash="produtos" className="inline-flex min-h-12 items-center text-sm text-muted">
          Voltar às ofertas
        </Link>

        <div className="mt-4 grid gap-8 md:grid-cols-2 md:gap-12 lg:gap-16">
          <div className="flex flex-col gap-4">
            {product.images.length === 0 ? (
              <div className="flex aspect-cover items-end bg-surface-2 p-5">
                <p className="font-display text-3xl">{product.name}</p>
              </div>
            ) : null}
            {product.images.map((src, index) => (
              <img
                key={src}
                src={src}
                alt={index === 0 ? `Capa de ${product.name}` : `Prévia ${index + 1} de ${product.name}`}
                width={960}
                height={1280}
                className="aspect-cover w-full object-cover"
                decoding="async"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "auto"}
              />
            ))}
          </div>

          <div className="md:sticky md:top-6 md:self-start">
            <p className="text-xs tracking-widest text-faint uppercase">
              {product.category}
              {product.example ? " · Exemplo" : ""}
            </p>
            <h1 className="mt-3 font-display text-4xl leading-none md:text-5xl">{product.name}</h1>
            <div className="mt-4">
              <Price product={product} />
            </div>
            <p className="mt-5 text-base text-muted">{product.shortDescription}</p>
            <p className="mt-4 text-base">
              <span className="text-faint">Resolve </span>
              {product.problem}
            </p>
            <div className="mt-6">
              <BuyButton product={product} />
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-2xl space-y-10">
          <section>
            <h2 className="font-display text-2xl">O que é</h2>
            {product.description.split(/\n\n+/).map((paragraph) => (
              <p key={paragraph.slice(0, 32)} className="mt-3 text-muted">
                {paragraph}
              </p>
            ))}
          </section>

          <section>
            <h2 className="font-display text-2xl">O que está incluído</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {product.includes.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-muted" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Na prática</h2>
            <ul className="mt-4 flex flex-col gap-3">
              {product.benefits.map((item) => (
                <li key={item} className="flex gap-3 text-muted">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-muted" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl">Formato</h2>
            <p className="mt-3 text-muted">{product.delivery}</p>
          </section>

          <ReviewSection productId={product.id} />

          <section>
            <h2 className="font-display text-2xl">Perguntas frequentes</h2>
            <div className="mt-4 border-b border-line">
              {product.faq.map((item) => (
                <details key={item.question} className="group border-t border-line">
                  <summary className="flex min-h-12 items-center justify-between gap-4 py-3 text-left">
                    <span>{item.question}</span>
                    <ChevronDown
                      className="size-4 shrink-0 text-muted transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-4 text-sm text-muted">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>

          <section>
            <h2 className="font-display text-2xl">Suporte e reembolso</h2>
            <p className="mt-3 text-muted">{product.support}</p>
            <p className="mt-3 text-muted">{product.refund}</p>
          </section>
        </div>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-bg md:hidden">
        {open ? (
          <div className="flex items-center gap-4 px-5 py-3 pb-safe">
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm">{product.name}</p>
              <Price product={product} compact />
            </div>
            <div className="w-36 shrink-0">
              <BuyButton product={product} quiet />
            </div>
          </div>
        ) : (
          <div className="px-5 py-3 pb-safe">
            <div className="flex items-baseline justify-between gap-3">
              <p className="truncate text-sm">{product.name}</p>
              <Price product={product} compact />
            </div>
            <p className="mt-1 text-sm text-faint">{unavailableCopy(product)}</p>
          </div>
        )}
      </div>
    </PageShell>
  );
}
