---
title: World Models
slug: video-understanding/world-models
description: "Latent state and dynamics models used for prediction, planning, or control from video."
area: video-understanding
topics:
  - world-models
level: advanced
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - world-models-and-jepa.md
  - v-jepa-2.md
  - video-representation.md
  - self-supervised-video-representation-learning.md
historical_context: false
last_reviewed: 2026-07-11
---

# World Models

World models learn a latent state and transition model that supports prediction, planning, or control. In video understanding, this means representing how scenes evolve, not only recognizing a label. The topic overlaps with [video representation](video-representation.md), [self-supervised video representation learning](self-supervised-video-representation-learning.md), and [V-JEPA 2](v-jepa-2.md).

## Defining mechanism

A compact world model has an encoder, dynamics model, and decoder or cost head:

$$
z_t = E(x_t), \qquad \hat z_{t+1}=F(z_t,a_t), \qquad \hat x_{t+1}=D(\hat z_{t+1}).
$$

Planning can happen in latent space by rolling out candidate actions and minimizing a cost. [World models and JEPA](world-models-and-jepa.md) focuses on the variant where prediction happens in representation space rather than pixel space.

## Worked rollout

With a simple latent transition

$$
A=\begin{bmatrix}1.0&0.2\\0.0&0.9\end{bmatrix},
\qquad z_0=(1.0,0.5),
$$

the rollout is:

| step |    latent state |
| ---: | --------------: |
|    0 | $(1.000,0.500)$ |
|    1 | $(1.100,0.450)$ |
|    2 | $(1.190,0.405)$ |
|    3 | $(1.271,0.364)$ |

The first coordinate grows because it receives $0.2$ times the second coordinate at each step; the second coordinate decays by a factor of $0.9$. Real learned world models replace this hand-coded matrix with neural dynamics trained from video or interaction.

## Caveats

A useful latent rollout is not automatically a faithful simulator. Evaluation must test counterfactuals, long-horizon error, uncertainty, and planning performance, not only next-step prediction. Video-only data may not identify action effects without interaction data.

## References

- [Ha and Schmidhuber, 2018, World Models](https://arxiv.org/abs/1803.10122)
- [Assran et al., 2025, V-JEPA 2](https://arxiv.org/abs/2506.09985)
