---
title: Hallucinations
slug: responsible-ai-safety-and-governance/hallucinations
description: "Unsupported generated content and controls that reduce it."
area: responsible-ai-safety-and-governance
topics:
  - hallucinations
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - factual-correctness.md
  - prompt-injection.md
  - error-taxonomies.md
  - adversarial-evaluation.md
  - ../11-generative-ai/hallucination-mitigation.md
  - ../11-generative-ai/grounding.md
historical_context: false
last_reviewed: 2026-07-11
---

# Hallucinations

Hallucinations are generated statements that are unsupported, fabricated, or misleading relative to the task evidence. The governance problem is not that a model "sounds creative"; it is that users may treat fluent unsupported text as fact. The control surface overlaps with [factual correctness](factual-correctness.md), [prompt injection](prompt-injection.md), and [hallucination mitigation](../11-generative-ai/hallucination-mitigation.md).

## Mechanism

A hallucination review should classify each unsupported output by where the failure entered:

| Failure point              | Example                                          | Likely fix                                                                |
| -------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------- |
| Retrieval miss             | Correct document absent from context             | Improve [grounding](../11-generative-ai/grounding.md) and retrieval tests |
| Context misuse             | Evidence present but ignored                     | Prompt and decoding regression tests                                      |
| Unsupported synthesis      | Model combines facts into an unstated conclusion | Claim-level citation checks                                               |
| Knowledge boundary failure | Model answers when source is silent              | Abstention policy                                                         |
| Attack-induced claim       | Retrieved text instructs model to lie            | [Adversarial evaluation](adversarial-evaluation.md)                       |

This is why "use RAG" is not a complete hallucination control. Retrieval can reduce uncertainty, but the answer still needs claim-level support and an abstention path.

## Worked abstention comparison

A four-question review compares a baseline answer policy with an abstention policy:

| question type           | baseline supported? | abstention policy supported? |
| ----------------------- | ------------------: | ---------------------------: |
| refund window           |                 yes |                          yes |
| dental surgery coverage |                  no |                yes, abstains |
| fax cancellation        |                  no |                yes, abstains |
| admin MFA               |                 yes |                          yes |

The baseline has 2 unsupported claims out of 4 answers, so its unsupported-claim rate is 0.50. The abstention policy has 0 unsupported claims out of 4 reviewed outputs because it replaces two guesses with "I cannot determine..." responses. That improves factuality but may reduce apparent helpfulness, so the metric should be reported beside coverage and user escalation rates in the [error taxonomy](error-taxonomies.md).

## Caveats

Unsupported claim rate depends on the evidence standard. A legal assistant, support bot, and brainstorming tool should not share one threshold. Also watch for citation laundering: a model can attach a real citation to a claim the source does not support. Store prompts, retrieved passages, output, and reviewer labels so [auditability](auditability.md) can reproduce the failure.

## References

- [NIST AI 600-1: Generative AI Profile](https://nvlpubs.nist.gov/nistpubs/ai/NIST.AI.600-1.pdf)
- [Ji et al., Survey of Hallucination in Natural Language Generation](https://arxiv.org/abs/2202.03629)
- [OWASP LLM09:2025 Misinformation](https://genai.owasp.org/llmrisk/llm092025-misinformation/)

> [!nav]
> **Section** — [Responsible AI, Safety, and Governance](index.md)
>
> [← Factual Correctness](factual-correctness.md) [Error Taxonomies →](error-taxonomies.md)
