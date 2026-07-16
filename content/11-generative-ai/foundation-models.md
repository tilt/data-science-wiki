---
title: Foundation Models
slug: generative-ai/foundation-models
description: "Large pretrained models adapted to many downstream tasks through prompting, retrieval, or fine-tuning."
area: generative-ai
topics:
  - foundation-models
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - pretraining.md
  - instruction-tuning.md
  - language-model-architecture.md
  - fine-tuning-versus-rag.md
  - multimodal-models.md
historical_context: false
last_reviewed: 2026-07-11
---

# Foundation Models

A foundation model is pretrained broadly enough to serve as a base for many tasks. In this section, [pretraining](pretraining.md) creates the base distribution, [instruction tuning](instruction-tuning.md) adapts behavior, and [fine tuning versus RAG](fine-tuning-versus-rag.md) decides how applications specialize it.

## Mechanism

For language models, the base objective is often next-token prediction: maximize $\sum_t \log p_\theta(x_t\mid x_{<t})$. The same base [language model architecture](language-model-architecture.md) can then be prompted, fine-tuned, aligned, or connected to retrieval and tools. [Multimodal models](multimodal-models.md) extend the foundation idea to image, audio, or video tokens.

The "foundation" property comes from reuse, not from size alone. A model becomes a platform when the same pretrained representation supports several adaptation paths:

| Adaptation path                             | What changes                                       | Typical use                                                  |
| ------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------ |
| Prompting                                   | Only the input context changes.                    | Fast task steering without weight updates.                   |
| [RAG](rag.md)                               | The context is filled with retrieved evidence.     | Current or auditable facts.                                  |
| [Instruction tuning](instruction-tuning.md) | Model weights learn instruction-response behavior. | Stable task style and output formats.                        |
| [Alignment](alignment.md)                   | Preferences and policies shape behavior.           | Safer assistant behavior under ambiguity.                    |
| Tool wrapper                                | Application code gives controlled actions.         | Search, calculation, database lookup, or workflow execution. |

## Concrete artifact

```mermaid
flowchart LR
  Base[Base model] --> Instruction[Instruction tuning]
  Instruction --> Safety[Safety policy]
  Safety --> Wrapper[Tool and retrieval wrapper]
  Wrapper --> Product[Product task]
```

The diagram shows why application behavior should not be attributed only to the base weights. A good or bad answer may come from the pretrained distribution, the instruction-tuning data, the retrieval layer, tool permissions, or the product wrapper.

## Caveats

Foundation-model capability is uneven across languages, domains, modalities, and time-sensitive facts. Avoid relying on implicit parametric memory when the answer must be current or auditable.

## References

- [Kaplan et al., 2020, Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Touvron et al., 2023, Llama 2](https://arxiv.org/abs/2307.09288)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)

> **Learning path — Generative AI systems:** ← [Generative AI and Agentic Systems](index.md) · [path overview](../00-home-and-navigation/learning-paths.md#generative-ai-systems) · [Retrieval Pipelines](retrieval-pipelines.md) →
