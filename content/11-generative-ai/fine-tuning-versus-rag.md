---
title: Fine Tuning Versus RAG
slug: generative-ai/fine-tuning-versus-rag
description: "When to change model behavior through training versus supplying external evidence at runtime."
area: generative-ai
topics:
  - fine-tuning-versus-rag
level: intermediate
status: review
page_type: comparison
aliases: []
prerequisites:
  - index.md
related:
  - rag.md
  - instruction-tuning.md
  - pretraining.md
  - embeddings.md
  - retrieval-pipelines.md
historical_context: false
last_reviewed: 2026-07-11
---

# Fine Tuning Versus RAG

Fine-tuning changes model behavior or parameters. [RAG](rag.md) changes the evidence available at request time. They are complementary: [instruction tuning](instruction-tuning.md) can teach format and domain behavior, while [retrieval pipelines](retrieval-pipelines.md) supply current or private facts. Parameter-efficient adapters such as [LoRA](../06-deep-learning/fine-tuning.md#lora-footprint) reduce the training and storage footprint by freezing the base model and training a small low-rank update.

## Decision mechanism

Use fine-tuning when the failure is stable behavior: style, output shape, classification policy, or repeated task procedure. Use RAG when the failure is missing knowledge, stale knowledge, or auditable citation. A compact rule is: train behavior, retrieve facts. [Embeddings](embeddings.md) and rerankers make the retrieval side testable without changing the base model.

## Concrete artifact

| Symptom                                 | Better first lever             |
| --------------------------------------- | ------------------------------ |
| Wrong JSON shape despite clear evidence | Fine-tune or structured output |
| Missing latest policy clause            | RAG/index update               |
| Needs citations                         | RAG                            |
| Refuses domain-specific phrasing        | Fine-tune/instruction data     |

## Caveats

Fine-tuning can memorize stale or sensitive data. RAG can retrieve the wrong passage. Both require before/after evaluation, rollback, and regression cases.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Hu et al., 2021, LoRA](https://arxiv.org/abs/2106.09685)
- [Ouyang et al., 2022, Training language models to follow instructions](https://arxiv.org/abs/2203.02155)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← RAG Benchmark Design](rag-benchmark-design.md) [Tool Use and Function Calling →](tool-use-and-function-calling.md)
