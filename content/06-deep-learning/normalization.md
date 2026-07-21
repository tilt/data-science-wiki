---
title: Normalization
slug: deep-learning/normalization
description: "Trainable standardization layers that stabilize activation scale."
area: deep-learning
topics:
  - normalization
  - batch-normalization
  - layer-normalization
level: intermediate
status: review
page_type: concept
aliases:
  - Batch Normalization
  - BatchNorm
  - Layer Normalization
  - LayerNorm
prerequisites:
  - index.md
related:
  - initialization.md
  - vanishing-and-exploding-gradients.md
  - residual-connections.md
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

Normalization then returns

$$
y_i=\gamma\frac{x_i-\mu}{\sqrt{\sigma^2+\epsilon}}+\beta.
$$

The normalized value is scaled by trainable $\gamma$ and shifted by trainable $\beta$, so the layer can recover a useful activation scale instead of forcing every downstream feature to stay standardized. The small $\epsilon$ prevents division by zero.

Batch normalization usually estimates $\mu,\sigma^2$ across the minibatch and spatial positions, common in [convolutional networks](convolutional-neural-networks.md). Layer normalization estimates them across a single example's feature dimension, so train and inference use the same statistics.

## Batch normalization

Batch normalization standardizes each feature or channel using statistics from the current training minibatch. For a feature/channel $c$, let $\mathcal I_c$ be the set of values used to estimate its moments: in an MLP this is usually the minibatch examples for feature $c$; in a CNN this is often minibatch examples plus spatial positions for channel $c$.

$$
\mu_c=\frac{1}{|\mathcal I_c|}\sum_{i\in\mathcal I_c}x_{i,c},
\qquad
\sigma_c^2=\frac{1}{|\mathcal I_c|}\sum_{i\in\mathcal I_c}(x_{i,c}-\mu_c)^2.
$$

The normalized activation is

$$
\hat x_{i,c}=\frac{x_{i,c}-\mu_c}{\sqrt{\sigma_c^2+\epsilon}},
\qquad
y_{i,c}=\gamma_c\hat x_{i,c}+\beta_c.
$$

Here $x_{i,c}$ is one activation value for item or position $i$ and feature/channel $c$, $\epsilon$ is a small numerical constant, and $\gamma_c,\beta_c$ are learned scale and shift parameters. The learned affine parameters are important: they let the network choose the activation scale it needs after the standardization step.

During training, BatchNorm uses minibatch statistics and updates running estimates of the mean and variance. During inference, it uses those running estimates so predictions do not depend on which other examples happen to be in the same batch.

BatchNorm helps with [vanishing and exploding gradients](vanishing-and-exploding-gradients.md) indirectly. By keeping intermediate activations in a controlled range, it reduces sensitivity to weight scale and learning rate, which usually makes the local backward Jacobians less erratic. It is not a proof that gradients cannot vanish or explode, but it was one of the key techniques that made deeper CNNs easier to optimize.

## Layer normalization

Layer normalization uses the same standardize-then-affine pattern, but computes the moments across the feature coordinates of one example rather than across the minibatch. That makes train and inference behavior the same and avoids coupling different examples together. This is why LayerNorm is the default normalization style inside [transformers](transformers.md), where sequence lengths, batch sizes, and autoregressive inference patterns often make BatchNorm inconvenient.

## Worked example

This snippet applies batch normalization and layer normalization to the same tensor and prints the moments each normalization controls.

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

BatchNorm's train/eval split is a real failure mode: stale running statistics can break inference after distribution shift or very small batches. It is also awkward for online inference and variable batch composition. LayerNorm avoids batch coupling but does not preserve feature scale information unless the learned affine parameters recover it. Normalization also changes the effective optimization geometry, so it is not merely preprocessing.

## References

- [Ioffe and Szegedy, 2015, Batch Normalization](https://arxiv.org/abs/1502.03167)
- [Ba, Kiros, and Hinton, 2016, Layer Normalization](https://arxiv.org/abs/1607.06450)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Initialization](initialization.md) [Regularization →](regularization.md)
