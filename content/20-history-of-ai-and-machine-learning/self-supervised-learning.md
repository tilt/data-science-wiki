---
title: Self-Supervised Learning
slug: history-of-ai-and-machine-learning/self-supervised-learning
description: "How supervision from raw data became the training engine for modern language, vision, and video representation learning."
area: history-of-ai-and-machine-learning
topics:
  - self-supervised-learning
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../06-deep-learning/self-supervised-learning.md
  - ../06-deep-learning/contrastive-learning.md
  - ../06-deep-learning/representation-learning.md
  - ../09-computer-vision/self-supervised-visual-learning.md
  - ../10-video-understanding/self-supervised-video-representation-learning.md
  - ../11-generative-ai/pretraining.md
historical_context: true
last_reviewed: 2026-07-11
---
# Self-Supervised Learning

Self-supervised learning became central when researchers realized that labels could be generated from the data itself. Text supplies missing-token and next-token targets; images supply transformed views or masked patches; video supplies temporal prediction. This history page complements the modeling page on [self-supervised learning](../06-deep-learning/self-supervised-learning.md).

## Verified chronology

| Year | Milestone | Why it followed |
|---|---|---|
| 2013 | Mikolov, Chen, Corrado, and Dean introduced efficient word-vector training methods. | Predicting nearby words from raw text made large-scale representation learning practical without manual labels. |
| 2018 | Devlin, Chang, Lee, and Toutanova introduced BERT with masked language modeling. | Bidirectional [pretraining](../11-generative-ai/pretraining.md) turned unlabeled text into task-transferable contextual representations. |
| 2020 | Chen, Kornblith, Norouzi, and Hinton introduced SimCLR for contrastive visual representation learning. | Augmentations defined positive pairs, making [contrastive learning](../06-deep-learning/contrastive-learning.md) a scalable vision pretext task. |
| 2020 | Grill and coauthors introduced BYOL, a non-contrastive self-supervised method. | The field tested whether useful invariances could be learned without explicit negative pairs. |
| 2021 | He, Chen, Xie, Li, Dollar, and Girshick introduced masked autoencoders for scalable vision learning. | Masked reconstruction made [self-supervised visual learning](../09-computer-vision/self-supervised-visual-learning.md) align naturally with ViT-style patch representations. |

## Historical mechanism

The mechanism is generated supervision. Instead of asking a human for a label, the training task hides, corrupts, contrasts, or predicts part of the input. The model is forced to learn a [representation](../06-deep-learning/representation-learning.md) that preserves information useful for solving that pretext task, then downstream training tests whether the representation transfers.

The causal sequence matters. Word vectors proved that raw corpora could teach semantic structure. BERT showed that contextual self-supervision could dominate NLP benchmarks. SimCLR and BYOL showed that visual invariance could be learned from augmentations. Masked autoencoders showed that prediction over image patches could scale with transformers. Video methods extended the same principle to motion and temporal consistency, which is why [self-supervised video representation learning](../10-video-understanding/self-supervised-video-representation-learning.md) is a distinct branch rather than a simple image copy.

The caveat is objective mismatch. A pretext task preserves what it needs and may discard what a downstream task needs. Self-supervision reduces labeling dependence, but it increases dependence on data mixture, augmentations, masking policy, architecture, and evaluation design.

## References

- [Mikolov et al., 2013, Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)
- [Devlin et al., 2018, BERT](https://arxiv.org/abs/1810.04805)
- [Chen et al., 2020, A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)
- [Grill et al., 2020, Bootstrap Your Own Latent](https://arxiv.org/abs/2006.07733)
- [He et al., 2021, Masked Autoencoders Are Scalable Vision Learners](https://arxiv.org/abs/2111.06377)
