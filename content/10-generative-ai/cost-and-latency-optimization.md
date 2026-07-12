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
last_reviewed: 2026-07-11
---
# Cost and Latency Optimization

Cost and latency optimization should target successful task completion, not the cheapest single model call. A [model serving](model-serving.md) plan must include retrieval, [context construction](context-construction.md), retries, validation, and user-visible streaming.

## Mechanism

For one request, latency is approximately critical-path time: $L=L_{queue}+L_{retrieval}+L_{first\ token}+L_{decode}+L_{validation}$. Cost accounting should record input tokens, output tokens, tool calls, reranks, cache hits, and failed retries. Route simple tasks differently from evidence-heavy [retrieval pipelines](retrieval-pipelines.md).

## Executed artifact

```python
steps = [("plan", 120), ("search", 350), ("read", 500), ("write", 420), ("verify", 260)]
print("AGENT_BUDGET")
print("total_tokens", sum(tokens for _, tokens in steps), "max_step", max(steps, key=lambda item: item[1]))
```

Observed output:

```text
AGENT_BUDGET
total_tokens 1650 max_step ('read', 500)
```

The trace totals 1,650 tokens across five steps, with `read` alone consuming 500 tokens. Optimizing `read` first has the largest single-step opportunity because it is about 30 percent of the token budget before generation even starts.

## Caveats

Shortening prompts can remove evidence and increase hallucinations. Aggressive batching can improve throughput while hurting tail latency or reproducibility.

## References

- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Cost optimization](https://platform.openai.com/docs/guides/cost-optimization)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
