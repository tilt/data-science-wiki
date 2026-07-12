---
title: World Models and JEPA
slug: video-understanding/world-models-and-jepa
description: "How JEPA-style latent prediction relates to world-model learning from video."
area: video-understanding
topics:
  - world-models
  - jepa
  - self-supervised-learning
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - world-models.md
  - v-jepa.md
related:
  - world-models.md
  - v-jepa.md
  - v-jepa-2.md
  - self-supervised-video-representation-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# World Models and JEPA

JEPA connects to [world models](world-models.md) through prediction in representation space. A pixel-prediction model tries to generate future sensory detail; a JEPA-style model tries to predict the latent features that matter for understanding or planning. This makes [V-JEPA](v-jepa.md) and [V-JEPA 2](v-jepa-2.md) natural examples in video understanding.

## Defining mechanism

An energy view scores whether a predicted latent matches the target latent:

$$
E(\hat z, z)=\lVert \hat z-z\rVert_2^2.
$$

Training lowers energy for the true target and keeps alternatives higher, either directly through regression or with contrastive/regularized variants. The world-model interpretation appears when the predicted latent represents a missing or future state rather than a random augmentation.

## Worked example

```python
import numpy as np
import torch

context = torch.tensor([1.0, 0.5])
target = torch.tensor([1.2, 0.55])
negatives = torch.tensor([[0.2,1.4],[1.8,-0.3]])
pred = torch.tensor([1.1, 0.6])
def energy(a, b):
    return ((a - b) ** 2).sum().item()
energies = [energy(pred, target)] + [energy(pred, n) for n in negatives]
print("energies_target_then_negatives", [round(e, 3) for e in energies])
print("target_rank", int(np.argsort(energies).tolist().index(0) + 1))
```

Observed output:

```text
energies_target_then_negatives [0.013, 1.45, 1.3]
target_rank 1
```

The true target has the lowest energy, so the latent prediction is closer to the actual future than to the two alternatives.

## Caveats

Representation-space prediction can ignore unpredictable pixel detail, which is useful, but it also means the representation defines what the model can care about. A low latent loss does not guarantee causal understanding, calibrated uncertainty, or reliable planning. Treat JEPA as a world-modeling research route, not a complete recipe.

## References

- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
- [Ha and Schmidhuber, 2018, World Models](https://arxiv.org/abs/1803.10122)
- [Assran et al., 2025, V-JEPA 2](https://arxiv.org/abs/2506.09985)
