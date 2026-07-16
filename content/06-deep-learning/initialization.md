---
title: Initialization
slug: deep-learning/initialization
description: "Choosing starting weights so activations and gradients keep usable scale."
area: deep-learning
topics:
  - initialization
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - activation-functions.md
  - normalization.md
  - backpropagation.md
  - optimizers.md
historical_context: false
last_reviewed: 2026-07-11
---

# Initialization

Initialization sets the starting point for optimization and the scale of signals before any learning has happened. Poorly scaled weights can make activations explode or shrink layer by layer, leaving [backpropagation](backpropagation.md) with unstable gradients. Good initializers are matched to the [activation function](activation-functions.md) and sometimes made less critical by [normalization](normalization.md).

## Defining math

For a layer with fan-in $n_{\text{in}}$ and fan-out $n_{\text{out}}$, Xavier/Glorot-style scaling targets variance around

$$
\operatorname{Var}(W)\approx \frac{2}{n_{\text{in}}+n_{\text{out}}},
$$

which suits symmetric activations such as tanh. For ReLU-family units, roughly half the pre-activations are zeroed, so He initialization uses

$$
\operatorname{Var}(W)\approx \frac{2}{n_{\text{in}}}.
$$

The goal is not a magic distribution; it is keeping forward activations and backward gradients in a useful numeric range long enough for [optimizers](optimizers.md) to make progress.

## Worked example

The experiment sends the same random activations through six ReLU layers under two initializations, so the printed variances isolate the effect of weight scale.

```python
import math, torch
import torch.nn.functional as F

torch.manual_seed(2)
x = torch.randn(512, 128)
for name, std in [("standard_normal", 1.0), ("he", math.sqrt(2 / 128))]:
    h = x.clone()
    variances = []
    for _ in range(6):
        W = torch.randn(128, 128) * std
        h = F.relu(h @ W)
        variances.append(round(h.var().item(), 3))
    print(name, variances)
```

Observed output:

```text
standard_normal [43.145, 2670.37, 188406.391, 14177291.0, 971429952.0, 65219739648.0]
he [0.669, 0.659, 0.63, 0.55, 0.536, 0.508]
```

Standard normal weights blow up variance across six ReLU layers. He scaling keeps the activations near the original order of magnitude.

## Caveats

Initialization interacts with residual connections, normalization, optimizer warmup, and precision. A scheme that is stable for a plain ReLU MLP may not be right for a transformer block, a gated recurrent unit, or a network with very narrow layers.

## References

- [He et al., 2015, Delving Deep into Rectifiers](https://arxiv.org/abs/1502.01852)
- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 8](https://www.deeplearningbook.org/contents/optimization.html)

> **Section — [Deep Learning](index.md):** ← [Optimizers](optimizers.md) · [Normalization](normalization.md) →
