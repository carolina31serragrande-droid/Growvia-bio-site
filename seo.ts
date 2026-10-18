/**
 * Endereço público do site (por exemplo https://growvia.com.br), vindo de VITE_SITE_URL.
 * Redes sociais exigem endereço ABSOLUTO na imagem de compartilhamento (og:image).
 * Sem a variável, a imagem sai com caminho relativo e a prévia pode não aparecer.
 * Veja .env.example e o README.
 */
export function siteUrl(): string {
  const raw = String(import.meta.env.VITE_SITE_URL ?? "").trim();
  if (!raw) return "";
  try {
    const url = new URL(raw);
    return url.protocol === "https:" || url.protocol === "http:" ? url.origin : "";
  } catch {
    return "";
  }
}

export function absoluteUrl(path: string): string {
  const base = siteUrl();
  return base ? `${base}${path}` : path;
}
