export const WELCOME_KEY = "growth-welcome-v1";

export type Answers = {
  moment: string | null;
  challenge: string | null;
  challengeNote: string;
  goal: string | null;
  goalNote: string;
  help: string | null;
};

export type WelcomeRecord = {
  status: "dismissed" | "completed" | "progress";
  answers?: Answers;
  /** Pergunta atual (0–3), a introdução ou a tela final, quando o guia ainda não foi concluído. */
  step?: number | "intro" | "thanks";
};

export type WelcomeQuestion = {
  id: "moment" | "challenge" | "goal" | "help";
  prompt: string;
  options: { id: string; label: string }[];
  note: "always" | "outro" | "none";
  noteLabel: string;
};

export const emptyAnswers = (): Answers => ({
  moment: null,
  challenge: null,
  challengeNote: "",
  goal: null,
  goalNote: "",
  help: null,
});

export const questions: WelcomeQuestion[] = [
  {
    id: "moment",
    prompt: "O que você mais gostaria de melhorar neste momento?",
    note: "none",
    noteLabel: "",
    options: [
      { id: "disciplina", label: "Minha disciplina e consistência." },
      { id: "foco", label: "Minha capacidade de manter o foco." },
      { id: "tarefas", label: "Minha dificuldade em começar e terminar tarefas." },
      { id: "organizacao", label: "Minha organização e produtividade." },
      { id: "evolucao", label: "Meu desenvolvimento pessoal e financeiro." },
      { id: "caminho", label: "Ainda estou tentando descobrir meu caminho." },
    ],
  },
  {
    id: "challenge",
    prompt: "O que mais costuma dificultar seu progresso?",
    note: "outro",
    noteLabel: "Se quiser, diga qual é o outro desafio.",
    options: [
      { id: "procrastinacao", label: "Procrastinação." },
      { id: "consistencia", label: "Falta de motivação ou consistência." },
      { id: "distracoes", label: "Distrações em excesso." },
      { id: "medo", label: "Medo de falhar ou começar." },
      { id: "objetivos", label: "Dificuldade para organizar meus objetivos." },
      { id: "outro", label: "Outro desafio." },
    ],
  },
  {
    id: "goal",
    prompt: "O que você gostaria de conquistar nos próximos meses?",
    note: "always",
    noteLabel: "Se quiser, escreva em uma frase. É opcional.",
    options: [
      { id: "concluir", label: "Concluir o que eu começo." },
      { id: "semana", label: "Organizar a semana com clareza." },
      { id: "revisar", label: "Revisar o que já fiz e escolher o próximo passo." },
      { id: "oferta", label: "Descrever melhor o que eu ofereço." },
      { id: "definir", label: "Ainda estou definindo." },
    ],
  },
  {
    id: "help",
    prompt: "Que tipo de material seria mais útil para você?",
    note: "none",
    noteLabel: "",
    options: [
      { id: "disciplina_guias", label: "Guias práticos para desenvolver disciplina." },
      { id: "foco_conteudo", label: "Conteúdos sobre foco e produtividade." },
      { id: "acoes", label: "Estratégias para transformar objetivos em ações." },
      { id: "mentalidade", label: "Conteúdos sobre mentalidade e evolução pessoal." },
      { id: "financeiro", label: "Materiais sobre crescimento e desenvolvimento financeiro." },
    ],
  },
];

const book = "construa-em-silencio";

const points: Record<string, [string, number][]> = {
  disciplina: [[book, 3]],
  foco: [[book, 3]],
  tarefas: [[book, 3]],
  organizacao: [[book, 3]],
  evolucao: [[book, 2]],
  caminho: [[book, 2]],
  procrastinacao: [[book, 3]],
  consistencia: [[book, 3]],
  distracoes: [[book, 2]],
  medo: [[book, 3]],
  objetivos: [[book, 3]],
  concluir: [[book, 3]],
  semana: [[book, 2]],
  revisar: [[book, 2]],
  definir: [[book, 2]],
  disciplina_guias: [[book, 3]],
  foco_conteudo: [[book, 2]],
  acoes: [[book, 3]],
  mentalidade: [[book, 2]],
};

const summaryBySignal: Record<string, string> = {
  disciplina:
    "Você quer melhorar disciplina e consistência. O livro disponível trata disso: menos dependência da vontade e mais ação concreta.",
  foco: "Você quer manter o foco. O livro não é um manual só de atenção. Ele trata de disciplina, prioridades e de transformar intenção em ação.",
  tarefas:
    "Você quer começar e terminar. O livro propõe diminuir a distância entre o plano e o primeiro passo.",
  organizacao:
    "Você quer organizar prioridades. É um dos temas do livro, junto com disciplina e procrastinação.",
  evolucao:
    "Você marcou desenvolvimento pessoal e financeiro. O livro trata da evolução pela ação. Não é um material de finanças.",
  caminho:
    "Você ainda está entendendo o caminho. O livro não escolhe o destino. Ele trata de começar a colocar em prática o que você já deseja.",
  procrastinacao:
    "Você apontou a procrastinação. O livro disponível trata de compreender esse adiamento e sair do plano para a ação.",
  consistencia:
    "Você marcou falta de motivação ou consistência. O livro parte da ideia de continuar mesmo quando a vontade não aparece.",
  distracoes:
    "Você marcou distrações. O livro não ensina a bloquear o celular. Ele trata de prioridades, disciplina e de sair do planejamento.",
  medo: "Medo de falhar ou de começar aparece, muitas vezes, como adiar o primeiro passo. É desse intervalo que o livro trata.",
  objetivos:
    "Você quer organizar objetivos. O livro fala em prioridades e em transformar intenção em compromisso.",
  concluir:
    "Você quer concluir o que começa. O livro trata de sair do plano e começar a construir, com consistência em vez de motivação passageira.",
  semana:
    "Você quer organizar a semana. Não há um planner nesta página. O livro disponível trata de disciplina e de transformar objetivos em ações.",
  revisar:
    "Não há uma rotina de revisão nesta página. O livro disponível trata de disciplina, procrastinação e de colocar planos em prática.",
  definir:
    "O objetivo ainda está em aberto. O livro não escolhe o caminho por você. Ele trata de começar a praticar o que você já deseja.",
  disciplina_guias:
    "Você pediu um guia prático de disciplina. É isso que Construa em Silêncio se propõe a ser.",
  foco_conteudo:
    "Você pediu material sobre foco e produtividade. O livro trata de disciplina, prioridades e ação, não de uma técnica isolada de foco.",
  acoes: "Você quer transformar objetivo em ação. É o tema central do livro.",
  mentalidade:
    "Você pediu mentalidade e evolução. O livro propõe uma mudança de perspectiva: menos dependência da vontade, mais ação. O canal Foco Inabalável também publica conteúdo nesse campo.",
  oferta:
    "Nesta página não há um roteiro para descrever uma oferta. O livro disponível trata de disciplina e de transformar objetivos em ações.",
  financeiro:
    "Não há nesta página um material de finanças pessoais. O livro disponível trata de disciplina, procrastinação e ação, e não promete renda.",
};

const whyByProduct: Record<string, string> = {
  [book]:
    "Um guia prático para desenvolver disciplina, vencer a procrastinação e transformar objetivos em ações.",
};

const productOrder = [book];

export type Suggestion = {
  productId: string;
  why: string;
};

export type NextStep = {
  summary: string;
  suggestions: Suggestion[];
  echo: string[];
};

function signals(answers: Answers): string[] {
  return [answers.challenge, answers.moment, answers.goal, answers.help].filter(
    (value): value is string => Boolean(value) && value !== "outro",
  );
}

export function nextStep(answers: Answers): NextStep {
  const echo = [
    answers.challenge === "outro" ? answers.challengeNote.trim() : "",
    answers.goalNote.trim(),
  ].filter((line) => line.length > 0);

  const chosen = signals(answers);
  if (chosen.length === 0) {
    return {
      summary: echo.length
        ? "Você deixou um recado, mas pulou as opções. Não transformamos esse texto numa recomendação automática."
        : "Você pulou as perguntas. Os materiais estão na página, sem uma sugestão específica.",
      suggestions: [],
      echo,
    };
  }

  const lead = chosen[0] ?? "";
  const fromLead = (productId: string) =>
    (points[lead] ?? []).find(([id]) => id === productId)?.[1] ?? 0;

  const totals = new Map<string, number>();
  for (const id of chosen) {
    for (const [productId, weight] of points[id] ?? []) {
      totals.set(productId, (totals.get(productId) ?? 0) + weight);
    }
  }

  const ranked = [...totals.entries()]
    .filter(([, score]) => score >= 2)
    .sort(
      (a, b) =>
        b[1] - a[1] ||
        fromLead(b[0]) - fromLead(a[0]) ||
        productOrder.indexOf(a[0]) - productOrder.indexOf(b[0]),
    )
    .slice(0, 2);

  return {
    summary:
      summaryBySignal[lead] ??
      "A partir do que você marcou, estes são os materiais mais próximos do que a página realmente oferece.",
    suggestions: ranked.map(([productId]) => ({
      productId,
      why: whyByProduct[productId] ?? "",
    })),
    echo,
  };
}

export function canContinue(question: WelcomeQuestion, answers: Answers): boolean {
  const selected = answers[question.id];
  if (selected) return true;
  if (question.id === "goal" && answers.goalNote.trim().length > 0) return true;
  return false;
}

function normalizeAnswers(value: unknown): Answers {
  const blank = emptyAnswers();
  if (!value || typeof value !== "object") return blank;
  const item = value as Partial<Answers>;
  const text = (entry: unknown) => (typeof entry === "string" ? entry.slice(0, 160) : "");
  const choice = (entry: unknown) => (typeof entry === "string" && entry.length > 0 ? entry : null);
  return {
    moment: choice(item.moment),
    challenge: choice(item.challenge),
    challengeNote: text(item.challengeNote),
    goal: choice(item.goal),
    goalNote: text(item.goalNote),
    help: choice(item.help),
  };
}

export function parseWelcome(raw: string): WelcomeRecord | null {
  try {
    const data = JSON.parse(raw) as WelcomeRecord;
    if (data?.status === "dismissed" || data?.status === "completed") return data;
    if (data?.status !== "progress") return null;
    const step = data.step;
    const valid =
      step === "intro" ||
      step === "thanks" ||
      (typeof step === "number" && step >= 0 && step < questions.length);
    if (!valid) return { status: "progress", step: "intro", answers: normalizeAnswers(data.answers) };
    return { status: "progress", step, answers: normalizeAnswers(data.answers) };
  } catch {
    return null;
  }
}

export function readWelcome(): WelcomeRecord | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(WELCOME_KEY);
    if (!raw) return null;
    return parseWelcome(raw);
  } catch {
    return null;
  }
}

export function writeWelcome(record: WelcomeRecord) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(WELCOME_KEY, JSON.stringify(record));
    window.dispatchEvent(new Event("growth-welcome"));
  } catch {
    /* o aparelho pode bloquear o armazenamento; a visita segue sem a sugestão */
  }
}
