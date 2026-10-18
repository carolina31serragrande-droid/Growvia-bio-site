/**
 * Catálogo da Growth — única fonte das ofertas, do contato e dos links.
 *
 * Para publicar uma oferta real:
 * 1. Copie um item, troque os textos e apague `example: true` (ou use false).
 * 2. Coloque o preço em centavos (4700 = R$ 47,00). Sem preço, deixe null.
 * 3. Preencha checkoutPlatform ("kiwify" ou "cakto") e checkoutUrl (https).
 * 4. Sem URL https, o botão Comprar permanece desligado.
 * 5. Itens com example: true nunca abrem checkout, mesmo com URL.
 * 6. available: false esconde o produto. order define a sequência.
 * 7. logoSrc aceita o arquivo do logotipo, por exemplo "/logo.png".
 * 8. O livro publicado é Construa em Silêncio. O botão Comprar liga quando checkoutUrl for https.
 * 9. reviewFormUrl: link https do Google Docs ou Formulário (nome, e-mail, avaliação).
 * 10. As avaliações publicadas ficam no array `reviews`. Troque pelos textos reais.
 */

export type CheckoutPlatform = "kiwify" | "cakto";

export type FaqItem = {
  question: string;
  answer: string;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  problem: string;
  images: string[];
  category: string;
  priceCents: number | null;
  promoPriceCents: number | null;
  checkoutPlatform: CheckoutPlatform | null;
  checkoutUrl: string;
  available: boolean;
  order: number;
  featured: boolean;
  example: boolean;
  includes: string[];
  benefits: string[];
  delivery: string;
  support: string;
  refund: string;
  faq: FaqItem[];
};

export type Review = {
  id: string;
  productId: string;
  name: string;
  rating: number;
  text: string;
};
export type SocialLink = {
  id: "tiktok" | "instagram" | "youtube";
  label: string;
  href: string;
};

const support =
  "Para reembolso ou qualquer falha no pagamento, entre em contato com o suporte.";

const refund =
  "Use o e-mail publicado na página de contato e informe o produto.";

const accountFaq: FaqItem = {
  question: "Preciso criar uma conta na Growth?",
  answer: "Não. Não há cadastro nem área de membros nesta página.",
};

export const site = {
  name: "Growth Growvia",
  tagline: ["Cresça.", "Monetize.", "Evolua."],
  identifier: "Recursos digitais",
  description:
    "Vitrine da Growth. Recursos práticos para organizar, aprender e evoluir. Veja cada oferta e compre quando a compra estiver aberta.",
  statement:
    "Recursos práticos para organizar o trabalho, aprender com método e evoluir com consistência.",
  supportLine: "Cada oferta descreve o que está incluído antes da compra.",
  channelName: "Foco Inabalável",
  channelLine: "Sua mente define até onde você vai.",
  channelBody:
    "O canal publica conteúdo sobre disciplina, foco e desenvolvimento pessoal. A Growth Growvia é a página desses materiais. Quem chega pelo TikTok ou pelo YouTube encontra aqui a oferta, com o que ela inclui, antes de decidir.",
  channelUrl: "https://www.youtube.com/@foco_inabalavel-0",
  footerNote:
    "Para reembolso ou qualquer falha no pagamento, entre em contato com o suporte.",
  logoSrc: "",
  logoIncludesName: false,
  contactEmail: "samucafc3@gmail.com",
  /** Formulário externo (Google Docs ou Google Forms) com nome, e-mail e avaliação. */
  reviewFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSdtq-lSkodl37qC1vUyB86lpKIEVgp7OuDDigsOU4lGuzUOJA/viewform",
  /** Formulário para reportar um problema no site. */
  reportFormUrl:
    "https://docs.google.com/forms/d/e/1FAIpQLSfRuPk7sqya4pF-bBqluW7hpd2J9X_dC6mxcxC3m36PHFIavA/viewform?usp=publish-editor",
  socials: [
    {
      id: "tiktok",
      label: "TikTok",
      href: "https://www.tiktok.com/@growthoficial",
    },
    { id: "instagram", label: "Instagram", href: "" },
    { id: "youtube", label: "YouTube", href: "https://www.youtube.com/@foco_inabalavel-0" },
  ] satisfies SocialLink[],
};

export const privacySections = [
  {
    heading: "O que é esta página",
    body: "A página da Growth apresenta as ofertas. Não é uma área de membros e não pede cadastro.",
  },
  {
    heading: "Pagamento",
    body: "Para reembolso ou qualquer falha no pagamento, entre em contato com o suporte. Os dados de cartão não ficam nesta página.",
  },
  {
    heading: "O que esta página não faz",
    body: "Não há conta, carrinho próprio nem rastreamento de anúncios instalado por esta vitrine. O provedor que hospeda a página pode registrar acessos técnicos, como endereço de IP e horário, para manter o site no ar.",
  },
  {
    heading: "Avaliações",
    body: "Se você enviar uma avaliação pelo formulário, nome, e-mail e texto ficam nesse formulário, fora desta página. A Growth não guarda esses dados aqui.",
  },
  {
    heading: "Boas-vindas",
    body: "Se você responder às perguntas da primeira visita, as respostas ficam apenas neste navegador, para sugerir um material da página. Não são enviadas à Growth e não criam cadastro nem acompanhamento. Limpar os dados do site no navegador apaga essas respostas.",
  },
  {
    heading: "Contato",
    body: "Se um e-mail estiver publicado na página de contato, use-o para falar com o suporte, inclusive sobre reembolso ou falha no pagamento.",
  },
];

export const termsSections = [
  {
    heading: "As ofertas",
    body: "Cada produto descreve formato, conteúdo e preço antes da compra. Leia a página da oferta. O que não estiver escrito ali não faz parte da compra.",
  },
  {
    heading: "Compra",
    body: "O acesso, quando houver, segue para o e-mail usado na compra. Para reembolso ou falha no pagamento, entre em contato com o suporte.",
  },
  {
    heading: "Reembolso",
    body: "Reembolso e falha de pagamento são tratados pelo suporte. Esta página não cria outra regra.",
  },
  {
    heading: "Resultados",
    body: "Os materiais são ferramentas de organização, estudo ou apresentação. Usá-los não garante renda, audiência ou qualquer resultado específico.",
  },
  {
    heading: "Uso",
    body: "O conteúdo é para uso de quem comprou, salvo se a página do produto disser o contrário. Não revenda o arquivo como se fosse seu.",
  },
];

export const products: Product[] = [
  {
    id: "construa-em-silencio",
    slug: "construa-em-silencio",
    name: "Construa em Silêncio",
    category: "Disponível",
    shortDescription:
      "Um guia prático para desenvolver disciplina, vencer a procrastinação e transformar objetivos em ações.",
    description:
      "Você já teve grandes objetivos, fez planos para mudar de vida, mas acabou adiando o primeiro passo?\n\nEm Construa em Silêncio, você vai descobrir como diminuir a distância entre aquilo que deseja conquistar e aquilo que realmente faz. Mais do que motivação passageira, este livro propõe uma mudança de perspectiva: parar de depender da vontade e começar a construir resultados por meio de ações concretas.\n\nAo longo da leitura, você encontrará reflexões, exemplos práticos e estratégias para compreender a procrastinação, desenvolver disciplina, organizar prioridades e transformar intenções em compromissos reais.\n\nEste livro é para quem deseja evoluir, mas entende que o progresso exige mais do que apenas querer. Exige consistência, decisões conscientes e disposição para continuar mesmo quando a motivação não aparece.\n\nVocê não precisa provar seus planos para todo mundo. Precisa começar a colocá-los em prática.\n\nPare de apenas planejar. Comece a construir.\n\nConstrua em Silêncio. Sua evolução será percebida pelos resultados.",
    problem: "Adiar o primeiro passo depois de ter feito o plano.",
    images: ["/products/construa-em-silencio.jpg"],
    priceCents: 990,
    promoPriceCents: null,
    checkoutPlatform: null,
    checkoutUrl: "",
    available: true,
    order: 1,
    featured: true,
    example: false,
    includes: [
      "Reflexões sobre a distância entre o desejo e a ação",
      "Exemplos práticos",
      "Estratégias para compreender a procrastinação",
      "Caminhos para desenvolver disciplina e organizar prioridades",
      "Um modo de transformar intenções em compromissos",
    ],
    benefits: [
      "Olhar o plano sem depender só da motivação",
      "Entender a procrastinação com mais clareza",
      "Sair da intenção para um compromisso concreto",
    ],
    delivery:
      "Livro digital. Quando a compra estiver aberta, o acesso segue para o e-mail usado nela.",
    support,
    refund,
    faq: [
      {
        question: "Em que formato está o livro?",
        answer:
          "Livro digital. Quando o link de compra estiver publicado, o acesso segue para o e-mail usado na compra.",
      },
      {
        question: "O livro garante um resultado?",
        answer:
          "Não. Ele reúne reflexões, exemplos e estratégias. Ler o livro não garante renda, disciplina ou qualquer resultado específico.",
      },
      accountFaq,
    ],
  },
];

export const reviews: Review[] = [];

export function isHttpsUrl(value: string): boolean {
  try {
    return new URL(value.trim()).protocol === "https:";
  } catch {
    return false;
  }
}

export function visibleProducts(): Product[] {
  return products
    .filter((product) => product.available)
    .sort((a, b) => a.order - b.order);
}

export function productBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug && product.available);
}

export function canPurchase(product: Product): boolean {
  return (
    product.available &&
    !product.example &&
    product.checkoutPlatform !== null &&
    isHttpsUrl(product.checkoutUrl)
  );
}

export function activeSocials(): SocialLink[] {
  return site.socials.filter((item) => isHttpsUrl(item.href));
}

export function reviewsForProduct(productId: string): Review[] {
  return reviews.filter((review) => review.productId === productId);
}

export function reviewFormHref(): string | null {
  const url = site.reviewFormUrl.trim();
  return isHttpsUrl(url) ? url : null;
}
