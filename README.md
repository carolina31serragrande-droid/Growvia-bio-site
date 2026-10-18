# Growth Growvia

Página de bio da marca Growth Growvia: apresentação, livro **Construa em Silêncio**, vídeo, redes sociais, contato, privacidade e termos.

Feito com React 19, TanStack Start/Router, Tailwind CSS 4 e Vite. O build gera a saída para a Vercel.

## Requisitos

- Node.js 22 ou mais recente
- npm (vem com o Node)

## Rodar localmente

```bash
npm install
npm run dev
```

Abra `http://localhost:8080`. Não precisa de `.env`, chave de API nem banco de dados.

Outros comandos:

```bash
npm run typecheck   # checa os tipos
npm run lint        # checa o estilo do código
npm test            # testes da lógica de boas-vindas
npm run build       # gera a saída de produção em .vercel/output
npm run preview     # serve o build em http://localhost:8081 (rode o build antes)
```

## Onde editar o conteúdo

- `src/routes/index.tsx`: lista `bioLinks` (TikTok, YouTube, livro, contato, vídeo).
- `src/data/catalog.ts`: preço, e-mail de contato, links dos formulários, textos do livro, privacidade e termos.
- `src/data/presentation.ts`: caminhos do vídeo de apresentação.
- `public/`: imagens (`products/`, `images/`), vídeo (`videos/`), `og.jpg` (imagem de compartilhamento) e ícones (`icons/`).

## O que ainda precisa ser configurado

1. **Link de compra.** O botão fica em "Em breve" até `checkoutUrl` (e `checkoutPlatform`) em `src/data/catalog.ts` receberem um link `https` da Kiwify ou Cakto.
2. **Endereço público do site.** Defina `VITE_SITE_URL` (modelo em `.env.example`), por exemplo `https://growvia.com.br`, sem barra no fim. Sem isso, a imagem de compartilhamento (`og:image`) sai com caminho relativo e as redes sociais podem não mostrar a prévia. Na Vercel: Project Settings → Environment Variables.
3. **Vídeo de apresentação.** Coloque `public/videos/growvia-apresentacao.mp4` (e, se quiser, a capa em `public/images/growvia-video-capa.jpg`). Sem o arquivo, o site mostra "Em breve". O GitHub recusa arquivos acima de 100 MB: para vídeos grandes, use Git LFS ou hospede fora e ajuste `src/data/presentation.ts`.
4. **Capa do livro.** `public/products/construa-em-silencio.jpg` mostra ao fundo a capa de outro livro. Troque por uma capa sem obra de terceiros antes de vender.
5. **Imagem `public/og.jpg`.** Confirme que a ferramenta que a gerou permite uso comercial.
6. **E-mail de contato.** `samucafc3@gmail.com` fica público no repositório e na página `/contato`. Se preferir, use um e-mail dedicado em `src/data/catalog.ts`.
7. **Licença do repositório.** Nenhuma foi definida. Sem licença, o código fica com todos os direitos reservados para você. Se quiser outra, adicione um arquivo `LICENSE`.

## Publicar no GitHub

```bash
git init
git add .
git status        # confira: não pode aparecer .env, node_modules nem .vercel
git commit -m "GROWVIA: versão inicial"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main
```

O `.gitignore` já deixa de fora `node_modules`, builds (`.vercel`, `.output`, `.tanstack`), arquivos `.env`, logs e resíduos da ferramenta de criação.

## Publicar o site

O site precisa de um servidor (renderização no servidor), então **não funciona no GitHub Pages**. O destino previsto é a **Vercel**:

1. Em vercel.com, importe o repositório do GitHub.
2. Comando de build: `npm run build`. Não precisa definir pasta de saída.
3. Adicione a variável `VITE_SITE_URL` (item 2 acima).
4. Publique e conecte o domínio.

O `vercel.json` já instala as dependências do jeito que o build precisa.

## Fontes e licenças de terceiros

As fontes Fraunces e Inter (pacotes `@fontsource`) usam a licença SIL OFL 1.1. As bibliotecas do projeto usam licenças MIT, ISC, Apache-2.0, BSD, MPL-2.0 (apenas no build) e similares.
