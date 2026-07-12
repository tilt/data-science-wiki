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

```python
import torch

logits = torch.tensor([[0.2,0.1,0.0],[0.3,0.2,0.1],[0.1,1.6,0.2],[0.0,1.8,0.1],[0.2,1.0,0.0]])
mean_prob = logits.mean(0).softmax(0)
max_prob = logits.max(0).values.softmax(0)
print("mean_prob", torch.round(mean_prob, decimals=3).tolist(), "pred", int(mean_prob.argmax()))
print("max_prob", torch.round(max_prob, decimals=3).tolist(), "pred", int(max_prob.argmax()))
```

Observed output:

```text
mean_prob [0.24400000274181366, 0.531000018119812, 0.22499999403953552] pred 1
max_prob [0.15700000524520874, 0.7020000219345093, 0.1420000046491623] pred 1
```

Both aggregators identify class 1, but max pooling gives more weight to a brief high-confidence interval. That is useful for short actions and risky for noisy spikes.

## Caveats

Clip labels hide boundary errors: a model can classify a video correctly while firing late. Random frame sampling can miss short events, and averaging can erase the order distinction described in [spatial and temporal modelling](spatial-and-temporal-modelling.md). Report per-duration and per-viewpoint slices, not only top-1 accuracy.

## References

- [Kay et al., 2017, The Kinetics Human Action Video Dataset](https://arxiv.org/abs/1705.06950)
- [Wang et al., 2016, Temporal Segment Networks](https://arxiv.org/abs/1608.00859)
