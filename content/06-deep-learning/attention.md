---
title: Attention
slug: deep-learning/attention
description: "Content-based weighted routing between sequence positions or modalities."
area: deep-learning
topics:
  - attention
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - transformers.md
  - recurrent-neural-networks.md
  - multimodal-learning.md
  - ../11-generative-ai/language-model-architecture.md
historical_context: false
last_reviewed: 2026-07-11
---
# Attention

Attention computes a context-dependent weighted average of value vectors. A query asks what it needs, keys decide which positions match, and values provide the information to mix. This is the central mechanism in [transformers](transformers.md), a bridge away from [recurrent networks](recurrent-neural-networks.md), and a common alignment mechanism in [multimodal learning](multimodal-learning.md).

## Defining math

Scaled dot-product attention is

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top}{\sqrt{d_k}}\right)V.
$$

For multi-head attention,

$$
\operatorname{head}_i=\operatorname{Attention}(QW_i^Q,KW_i^K,VW_i^V),
$$

$$
\operatorname{MHA}(Q,K,V)=\operatorname{Concat}(\operatorname{head}_1,\ldots,\operatorname{head}_h)W^O.
$$

The $\sqrt{d_k}$ divisor keeps dot-product logits from growing with key dimension. Masks can forbid future tokens or padded positions, which is essential in [language-model architectures](../11-generative-ai/language-model-architecture.md).

## Worked example

```python
import math, torch

Q = torch.tensor([[1., 0.], [0., 1.]])
K = torch.tensor([[1., 0.], [1., 1.], [0., 1.]])
V = torch.tensor([[10., 0.], [0., 5.], [0., 1.]])
scores = Q @ K.T / math.sqrt(2)
weights = scores.softmax(dim=-1)
context = weights @ V
print("weights", torch.round(weights, decimals=3).tolist())
print("context", torch.round(context, decimals=3).tolist())
```

Observed output:

```text
weights [[0.4009999930858612, 0.4009999930858612, 0.1979999989271164], [0.1979999989271164, 0.4009999930858612, 0.4009999930858612]]
context [[4.011000156402588, 2.203000068664551], [1.9780000448226929, 2.4070000648498535]]
```

The first query attends most to the first two keys, while the second attends most to the last two. The output vectors are weighted mixtures of the values, not selected tokens.

## Caveats

Attention weights are routing weights, not full explanations of a model decision. Full self-attention is $O(n^2)$ in sequence length for its score matrix, so long contexts stress memory and latency. A mask bug changes what information can flow and can silently invalidate evaluation.

## References

- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [PyTorch documentation: MultiheadAttention](https://docs.pytorch.org/docs/2.7/generated/torch.nn.MultiheadAttention.html)
