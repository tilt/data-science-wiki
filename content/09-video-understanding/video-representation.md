---
title: Video Representation
slug: video-understanding/video-representation
description: "The tensor, token, track, or embedding form used to carry video evidence into downstream models."
area: video-understanding
topics:
  - video-representation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - spatial-and-temporal-modelling.md
  - self-supervised-video-representation-learning.md
  - video-transformers.md
  - person-tracking-and-track-aggregation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Video Representation

A video representation is the form in which a system stores evidence from frames over time: raw clips, [optical-flow](optical-flow.md) fields, tubelet tokens, per-frame embeddings, object tracks, or pooled clip vectors. It determines what information is easy to use later. A representation built from frame means may support retrieval, while a track-level representation is better for [person tracking and track aggregation](person-tracking-and-track-aggregation.md).

## Defining mechanism

For frame embeddings $e_1,\ldots,e_T$, a simple clip representation can concatenate appearance and motion summaries:

$$
r = \left[\frac{1}{T}\sum_{t=1}^T e_t,\; e_T-e_1\right].
$$

This is not a universal best representation; it shows the contract. The first term carries average visual content, and the second carries coarse temporal change. [Video transformers](video-transformers.md) keep many tokens instead of reducing early, while [self-supervised video representation learning](self-supervised-video-representation-learning.md) trains the encoder that produces the embeddings.

## Worked representation example

For four frame embeddings

| frame | embedding |
|---:|---:|
| 1 | $(1.0,0.0)$ |
| 2 | $(0.8,0.2)$ |
| 3 | $(0.2,0.9)$ |
| 4 | $(-0.1,1.0)$ |

the mean embedding is

$$
\frac{(1.0,0.0)+(0.8,0.2)+(0.2,0.9)+(-0.1,1.0)}{4}=(0.475,0.525),
$$

and the endpoint delta is

$$
e_4-e_1=(-0.1,1.0)-(1.0,0.0)=(-1.1,1.0).
$$

The concatenated representation is therefore $(0.475,0.525,-1.1,1.0)$. The pooled part says the clip contains both embedding directions; the delta says it moved from the first direction toward the second.

## Caveats

Pooling too early erases order and boundaries, which hurts [temporal localization](temporal-localization.md). Dense tokens preserve detail but increase memory. Track and object representations can be robust to camera motion, but they depend on detector and association quality.

## References

- [Carreira and Zisserman, 2017, Quo Vadis, Action Recognition?](https://arxiv.org/abs/1705.07750)
- [Tong et al., 2022, VideoMAE](https://arxiv.org/abs/2203.12602)
