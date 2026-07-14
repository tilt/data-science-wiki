---
title: Self-Supervised Learning
slug: deep-learning/self-supervised-learning
description: "Learning from prediction tasks whose labels are generated from the data itself."
area: deep-learning
topics:
  - self-supervised-learning
level: foundational
status: review
page_type: concept
aliases:
  - self supervised learning
prerequisites:
  - index.md
related:
  - autoencoders.md
  - contrastive-learning.md
  - representation-learning.md
  - transfer-learning.md
  - ../10-video-understanding/self-supervised-video-representation-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# Self-Supervised Learning

Self-supervised learning creates a training signal from unlabeled data: predict masked content, match two augmented views, order frames, or reconstruct missing features. The goal is usually a reusable [representation](representation-learning.md) that can be adapted by [transfer learning](transfer-learning.md), not the pretext task itself. [Autoencoders](autoencoders.md) and [contrastive learning](contrastive-learning.md) are two major families.

## Defining math

Let $t$ be a transformation that hides or augments part of $x$. A masked-prediction objective can be written as

$$
\min_\theta \mathbb E_x\left[L(g_\theta(t(x)), s(x))\right],
$$

where $s(x)$ is the hidden target derived from the same example. Contrastive self-supervision instead forms two views $v_1=t_1(x)$ and $v_2=t_2(x)$ and pulls their embeddings together while pushing apart other examples.

## Worked example

This snippet trains a small predictor to reconstruct masked features from visible features and reports the loss change plus learned weights.

```python
import torch
import torch.nn.functional as F

torch.manual_seed(9)
X = torch.randn(100, 3)
y = X[:, 2:3]
visible = X[:, :2]
pred = torch.nn.Linear(2, 1)
opt = torch.optim.SGD(pred.parameters(), lr=0.2)
start = F.mse_loss(pred(visible), y).item()
for _ in range(80):
    opt.zero_grad()
    loss = F.mse_loss(pred(visible), y)
    loss.backward()
    opt.step()
print("masked_feature_loss_before", round(start, 4), "after", round(loss.item(), 4))
print("learned_weights", torch.round(pred.weight.detach(), decimals=3).tolist())
```

Observed output:

```text
masked_feature_loss_before 1.4685 after 0.8666
learned_weights [[0.014000000432133675, -0.19900000095367432]]
```

The target is not externally labeled; it is the hidden third feature. Loss falls because the model extracts whatever correlation exists in the visible features, but the remaining error shows that the hidden feature is not fully determined.

## Caveats

The pretext task must require information that transfers. A model can solve a bad pretext task through shortcuts, such as color artifacts or augmentation fingerprints. In video, leakage through adjacent frames is especially easy, which is why self-supervised video work needs careful sampling and masking.

## References

- [Bengio, Courville, and Vincent, 2012, Representation Learning](https://arxiv.org/abs/1206.5538)
- [Chen et al., 2020, A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)
