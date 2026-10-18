import { Link } from "@tanstack/react-router";
import { canPurchase, type Product } from "@/data/catalog";
import { formatMoney } from "@/lib/money";
import { cn } from "@/lib/cn";
import { buttonVariants } from "@/components/ui/button";
import { Mark } from "@/components/logo";

export function Price({ product, compact = false }: { product: Product; compact?: boolean }) {
  if (product.priceCents == null) {
    return <p className="text-sm text-faint">Preço a definir</p>;
  }

  const promo =
    product.promoPriceCents != null && product.promoPriceCents < product.priceCents
      ? product.promoPriceCents
      : null;

  if (!promo) {
    return (
      <p className={cn("font-medium tabular-nums", compact ? "text-sm" : "text-base")}>
        {formatMoney(product.priceCents)}
      </p>
    );
  }

  return (
    <p className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
      <span className={cn("font-medium tabular-nums", compact ? "text-sm" : "text-base")}>
        {formatMoney(promo)}
      </span>
      <span className="text-sm text-faint line-through tabular-nums">
        {formatMoney(product.priceCents)}
      </span>
    </p>
  );
}

export function unavailableCopy(product: Product): string {
  if (product.example) {
    return "Exemplo de catálogo. A compra abre quando a oferta real for publicada.";
  }
  return "O link de compra ainda não foi publicado.";
}

export function BuyButton({
  product,
  full = true,
  quiet = false,
}: {
  product: Product;
  full?: boolean;
  quiet?: boolean;
}) {
  if (canPurchase(product)) {
    return (
      <div className={full ? "w-full" : undefined}>
        <a
          href={product.checkoutUrl.trim()}
          className={buttonVariants({ variant: "primary", full })}
          rel="noopener noreferrer"
        >
          Comprar
        </a>
      </div>
    );
  }

  return (
    <div className={full ? "w-full" : undefined}>
      <button type="button" disabled className={buttonVariants({ variant: "soon", full })}>
        Em breve
      </button>
      {quiet ? null : (
        <p className="mt-2 text-sm text-muted">A compra abre quando o link estiver publicado.</p>
      )}
    </div>
  );
}

export function ProductCover({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const src = product.images[0];
  if (!src) {
    return (
      <div className="flex aspect-cover flex-col justify-between bg-surface-2 p-5">
        <Mark className="size-6 text-fg" />
        <p className="font-display text-3xl">{product.name}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={`Capa de ${product.name}`}
      width={960}
      height={1280}
      className="aspect-cover w-full object-cover"
      decoding="async"
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

export function ProductCard({ product, priority = false }: { product: Product; priority?: boolean }) {
  return (
    <article
      className={cn(
        "flex h-full flex-col border border-line bg-surface",
        product.featured && "border-t-paper",
      )}
    >
      <Link
        to="/produto/$slug"
        params={{ slug: product.slug }}
        aria-label={`Conhecer ${product.name}`}
      >
        <ProductCover product={product} priority={priority} />
      </Link>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <p className="text-xs tracking-widest text-faint uppercase">
          {product.category}
          {product.example ? " · Exemplo" : ""}
        </p>
        <h3 className="font-display text-3xl leading-none">
          <Link to="/produto/$slug" params={{ slug: product.slug }}>
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-muted">{product.shortDescription}</p>
        <p className="text-sm text-fg">
          <span className="text-faint">Resolve </span>
          {product.problem}
        </p>
        <Price product={product} />
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <Link
            to="/produto/$slug"
            params={{ slug: product.slug }}
            className={buttonVariants({ variant: "secondary", full: true })}
          >
            Conhecer
          </Link>
          <BuyButton product={product} />
        </div>
      </div>
    </article>
  );
}
