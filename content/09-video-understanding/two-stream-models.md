---
title: Two-Stream Models
slug: video-understanding/two-stream-models
description: "Video classifiers that fuse appearance evidence from RGB frames with motion evidence from optical flow."
area: video-understanding
topics:
  - two-stream-models
level: intermediate
status: review
page_type: model
aliases:
  - Two-stream ConvNets
prerequisites:
  - index.md
related:
  - optical-flow.md
  - 3d-convolutional-networks.md
  - temporal-action-recognition.md
  - video-transformers.md
historical_context: false
last_reviewed: 2026-07-11
---
# Two-Stream Models

Two-stream video models split recognition into an appearance stream and a motion stream. The appearance stream usually consumes RGB frames; the motion stream consumes [optical flow](optical-flow.md) or stacked frame differences. This design made action recognition practical before end-to-end [3D convolutional networks](3d-convolutional-networks.md) and [video transformers](video-transformers.md) became common.

## Defining mechanism

If $z^{rgb}$ and $z^{flow}$ are class logits, late fusion combines them as

$$
z = \alpha z^{rgb} + (1-\alpha)z^{flow}, \qquad p(y\mid x)=\operatorname{softmax}(z).
$$

The streams are complementary: RGB sees objects and scene context, while flow emphasizes motion direction and speed. A basketball court and a person holding a ball help, but the jump-shot label depends on the temporal motion that [temporal action recognition](temporal-action-recognition.md) must capture.

## Worked example

```python
import torch

rgb = torch.tensor([1.2, 0.1, -0.4])
flow = torch.tensor([0.0, 1.4, -0.2])
fused = 0.45 * rgb + 0.55 * flow
print("rgb_prob", torch.round(rgb.softmax(0), decimals=3).tolist())
print("flow_prob", torch.round(flow.softmax(0), decimals=3).tolist())
print("fused_prob", torch.round(fused.softmax(0), decimals=3).tolist(), "pred_class", int(fused.argmax()))
```

Observed output:

```text
rgb_prob [0.6520000100135803, 0.21699999272823334, 0.13199999928474426]
flow_prob [0.17000000178813934, 0.6899999976158142, 0.13899999856948853]
fused_prob [0.3630000054836273, 0.4779999852180481, 0.15800000727176666] pred_class 1
```

The RGB stream prefers class 0, but the motion stream is strong enough that fused evidence predicts class 1.

## Caveats

Two-stream systems inherit the cost and errors of optical-flow estimation. They also fuse late unless designed otherwise, so they may miss interactions where appearance and motion must be interpreted jointly. Modern architectures often absorb motion learning into 3D kernels or attention, but two-stream baselines remain useful when motion is the decisive cue.

## References

- [Simonyan and Zisserman, 2014, Two-Stream Convolutional Networks for Action Recognition in Videos](https://arxiv.org/abs/1406.2199)
- [Lucas and Kanade, 1981, An iterative image registration technique with an application to stereo vision](https://www.ri.cmu.edu/pub_files/pub3/lucas_bruce_d_1981_1/lucas_bruce_d_1981_1.pdf)
