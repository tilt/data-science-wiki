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

## Executed artifact

```python
import numpy as np

x = np.array([-1.25, -0.1, 0.0, 0.8, 1.7])
scale = max(abs(x)) / 127
q = np.round(x / scale).astype(np.int8)
reconstructed = q.astype(float) * scale
print("QUANTIZATION")
print("scale", round(scale, 5))
print("int8", q.tolist())
print("max_abs_error", round(float(np.max(np.abs(x - reconstructed))), 5))
```

Observed output:

```text
QUANTIZATION
scale 0.01339
int8 [-93, -7, 0, 60, 127]
max_abs_error 0.0063
```

This toy vector reconstructs closely: the largest absolute reconstruction error is 0.0063 after mapping values into int8 with scale 0.01339. The endpoint 1.7 maps exactly to 127 by construction, while intermediate values absorb rounding error, which is why real models need layer-wise evaluation after quantization.

## Caveats

Quantization can degrade rare-token behavior, arithmetic, multilingual quality, or long-context stability before aggregate benchmarks show large drops.

## References

- [PyTorch documentation: Quantization](https://pytorch.org/docs/stable/quantization.html)
- [OpenAI API documentation: Latency optimization](https://platform.openai.com/docs/guides/latency-optimization)
- [OpenAI API documentation: Cost optimization](https://platform.openai.com/docs/guides/cost-optimization)
