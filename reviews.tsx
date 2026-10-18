import { Link } from "@tanstack/react-router";
import { Star } from "lucide-react";
import {
  productBySlug,
  reviewFormHref,
  reviews,
  reviewsForProduct,
  type Review,
} from "@/data/catalog";
import { buttonVariants } from "@/components/ui/button";

function Stars({ rating }: { rating: number }) {
  const value = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <p className="flex gap-1" aria-label={`${value} de 5`}>
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={index < value ? "size-4 fill-paper text-paper" : "size-4 text-faint"}
          aria-hidden="true"
        />
      ))}
    </p>
  );
}

export function ReviewFormLink({ full = false }: { full?: boolean }) {
  const href = reviewFormHref();
  const className = buttonVariants({ variant: "secondary", full });

  if (!href) {
    return (
      <div>
        <button type="button" disabled className={className}>
          Deixar uma avaliação
        </button>
        <p className="mt-2 max-w-md text-sm text-faint">
          Nome, e-mail e a avaliação. O formulário ainda não está publicado.
        </p>
      </div>
    );
  }

  return (
    <div>
      <a href={href} className={className} rel="noopener noreferrer">
        Deixar uma avaliação
      </a>
      <p className="mt-2 max-w-md text-sm text-faint">
        Abre o formulário para nome, e-mail e a avaliação. Não pede pagamento.
      </p>
    </div>
  );
}

function ReviewCard({ review }: { review: Review }) {
  return (
    <blockquote className="flex h-full flex-col border border-line bg-surface p-5">
      <Stars rating={review.rating} />
      <p className="mt-4 flex-1 text-sm">{review.text}</p>
      <footer className="mt-4 text-sm text-faint">{review.name}</footer>
    </blockquote>
  );
}

export function ReviewSection({
  productId,
  linkedProduct = false,
}: {
  productId?: string;
  linkedProduct?: boolean;
}) {
  const items = productId ? reviewsForProduct(productId) : reviews;
  if (items.length === 0) {
    if (!productId) return null;
    return (
      <section aria-labelledby="avaliacoes-produto">
        <h2 id="avaliacoes-produto" className="font-display text-2xl">
          Avaliações
        </h2>
        <p className="mt-3 text-sm text-muted">Ainda não há avaliações publicadas deste livro.</p>
        <div className="mt-6">
          <ReviewFormLink full />
        </div>
      </section>
    );
  }

  const onlyProductId = items.every((review) => review.productId === items[0]?.productId)
    ? items[0]?.productId
    : undefined;
  const product = onlyProductId ? productBySlug(onlyProductId) : undefined;

  return (
    <section aria-labelledby={productId ? "avaliacoes-produto" : "avaliacoes-titulo"}>
      <h2
        id={productId ? "avaliacoes-produto" : "avaliacoes-titulo"}
        className={productId ? "font-display text-2xl" : "text-xs tracking-widest text-faint uppercase"}
      >
        Avaliações
      </h2>
      {product && !productId ? (
        <p className="mt-3 text-sm text-muted">
          {linkedProduct ? (
            <Link to="/produto/$slug" params={{ slug: product.slug }} className="underline underline-offset-4">
              {product.name}
            </Link>
          ) : (
            product.name
          )}
        </p>
      ) : null}
      <ul className={productId ? "mt-4 flex flex-col gap-4" : "mt-6 grid grid-cols-1 gap-4 md:grid-cols-3"}>
        {items.map((review) => (
          <li key={review.id}>
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <ReviewFormLink full={Boolean(productId)} />
      </div>
    </section>
  );
}
