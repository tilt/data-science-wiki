---
title: World Models and JEPA Background
slug: history-of-ai-and-machine-learning/world-models-and-jepa-background
description: "How predictive world models and joint-embedding predictive architectures connect model-based agents, self-supervision, and video representation learning."
area: history-of-ai-and-machine-learning
topics:
  - world-models-and-jepa-background
level: advanced
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../10-video-understanding/world-models-and-jepa.md
  - ../10-video-understanding/world-models.md
  - ../10-video-understanding/v-jepa.md
  - ../10-video-understanding/v-jepa-2.md
  - ../10-video-understanding/self-supervised-video-representation-learning.md
  - ../06-deep-learning/self-supervised-learning.md
historical_context: true
last_reviewed: 2026-07-11
---

# World Models and JEPA Background

World-model research asks whether an agent can learn an internal predictive model of its environment and use that model for planning, representation, or control. JEPA-style work narrows the prediction target: predict latent representations of missing or future observations rather than reconstructing every pixel.

## Verified chronology

| Year | Milestone                                                                                                                                       | Why it followed                                                                                                                                                                                                     |
| ---- | ----------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 2018 | Ha and Schmidhuber published "World Models," training agents with compressed visual and temporal models of reinforcement-learning environments. | Model-based agents needed a learned simulator-like representation so policies could be trained or evaluated beyond direct environment interaction.                                                                  |
| 2022 | Yann LeCun's "A Path Towards Autonomous Machine Intelligence" argued for predictive world models and joint-embedding predictive architectures.  | Purely reactive pattern recognition was not enough for planning; agents needed abstract predictions about the world.                                                                                                |
| 2023 | Assran and coauthors introduced I-JEPA for self-supervised image representation learning.                                                       | Predicting representations of masked image regions tested whether latent prediction could learn semantics without pixel reconstruction or hand-crafted augmentations.                                               |
| 2024 | Bardes and coauthors introduced V-JEPA for video feature prediction.                                                                            | Video supplied the temporal structure needed for [self-supervised video representation learning](../10-video-understanding/self-supervised-video-representation-learning.md) and predictive world-model evaluation. |

## Historical mechanism

The older world-model idea is agent-centric: compress observations, predict future states, and use the model to choose actions. The JEPA idea is representation-centric: encode visible context and predict the embedding of hidden or future targets. That distinction matters. Pixel reconstruction spends capacity on texture and low-level detail; latent prediction can focus on semantic structure if the target representation and masking policy are well chosen.

This page is the historical background for the canonical [world models and JEPA](../10-video-understanding/world-models-and-jepa.md) concept page. In video, [V-JEPA](../10-video-understanding/v-jepa.md) and later [V-JEPA 2](../10-video-understanding/v-jepa-2.md) sit between [world models](../10-video-understanding/world-models.md) and [self-supervised learning](../06-deep-learning/self-supervised-learning.md): they learn from unlabeled observations, but the motivating question is whether the learned representation supports prediction, physical reasoning, or downstream action.

The historical caveat is that "world model" is used broadly. Some systems predict pixels, some predict latent states, some condition on actions, and some are representation learners without explicit planning. The date and source of each claim matter because the term covers several related research programs.

## References

- [Ha and Schmidhuber, 2018, World Models](https://arxiv.org/abs/1803.10122)
- [LeCun, 2022, A Path Towards Autonomous Machine Intelligence](https://openreview.net/forum?id=BZ5a1r-kVsf)
- [Assran et al., 2023, Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243)
- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)

> **Section — [History of AI and Machine Learning](index.md):** ← [Development of Tool-Using Language Models and Agents](development-of-tool-using-language-models-and-agents.md)
