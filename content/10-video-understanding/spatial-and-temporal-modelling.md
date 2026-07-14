---
title: Spatial and Temporal Modelling
slug: video-understanding/spatial-and-temporal-modelling
description: "Separating what appears in frames from how visual evidence evolves across time."
area: video-understanding
topics:
  - spatial-and-temporal-modelling
level: foundational
status: review
page_type: concept
aliases:
  - Spatiotemporal modelling
prerequisites:
  - index.md
related:
  - video-representation.md
  - 3d-convolutional-networks.md
  - video-transformers.md
  - optical-flow.md
historical_context: false
last_reviewed: 2026-07-11
---

# Spatial and Temporal Modelling

Spatial modelling asks what is visible in each frame; temporal modelling asks how that evidence changes. A single frame may show a raised hand, but the sequence distinguishes waving, pointing, throwing, and stretching. This distinction runs through [video representation](video-representation.md), [3D convolutional networks](3d-convolutional-networks.md), [video transformers](video-transformers.md), and [optical flow](optical-flow.md).

## Defining mechanism

For frame features $x_t$, a temporal model applies an order-sensitive function

$$
h_t = f_\theta(x_{t-k:t+k}), \qquad y = g(h_1,\ldots,h_T).
$$

A spatial-only model can treat frames independently or average them; a temporal model includes derivatives, recurrence, temporal convolution, or attention over positions. The mechanism matters because many actions have the same objects but different order.

## Worked example

Two clips can have the same spatial summary and opposite temporal meaning:

|                  frame | clip A feature | clip B feature |
| ---------------------: | -------------: | -------------: |
|                      1 |              0 |              3 |
|                      2 |              1 |              2 |
|                      3 |              2 |              1 |
|                      4 |              3 |              0 |
|                   mean |            1.5 |            1.5 |
| successive differences |   $(+1,+1,+1)$ |   $(-1,-1,-1)$ |

The frame average is identical for both clips, so a spatial-only pooling representation cannot distinguish them. The temporal derivative tells the actual story: clip A is increasing over time, while clip B is decreasing. This is why temporal models keep order-sensitive evidence instead of reducing every frame to one pooled statistic too early.

## Caveats

Short windows miss slow context; long windows dilute brief events and increase compute. Temporal cues can be dominated by camera motion, edits, or dropped frames. For deployment, pair aggregate accuracy with slice checks on speed, viewpoint, occlusion, and event duration.

## References

- [Tran et al., 2015, Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)
- [Bertasius et al., 2021, Is Space-Time Attention All You Need for Video Understanding?](https://arxiv.org/abs/2102.05095)
