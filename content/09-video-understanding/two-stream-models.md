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

## Worked fusion example

The RGB stream may prefer the scene/object class while the flow stream prefers the action class. With $\alpha=0.45$, the fused logits are

$$
z=0.45(1.2,0.1,-0.4)+0.55(0.0,1.4,-0.2)=(0.54,0.815,-0.29).
$$

| stream | class 0 probability | class 1 probability | class 2 probability | predicted class |
|---|---:|---:|---:|---:|
| RGB only | 0.652 | 0.217 | 0.132 | 0 |
| flow only | 0.170 | 0.690 | 0.139 | 1 |
| fused | 0.363 | 0.478 | 0.158 | 1 |

The fused prediction is class 1 because the motion evidence is strong and slightly upweighted. The table is also the failure mode: if optical flow is noisy, late fusion can confidently move the prediction away from the RGB evidence.

## Caveats

Two-stream systems inherit the cost and errors of optical-flow estimation. They also fuse late unless designed otherwise, so they may miss interactions where appearance and motion must be interpreted jointly. Modern architectures often absorb motion learning into 3D kernels or attention, but two-stream baselines remain useful when motion is the decisive cue.

## References

- [Simonyan and Zisserman, 2014, Two-Stream Convolutional Networks for Action Recognition in Videos](https://arxiv.org/abs/1406.2199)
- [Lucas and Kanade, 1981, An iterative image registration technique with an application to stereo vision](https://www.ri.cmu.edu/pub_files/pub3/lucas_bruce_d_1981_1/lucas_bruce_d_1981_1.pdf)
