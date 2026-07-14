---
title: Quantization
slug: generative-ai/quantization
description: "Representing model weights or activations with fewer bits to reduce memory and sometimes latency."
area: generative-ai
topics:
  - quantization
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - model-serving.md
  - local-versus-hosted-models.md
  - cost-and-latency-optimization.md
  - vector-databases.md
  - ../01-mathematical-foundations/numerical-stability.md
historical_context: false
last_reviewed: 2026-07-11
---

# Quantization

Quantization stores model values in lower precision, commonly int8 or 4-bit formats, to reduce memory bandwidth and serving cost. It matters most for [model serving](model-serving.md) of local models, [cost and latency optimization](cost-and-latency-optimization.md), and [local versus hosted models](local-versus-hosted-models.md) decisions.

## Defining math

Uniform symmetric int8 quantization can use scale $s=\max |x|/127$, quantized value $q=\operatorname{round}(x/s)$, and reconstruction $\hat x=sq$. The error $x-\hat x$ affects logits, attention, and sometimes tool-routing reliability.

Here $x$ is a real-valued weight or activation, $q$ is the stored integer, and $s$ maps between integer units and the original numeric scale. The constant 127 is the largest positive signed int8 value, so the largest magnitude in the tensor sets the scale for all other values under per-tensor symmetric quantization.

## Worked example

For values $x=(-1.25,-0.10,0,0.80,1.70)$, the largest magnitude is $1.70$, so symmetric int8 quantization uses

$$
s=\frac{1.70}{127}\approx0.01339.
$$

| Value $x$ | Quantized $q=\operatorname{round}(x/s)$ | Reconstructed $\hat x=sq$ |  Error |
| --------: | --------------------------------------: | ------------------------: | -----: |
|     -1.25 |                                     -93 |                    -1.245 | -0.005 |
|     -0.10 |                                      -7 |                    -0.094 | -0.006 |
|      0.00 |                                       0 |                     0.000 |  0.000 |
|      0.80 |                                      60 |                     0.803 | -0.003 |
|      1.70 |                                     127 |                     1.700 |  0.000 |

The endpoint maps exactly to 127 by construction. Intermediate values absorb rounding error, so real models need layer-wise and task-level evaluation after quantization rather than relying on memory savings alone.

| Choice                             | Trade-off                                                 |
| ---------------------------------- | --------------------------------------------------------- |
| Weight-only quantization           | Reduces model memory with fewer activation changes.       |
| Weight-and-activation quantization | Can improve throughput but is more sensitive to outliers. |
| Per-tensor scale                   | Simpler metadata, worse fit for heterogeneous channels.   |
| Per-channel scale                  | More metadata, often lower reconstruction error.          |

## Caveats

Quantization can degrade rare-token behavior, arithmetic, multilingual quality, or long-context stability before aggregate benchmarks show large drops.

## References

- [PyTorch documentation: Quantization](https://pytorch.org/docs/stable/quantization.html)
- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Cost optimization](https://platform.openai.com/docs/guides/cost-optimization)
