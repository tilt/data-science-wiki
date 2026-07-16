---
title: Temporal Action Recognition
slug: video-understanding/temporal-action-recognition
description: "Classifying actions from ordered video evidence rather than isolated frames."
area: video-understanding
topics:
  - temporal-action-recognition
level: intermediate
status: review
page_type: concept
aliases:
  - Action recognition
prerequisites:
  - index.md
related:
  - temporal-localization.md
  - gesture-recognition.md
  - two-stream-models.md
  - sliding-window-inference.md
historical_context: false
last_reviewed: 2026-07-11
---

# Temporal Action Recognition

Temporal action recognition assigns a label to a clip or stream segment by using appearance, motion, and ordering. It is weaker than [temporal localization](temporal-localization.md), which must also find boundaries, but stronger than image classification because the label may depend on change over time. A serve, fall, swipe, or handshake is often a trajectory, not a single pose.

## Defining mechanism

A common model encodes frame or clip features $x_{1:T}$, aggregates them, and predicts a class:

$$
h_t = f_\theta(x_t), \qquad z = g_\phi(h_{1:T}), \qquad p(y\mid x_{1:T})=\operatorname{softmax}(z).
$$

The aggregator may be temporal averaging, max pooling, a recurrent model, [3D convolution](3d-convolutional-networks.md), or [video-transformer](video-transformers.md) attention. [Two-stream models](two-stream-models.md) implement the same classification goal with separate appearance and motion logits.

## Worked example

Suppose a five-frame clip has class logits for three possible actions:

| frame | class 0 | class 1 | class 2 | strongest cue            |
| ----: | ------: | ------: | ------: | ------------------------ |
|     1 |     0.2 |     0.1 |     0.0 | weak background evidence |
|     2 |     0.3 |     0.2 |     0.1 | weak background evidence |
|     3 |     0.1 |     1.6 |     0.2 | action cue appears       |
|     4 |     0.0 |     1.8 |     0.1 | action cue peaks         |
|     5 |     0.2 |     1.0 |     0.0 | action cue fades         |

Mean pooling gives logits $(0.16,0.94,0.08)$ and softmax probabilities $(0.244,0.531,0.225)$, so class 1 wins. Max pooling gives logits $(0.3,1.8,0.2)$ and probabilities $(0.157,0.702,0.142)$, so class 1 wins more confidently because one brief interval was highly discriminative. That behavior is helpful for short actions and dangerous when a single noisy frame can spike a class logit.

## Caveats

Clip labels hide boundary errors: a model can classify a video correctly while firing late. Random frame sampling can miss short events, and averaging can erase the order distinction described in [spatial and temporal modelling](spatial-and-temporal-modelling.md). Report per-duration and per-viewpoint slices, not only top-1 accuracy.

## References

- [Kay et al., 2017, The Kinetics Human Action Video Dataset](https://arxiv.org/abs/1705.06950)
- [Wang et al., 2016, Temporal Segment Networks](https://arxiv.org/abs/1608.00859)

> **Section — [Video Understanding](index.md):** ← [Video Transformers](video-transformers.md) · [Temporal Localization](temporal-localization.md) →
