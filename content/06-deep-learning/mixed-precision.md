---
title: Mixed Precision
slug: deep-learning/mixed-precision
description: "Training with lower-precision arithmetic while preserving numerical stability where needed."
area: deep-learning
topics:
  - mixed-precision
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - distributed-training.md
  - optimizers.md
  - initialization.md
  - backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Mixed Precision

Mixed precision uses lower-precision formats such as FP16 or BF16 for many tensor operations while keeping numerically sensitive pieces in FP32. The goal is higher throughput and lower memory use, especially in [distributed training](distributed-training.md). It changes the numeric environment seen by [optimizers](optimizers.md), gradients, and sometimes [initialization](initialization.md).

## Defining mechanism

A typical FP16 training loop keeps FP32 master weights $\theta_{32}$, casts working weights and activations to lower precision, scales the loss by $S$, and unscales gradients before the optimizer step:

$$
\tilde L=S L,\qquad \tilde g=\nabla_\theta \tilde L=S\nabla_\theta L,\qquad g=\tilde g/S.
$$

Loss scaling protects small gradients from underflow. BF16 has fewer mantissa bits than FP32 but a wider exponent range than FP16, so it often needs less scaling. Autocast systems choose dtypes per operation, keeping numerically sensitive reductions in higher precision while using lower precision for throughput-heavy matrix multiplies.

## Worked example

```python
import numpy as np
import torch

tiny_grad = np.float16(1e-8)
scaled = np.float16(1e-8 * 4096)
recovered = np.float32(scaled) / 4096
a = torch.tensor([1.001], dtype=torch.float32)
print("float16_tiny_grad", tiny_grad.item())
print("scaled_then_unscaled", float(recovered))
print("float16_value", torch.round(a.half().float(), decimals=6).item())
```

Observed output:

```text
float16_tiny_grad 0.0
scaled_then_unscaled 9.997165761888027e-09
float16_value 1.0009770393371582
```

The unscaled FP16 gradient underflows to zero. Scaling before casting keeps a recoverable value close to $10^{-8}$, while the stored FP16 activation is rounded.

## Caveats

Mixed precision is not only a speed flag. Reductions, softmax, normalization statistics, and optimizer states may need FP32. Overflow detection and dynamic scaling can skip optimizer steps. Hardware matters: FP16, BF16, and TF32 have different accuracy and performance profiles.

## References

- [Micikevicius et al., 2017, Mixed Precision Training](https://arxiv.org/abs/1710.03740)
- [PyTorch documentation: torch.amp](https://docs.pytorch.org/docs/2.7/amp.html)
