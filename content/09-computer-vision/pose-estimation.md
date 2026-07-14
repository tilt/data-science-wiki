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

```python
import numpy as np

true = np.array([[10,10],[20,10],[20,25],[np.nan,np.nan]])
pred = np.array([[11,10],[23,12],[18,30],[15,15]], float)
visible = ~np.isnan(true[:,0])
d = np.linalg.norm(pred[visible] - true[visible], axis=1)
torso = 20
pck = (d / torso <= .2).mean()
print("normalized_errors", np.round(d / torso, 3).tolist())
print("pck_at_0.2", round(float(pck), 3), "visible_keypoints", int(visible.sum()))
```

Observed output:

```text
normalized_errors [0.05, 0.18, 0.269]
pck_at_0.2 0.667 visible_keypoints 3
```

Two visible keypoints fall within the 0.2 normalized-error threshold. The occluded keypoint is excluded, which must match the annotation policy.

## Caveats

Crowding, truncation, and occlusion create association errors, not just localization errors. [Synthetic data](synthetic-data.md) can provide exact landmarks, but unrealistic body shapes or camera geometry can hurt transfer. Report missed keypoints separately from localization quality.

## References

- [OpenPose: Realtime Multi-Person 2D Pose Estimation using Part Affinity Fields](https://arxiv.org/abs/1812.08008)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)
