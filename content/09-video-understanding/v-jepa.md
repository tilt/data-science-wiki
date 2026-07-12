---
title: V-JEPA
slug: video-understanding/v-jepa
description: "A self-supervised video model that predicts masked latent representations instead of reconstructing pixels."
area: video-understanding
topics:
  - v-jepa
level: advanced
status: review
page_type: model
aliases:
  - Video JEPA
prerequisites:
  - index.md
related:
  - self-supervised-video-representation-learning.md
  - v-jepa-2.md
  - world-models-and-jepa.md
  - video-representation.md
historical_context: false
last_reviewed: 2026-07-11
---
# V-JEPA

V-JEPA is a video version of the Joint Embedding Predictive Architecture idea: encode visible context, predict missing target representations, and avoid reconstructing every pixel. It is part of [self-supervised video representation learning](self-supervised-video-representation-learning.md), but its key design choice is latent prediction. The successor page [V-JEPA 2](v-jepa-2.md) extends the framing toward understanding, prediction, and planning.

## Defining mechanism

Let $x_c$ be visible context and $x_m$ be a masked target region. A context encoder, target encoder, and predictor produce

$$
z_c=f_\theta(x_c), \qquad z_m=\operatorname{stopgrad}(f_{\bar\theta}(x_m)), \qquad \hat z_m=p_\phi(z_c),
$$

with a latent prediction loss

$$
\mathcal L = \lVert \hat z_m-z_m\rVert_2^2.
$$

Predicting representations encourages semantic structure and temporal consistency without spending all capacity on pixel-level detail.

## Worked example

```python
import torch

torch.manual_seed(4)
context = torch.randn(2,3)
target = torch.randn(2,3)
predictor = torch.nn.Linear(3,3,bias=False)
with torch.no_grad():
    predictor.weight.copy_(torch.eye(3) * 0.7)
pred = predictor(context)
loss = ((pred - target) ** 2).mean()
print("predicted_latents", torch.round(pred, decimals=3).tolist())
print("target_latents", torch.round(target, decimals=3).tolist())
print("latent_mse", round(loss.item(), 4))
```

Observed output:

```text
predicted_latents [[-1.1239999532699585, 0.16300000250339508, 1.5679999589920044], [0.5929999947547913, 0.8399999737739563, -0.2809999883174896]]
target_latents [[-1.4259999990463257, 0.9039999842643738, 0.8560000061988831], [0.6890000104904175, 0.8849999904632568, 1.7710000276565552]]
latent_mse 0.8948
```

The toy predictor is not good yet, so its latent MSE is high. Training adjusts the predictor and context encoder so missing-target representations become predictable.

## Caveats

Latent prediction depends on target quality: a weak target encoder gives weak supervision. The method learns representations, not a language interface, so [video-language models](video-language-models.md) still need alignment if the product output is text. Evaluation should include motion-sensitive transfer, not only linear probes on static cues.

## References

- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
- [Assran et al., 2025, V-JEPA 2](https://arxiv.org/abs/2506.09985)
