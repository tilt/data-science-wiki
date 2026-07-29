---
title: Temperature and Determinism
slug: generative-ai/temperature-and-determinism
description: "How logit temperature changes entropy and why low temperature is not full reproducibility."
area: generative-ai
topics:
  - temperature
  - sampling-and-decoding
  - determinism
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - sampling-and-decoding.md
  - top-k-and-top-p-sampling.md
  - determinism-and-reproducibility.md
  - structured-output.md
  - model-serving.md
historical_context: false
last_reviewed: 2026-07-29
---

# Temperature and Determinism

Temperature rescales logits before sampling. It is one control inside [sampling and decoding](sampling-and-decoding.md), but [determinism and reproducibility](determinism-and-reproducibility.md) also depend on model version, retrieval, tools, seeds, serving, and post-processing. Low temperature reduces sampling variance; it does not make a whole generative system reproducible.

## Temperature scaling

For logits $z_i$ and temperature $T$,

$$
p_i(T)=\frac{\exp(z_i/T)}{\sum_j\exp(z_j/T)}.
$$

Here $z_i$ is the logit for token $i$, $T$ is the temperature, and $p_i(T)$ is the sampling probability after rescaling. Dividing by a smaller $T$ widens logit gaps before softmax; dividing by a larger $T$ compresses them.

Lower $T$ sharpens the distribution; higher $T$ flattens it. At the limit toward zero, decoding approaches greedy selection.

## Isolating the temperature effect

The code keeps the logits fixed and changes only temperature, so the output isolates how temperature changes probability mass and entropy.

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

for temp in [0.7, 1.5]:
    probs = softmax(logits / temp)
    print(f"temperature={temp}", fmt(probs), "entropy_bits", round(float(entropy(probs)), 3))
```

Observed output:

```text
temperature=0.7 [('alpha', 0.756), ('beta', 0.157), ('gamma', 0.058), ('delta', 0.021), ('epsilon', 0.006), ('zeta', 0.002)] entropy_bits 1.141
temperature=1.5 [('alpha', 0.468), ('beta', 0.225), ('gamma', 0.141), ('delta', 0.088), ('epsilon', 0.049), ('zeta', 0.028)] entropy_bits 2.063
```

Higher temperature nearly doubles entropy in the toy distribution, from 1.141 bits at $T=0.7$ to 2.063 bits at $T=1.5$. The top token `alpha` falls from 0.756 to 0.468, so more probability mass is available for lower-ranked tokens even though the ranking itself has not changed.

The plot shows the same effect: high temperature leaves the top token first, but it spreads probability across the tail.

![Higher temperature spreads probability mass from the top token to lower-ranked tokens.](../assets/diagrams/temperature-probability-spread.svg)

## Choosing temperature

| Task                       | Typical setting     | Reason                                            |
| -------------------------- | ------------------- | ------------------------------------------------- |
| extraction and routing     | low temperature     | stable format and fewer surprising tokens.        |
| grounded support answers   | low to moderate     | preserve evidence while allowing fluent phrasing. |
| brainstorming or ideation  | moderate to high    | diversity matters more than exact repeatability.  |
| code generation with tests | low to moderate     | keep syntax stable; use tests for correctness.    |
| safety-critical workflows  | low plus validators | decoding alone is not the safety control.         |

Temperature should be evaluated with the full route. A creative setting that is harmless for drafting marketing copy may be unacceptable for policy answers or tool calls.

## Determinism misconceptions

Temperature $0$ or near-zero decoding can still produce different outputs if retrieved chunks change, prompt templates change, model deployments change, tool calls return different data, or validators retry on failure. For reproducibility, record the whole run: prompt, model, decoding parameters, retrieval IDs, tool results, and schema versions.

## Caveats

Temperature zero can still drift in hosted systems. For extraction, combine low temperature with [structured output](structured-output.md) validation. For debugging, prefer replayable traces over relying on a single temperature setting.

## References

- [OpenAI API documentation: Text generation](https://platform.openai.com/docs/guides/text-generation)
- [Holtzman et al., 2020, The Curious Case of Neural Text Degeneration](https://arxiv.org/abs/1904.09751)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Top-k and Top-p Sampling](top-k-and-top-p-sampling.md) [Determinism and Reproducibility →](determinism-and-reproducibility.md)
