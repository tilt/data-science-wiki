---
title: V-JEPA 2
slug: video-understanding/v-jepa-2
description: V-JEPA 2 overview and practical notes.
area: video-understanding
topics:
  - "v-jepa-2"
  - "world-models"
  - "self-supervised-video"
level: intermediate
status: draft
page_type: model
aliases:
  - "VJEPA 2"
prerequisites: []
related: []
historical_context: false
last_reviewed: 2026-07-10
references:
  - "assran-2025-vjepa2"
  - "bardes-2024-vjepa"
---
# V-JEPA 2

## Summary

V-JEPA 2 is a self-supervised video model in the Joint Embedding Predictive Architecture family. The published paper describes pretraining on video and image data, then using learned representations for video understanding, prediction, and planning-oriented downstream work.

## Confirmed from primary sources

- V-JEPA 2 is trained with a joint-embedding predictive objective rather than an autoregressive text objective.
- It predicts in latent representation space.
- The 2025 paper reports video understanding, action anticipation, video question-answering after language-model alignment, and a V-JEPA 2-AC variant for robot planning experiments.

## Interpretation

Calling V-JEPA 2 a world model reflects the authors' planning and prediction framing. It should not be read as proof that it has complete physical understanding or general agency.

## References

- Primary: Assran et al. V-JEPA 2: Self-Supervised Video Models Enable Understanding, Prediction and Planning. arXiv:2506.09985, 2025.
- Primary: Bardes et al. Revisiting Feature Prediction for Learning Visual Representations from Video. arXiv:2404.08471, 2024.
