---
title: Sampling and Decoding
slug: generative-ai/sampling-and-decoding
description: "How next-token logits become text through greedy, temperature, top-k, and nucleus decoding."
area: generative-ai
topics:
  - sampling-and-decoding
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - temperature-and-determinism.md
  - top-k-and-top-p-sampling.md
  - determinism-and-reproducibility.md
  - structured-output.md
  - language-model-architecture.md
historical_context: false
last_reviewed: 2026-07-11
---

# Sampling and Decoding

Sampling and decoding turn a language model's next-token logits into actual output. The model architecture supplies a score vector; the decoder chooses whether to take the highest score, rescale the distribution, truncate unlikely tokens, or enforce a contract such as [structured output](structured-output.md). This page is the parent concept for [temperature and determinism](temperature-and-determinism.md) and [top-k and top-p sampling](top-k-and-top-p-sampling.md).

## Defining mechanism

For vocabulary logits $z\in\mathbb R^V$, ordinary sampling uses

$$
p_i=\frac{\exp(z_i/T)}{\sum_j \exp(z_j/T)}
$$

with temperature $T>0$. Greedy decoding is $\arg\max_i z_i$. Top-k sets all but the $k$ largest logits to $-\infty$ before softmax. Nucleus, or top-p, first sorts tokens by probability and keeps the smallest prefix $S$ such that $\sum_{i\in S}p_i\ge p$, then renormalizes on $S$. These controls affect diversity but do not by themselves make an application reproducible; that requires the broader trace discipline in [determinism and reproducibility](determinism-and-reproducibility.md).

## Executed artifact

This snippet applies greedy, temperature, top-k, and nucleus decoding to the same logits and compares the resulting token probabilities and entropy.

```python
import numpy as np

np.random.seed(7)
tokens = ["alpha", "beta", "gamma", "delta", "epsilon", "zeta"]
logits = np.array([3.2, 2.1, 1.4, 0.7, -0.2, -1.0])

def softmax(x):
    z = x - x.max()
    e = np.exp(z)
    return e / e.sum()

def entropy(p):
    return -(p * np.log2(np.clip(p, 1e-12, 1))).sum()

def fmt(p):
    return [(tokens[i], round(float(v), 3)) for i, v in enumerate(p) if v > 0]

def top_k_probs(logits, k):
    keep = np.argsort(logits)[-k:]
    masked = np.full_like(logits, -np.inf, dtype=float)
    masked[keep] = logits[keep]
    return softmax(masked)

def top_p_probs(logits, p_cut):
    base = softmax(logits)
    order = np.argsort(-base)
    keep_n = np.searchsorted(np.cumsum(base[order]), p_cut) + 1
    masked = np.full_like(logits, -np.inf, dtype=float)
    masked[order[:keep_n]] = logits[order[:keep_n]]
    return softmax(masked)

cases = {
    "greedy": np.eye(len(tokens))[logits.argmax()],
    "temperature=0.7": softmax(logits / 0.7),
    "temperature=1.5": softmax(logits / 1.5),
    "top_k=3": top_k_probs(logits, 3),
    "top_p=0.80": top_p_probs(logits, 0.80),
}
for name, probs in cases.items():
    print(name, fmt(probs), "entropy_bits", round(float(entropy(probs)), 3))
```

Observed output:

```text
greedy [('alpha', 1.0)] entropy_bits -0.0
temperature=0.7 [('alpha', 0.756), ('beta', 0.157), ('gamma', 0.058), ('delta', 0.021), ('epsilon', 0.006), ('zeta', 0.002)] entropy_bits 1.141
temperature=1.5 [('alpha', 0.468), ('beta', 0.225), ('gamma', 0.141), ('delta', 0.088), ('epsilon', 0.049), ('zeta', 0.028)] entropy_bits 2.063
top_k=3 [('alpha', 0.667), ('beta', 0.222), ('gamma', 0.11)] entropy_bits 1.222
top_p=0.80 [('alpha', 0.75), ('beta', 0.25)] entropy_bits 0.811
```

Higher temperature increases entropy, while top-k and top-p remove tail tokens before sampling. In an extraction workflow, broad decoding can damage schema reliability; in brainstorming, it may be the point.

## Caveats

Greedy decoding can be repetitive because it repeatedly follows local maxima. Very high temperature admits implausible tokens. Top-k is insensitive to distribution shape, while top-p adapts but can become very narrow when one token dominates. Provider parameters can interact, so record the exact settings beside prompts, retrieved context, and tool outputs.

## References

- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
