---
title: PyTorch
slug: deep-learning/pytorch
description: "Dynamic-tape tensor programming for neural network training and inference."
area: deep-learning
topics:
  - pytorch
level: foundational
status: complete
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - tensorflow-and-keras.md
  - backpropagation.md
  - optimizers.md
  - loss-functions.md
historical_context: false
last_reviewed: 2026-07-22
---

# PyTorch

PyTorch is a tensor and automatic-differentiation framework for building neural networks in ordinary Python. Its defining training workflow is: run tensor operations, record a dynamic computation graph, call `backward()`, then update parameters with an [optimizer](optimizers.md). Compared with [TensorFlow and Keras](tensorflow-and-keras.md), PyTorch exposes the lower-level imperative loop more directly.

## Autograd and the computation graph

For parameters $\theta$ and scalar loss $L$, PyTorch records operations that produce

$$
L=f_\theta(x)
$$

and reverse-mode autograd computes

$$
\nabla_\theta L=\left(\frac{\partial L}{\partial \theta_1},\ldots,\frac{\partial L}{\partial \theta_p}\right).
$$

The common loop is

$$
\texttt{zero\_grad} \rightarrow \texttt{forward} \rightarrow \texttt{loss} \rightarrow \texttt{backward} \rightarrow \texttt{step}.
$$

That makes [backpropagation](backpropagation.md) explicit while still delegating derivative bookkeeping to autograd and loss-specific kernels to modules such as [loss functions](loss-functions.md).

## Worked example

This snippet builds a one-parameter PyTorch computation, runs backpropagation, applies an SGD step, and prints the autograd function type.

```python
import torch

torch.manual_seed(14)
w = torch.tensor([1.5], requires_grad=True)
x = torch.tensor([2.0])
y = (w * x).pow(2) if w.item() > 1 else w * x
y.backward()
with torch.no_grad():
    w -= 0.1 * w.grad
print("grad", round(w.grad.item(), 3))
print("updated_w", round(w.item(), 3))
print("grad_fn", type(y.grad_fn).__name__)
```

Observed output:

```text
grad 12.0
updated_w 0.3
grad_fn PowBackward0
```

The branch is ordinary Python, but the operations actually executed produce a differentiable graph. The update is wrapped in `no_grad()` so the optimizer step itself is not recorded.

## Caveats

Dynamic graphs are easy to debug but easy to mutate accidentally. In-place tensor operations can invalidate saved backward values. `model.eval()` changes module behavior for dropout and batch norm, while `torch.no_grad()` changes gradient recording; confusing the two creates subtle evaluation bugs.

## References

- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)
- [PyTorch tutorial: Automatic Differentiation with torch.autograd](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Generative Adversarial Networks](generative-adversarial-networks.md) [TensorFlow and Keras →](tensorflow-and-keras.md)
