---
title: Fine Tuning Versus RAG
slug: generative-ai/fine-tuning-versus-rag
description: "When to change model behavior through training versus supplying external evidence at runtime."
area: generative-ai
topics:
  - fine-tuning-versus-rag
level: intermediate
status: complete
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
  - rag-evaluation.md
  - structured-output.md
historical_context: false
last_reviewed: 2026-07-29
---

# Fine Tuning Versus RAG

Fine-tuning changes model behavior or parameters. [RAG](rag.md) changes the evidence available at request time. They are complementary: [instruction tuning](instruction-tuning.md) can teach format and domain behavior, while [retrieval pipelines](retrieval-pipelines.md) supply current or private facts. Parameter-efficient adapters such as [LoRA](../06-deep-learning/fine-tuning.md#lora-footprint) reduce the training and storage footprint by freezing the base model and training a small low-rank update.

The central diagnostic is: is the model failing because it does not know the right information _now_, or because it does not behave in the right way even when the information is present?

## When to train, when to retrieve

Use fine-tuning when the failure is stable behavior: style, output shape, classification policy, or repeated task procedure. Use RAG when the failure is missing knowledge, stale knowledge, or auditable citation. A compact rule is: train behavior, retrieve facts. [Embeddings](embeddings.md) and rerankers make the retrieval side testable without changing the base model.

Fine-tuning is a distribution shift tool. It changes how the model maps inputs to outputs across many future requests. RAG is a context tool. It changes what evidence the model sees for one request. If the same answer should change when a policy document changes, prefer RAG. If the same behavior should persist across many documents and requests, fine-tuning may be appropriate.

## Choosing by symptom

| Symptom                                 | Better first lever             |
| --------------------------------------- | ------------------------------ |
| Wrong JSON shape despite clear evidence | Fine-tune or structured output |
| Missing latest policy clause            | RAG/index update               |
| Needs citations                         | RAG                            |
| Refuses domain-specific phrasing        | Fine-tune/instruction data     |

The two are not exclusive. A common production shape fine-tunes for format and domain tone while retrieving for facts and citations, so the model behaves consistently _and_ its claims stay current and auditable — train the behavior, retrieve the facts, and use both when you need both.

## Realistic decision examples

| Product problem                                                      | Better approach                                                               | Reason                                              |
| -------------------------------------------------------------------- | ----------------------------------------------------------------------------- | --------------------------------------------------- |
| Support answers need the latest refund policy and citations.         | RAG                                                                           | facts change and must be auditable.                 |
| Model repeatedly writes verbose answers despite concise examples.    | fine-tuning or instruction data                                               | behavior is stable across requests.                 |
| Contract extraction must output a strict schema.                     | [structured output](structured-output.md), then fine-tune if failures persist | schema validation may solve it without training.    |
| Domain abbreviations are misunderstood even with retrieved evidence. | fine-tuning plus RAG                                                          | training teaches usage; retrieval supplies facts.   |
| Model invents policy IDs.                                            | RAG and citation validation                                                   | the issue is unsupported claims, not missing style. |

## Evaluation before choosing

Start with an error sample, not an architecture preference. Label each failure as retrieval miss, evidence ignored, format failure, reasoning failure, style mismatch, or policy violation. Then test the smallest intervention:

1. improve prompt/schema and evaluate again;
2. improve retrieval, reranking, or context packing and evaluate with [RAG evaluation](rag-evaluation.md);
3. fine-tune only if stable behavior remains wrong after the right context is present;
4. keep a rollback path and regression set for either choice.

Fine-tuning should be evaluated against a held-out task set, not only training-like examples. RAG should be evaluated against retrieval recall and answer support, not only final answer preference.

## Caveats

Fine-tuning can memorize stale or sensitive data and is slower to update than an index. RAG can retrieve the wrong passage, expose private chunks if filters are weak, or overload the prompt with irrelevant evidence. Both require before/after evaluation, rollback, and regression cases. Neither fixes a product with unclear policy or missing ground-truth examples.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Hu et al., 2021, LoRA](https://arxiv.org/abs/2106.09685)
- [Ouyang et al., 2022, Training language models to follow instructions](https://arxiv.org/abs/2203.02155)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← RAG Benchmark Design](rag-benchmark-design.md) [Tool Use and Function Calling →](tool-use-and-function-calling.md)
