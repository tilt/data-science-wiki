---
title: Vanishing and Exploding Gradients
slug: deep-learning/vanishing-and-exploding-gradients
description: "Gradient-scale pathologies caused by repeated chain-rule products in deep and recurrent networks."
area: deep-learning
topics:
  - vanishing-gradients
  - exploding-gradients
  - optimization
level: foundational
status: review
page_type: concept
aliases:
  - Vanishing Gradients
  - Exploding Gradients
  - Gradient Explosion
prerequisites:
  - backpropagation.md
related:
  - backpropagation.md
  - initialization.md
  - activation-functions.md
  - normalization.md
  - residual-connections.md
  - lstm-and-gru.md
historical_context: true
last_reviewed: 2026-07-21
---

# Vanishing and Exploding Gradients

Vanishing and exploding gradients are training failures caused by repeated multiplication in [backpropagation](backpropagation.md). The loss gradient must travel backward through many layers or time steps. If that backward signal is repeatedly shrunk, early layers barely learn. If it is repeatedly amplified, updates become unstable and can produce infinities or NaNs.

## Defining math

For a deep chain of hidden states

$$
h_\ell=f_\ell(h_{\ell-1}),
$$

the gradient with respect to an early hidden state is

$$
\frac{\partial L}{\partial h_0}
=
\frac{\partial L}{\partial h_L}
\prod_{\ell=1}^{L}
\frac{\partial h_\ell}{\partial h_{\ell-1}}.
$$

Here $L$ is the loss, $h_0$ is an early hidden state, $h_L$ is a later hidden state, and $f_\ell$ is the transformation at layer or time step $\ell$. The matrix $J_\ell=\partial h_\ell/\partial h_{\ell-1}$ is the local Jacobian of layer $\ell$: it says how small changes in $h_{\ell-1}$ affect $h_\ell$. The product of these Jacobians controls how much gradient reaches early layers.

If the typical singular values or norms of these Jacobians are below $1$, the product tends to shrink. Singular values are the stretch factors of a matrix: they describe how much the Jacobian can expand or contract directions in vector space.

$$
0.8^{20}\approx0.012.
$$

If they are above $1$, the product tends to grow:

$$
1.2^{20}\approx38.
$$

This is why depth, recurrent time length, activation derivatives, weight scale, and normalization all affect whether gradients remain usable.

## Symptoms and mitigations

Vanishing gradients show up as early layers that learn slowly, recurrent models that fail to use distant context, or saturated sigmoid/tanh units whose derivatives are near zero. Common mitigations include better [initialization](initialization.md), non-saturating [activation functions](activation-functions.md), [BatchNorm](normalization.md#batch-normalization) or [LayerNorm](normalization.md#layer-normalization), gated recurrent cells such as [LSTM and GRU](lstm-and-gru.md), and [residual connections](residual-connections.md).

Exploding gradients show up as sudden loss spikes, huge parameter updates, infinities, or NaNs. Common mitigations include smaller learning rates, gradient clipping, careful initialization, [normalization](normalization.md), and residual architectures. Clipping is especially common in recurrent training because it caps the update even when a sequence produces a large Jacobian product.

## Residual connections

[Residual connections](residual-connections.md) help because a residual block has

$$
y=x+F(x),
$$

so its backward derivative contains an identity term:

$$
\frac{\partial y}{\partial x}
=
I+\frac{\partial F}{\partial x}.
$$

The gradient therefore has a direct additive route through the skip path instead of being forced only through the nonlinear transform $F$. This is especially important for vanishing gradients in very deep networks. It also improves overall gradient-scale stability, but it is not a complete cure for exploding gradients; initialization, normalization, learning-rate choice, and clipping can still matter.

## Batch normalization

[Batch normalization](normalization.md#batch-normalization) helps by standardizing intermediate activations during training and learning a scale and shift afterward. Keeping activation distributions in a usable range can make the local Jacobians less erratic, reduce sensitivity to initialization, and allow larger learning rates. It does not mathematically guarantee that gradients cannot vanish or explode, but in CNN-style networks it is one of the standard tools that made deeper optimization practical.

## Caveats

The problem is not just "large or small gradients" in isolation. A small gradient can be appropriate near a good optimum, and a large gradient can be appropriate when far from one. The pathology is repeated uncontrolled scaling across many transformations, especially when it prevents earlier parameters from receiving a useful learning signal or makes optimization numerically unstable.

## References

- [Bengio, Simard, and Frasconi, 1994, Learning Long-Term Dependencies with Gradient Descent is Difficult](https://www.dlsi.ua.es/~mlf/nnafmc/papers/bengio94learning.pdf)
- [Pascanu, Mikolov, and Bengio, 2013, On the difficulty of training recurrent neural networks](https://arxiv.org/abs/1211.5063)
- [Ioffe and Szegedy, 2015, Batch Normalization](https://arxiv.org/abs/1502.03167)
- [He et al., 2015, Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Backpropagation](backpropagation.md) [Activation Functions →](activation-functions.md)
