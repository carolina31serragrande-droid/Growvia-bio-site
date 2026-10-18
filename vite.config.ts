import { defineConfig } from "vite";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { nitro } from "nitro/vite";

// Desenvolvimento: http://localhost:8080 (npm run dev).
// Pré-visualização do build: http://localhost:8081 (npm run preview).
// O adaptador do Nitro só entra no build/preview e gera a saída para a Vercel (.vercel/output).
export default defineConfig(({ command, isPreview }) => ({
  server: { port: 8080 },
  preview: { port: 8081 },
  resolve: { tsconfigPaths: true },
  plugins: [
    tailwindcss(),
    tanstackStart(),
    ...(command === "build" || isPreview ? [nitro({ preset: "vercel" })] : []),
    viteReact(),
  ],
}));
