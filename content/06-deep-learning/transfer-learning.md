---
title: Transfer Learning
slug: deep-learning/transfer-learning
description: "Reusing representations learned on one task or domain for a new task."
area: deep-learning
topics:
  - transfer-learning
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - fine-tuning.md
  - representation-learning.md
  - self-supervised-learning.md
  - regularization.md
historical_context: false
last_reviewed: 2026-07-11
---

# Transfer Learning

Transfer learning starts from a model or [representation](representation-learning.md) learned elsewhere and adapts it to a new task. The simplest version freezes the base and trains a small head; [fine-tuning](fine-tuning.md) updates some or all pretrained weights. It works best when the source task learned features that remain useful in the target domain, including features learned by [self-supervised learning](self-supervised-learning.md).

## Defining math

Let $f_{\theta_0}$ be a pretrained encoder and $g_\psi$ a new task head. Feature extraction solves

$$
\min_\psi \frac{1}{n}\sum_i L(g_\psi(f_{\theta_0}(x_i)), y_i),
\qquad \theta_0 \text{ frozen}.
$$

Fine-tuning instead optimizes $\theta$ as well, often with smaller learning rates or stronger [regularization](regularization.md):

$$
\min_{\theta,\psi}\frac{1}{n}\sum_i L(g_\psi(f_\theta(x_i)), y_i).
$$

## Worked example

This snippet trains a classifier head on frozen features and reports head accuracy before and after while confirming the feature tensor does not require gradients.

```python
import torch
import torch.nn.functional as F

torch.manual_seed(11)
X = torch.randn(120, 5)
frozen = torch.randn(5, 4)
y = ((X @ frozen)[:, 0] > 0).long()
feats = (X @ frozen).detach()
head = torch.nn.Linear(4, 2)
opt = torch.optim.SGD(head.parameters(), lr=0.2)
start_acc = (head(feats).argmax(1) == y).float().mean().item()
for _ in range(60):
    opt.zero_grad()
    loss = F.cross_entropy(head(feats), y)
    loss.backward()
    opt.step()
acc = (head(feats).argmax(1) == y).float().mean().item()
print("head_acc_before", round(start_acc, 3), "after", round(acc, 3))
print("feature_grad_needed", feats.requires_grad)
```

Observed output:

```text
head_acc_before 0.592 after 1.0
feature_grad_needed False
```

The frozen features already contain the target signal, so a trained linear head solves the task. Because `feats` is detached, no gradient flows into the base representation.

## Caveats

Transfer can fail when source and target domains differ in low-level statistics or label semantics. Freezing too much underfits; updating too much can erase useful pretrained structure. Always compare against a scratch baseline when target data is large enough.

## References

- [Yosinski et al., 2014, How transferable are features in deep neural networks?](https://arxiv.org/abs/1411.1792)
- [PyTorch tutorial: Transfer Learning for Computer Vision](https://docs.pytorch.org/tutorials/beginner/transfer_learning_tutorial.html)

> **Section — [Deep Learning](index.md):** ← [Contrastive Learning](contrastive-learning.md) · [Fine-Tuning](fine-tuning.md) →
