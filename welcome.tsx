import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { products } from "@/data/catalog";
import {
  canContinue,
  emptyAnswers,
  nextStep,
  questions,
  readWelcome,
  writeWelcome,
  type Answers,
  type NextStep,
} from "@/data/welcome";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/cn";

type Step = "intro" | number | "thanks";

function noteValue(questionId: string, answers: Answers) {
  if (questionId === "challenge") return answers.challengeNote;
  if (questionId === "goal") return answers.goalNote;
  return "";
}

function withNote(questionId: string, answers: Answers, value: string): Answers {
  if (questionId === "challenge") return { ...answers, challengeNote: value };
  if (questionId === "goal") return { ...answers, goalNote: value };
  return answers;
}

export function WelcomeDialog() {
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);

  useEffect(() => {
    const saved = readWelcome();
    if (!saved) {
      setOpen(true);
      return;
    }
    if (saved.status !== "progress") return;
    setAnswers(saved.answers ?? emptyAnswers());
    setStep(saved.step === "thanks" || typeof saved.step === "number" ? saved.step : "intro");
    setOpen(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    writeWelcome({
      status: "progress",
      step: step === "thanks" ? "thanks" : step,
      answers,
    });
  }, [open, step, answers]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panelRef.current?.focus();
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open, step]);

  if (!open) return null;

  const questionIndex = typeof step === "number" ? step : -1;
  const question = questionIndex >= 0 ? questions[questionIndex] : null;
  const showNote =
    question?.note === "always" || (question?.note === "outro" && answers.challenge === "outro");

  function dismiss() {
    writeWelcome({ status: "dismissed" });
    setOpen(false);
  }

  function select(questionId: "moment" | "challenge" | "goal" | "help", optionId: string) {
    setAnswers((current) => ({ ...current, [questionId]: optionId }));
  }

  function skip() {
    if (questionIndex < 0) return;
    const questionId = questions[questionIndex].id;
    setAnswers((current) => ({ ...current, [questionId]: null }));
    setStep(questionIndex === questions.length - 1 ? "thanks" : questionIndex + 1);
  }

  function finish() {
    writeWelcome({ status: "completed", answers });
    setOpen(false);
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key === "Escape") {
      event.preventDefault();
      return;
    }
    if (event.key !== "Tab" || !panelRef.current) return;
    const nodes = [
      ...panelRef.current.querySelectorAll<HTMLElement>("button, textarea, a[href]"),
    ].filter((node) => !node.hasAttribute("disabled"));
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (!first || !last) return;
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center sm:p-6">
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        onKeyDown={onKeyDown}
        className="max-h-[100dvh] w-full overflow-y-auto border border-line bg-surface px-5 pt-6 pb-safe outline-none sm:max-h-[min(44rem,90dvh)] sm:max-w-lg sm:pb-6"
      >
        {step === "intro" ? (
          <>
            <h2 id={titleId} className="font-display text-3xl leading-tight">
              Antes de começar, queremos conhecer você melhor.
            </h2>
            <p className="mt-4 text-muted">
              Cada pessoa está em uma fase diferente da sua jornada. Responda algumas perguntas
              rápidas para nos ajudar a entender seus objetivos e tornar sua experiência mais
              relevante.
            </p>
            <p className="mt-3 text-sm text-faint">
              As respostas ficam só neste aparelho. Não pedimos nome, telefone nem e-mail, e isso
              não cria um acompanhamento pessoal.
            </p>
            <div className="mt-6 flex flex-col gap-2">
              <button type="button" className={buttonVariants({ variant: "primary", full: true })} onClick={() => setStep(0)}>
                Vamos começar
              </button>
              <button type="button" className={buttonVariants({ variant: "secondary", full: true })} onClick={dismiss}>
                Prefiro explorar o site
              </button>
            </div>
          </>
        ) : null}

        {question ? (
          <>
            <p className="text-xs tracking-widest text-faint uppercase">
              Pergunta {questionIndex + 1} de {questions.length}
            </p>
            <div
              className="mt-3 h-0.5 w-full bg-line"
              role="progressbar"
              aria-valuemin={1}
              aria-valuemax={questions.length}
              aria-valuenow={questionIndex + 1}
              aria-valuetext={`Pergunta ${questionIndex + 1} de ${questions.length}`}
            >
              <div
                className="h-0.5 bg-paper"
                style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
            <h2 id={titleId} className="mt-5 font-display text-3xl leading-tight">
              {question.prompt}
            </h2>
            <div className="mt-5 flex flex-col gap-2" role="group" aria-label={question.prompt}>
              {question.options.map((option) => {
                const selected = answers[question.id] === option.id;
                return (
                  <button
                    key={option.id}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => select(question.id, option.id)}
                    className={cn(
                      "min-h-12 border px-4 py-3 text-left text-sm",
                      selected ? "border-paper bg-surface-2" : "border-line",
                    )}
                  >
                    {option.label}
                  </button>
                );
              })}
            </div>
            {showNote ? (
              <label className="mt-4 block text-sm text-muted">
                {question.noteLabel}
                <textarea
                  value={noteValue(question.id, answers)}
                  maxLength={160}
                  rows={3}
                  onChange={(event) =>
                    setAnswers((current) => withNote(question.id, current, event.target.value))
                  }
                  className="mt-2 w-full resize-none border border-line bg-bg px-3 py-3 text-base text-fg"
                />
              </label>
            ) : null}
            <div className="mt-6 flex flex-col gap-2">
              <button
                type="button"
                disabled={!canContinue(question, answers)}
                className={buttonVariants({ variant: "primary", full: true })}
                onClick={() =>
                  setStep(questionIndex === questions.length - 1 ? "thanks" : questionIndex + 1)
                }
              >
                Continuar
              </button>
              <button type="button" className={buttonVariants({ variant: "secondary", full: true })} onClick={skip}>
                Pular esta pergunta
              </button>
              <button
                type="button"
                className="inline-flex min-h-12 items-center justify-center text-sm text-muted"
                onClick={() => setStep(questionIndex === 0 ? "intro" : questionIndex - 1)}
              >
                Voltar
              </button>
            </div>
          </>
        ) : null}

        {step === "thanks" ? (
          <>
            <h2 id={titleId} className="font-display text-3xl leading-tight">
              Obrigado por compartilhar um pouco da sua jornada.
            </h2>
            <p className="mt-4 text-muted">
              Seu progresso não precisa acontecer de uma vez. O importante é entender onde você está
              e dar o próximo passo. A Growth Growvia está aqui para ajudar você a transformar objetivos em
              ações.
            </p>
            <p className="mt-3 text-sm text-faint">
              Pode seguir pela página no seu ritmo. Não há acompanhamento pessoal e nenhuma
              resposta promete resultado.
            </p>
            <div className="mt-6">
              <button type="button" className={buttonVariants({ variant: "primary", full: true })} onClick={finish}>
                Continuar no site
              </button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

export function NextStepSection() {
  const [result, setResult] = useState<NextStep | null>(null);
  const hash = useRouterState({ select: (state) => state.location.hash });

  useEffect(() => {
    const sync = () => {
      const saved = readWelcome();
      if (saved?.status !== "completed" || !saved.answers) {
        setResult(null);
        return;
      }
      setResult(nextStep(saved.answers));
    };
    sync();
    window.addEventListener("growth-welcome", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("growth-welcome", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  useEffect(() => {
    if (!result || hash !== "proximo") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.getElementById("proximo")?.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
  }, [result, hash]);

  if (!result) return null;

  const suggestions = result.suggestions.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ ...item, product }] : [];
  });

  return (
    <section id="proximo" aria-labelledby="proximo-titulo" className="mt-32 scroll-mt-24 border-t border-line pt-16 md:mt-40">
      <h2 id="proximo-titulo" className="text-xs tracking-widest text-faint uppercase">
        Seu próximo passo
      </h2>
      <p className="mt-4 text-base">{result.summary}</p>
      {result.echo.map((line) => (
        <p key={line} className="mt-3 text-sm text-muted">
          Você escreveu: “{line}”
        </p>
      ))}
      {suggestions.length > 0 ? (
        <ul className="mt-5 flex flex-col gap-3">
          {suggestions.map((item) => (
            <li key={item.productId}>
              <Link
                to="/produto/$slug"
                params={{ slug: item.product.slug }}
                className="block border border-line px-4 py-4"
              >
                <span className="text-sm font-medium">{item.product.name}</span>
                <span className="mt-1 block text-sm text-muted">{item.why}</span>
                {item.product.example ? (
                  <span className="mt-2 block text-xs text-faint">
                    Exemplo de catálogo. Ainda não está à venda.
                  </span>
                ) : null}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <a href="#produtos" className="mt-5 inline-flex min-h-12 items-center text-sm underline underline-offset-4">
          Ver os materiais
        </a>
      )}
      <p className="mt-5 text-sm text-faint">
        Sugestão feita neste aparelho, a partir das suas respostas. Não é um acompanhamento pessoal
        e não garante resultado.
      </p>
    </section>
  );
}
