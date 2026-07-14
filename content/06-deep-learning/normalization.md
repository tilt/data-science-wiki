---
title: Normalization
slug: deep-learning/normalization
description: "Trainable standardization layers that stabilize activation scale."
area: deep-learning
topics:
  - normalization
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - initialization.md
  - transformers.md
  - convolutional-neural-networks.md
  - backpropagation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Normalization

Normalization layers standardize intermediate activations and then apply trainable scale and shift. They reduce sensitivity to [initialization](initialization.md) and learning rate, but the axis being normalized matters: batch norm couples examples in a minibatch, while layer norm normalizes features within each example and is therefore natural in [transformers](transformers.md).

## Defining math

For a set of activations $x$, normalization computes

$$
\mu=\frac{1}{m}\sum_i x_i,\qquad
\sigma^2=\frac{1}{m}\sum_i(x_i-\mu)^2,
$$

Here the $m$ values are the activations in whichever axis is being normalized: a batch-feature column for batch norm, or the feature coordinates of one example for layer norm. The mean $\mu$ recenters those values and $\sigma^2$ measures their spread.

then returns

$$
y_i=\gamma\frac{x_i-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta.
$$

The normalized value is scaled by trainable $\gamma$ and shifted by trainable $\beta$, so the layer can recover a useful activation scale instead of forcing every downstream feature to stay standardized. The small $\epsilon$ prevents division by zero.

Batch normalization usually estimates $\mu,\sigma^2$ across the minibatch and spatial positions, common in [convolutional networks](convolutional-neural-networks.md). Layer normalization estimates them across a single example's feature dimension, so train and inference use the same statistics.

## Worked example

```python
import torch

x = torch.tensor([[1., 2., 7.], [3., 4., 9.]])
batch = (x - x.mean(0)) / torch.sqrt(x.var(0, unbiased=False) + 1e-5)
layer = (x - x.mean(1, keepdim=True)) / torch.sqrt(x.var(1, unbiased=False, keepdim=True) + 1e-5)
print("batch_norm_means", torch.round(batch.mean(0), decimals=4).tolist())
print("batch_norm_vars", torch.round(batch.var(0, unbiased=False), decimals=4).tolist())
print("layer_norm_row0", torch.round(layer[0], decimals=4).tolist())
```

Observed output:

```text
batch_norm_means [0.0, 0.0, 0.0]
batch_norm_vars [1.0, 1.0, 1.0]
layer_norm_row0 [-0.8889999985694885, -0.5080000162124634, 1.3969999551773071]
```

Batch normalization makes each feature column zero-mean and unit-variance across the two examples. Layer normalization instead standardizes the first row across its three features.

## Caveats

Batch norm's train/eval split is a real failure mode: stale running statistics can break inference after distribution shift or very small batches. Layer norm avoids batch coupling but does not preserve feature scale information unless the learned affine parameters recover it. Normalization also changes the effective optimization geometry, so it is not merely preprocessing.

## References

- [Ioffe and Szegedy, 2015, Batch Normalization](https://arxiv.org/abs/1502.03167)
- [Ba, Kiros, and Hinton, 2016, Layer Normalization](https://arxiv.org/abs/1607.06450)
