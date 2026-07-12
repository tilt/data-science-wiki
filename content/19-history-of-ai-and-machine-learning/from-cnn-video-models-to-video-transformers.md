---
title: From CNN Video Models to Video Transformers
slug: history-of-ai-and-machine-learning/from-cnn-video-models-to-video-transformers
description: "How video understanding moved from optical-flow CNNs and 3D convolutions to space-time attention and video transformers."
area: history-of-ai-and-machine-learning
topics:
  - from-cnn-video-models-to-video-transformers
level: foundational
status: review
page_type: history
aliases: []
prerequisites:
  - index.md
related:
  - ../09-video-understanding/optical-flow.md
  - ../09-video-understanding/two-stream-models.md
  - ../09-video-understanding/3d-convolutional-networks.md
  - ../09-video-understanding/spatial-and-temporal-modelling.md
  - ../09-video-understanding/video-transformers.md
  - ../09-video-understanding/temporal-action-recognition.md
historical_context: true
last_reviewed: 2026-07-11
---
# From CNN Video Models to Video Transformers

Video understanding had to solve a problem image classification could avoid: actions are defined by change over time. The field moved from hand-engineered motion and [optical flow](../09-video-understanding/optical-flow.md), to CNNs over frames and clips, to attention over space-time tokens.

## Verified chronology

| Year | Milestone | Why it followed |
|---|---|---|
| 2014 | Simonyan and Zisserman introduced two-stream convolutional networks for action recognition. | A spatial stream captured appearance while a temporal stream used optical flow, matching the fact that actions need both objects and motion. |
| 2014/2015 | Tran, Bourdev, Fergus, Torresani, and Paluri introduced C3D, a 3D convolutional feature learner for video. | Instead of computing motion separately, [3D convolutional networks](../09-video-understanding/3d-convolutional-networks.md) learned local space-time filters directly from clips. |
| 2021 | Bertasius, Wang, and Torresani introduced TimeSformer, a convolution-free video transformer. | After image and language transformers scaled, video researchers tested whether divided spatial and temporal attention could model longer clips. |
| 2021 | Liu and coauthors introduced Video Swin Transformer. | Global space-time attention was expensive, so shifted local windows reintroduced locality for a better speed-accuracy trade-off. |

## Historical mechanism

[Two-stream models](../09-video-understanding/two-stream-models.md) are historically important because they separated appearance from motion. They were effective, but optical flow was expensive and external to the learned representation. C3D and later 3D CNNs internalized short-term motion by convolving over height, width, and time. That made [spatial and temporal modelling](../09-video-understanding/spatial-and-temporal-modelling.md) trainable end to end, but it kept a local receptive-field bias.

[Video transformers](../09-video-understanding/video-transformers.md) relaxed that locality. A frame patch at one time can attend to a distant patch at another time, which helps when an action depends on long-range context. The cost is compute and data demand. TimeSformer factorized attention to make the problem tractable; Video Swin used windows to keep attention local enough for practical recognition.

The historical lesson is that video architectures alternated between adding motion bias and removing it. The right model depends on clip length, label scale, latency, and whether the task is [temporal action recognition](../09-video-understanding/temporal-action-recognition.md), localization, tracking, or video-language reasoning.

## References

- [Simonyan and Zisserman, 2014, Two-Stream Convolutional Networks for Action Recognition in Videos](https://arxiv.org/abs/1406.2199)
- [Tran et al., 2014, Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)
- [Bertasius, Wang, and Torresani, 2021, Is Space-Time Attention All You Need for Video Understanding?](https://arxiv.org/abs/2102.05095)
- [Liu et al., 2021, Video Swin Transformer](https://arxiv.org/abs/2106.13230)
