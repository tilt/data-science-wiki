---
title: Local Versus Hosted Models
slug: generative-ai/local-versus-hosted-models
description: "Trade-offs between self-run model deployments and provider-hosted APIs."
area: generative-ai
topics:
  - local-versus-hosted-models
level: intermediate
status: review
page_type: comparison
aliases: []
prerequisites:
  - index.md
related:
  - model-serving.md
  - quantization.md
  - cost-and-latency-optimization.md
  - data-privacy.md
  - determinism-and-reproducibility.md
historical_context: false
last_reviewed: 2026-07-11
---
# Local Versus Hosted Models

Local models run in infrastructure you control; hosted models run behind a provider API. The choice affects [model serving](model-serving.md), [data privacy](data-privacy.md), observability, upgrade cadence, and [cost and latency optimization](cost-and-latency-optimization.md).

## Decision mechanism

Compare the full workload: input/output volume, latency target, privacy class, reliability, context length, required tools, and operator skill. Local serving may need [quantization](quantization.md), batching, GPU memory management, and model lifecycle work. Hosted serving may simplify operations but requires provider contracts and drift monitoring for [determinism and reproducibility](determinism-and-reproducibility.md).

## Concrete artifact

```yaml
route:
  pii_heavy_batch_extraction: local_model
  public_chat_with_web_search: hosted_model
checks:
  - latency_p95
  - quality_regression
  - data_retention_policy
```

## Caveats

Local is not automatically private if logs, prompts, or vector indexes are mishandled. Hosted is not automatically expensive if caching and routing avoid unnecessary large-model calls.

## References

- [OpenAI platform documentation: Data controls](https://platform.openai.com/docs/guides/your-data)
- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Cost optimization](https://platform.openai.com/docs/guides/cost-optimization)
