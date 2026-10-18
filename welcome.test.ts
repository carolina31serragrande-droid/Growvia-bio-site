import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { emptyAnswers, nextStep, parseWelcome } from "./welcome.ts";

describe("nextStep", () => {
  it("não sugere material quando tudo foi pulado", () => {
    const result = nextStep(emptyAnswers());
    assert.equal(result.suggestions.length, 0);
    assert.match(result.summary, /pulou/);
  });

  it("liga procrastinação ao livro, sem pressionar compra", () => {
    const answers = { ...emptyAnswers(), challenge: "procrastinacao" };
    const result = nextStep(answers);
    assert.equal(result.suggestions[0]?.productId, "construa-em-silencio");
    assert.match(result.summary, /procrastinação/i);
    assert.doesNotMatch(result.summary, /garant/i);
  });

  it("não trata desenvolvimento financeiro como curso de finanças", () => {
    const answers = { ...emptyAnswers(), help: "financeiro" };
    const result = nextStep(answers);
    assert.equal(result.suggestions.length, 0);
    assert.match(result.summary, /não há nesta página um material de finanças/i);
  });

  it("sugere o livro quando o medo de começar é o sinal mais forte", () => {
    const answers = { ...emptyAnswers(), challenge: "medo", help: "foco_conteudo" };
    const result = nextStep(answers);
    assert.equal(result.suggestions[0]?.productId, "construa-em-silencio");
  });

  it("guarda a frase escrita sem usá-la como recomendação automática", () => {
    const answers = { ...emptyAnswers(), goalNote: "Quero terminar o curso." };
    const result = nextStep(answers);
    assert.deepEqual(result.suggestions, []);
    assert.deepEqual(result.echo, ["Quero terminar o curso."]);
  });
});

describe("parseWelcome", () => {
  it("retoma a pergunta em que a pessoa parou", () => {
    const saved = parseWelcome(
      JSON.stringify({
        status: "progress",
        step: 2,
        answers: { ...emptyAnswers(), moment: "foco" },
      }),
    );
    assert.equal(saved?.status, "progress");
    assert.equal(saved?.step, 2);
    assert.equal(saved?.answers?.moment, "foco");
  });

  it("não reabre um guia que já foi concluído", () => {
    const saved = parseWelcome(JSON.stringify({ status: "completed" }));
    assert.equal(saved?.status, "completed");
  });
});
