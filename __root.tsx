import { createRootRoute, HeadContent, Outlet, Scripts } from "@tanstack/react-router";
import { site } from "@/data/catalog";
import { absoluteUrl } from "@/lib/seo";
import appCss from "../styles.css?url";

const shareTitle = "Growth Growvia";
const shareAlt = "Growth Growvia — Cresça. Monetize. Evolua.";

export const Route = createRootRoute({
  head: () => {
    // og:image precisa de endereço absoluto: defina VITE_SITE_URL (veja .env.example).
    const shareImage = absoluteUrl("/og.jpg");
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: "Growth Growvia — Cresça. Monetize. Evolua." },
        { name: "description", content: site.description },
        { name: "theme-color", content: "#0a0a0a" },
        { name: "apple-mobile-web-app-title", content: site.name },
        { name: "apple-mobile-web-app-status-bar-style", content: "black" },
        { property: "og:site_name", content: site.name },
        { property: "og:locale", content: "pt_BR" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: shareTitle },
        { property: "og:description", content: site.statement },
        { property: "og:image", content: shareImage },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { property: "og:image:alt", content: shareAlt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: shareTitle },
        { name: "twitter:description", content: site.statement },
        { name: "twitter:image", content: shareImage },
      ],
      links: [
        { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" },
        { rel: "stylesheet", href: appCss },
        { rel: "manifest", href: "/manifest.webmanifest" },
        { rel: "apple-touch-icon", href: "/icons/apple-touch-icon.png" },
      ],
    };
  },
  component: () => (
    <html lang="pt-BR" className="antialiased" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        <Outlet />
        <Scripts />
      </body>
    </html>
  ),
});
