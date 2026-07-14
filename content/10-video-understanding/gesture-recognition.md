---
title: Gesture Recognition
slug: video-understanding/gesture-recognition
description: "Recognizing intentional hand, body, or object motions from pose, appearance, and temporal cues."
area: video-understanding
topics:
  - gesture-recognition
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - temporal-action-recognition.md
  - trigger-point-prediction.md
  - person-tracking-and-track-aggregation.md
  - optical-flow.md
  - 3d-convolutional-networks.md
  - video-transformers.md
  - ../09-computer-vision/pose-estimation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Gesture Recognition

Gesture recognition identifies intentional hand, arm, body, face, or object motions such as swipes, waves, signs, nods, pointing, or interaction commands. It is a specialized form of [temporal action recognition](temporal-action-recognition.md), often with tighter latency, smaller motion regions, and stronger user-interface constraints than generic action recognition.

The input representation determines the method. A gesture system may use RGB clips, cropped hands, [pose-estimation](../09-computer-vision/pose-estimation.md) keypoints, skeleton tracks, depth, inertial sensors, [optical-flow](optical-flow.md), or fused streams. The same product may combine a fast keypoint baseline for obvious gestures with a deep video model for ambiguous or occluded cases.

## Defining mechanism

Gesture recognition methods fall into several families:

| family | typical input | mechanism | useful when |
|---|---|---|---|
| Template matching / dynamic time warping | Keypoint or sensor trajectories | Compare a trajectory with stored examples under time warping or distance rules. | Gestures are simple, few, and latency must be very low. |
| Handcrafted features + classical classifier | Keypoints, optical flow, shape descriptors | Compute velocities, angles, histograms, or flow summaries and classify with SVMs, random forests, HMMs, or logistic models. | Data is limited and interpretability/debugging matter. |
| Skeleton sequence models | Body or hand keypoints over time | Feed joint coordinates, bone vectors, or graph edges into RNNs, temporal CNNs, or graph convolutional networks. | Pose is reliable and background appearance should be ignored. |
| RGB/depth deep video models | Cropped clips or full frames | Learn spatiotemporal features with [3D convolutional networks](3d-convolutional-networks.md), two-stream models, or depth/RGB fusion. | Appearance and motion jointly define the gesture. |
| Transformer-based video models | Patch, tubelet, keypoint, or track tokens | Use [video transformers](video-transformers.md), masked-video pretraining, or foundation-model features over hands, objects, and temporal context. | Long-range context, transfer learning, multi-person interaction, or language-facing outputs matter. |
| Spatio-temporal action detection | Frames, actor boxes, tubes, or track tokens | Predict actor/action tubes and class labels jointly instead of requiring a fixed tracker-then-classifier split. | Multi-person videos need both "who moved?" and "what gesture happened?" |
| Online trigger models | Streaming frames, keypoints, or logits | Estimate whether enough evidence has arrived to fire a command. | The system must respond before the gesture fully completes. |

For tracked keypoints $p_{1:T}$, a simple trajectory baseline is mean velocity:

$$
\bar v = \frac{1}{T-1}\sum_{t=1}^{T-1}(p_{t+1}-p_t).
$$

A template classifier can compare $\bar v$ and richer trajectory features against gesture prototypes. A deep model instead learns a representation $z=f_\theta(x_{1:T})$ from raw frames, keypoints, or fused streams and predicts

$$
P(y\mid x_{1:T})=\operatorname{softmax}(Wz+b).
$$

Real systems also need [person tracking and track aggregation](person-tracking-and-track-aggregation.md) so one user's gesture is not mixed with another person's motion.

## Pose-Guided Person RoI Pipeline

In multi-person gesture videos, the first problem is usually not the gesture class; it is assigning evidence to the right person. A common applied pipeline is:

1. Detect people with a detector or pose model.
2. Track each person over time with a tracker.
3. Extract fixed-length person RoI clips around each track.
4. Run a gesture recognizer on each person RoI clip.
5. Attach the prediction back to the person track and timestamp.

This pipeline changes the input domain seen by the recognizer:

| input domain | benefit | risk |
|---|---|---|
| Full frame | Keeps body, object, and scene context. | Small hands can be diluted by background and other people. |
| Person RoI track | Removes other people while preserving body, hand, and nearby object context. | The hand can still be small inside the crop. |
| Static hand crop | Preserves a stable coordinate frame around a hand region. | Crop choice can miss body context or the object being manipulated. |
| Tracking hand crop | Keeps the hand large and centered over time. | Motion cues can be removed because the coordinate frame follows the hand. |
| Sparse token keep | Saves computation by keeping person- or hand-region video tokens. | Geometry can break if kept tokens lose their original positions. |

Hand RoIs are useful when hand localization is reliable and the gesture is mostly local to the hand. Person RoIs are the safer default for multi-person videos because they keep the gesture tied to the tracked actor and preserve body context. For video foundation models used as frozen backbones, these input-domain choices can dominate the probe result. If the checkpoint is frozen, a lightweight head measures whether the representation already contains the needed gesture information; it does not teach the backbone a new gesture concept.

## Modern Method Families

The mean-velocity template baseline above is useful for intuition, but it is not representative of modern gesture-recognition systems. Current systems usually separate the question "what signal should represent the gesture?" from the question "does the model also need to localize the actor?"

| method family | output | where it fits |
|---|---|---|
| Trajectory templates and dynamic time warping | A label for one tracked keypoint or sensor sequence. | Low-data command gestures with simple motion geometry. |
| Skeleton GCNs and keypoint transformers | A label from joint coordinates, bone vectors, or hand landmarks. | Pose is reliable and background appearance should be suppressed. |
| [3D ConvNets](3d-convolutional-networks.md), two-stream CNNs, and SlowFast-style video CNNs | A clip or RoI label from RGB, depth, optical flow, or fused streams. | Local spatiotemporal filters are a good inductive bias, especially when motion and appearance jointly define the gesture. |
| [Video transformers](video-transformers.md), masked-video models, and video foundation models | A clip, RoI, token, or probe-head label from patch or tubelet tokens. | Long context, transfer from large pretraining, or input-domain comparisons are important. |
| Spatio-temporal action detectors and tubelet models | Actor tubes plus action or gesture labels. | Multi-person videos need actor localization, temporal extent, and classification to be coupled. |

The last family matters for person-tracking workflows. A practical system can use a detector, tracker, and per-person classifier, but that is not the only formulation. End-to-end spatio-temporal action-detection models predict action tubes or actor-token trajectories with class labels, so localization and recognition are trained together. This can reduce hand-built aggregation rules, but it usually needs annotated boxes, tubes, or actor-level supervision and is harder to debug than a modular tracker-plus-classifier pipeline.

## Model Selection

| requirement | likely starting point |
|---|---|
| Few command gestures on a fixed camera | Keypoint rules, template matching, or lightweight classical classifier. |
| Hands are small but pose is reliable | Hand detector plus keypoint sequence model. |
| Multi-person scene | Person detection, tracking, per-person RoI clips, then gesture classification; or an end-to-end spatio-temporal action detector when actor/action tube supervision is available. |
| Gesture depends on object appearance | RGB/depth model, two-stream model, or [3D convolutional network](3d-convolutional-networks.md). |
| Gesture unfolds over many frames | Temporal CNN, recurrent model, transformer, or sliding-window recognizer. |
| Multiple people may gesture at once | Tracking plus per-track gesture classification, or an action-tube model that jointly localizes actors and labels gestures. |
| Low-latency UI command | Streaming model plus [trigger-point prediction](trigger-point-prediction.md). |

## Caveats

Gesture labels are culturally, linguistically, and product specific. Hands are frequently occluded, small, motion-blurred, or outside the crop. Pose models can fail on unusual viewpoints, while RGB models can overfit to background, clothing, or camera placement. End-to-end action-tube models can remove brittle tracker/classifier handoffs, but they need richer actor-level labels and more careful evaluation of identity switches, duplicate tubes, and missed short gestures. A [trigger-point prediction](trigger-point-prediction.md) system must avoid firing before the gesture is distinguishable from ordinary movement.

## References

- [Kapitanov et al., 2022, HaGRID: HAnd Gesture Recognition Image Dataset](https://arxiv.org/abs/2206.08219)
- [Cao et al., 2018, OpenPose: Realtime Multi-Person 2D Pose Estimation](https://arxiv.org/abs/1812.08008)
- [Tran et al., 2015, Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)
- [Bertasius et al., 2021, Is Space-Time Attention All You Need for Video Understanding?](https://arxiv.org/abs/2102.05095)
- [Liu et al., 2021, Video Swin Transformer](https://arxiv.org/abs/2106.13230)
- [Wang et al., 2023, VideoMAE V2: Scaling Video Masked Autoencoders with Dual Masking](https://arxiv.org/abs/2303.16727)
- [Wang et al., 2024, InternVideo2: Scaling Foundation Models for Multimodal Video Understanding](https://arxiv.org/abs/2403.15377)
- [Yan et al., 2018, Spatial Temporal Graph Convolutional Networks for Skeleton-Based Action Recognition](https://arxiv.org/abs/1801.07455)
- [Zhao et al., 2022, Multi-Scale Spatial Temporal Graph Convolutional Network for Skeleton-Based Action Recognition](https://arxiv.org/abs/2206.13028)
- [Zhao et al., 2021, TubeR: Tubelet Transformer for Video Action Detection](https://arxiv.org/abs/2104.00969)
