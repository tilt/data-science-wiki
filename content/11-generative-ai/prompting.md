---
title: Prompting
slug: generative-ai/prompting
description: "Specifying task, context, constraints, and examples in the model request."
area: generative-ai
topics:
  - prompting
level: foundational
status: review
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
historical_context: false
last_reviewed: 2026-07-11
---
# Prompting

Prompting is the runtime interface for telling a model what task to perform. It includes instructions, examples for [in-context learning](in-context-learning.md), retrieved evidence from [context construction](context-construction.md), tool descriptions, and output constraints such as [structured output](structured-output.md).

## Mechanism

A prompt should separate roles: system policy, developer instructions, user request, trusted evidence, and untrusted data. The model then estimates the next-token distribution conditioned on that sequence, and [sampling and decoding](sampling-and-decoding.md) turns it into output.

## Concrete artifact

```text
SYSTEM: Answer only from SOURCES. If unsupported, say so.
USER: What approval is needed for a 700 EUR refund?
SOURCES:
[policy-7] Manager approval is required above 500 EUR.
OUTPUT: JSON with answer and citations.
```

## Caveats

Prompt wording can hide policy conflicts. A prompt is not an access-control system; enforce permissions and schema checks outside the model.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [OpenAI API documentation: Structured outputs](https://platform.openai.com/docs/guides/structured-outputs)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
