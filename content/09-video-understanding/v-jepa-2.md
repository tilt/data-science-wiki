---
title: V-JEPA 2
slug: video-understanding/v-jepa-2
description: "A scaled JEPA-style video model framed around understanding, prediction, and planning."
area: video-understanding
topics:
  - v-jepa-2
  - world-models
  - self-supervised-video
level: advanced
status: review
page_type: model
aliases:
  - VJEPA 2
prerequisites:
  - v-jepa.md
related:
  - v-jepa.md
  - world-models.md
  - world-models-and-jepa.md
  - v-jepa-2-versus-vision-language-models.md
historical_context: false
last_reviewed: 2026-07-11
---
# V-JEPA 2

V-JEPA 2 is a scaled self-supervised video model in the JEPA family. The paper frames it around video understanding, prediction, and planning, including a latent action-conditioned variant for robot planning. It should be read as a [world models](world-models.md) research direction, not as proof that the model has complete physical understanding.

## Defining mechanism

The representation-learning core follows [V-JEPA](v-jepa.md): predict masked or future latent representations from visible context. For planning, an action-conditioned latent dynamics model can score candidate actions:

$$
\hat z_{t+1}=F_\theta(z_t,a_t), \qquad a^*=\arg\min_a C(\hat z_{t+1}, z_{goal}).
$$

That objective is different from a [video-language model](video-language-models.md), which aligns video tokens to text.

## Worked example

```python
import torch

state = torch.tensor([1.0, 0.0])
actions = torch.tensor([[1.0,0.0],[0.0,1.0],[-1.0,0.0]])
goal = torch.tensor([1.4, 0.2])
pred_next = state + 0.5 * actions
cost = ((pred_next - goal) ** 2).sum(1)
print("pred_next", torch.round(pred_next, decimals=3).tolist())
print("planning_costs", torch.round(cost, decimals=3).tolist(), "chosen_action", int(cost.argmin()))
```

Observed output:

```text
pred_next [[1.5, 0.0], [1.0, 0.5], [0.5, 0.0]]
planning_costs [0.05000000074505806, 0.25, 0.8500000238418579] chosen_action 0
```

The action that moves right is closest to the latent goal. Real V-JEPA 2-style planning uses learned latents and learned dynamics rather than this hand-coded toy transition.

## Caveats

Planning claims depend on the action-conditioned model, the data distribution, and the evaluation environment. Latent rollouts can be useful without being faithful physical simulation. Keep the distinction clear when comparing to [V-JEPA 2 versus Vision-Language Models](v-jepa-2-versus-vision-language-models.md): V-JEPA 2 is not inherently a conversational model.

## References

- [Assran et al., 2025, V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning](https://arxiv.org/abs/2506.09985)
- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
