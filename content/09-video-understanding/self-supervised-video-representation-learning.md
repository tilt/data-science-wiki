---
title: Self-Supervised Video Representation Learning
slug: video-understanding/self-supervised-video-representation-learning
description: "Training video encoders from unlabeled clips using prediction, masking, ordering, or contrastive objectives."
area: video-understanding
topics:
  - self-supervised-video-representation-learning
level: advanced
status: review
page_type: concept
aliases:
  - Self-supervised video learning
prerequisites:
  - index.md
related:
  - video-representation.md
  - v-jepa.md
  - v-jepa-2.md
  - ../06-deep-learning/self-supervised-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# Self-Supervised Video Representation Learning

Self-supervised video representation learning trains encoders without manual clip labels. The supervision comes from the video itself: predict masked content, match augmented views, order frames, or predict future latent states. The output is a reusable [video representation](video-representation.md) for recognition, retrieval, anticipation, or [V-JEPA](v-jepa.md)-style latent prediction.

## Defining mechanism

A contrastive objective makes two views of the same clip close and other clips far:

$$
\mathcal L_i = -\log\frac{\exp(\operatorname{sim}(z_i,z_i^+)/\tau)}
\sum_j \exp(\operatorname{sim}(z_i,z_j^+)/\tau)}.
$$

Masked-video objectives instead hide patches or tubelets and predict pixels, tokens, or latent targets. JEPA-style methods differ from pixel reconstruction by predicting representation-space targets, which connects this page directly to [V-JEPA 2](v-jepa-2.md).

## Worked example

```python
import torch

torch.manual_seed(4)
z = torch.nn.functional.normalize(torch.randn(3,4), dim=1)
z_aug = torch.nn.functional.normalize(z + 0.15*torch.randn(3,4), dim=1)
logits = z @ z_aug.T / 0.2
loss = torch.nn.functional.cross_entropy(logits, torch.arange(3))
print("similarity_matrix", torch.round(logits, decimals=2).tolist())
print("infonce_loss", round(loss.item(), 4))
print("top_matches", logits.argmax(1).tolist())
```

Observed output:

```text
similarity_matrix [[4.980000019073486, -3.450000047683716, 1.4700000286102295], [-3.7100000381469727, 4.829999923706055, 1.2400000095367432], [1.4500000476837158, 0.9599999785423279, 4.940000057220459]]
infonce_loss 0.035
top_matches [0, 1, 2]
```

Each clip correctly matches its augmented version. In real video, the hard part is choosing augmentations that preserve action identity without making shortcuts too easy.

## Caveats

Temporal augmentations can destroy labels that depend on order. Pixel reconstruction may spend capacity on texture instead of semantics; latent prediction can collapse if targets and predictors are not designed carefully. Downstream evaluation should include motion-sensitive tasks, not only static scene recognition.

## References

- [Tong et al., 2022, VideoMAE](https://arxiv.org/abs/2203.12602)
- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
