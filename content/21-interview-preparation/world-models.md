---
title: World Models
slug: interview-preparation/world-models
description: Interview map for world-model, JEPA, video-prediction, and planning questions.
area: interview-preparation
topics:
  - world-models
  - interview-question-map
level: advanced
status: review
page_type: topic-index
aliases: []
prerequisites:
  - index.md
related:
  - lecun-jepa-world-models-motivation.md
  - v-jepa-2-versus-vision-language-model.md
  - "../10-video-understanding/world-models.md"
  - "../10-video-understanding/world-models-and-jepa.md"
  - "../10-video-understanding/v-jepa.md"
  - "../10-video-understanding/v-jepa-2.md"
  - "../20-history-of-ai-and-machine-learning/world-models-and-jepa-background.md"
historical_context: false
last_reviewed: 2026-07-11
---
# World Models

## Map answer

World-model interview questions test whether you can explain predictive representations without overstating them. A world model learns state and dynamics that can support prediction, planning, or control; in video understanding, the key issue is whether learned latents capture how scenes evolve, not whether the model can produce impressive pixels.

## Question map

| Prompt type | Strong answer should mention | Canonical page |
| --- | --- | --- |
| "What is a world model?" | Latent state, dynamics, rollout, uncertainty, planning objective, and task evaluation. | [World Models](../10-video-understanding/world-models.md) |
| "How does JEPA relate?" | Predicting missing or future representations rather than reconstructing every pixel. | [World Models and JEPA](../10-video-understanding/world-models-and-jepa.md) |
| "What is V-JEPA?" | Self-supervised video representation learning through latent feature prediction. | [V-JEPA](../10-video-understanding/v-jepa.md) |
| "What changed in V-JEPA 2?" | Scaling, video understanding, prediction, and a latent action-conditioned planning variant. | [V-JEPA 2](../10-video-understanding/v-jepa-2.md) |
| "How is it different from a VLM?" | Predictive visual representation versus language-conditioned response generation. | [V-JEPA 2 versus Vision-Language Models](../10-video-understanding/v-jepa-2-versus-vision-language-models.md) |

## Interview artifact

Use a grounded scenario: "A video model sees a cup moving toward the table. A label classifier may say 'cup'. A VLM may answer a question about the scene. A world-model-style representation should help predict the next latent state, reason about whether the cup will contact the table, or choose an action if paired with an action-conditioned dynamics model." That artifact links to [LeCun JEPA motivation](lecun-jepa-world-models-motivation.md) and [V-JEPA 2 versus VLMs](v-jepa-2-versus-vision-language-model.md).

## Common follow-ups

- **"Does prediction imply understanding?"** No. Test downstream transfer, robustness, long-horizon prediction, uncertainty, and planning usefulness.
- **"Why latent prediction?"** It can ignore unpredictable pixel detail and focus learning on features useful for future state.
- **"Where is the evidence?"** Cite the actual model papers and keep benchmark claims tied to those papers rather than making broad AGI claims.

## References

- [Ha and Schmidhuber, 2018, World Models](https://arxiv.org/abs/1803.10122)
- [Bardes et al., 2024, Revisiting Feature Prediction for Learning Visual Representations from Video](https://arxiv.org/abs/2404.08471)
- [Assran et al., 2025, V-JEPA 2](https://arxiv.org/abs/2506.09985)
