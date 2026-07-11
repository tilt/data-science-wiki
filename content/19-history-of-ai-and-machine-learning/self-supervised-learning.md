---
title: Self Supervised Learning
slug: history-of-ai-and-machine-learning/self-supervised-learning
description: Concise guide to Self Supervised Learning in History of AI and
  Machine Learning.
area: history-of-ai-and-machine-learning
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
historical_context: true
last_reviewed: 2026-07-11
---
# Self Supervised Learning

## Summary

Self-supervised learning became important because it reduced dependence on manually labelled datasets. It connected older representation-learning ideas with modern pretraining for language, vision, speech, and multimodal models.

## Historical arc

Earlier systems used pretext tasks such as autoencoding, denoising, predicting context words, or learning word embeddings from co-occurrence. Later methods scaled the same principle: generate supervision from raw data, train a reusable representation, then adapt it to downstream tasks.

Language modelling is a self-supervised task because the next token or masked token is already present in text. Contrastive vision methods used augmentations to define positive pairs. Video methods used temporal prediction, masked modelling, or latent prediction to learn dynamics without frame-level labels.

## Why it mattered

Self-supervised learning shifted the bottleneck from labelled examples to data scale, objective design, compute, and evaluation. It helped make foundation models practical because broad pretraining could produce representations useful across many tasks.

## Example

Word2Vec learned word vectors by predicting nearby words. BERT learned contextual text representations by predicting masked tokens. Modern vision and video systems use related ideas at larger scale, often predicting latent representations rather than reconstructing every pixel.

## Historical lesson

The pretext task determines what information the representation preserves. Scaling helps only when the objective, data mixture, and downstream evaluation align.

## Canonical relationship

The canonical modelling concept is [Self-Supervised Learning](../06-deep-learning/self-supervised-learning.md). This page is scoped to historical development and why the idea became important.
