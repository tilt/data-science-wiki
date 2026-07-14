---
title: Language Model Architecture
slug: generative-ai/language-model-architecture
description: "Decoder-style transformer machinery behind next-token generation."
area: generative-ai
topics:
  - language-model-architecture
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - ../06-deep-learning/attention.md
  - tokenization.md
  - sampling-and-decoding.md
  - pretraining.md
  - context-construction.md
historical_context: false
last_reviewed: 2026-07-11
---
# Language Model Architecture

A modern language model usually tokenizes text, embeds tokens and positions, applies stacks of masked self-attention and feed-forward blocks, then projects hidden states to vocabulary logits for [sampling and decoding](sampling-and-decoding.md). The core mechanism is the transformer [attention](../06-deep-learning/attention.md) block.

## Defining math

Causal self-attention uses

$$
\operatorname{softmax}\left(\frac{QK^\top+M}{\sqrt{d_k}}\right)V,
$$

where mask $M$ sets future positions to $-\infty$. [Pretraining](pretraining.md) then optimizes next-token likelihood over [tokenization](tokenization.md) outputs.

## Executed artifact

```python
import numpy as np

scores = np.array([
    [2.0, 1.0, 0.0],
    [2.0, 1.0, 0.0],
    [2.0, 1.0, 0.0],
])
mask = np.triu(np.ones((3, 3), dtype=bool), 1)
masked = np.where(mask, -np.inf, scores)
exp_scores = np.exp(masked - np.nanmax(masked, axis=1, keepdims=True))
exp_scores = np.where(mask, 0, exp_scores)
weights = exp_scores / exp_scores.sum(axis=1, keepdims=True)
print("MASKED_ATTENTION")
print(np.round(weights, 3).tolist())
```

Observed output:

```text
MASKED_ATTENTION
[[1.0, 0.0, 0.0], [0.731, 0.269, 0.0], [0.665, 0.245, 0.09]]
```

The first token can attend only to itself; later tokens can attend backward. Without this mask, next-token training would leak future labels.

## Caveats

Long contexts increase attention memory and retrieval confusion. Architecture alone does not define product behavior; prompts, tools, safety layers, and context do.

## References

- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
