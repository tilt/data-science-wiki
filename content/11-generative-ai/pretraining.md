---
title: Pretraining
slug: generative-ai/pretraining
description: "Large-scale self-supervised training that builds the base model distribution."
area: generative-ai
topics:
  - pretraining
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - llm-training.md
  - foundation-models.md
  - language-model-architecture.md
  - instruction-tuning.md
  - tokenization.md
  - ../06-deep-learning/self-supervised-learning.md
  - ../01-mathematical-foundations/cross-entropy.md
historical_context: false
last_reviewed: 2026-07-22
---

# Pretraining

Pretraining is the large-scale self-supervised stage that gives [foundation models](foundation-models.md) broad linguistic or multimodal capability. For decoder language models, it trains the [language model architecture](language-model-architecture.md) to predict the next token from previous [tokenization](tokenization.md) outputs.

## Next-token pretraining

For sequence $x_1,\ldots,x_T$, next-token pretraining minimizes

$$
L(\theta)=-\sum_{t=1}^{T}\log p_\theta(x_t\mid x_{<t}).
$$

This is cross-entropy over the vocabulary at each position. Softmax converts logits $z$ to probabilities,

$$
p_i=\frac{\exp(z_i)}{\sum_j \exp(z_j)}.
$$

If the correct token receives probability $0.77$, its loss is $-\log(0.77)\approx0.26$. If a later correct token receives probability $0.16$, its loss is $-\log(0.16)\approx1.83$. The mean of these two losses is about $1.05$, and perplexity is $\exp(1.05)\approx2.86$, meaning the model is as uncertain as choosing among roughly three equally likely tokens on this toy batch.

## Training Pipeline

| Stage                            | Why it matters                                                                                         |
| -------------------------------- | ------------------------------------------------------------------------------------------------------ |
| Data filtering and deduplication | Removes obvious noise, duplicates, and evaluation contamination.                                       |
| Tokenization                     | Converts text or multimodal inputs into the units the model consumes.                                  |
| Distributed optimization         | Trains on many accelerators with checkpointing, learning-rate schedules, and loss monitoring.          |
| Evaluation slices                | Tracks domain, language, safety, and memorization behavior instead of relying on aggregate loss alone. |

## Caveats

Pretraining data quality, deduplication, and contamination matter. Better pretraining loss does not automatically imply safer or more useful assistant behavior.

## References

- [Kaplan et al., 2020, Scaling Laws for Neural Language Models](https://arxiv.org/abs/2001.08361)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Tokenization](tokenization.md) [LLM Training →](llm-training.md)
