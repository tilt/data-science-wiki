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

## Worked latent-prediction example

For two masked target tokens with three-dimensional latents, suppose the predictor and target encoder produce:

| token | predicted latent $\hat z_m$ |    target latent $z_m$ | squared error sum |
| ----: | --------------------------: | ---------------------: | ----------------: |
|     1 |      $(-1.124,0.163,1.568)$ | $(-1.426,0.904,0.856)$ |             1.147 |
|     2 |      $(0.593,0.840,-0.281)$ |  $(0.689,0.885,1.771)$ |             4.222 |

The mean squared error over the six latent coordinates is

$$
\mathcal L=\frac{1.147+4.222}{6}=0.895.
$$

The first token is already fairly close to its target, but the second misses the third coordinate badly. Training adjusts the predictor and context encoder so missing-target representations become predictable from the visible context.

## Caveats

Latent prediction depends on target quality: a weak target encoder gives weak supervision. The method learns representations, not a language interface, so [video-language models](video-language-models.md) still need alignment if the product output is text. Evaluation should include motion-sensitive transfer, not only linear probes on static cues.

## References

- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
- [Assran et al., 2025, V-JEPA 2](https://arxiv.org/abs/2506.09985)

> **Section — [Video Understanding](index.md):** ← [Video-Language Models](video-language-models.md) · [V-JEPA 2](v-jepa-2.md) →
