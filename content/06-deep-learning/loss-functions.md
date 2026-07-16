---
title: Loss Functions
slug: deep-learning/loss-functions
description: "Training objectives that turn predictions and targets into differentiable error signals."
area: deep-learning
topics:
  - loss-functions
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - backpropagation.md
  - regularization.md
  - neural-network-fundamentals.md
  - ../01-mathematical-foundations/cross-entropy.md
historical_context: false
last_reviewed: 2026-07-11
---

# Loss Functions

A loss function defines what training means. It converts model outputs and targets into a scalar that [backpropagation](backpropagation.md) can differentiate. The same architecture can behave very differently under mean squared error, binary cross-entropy, or multiclass [cross-entropy](../01-mathematical-foundations/cross-entropy.md).

## Defining math

For regression, mean squared error is

$$
L_{\text{MSE}}=\frac{1}{n}\sum_i(\hat y_i-y_i)^2.
$$

For binary labels with predicted probability $p_i$,

$$
L_{\text{BCE}}=-\frac{1}{n}\sum_i y_i\log p_i+(1-y_i)\log(1-p_i).
$$

For multiclass logits $z$ and class $c$,

$$
L_{\text{CE}}(z,c)=-\log\frac{\exp z_c}{\sum_j \exp z_j}.
$$

[Regularization](regularization.md) adds terms such as $\lambda\lVert\theta\rVert_2^2/2$ to the data loss, changing the gradient even when predictions are unchanged.

## Worked example

This snippet computes cross-entropy, softmax probabilities, cross-entropy gradients, and a regression MSE on small tensors.

```python
import torch
import torch.nn.functional as F

logits = torch.tensor([[2.0, 0.0, -1.0]], requires_grad=True)
target = torch.tensor([0])
ce = F.cross_entropy(logits, target)
ce.backward()
print("cross_entropy", round(ce.item(), 4))
print("softmax", torch.round(logits.detach().softmax(1), decimals=4).tolist())
print("ce_grad", torch.round(logits.grad, decimals=4).tolist())
pred = torch.tensor([0.2, 0.7])
truth = torch.tensor([0.0, 1.0])
print("mse", round(F.mse_loss(pred, truth).item(), 4),
      "bce", round(F.binary_cross_entropy(pred, truth).item(), 4))
```

Observed output:

```text
cross_entropy 0.1698
softmax [[0.8438000082969666, 0.11420000344514847, 0.041999999433755875]]
ce_grad [[-0.15620000660419464, 0.11420000344514847, 0.041999999433755875]]
mse 0.065 bce 0.2899
```

For cross-entropy with class indices, the gradient is softmax probability minus the one-hot target. The correct class has negative gradient because increasing its logit lowers the loss.

## Caveats

Losses are surrogate objectives. Cross-entropy rewards probability ranking and confidence, not directly F1, recall at fixed precision, or business cost. Class imbalance, label noise, and label smoothing change the target distribution, so the reported metric must match the decision being optimized.

## References

- [PyTorch documentation: CrossEntropyLoss](https://docs.pytorch.org/docs/2.7/generated/torch.nn.CrossEntropyLoss.html)
- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 8: Optimization for Training Deep Models](https://www.deeplearningbook.org/contents/optimization.html)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Activation Functions](activation-functions.md) [Optimizers →](optimizers.md)
