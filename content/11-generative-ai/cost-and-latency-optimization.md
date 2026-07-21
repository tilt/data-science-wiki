---
title: Cost and Latency Optimization
slug: generative-ai/cost-and-latency-optimization
description: "Reducing time and resource use per successful generative-AI task."
area: generative-ai
topics:
  - cost-and-latency-optimization
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - model-serving.md
  - local-versus-hosted-models.md
  - context-construction.md
  - retrieval-pipelines.md
  - determinism-and-reproducibility.md
historical_context: false
last_reviewed: 2026-07-20
---

# Cost and Latency Optimization

Cost and latency optimization should target successful task completion, not the cheapest single model call. A [model serving](model-serving.md) plan must include retrieval, [context construction](context-construction.md), retries, validation, and user-visible streaming.

## Measuring cost and latency

For one request, latency is approximately critical-path time: $L=L_{queue}+L_{retrieval}+L_{first\ token}+L_{decode}+L_{validation}$. Cost accounting should record input tokens, output tokens, tool calls, reranks, cache hits, and failed retries. Route simple tasks differently from evidence-heavy [retrieval pipelines](retrieval-pipelines.md).

## Levers

Once the trace is measured, the main levers, roughly by payoff:

| Lever                                 | Cuts                 | Cost or risk                                |
| ------------------------------------- | -------------------- | ------------------------------------------- |
| Caching (prompt, embedding, response) | repeated work        | staleness; needs cache-key discipline       |
| Model routing / cascade               | tokens on easy tasks | a small model may fail; needs a fallback    |
| Context trimming                      | input tokens         | dropping evidence raises hallucination risk |
| Batching                              | throughput cost      | worse tail latency                          |
| Streaming                             | _perceived_ latency  | complicates validation of partial output    |

Streaming does not reduce total work but shows first tokens sooner, which is often what "feels fast" to a user.

## Worked budget table

| Step   | Tokens | Share of total |
| ------ | -----: | -------------: |
| Plan   |    120 |           7.3% |
| Search |    350 |          21.2% |
| Read   |    500 |          30.3% |
| Write  |    420 |          25.5% |
| Verify |    260 |          15.8% |

The trace totals 1,650 tokens across five steps, with `read` alone consuming 500 tokens. Optimizing `read` first has the largest single-step opportunity because it is about 30 percent of the token budget before generation even starts.

## Caveats

Shortening prompts can remove evidence and increase hallucinations. Aggressive batching can improve throughput while hurting tail latency or reproducibility.

## References

- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Cost optimization](https://platform.openai.com/docs/guides/cost-optimization)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Quantization](quantization.md) [Guardrails →](guardrails.md)
