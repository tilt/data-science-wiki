---
title: Pose Estimation
slug: computer-vision/pose-estimation
description: "Predicting visible keypoints, skeleton structure, and localization quality for people or objects."
area: computer-vision
topics:
  - pose-estimation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - object-detection.md
  - synthetic-data.md
  - detection-and-segmentation-metrics.md
  - ../10-video-understanding/gesture-recognition.md
historical_context: false
last_reviewed: 2026-07-11
---

# Pose Estimation

Pose estimation predicts keypoints such as joints, hands, faces, animal landmarks, or object parts. It often follows [object detection](object-detection.md) because the person or object crop constrains the keypoint search, and it feeds downstream video tasks such as [gesture recognition](../10-video-understanding/gesture-recognition.md).

## Defining mechanism

Top-down pose systems detect instances, then predict keypoint heatmaps $H_k(u,v)$ for each landmark $k$. A coordinate estimate can be the heatmap argmax,

$$
(\hat u_k,\hat v_k)=\arg\max_{u,v} H_k(u,v),
$$

or a soft-argmax. Evaluation commonly normalizes Euclidean error by a body or box scale and reports PCK:

$$
\mathrm{PCK}_\alpha=\frac{1}{K}\sum_k \mathbf 1\left[\frac{\lVert \hat p_k-p_k\rVert_2}{s}\le \alpha\right].
$$

## Worked example

With torso scale $s=20$ and threshold $\alpha=0.2$, a keypoint is correct when its Euclidean error is at most $4$ pixels.

| Keypoint | True point | Predicted point | Normalized error | Counted correct? |
| -------- | ---------- | --------------- | ---------------: | ---------------- |
| Shoulder | $(10,10)$  | $(11,10)$       |            0.050 | yes              |
| Elbow    | $(20,10)$  | $(23,12)$       |            0.180 | yes              |
| Wrist    | $(20,25)$  | $(18,30)$       |            0.269 | no               |
| Hand tip | occluded   | $(15,15)$       |         excluded | not evaluated    |

Two of the three visible keypoints fall within the threshold, so $\mathrm{PCK}_{0.2}=2/3\approx0.667$. The occluded keypoint is excluded, which must match the annotation policy.

## Caveats

Crowding, truncation, and occlusion create association errors, not just localization errors. [Synthetic data](synthetic-data.md) can provide exact landmarks, but unrealistic body shapes or camera geometry can hurt transfer. Report missed keypoints separately from localization quality.

## References

- [OpenPose: Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields](https://arxiv.org/abs/1812.08008)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)
