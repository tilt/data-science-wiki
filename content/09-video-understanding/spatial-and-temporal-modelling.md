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

```python
import torch

clip_a = torch.tensor([0., 1., 2., 3.])
clip_b = torch.tensor([3., 2., 1., 0.])
temporal_filter = torch.tensor([-1., 1.])
def conv1d_valid(x):
    return torch.stack([(x[i:i+2] * temporal_filter).sum() for i in range(len(x)-1)])
print("frame_means", [round(clip_a.mean().item(), 3), round(clip_b.mean().item(), 3)])
print("temporal_edges_a", conv1d_valid(clip_a).tolist())
print("temporal_edges_b", conv1d_valid(clip_b).tolist())
```

Observed output:

```text
frame_means [1.5, 1.5]
temporal_edges_a [1.0, 1.0, 1.0]
temporal_edges_b [-1.0, -1.0, -1.0]
```

The two clips have the same frame average, but their temporal derivatives have opposite signs. A representation that averages too early cannot distinguish them.

## Caveats

Short windows miss slow context; long windows dilute brief events and increase compute. Temporal cues can be dominated by camera motion, edits, or dropped frames. For deployment, pair aggregate accuracy with slice checks on speed, viewpoint, occlusion, and event duration.

## References

- [Tran et al., 2015, Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)
- [Bertasius et al., 2021, Is Space-Time Attention All You Need for Video Understanding?](https://arxiv.org/abs/2102.05095)
