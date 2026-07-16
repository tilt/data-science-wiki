---
title: Decoder-Only Transformers
slug: natural-language-processing/decoder-only-transformers
description: "Autoregressive transformer stacks that predict each next token from previous tokens."
area: natural-language-processing
topics:
  - decoder-only-transformers
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - language-modelling.md
  - tokenization.md
  - bert-style-encoders.md
  - summarization.md
  - ../06-deep-learning/transformers.md
historical_context: false
last_reviewed: 2026-07-11
---

# Decoder-Only Transformers

Decoder-only transformers are causal sequence models: at position $i$, the hidden state may use tokens $1,\ldots,i$ but not future tokens. That makes them natural for [language modelling](language-modelling.md), completion, chat, and generative [summarization](summarization.md). They share attention machinery with [bert-style encoders](bert-style-encoders.md), but the mask changes what information can flow.

## Defining mechanism

Causal self-attention applies a triangular mask before softmax:

$$
\operatorname{Attention}(Q,K,V)=\operatorname{softmax}\left(\frac{QK^\top+M}{\sqrt{d_k}}\right)V,
$$

where $M_{ij}=0$ if $j\le i$ and $M_{ij}=-\infty$ if $j>i$. The model is trained with next-token cross-entropy:

$$
\mathcal L=-\sum_i \log P_\theta(t_i\mid t_{<i}).
$$

[Tokenization](tokenization.md) fixes the sequence being predicted, so both perplexity and latency depend on tokenizer choice.

## Worked example

The code constructs one attention head by hand, applies the upper-triangular causal mask, and then checks that masked future positions receive zero probability after softmax.

```python
import math, torch

torch.manual_seed(7)
X = torch.randn(4, 3)
Wq, Wk, Wv = torch.randn(3, 3), torch.randn(3, 3), torch.randn(3, 2)
Q, K, V = X @ Wq, X @ Wk, X @ Wv
scores = Q @ K.T / math.sqrt(3)
mask = torch.triu(torch.ones(4, 4, dtype=torch.bool), diagonal=1)
weights = torch.softmax(scores.masked_fill(mask, float("-inf")), dim=-1)
context = weights @ V
print("attention_weights", torch.round(weights, decimals=3).tolist())
print("future_weight_sum", round(float(weights[0,1:].sum() + weights[1,2:].sum() + weights[2,3:].sum()), 6))
print("context_last", torch.round(context[-1], decimals=3).tolist())
```

Observed output:

```text
attention_weights [[1.0, 0.0, 0.0, 0.0], [0.9010000228881836, 0.0989999994635582, 0.0, 0.0], [0.796999990940094, 0.04899999871850014, 0.15399999916553497, 0.0], [0.0820000022649765, 0.25, 0.13099999725818634, 0.5370000004768372]]
future_weight_sum 0.0
context_last [-0.27000001072883606, -0.9359999895095825]
```

The first row is `[1.0, 0.0, 0.0, 0.0]` because position 0 can attend only to itself. Row 2 assigns weight to positions 0, 1, and 2 but zero to position 3, and the printed `future_weight_sum 0.0` confirms that every illegal future edge was removed by the mask before softmax.

## Caveats

A missing or misaligned causal mask leaks answers during training or evaluation. Long contexts stress memory through the attention matrix and the key-value cache. Decoding settings change outputs, so compare systems with fixed prompt format, tokenizer, stop rules, and sampling parameters.

## References

- [Vaswani et al., Attention Is All You Need](https://arxiv.org/abs/1706.03762)
- [PyTorch documentation: MultiheadAttention](https://docs.pytorch.org/docs/2.7/generated/torch.nn.MultiheadAttention.html)
- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)

> **Section — [Natural Language Processing](index.md):** ← [BERT-Style Encoders](bert-style-encoders.md) · [Text Classification](text-classification.md) →

> **Learning path — [Natural language processing](../00-home-and-navigation/learning-paths.md#natural-language-processing):** ← [Embeddings](embeddings.md) · [Text Classification](text-classification.md) →
