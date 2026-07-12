---
title: Knowledge Gaps
slug: interview-preparation/knowledge-gaps
description: Study backlog for interview concepts that need deeper canonical coverage or more practice.
area: interview-preparation
topics:
  - knowledge-gaps
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - answer-patterns.md
  - prototype-answers.md
  - interview-examples.md
  - evaluation.md
  - generative-ai.md
  - recommendation-systems.md
  - time-series-forecasting.md
historical_context: false
last_reviewed: 2026-07-11
---
# Knowledge Gaps

## Purpose

Knowledge-gap tracking converts vague interview anxiety into a study backlog tied to canonical wiki pages. Each gap should name the prompt, the missing concept, the page to review, and the evidence that the gap is closed: a concise answer, a worked scenario, or a follow-up the reader can answer without notes.

## Current section audit

No blocking concept gap was found while rebuilding this section. The interview pages could be aligned with existing canonical pages for [tool use](../10-generative-ai/tool-use-and-function-calling.md), [temperature and determinism](../10-generative-ai/temperature-and-determinism.md), [SVD versus matrix factorization](../04-recommendation-systems/svd-versus-matrix-factorization.md), [world models and JEPA](../09-video-understanding/world-models-and-jepa.md), [forecast backtesting](../05-time-series-and-forecasting/backtesting.md), and [evaluation](evaluation.md).

One local quality note remains: some referenced canonical pages outside this section are much deeper than others. In particular, the time-series fundamentals and rolling-origin pages are useful, but they are shorter than the rebuilt interview pages. That is not a contradiction, so it is not recorded as a blocking gap for this section.

## Gap record template

| Prompt | Missing concept | Canonical page | Closure artifact |
| --- | --- | --- | --- |
| "Why did the recommender fail for new items?" | Cold-start fallback and segment evaluation. | [Cold Start Problem](../04-recommendation-systems/cold-start-problem.md) | Explain one retrieval fallback and one online guardrail. |
| "How do I make an LLM tool call safe?" | Tool permissions and schema validation. | [Tool Use and Function Calling](../10-generative-ai/tool-use-and-function-calling.md) | Give a JSON-like tool schema plus an authorization check. |
| "Why is random split wrong for forecasts?" | Temporal leakage and rolling origins. | [Backtesting](../05-time-series-and-forecasting/backtesting.md) | Describe two historical forecast origins and horizon-specific metrics. |

## Practice rule

Use [Prototype Answers](prototype-answers.md) to choose a prompt, [Answer Patterns](answer-patterns.md) to shape the answer, and [Interview Examples](interview-examples.md) to attach a concrete scenario. A gap is closed only when the answer survives at least one follow-up.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
