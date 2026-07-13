---
title: Mixed Precision
slug: deep-learning/mixed-precision
description: "Training with lower-precision arithmetic while preserving numerical stability where needed."
area: deep-learning
topics:
  - mixed-precision
  - floating-point
  - fp16
  - bf16
  - numerical-stability
level: intermediate
status: review
page_type: implementation
aliases:
  - "AMP"
  - "Automatic Mixed Precision"
  - "FP16 Training"
  - "BF16 Training"
prerequisites:
  - index.md
related:
  - distributed-training.md
  - optimizers.md
  - initialization.md
  - backpropagation.md
  - ../01-mathematical-foundations/numerical-stability.md
  - ../14-cloud-and-distributed-systems/gpu-systems.md
historical_context: false
last_reviewed: 2026-07-14
---
# Mixed Precision

Mixed precision trains or serves neural networks with more than one floating-point format. Throughput-heavy operations such as matrix multiplies run in lower precision, while numerically sensitive pieces stay in FP32 or accumulate into FP32. The goal is higher accelerator throughput and lower memory traffic without silently changing the optimization problem.

Mixed precision is closely tied to [numerical stability](../01-mathematical-foundations/numerical-stability.md), [optimizers](optimizers.md), [backpropagation](backpropagation.md), and [GPU systems](../14-cloud-and-distributed-systems/gpu-systems.md). It is not just a speed flag: it changes rounding, overflow, underflow, and sometimes which kernels the framework selects.

## Floating-Point Formats

A floating-point number stores a sign, an exponent, and a significand, often called the mantissa. The exponent controls dynamic range: how large or tiny a value can be before overflow or underflow. The mantissa controls precision: how many nearby values can be distinguished.

| Format | Exponent bits | Mantissa bits | Practical meaning |
| --- | ---: | ---: | --- |
| FP32 | 8 | 23 | baseline training precision with wide range and good per-value precision |
| FP16 | 5 | 10 | faster and smaller, but limited exponent range makes gradient underflow/overflow more likely |
| BF16 | 8 | 7 | FP32-like exponent range with coarser mantissa; often robust without aggressive loss scaling |
| TF32 | 8 | 10 | NVIDIA tensor-core compute format for FP32 inputs; range like FP32, precision closer to FP16 mantissa |

FP16 and BF16 are both 16-bit formats, but they spend those bits differently. FP16 keeps more mantissa bits than BF16, so it can represent nearby numbers more finely around moderate magnitudes. BF16 keeps the same exponent width as FP32, so it can represent very large and very small magnitudes across a much wider range. That is why BF16 often needs less loss scaling than FP16, even though each individual BF16 value is rounded more coarsely.

## Defining Mechanism

A typical FP16 training loop keeps FP32 master weights $\theta_{32}$, casts working weights and activations to lower precision, scales the loss by $S$, and unscales gradients before the optimizer step:

$$
\tilde L=S L,\qquad
\tilde g=\nabla_\theta \tilde L=S\nabla_\theta L,\qquad
g=\tilde g/S.
$$

Loss scaling protects small gradients from underflow. If a gradient component is $10^{-8}$, storing it directly in FP16 may round it to zero. Multiplying the loss by $4096$ multiplies that gradient by $4096$ during backpropagation, making it representable. Dividing by $4096$ after gradient computation restores the intended scale before the optimizer update.

Dynamic loss scaling automates this. It increases the scale when training is stable and reduces it when overflow creates non-finite gradients. If overflow is detected, the optimizer step may be skipped because applying `inf` or `nan` gradients would corrupt the weights.

## Autocast

Automatic mixed precision systems choose dtypes per operation. They do not simply cast the whole model to FP16 or BF16.

| Operation family | Common mixed-precision behavior | Reason |
| --- | --- | --- |
| Matrix multiply and convolution | run in FP16, BF16, or TF32 with higher-precision accumulation where supported | tensor cores make these operations much faster and memory efficient |
| Softmax, log-sum-exp, and cross-entropy internals | often use FP32 for reductions or exponentials | exponentials and sums are sensitive to overflow and cancellation |
| Layer norm and batch norm statistics | often keep reductions/statistics in FP32 | mean and variance estimates can lose accuracy when summed in low precision |
| Optimizer state | often stored in FP32 | momentum, variance estimates, and weight updates accumulate many small changes |
| Model weights | may keep FP32 master copy, lower-precision working copy, or sharded mixed states | balances update accuracy, memory, and distributed communication cost |

The reason is mathematical, not cosmetic. A matrix multiply performs many multiply-adds and can tolerate lower input precision if accumulation is handled well. A softmax denominator sums exponentials, so overflow, underflow, or cancellation can change probabilities directly. That connects mixed precision to stable softmax and [cross-entropy](../01-mathematical-foundations/cross-entropy.md) implementations.

## Executed Demo

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

The unscaled FP16 gradient underflows to zero, so that parameter would receive no learning signal from this component. Scaling before casting makes the stored value large enough to survive, and unscaling recovers a value close to $10^{-8}$. The activation example shows the other side of the tradeoff: $1.001$ is representable in FP32 but rounds to about $1.000977$ when stored as FP16.

## FP16 Versus BF16 in Practice

FP16 can be efficient and accurate, but it is more sensitive to scale. Training often needs loss scaling, careful initialization, gradient clipping, and FP32 optimizer states. BF16 usually handles wide activation and gradient ranges better because it has FP32-like exponent range. The cost is coarser mantissa precision, so small differences between nearby values are rounded more aggressively.

This distinction explains common behavior:

| Observation | Explanation |
| --- | --- |
| FP16 gradients can become zero | values below the representable range underflow |
| FP16 training may produce `inf` gradients | large intermediate values exceed the exponent range |
| BF16 often trains without loss scaling | its exponent range is close to FP32 |
| BF16 may be noisier for tiny value differences | fewer mantissa bits mean coarser rounding |
| FP32 master weights can still help | small optimizer updates accumulate more faithfully in FP32 |

## Caveats

Mixed precision should be validated per model and hardware generation. A configuration that is stable for one architecture can fail after changing normalization, optimizer, sequence length, batch size, or accelerator. Watch for non-finite gradients, sudden loss-scale collapse, divergence after warmup, and metrics that regress even when training loss looks normal.

For inference, mixed precision has a different risk profile. There is no backward pass or optimizer state, but logits, softmax, normalization, and long reductions can still be sensitive. Quantization is related but distinct: it usually targets even lower-precision storage or arithmetic and requires its own calibration and error analysis.

## Connections

- [Numerical Stability](../01-mathematical-foundations/numerical-stability.md) explains overflow, stable softmax, and mathematically equivalent computations that behave differently in finite precision.
- [Optimizers](optimizers.md) explains why momentum and adaptive state are sensitive to small accumulated updates.
- [Distributed Training](distributed-training.md) often combines mixed precision with sharding and communication compression to reduce memory and bandwidth.
- [GPU Systems](../14-cloud-and-distributed-systems/gpu-systems.md) explains how tensor cores, memory bandwidth, and arithmetic intensity affect performance.

## References

- [Micikevicius et al., 2017, Mixed Precision Training](https://arxiv.org/abs/1710.03740)
- [PyTorch documentation: Automatic Mixed Precision package](https://docs.pytorch.org/docs/stable/amp.html)
- [NVIDIA documentation: TensorFloat-32 in the A100 GPU Architecture](https://developer.nvidia.com/blog/accelerating-ai-training-with-tf32-tensor-cores/)
