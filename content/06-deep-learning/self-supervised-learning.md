---
title: Self Supervised Learning
slug: deep-learning/self-supervised-learning
description: Concise guide to Self Supervised Learning in Deep Learning.
area: deep-learning
topics:
  - self-supervised-learning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# Self Supervised Learning

## Summary

Self-supervised learning trains models on supervision generated from the data itself. It is used to learn representations from large unlabeled corpora before fine-tuning, probing, retrieval, clustering, or transfer to labelled tasks.

## Core idea

The training task is constructed from the input rather than from human labels. A model may predict masked tokens, contrast two augmented views of the same image, predict future video representations, or align paired image-text examples.

For contrastive learning, a common objective makes a positive pair $(x_i, x_i^+)$ more similar than negative examples:

$$
L_i=-\log\frac{\exp(\operatorname{sim}(z_i,z_i^+)/\tau)}
\sum_j \exp(\operatorname{sim}(z_i,z_j)/\tau)}.
$$

The learned encoder is useful only if the pretext task forces it to preserve information needed by downstream tasks.

## Worked example

For product images, train an encoder so two augmented views of the same product are close in embedding space while different products are farther apart. Then use the encoder for image retrieval or classification with fewer labels. Evaluate on real retrieval examples, not only on the pretraining loss.

## Practical checklist

- Choose a pretext task whose invariances match the deployment task.
- Prevent near-duplicate leakage across train and evaluation splits.
- Compare linear probes, fine-tuning, retrieval quality, and task-specific metrics.
- Track data mixture, augmentations, objective, temperature or masking policy, and encoder version.

## Common failure modes

- Learning invariances that are false for the downstream task, such as making medically relevant image changes invisible.
- Evaluating only the pretext objective and not downstream transfer.
- Letting duplicates or augmentations leak across evaluation splits.
- Assuming larger unlabeled data helps even when it is off-domain or low quality.
