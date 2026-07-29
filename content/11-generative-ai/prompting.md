---
title: Prompting
slug: generative-ai/prompting
description: "Specifying task, context, constraints, and examples in the model request."
area: generative-ai
topics:
  - prompting
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - in-context-learning.md
  - structured-output.md
  - context-construction.md
  - sampling-and-decoding.md
  - guardrails.md
  - prompt-injection.md
  - tool-use-and-function-calling.md
historical_context: false
last_reviewed: 2026-07-29
---

# Prompting

Prompting is the runtime interface for telling a model what task to perform. It includes instructions, examples for [in-context learning](in-context-learning.md), retrieved evidence from [context construction](context-construction.md), tool descriptions, and output constraints such as [structured output](structured-output.md). A prompt is an API surface: it should make inputs, authority, constraints, and outputs explicit.

## Anatomy of a prompt

A prompt should separate roles: system policy, developer instructions, user request, trusted evidence, and untrusted data. The model then estimates the next-token distribution conditioned on that sequence, and [sampling and decoding](sampling-and-decoding.md) turns it into output.

| Prompt part       | Purpose                                  | Failure when unclear                     |
| ----------------- | ---------------------------------------- | ---------------------------------------- |
| Role and task     | tells the model what job to perform      | generic answer or wrong level of detail  |
| Evidence boundary | separates trusted sources from user text | prompt injection or unsupported claims   |
| Output contract   | defines schema, tone, length, citations  | hard-to-parse or incomplete output       |
| Examples          | demonstrate edge cases or style          | overfitting to example content           |
| Refusal rule      | defines when not to answer               | fabricated answer under missing evidence |

Good prompting is not magic wording. It is interface design: make the task, inputs, constraints, and output contract explicit enough that the model does not have to infer hidden requirements.

## Prompt design rules

- Put durable policy and role instructions in the highest-priority instruction channel available.
- Separate trusted instructions from untrusted documents, tickets, emails, or web pages.
- State the task and output contract before long evidence when possible.
- Include only examples that represent real edge cases.
- Use [structured output](structured-output.md) when downstream software consumes the answer.
- Prefer explicit abstention conditions over vague warnings.
- Keep prompts versioned when they feed production workflows.

## An example prompt

```text
SYSTEM: Answer only from SOURCES. If unsupported, say so.
USER: What approval is needed for a 700 EUR refund?
SOURCES:
[policy-7] Manager approval is required above 500 EUR.
OUTPUT: JSON with answer and citations.
```

The example is short, but it includes the important boundaries: answer from sources, say when unsupported, and return parseable JSON with citations. A production version would also include source IDs, schema version, allowed tools, and a policy for missing evidence.

## Bad prompt, better prompt

Bad:

```text
Answer the customer. Be helpful and safe.
```

Better:

```text
Answer the customer's refund-policy question using only SOURCES.
If SOURCES do not state the approval threshold, say that evidence is missing.
Return JSON: { "answer": string, "citations": string[], "needs_human_review": boolean }.
Do not issue refunds or promise approval.
```

The better prompt does not rely on tone words. It states evidence boundaries, output shape, abstention behavior, and action limits. Access control and tool permissions still belong outside the prompt.

## Evaluation

Prompt changes are code changes. Test them on ordinary cases, missing-evidence cases, adversarial [prompt injection](prompt-injection.md), long-context cases, and examples that require refusal or escalation. Record prompt version, model version, and decoding parameters so regressions can be traced.

## Caveats

Prompt wording can hide policy conflicts. A prompt is not an access-control system; enforce permissions and schema checks outside the model. Treat untrusted documents, webpages, emails, and tickets as data, not instructions; otherwise prompt injection can override the intended task. Longer prompts are not automatically better; they can bury the actual task and waste context.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← In-Context Learning](in-context-learning.md) [Sampling and Decoding →](sampling-and-decoding.md)
