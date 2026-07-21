---
title: Top-k and Top-p Sampling
slug: generative-ai/top-k-and-top-p-sampling
description: "Truncation methods that restrict which next tokens may be sampled."
area: generative-ai
topics:
  - top-k-and-top-p-sampling
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sampling-and-decoding.md
  - temperature-and-determinism.md
  - determinism-and-reproducibility.md
  - prompting.md
  - structured-output.md
historical_context: false
last_reviewed: 2026-07-20
---

# Top-k and Top-p Sampling

Top-k and top-p are truncation controls inside [sampling and decoding](sampling-and-decoding.md). They remove candidate tokens before sampling, often after temperature is applied. Use them with [temperature and determinism](temperature-and-determinism.md) and trace their settings for [determinism and reproducibility](determinism-and-reproducibility.md), not as independent magic knobs.

## Top-k versus top-p

Top-k keeps the $k$ largest-probability tokens and renormalizes. Top-p, or nucleus sampling, sorts tokens by probability and keeps the smallest prefix whose cumulative mass reaches $p$. Top-p adapts to distribution shape: it can keep many tokens for flat distributions and few tokens for peaked ones.

## Comparing the two truncations

The snippet first converts logits to probabilities, then compares two truncation rules on the same distribution. Top-k keeps a fixed number of tokens; top-p keeps however many tokens are needed to reach the cumulative probability threshold.

```python
import numpy as np

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

for name, probs in [("top_k=3", top_k_probs(logits, 3)), ("top_p=0.80", top_p_probs(logits, 0.80))]:
    print(name, fmt(probs), "entropy_bits", round(float(entropy(probs)), 3))
```

Observed output:

```text
top_k=3 [('alpha', 0.667), ('beta', 0.222), ('gamma', 0.11)] entropy_bits 1.222
top_p=0.80 [('alpha', 0.75), ('beta', 0.25)] entropy_bits 0.811
```

With these logits, top-p is narrower than top-k because the first two tokens already exceed 0.80 cumulative probability.

For top-k with $k=3$, the kept set is `alpha`, `beta`, and `gamma`; renormalizing their probabilities leaves entropy `1.222` bits. For top-p with $p=0.80$, only `alpha` and `beta` are needed, so the renormalized distribution has lower entropy, `0.811` bits, and samples from a smaller candidate set.

## Caveats

Very low top-p can collapse creativity. Very high top-k still admits bad tail tokens if temperature is high.

## References

- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)
- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Sampling and Decoding](sampling-and-decoding.md) [Temperature and Determinism →](temperature-and-determinism.md)
