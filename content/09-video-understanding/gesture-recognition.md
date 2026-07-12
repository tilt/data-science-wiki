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
historical_context: false
last_reviewed: 2026-07-11
---
# Gesture Recognition

Gesture recognition identifies intentional motions such as swipes, waves, signs, or body-language events. It is a specialized form of [temporal action recognition](temporal-action-recognition.md), often with tighter latency and user-interface constraints. The input can be RGB, hand keypoints, pose tracks, depth, or [optical flow](optical-flow.md).

## Defining mechanism

For tracked keypoints $p_{1:T}$, a simple gesture feature is mean velocity:

$$
\bar v = \frac{1}{T-1}\sum_{t=1}^{T-1}(p_{t+1}-p_t).
$$

A classifier then compares $\bar v$ and richer trajectory features against gesture classes. Real systems combine this with [person tracking and track aggregation](person-tracking-and-track-aggregation.md) so one user's gesture is not mixed with another person's motion.

## Worked example

```python
import numpy as np

np.random.seed(4)
pts = np.array([[0.,0.],[1.,0.1],[2.,0.1],[3.,0.2]])
vel = np.diff(pts, axis=0)
feat = vel.mean(axis=0)
templates = {"right_swipe": np.array([1.,0.]), "up_swipe": np.array([0.,1.]), "still": np.array([0.05,0.0])}
scores = {k: float(feat @ v) for k, v in templates.items()}
print("mean_velocity", np.round(feat, 3).tolist())
print("template_scores", {k: round(v, 3) for k, v in scores.items()})
print("prediction", max(scores, key=scores.get))
```

Observed output:

```text
mean_velocity [1.0, 0.067]
template_scores {'right_swipe': 1.0, 'up_swipe': 0.067, 'still': 0.05}
prediction right_swipe
```

The mean velocity is `[1.0, 0.067]`, so the trajectory is almost entirely horizontal. Its dot product with the `right_swipe` template is 1.0, far above `up_swipe` at 0.067 and `still` at 0.05, which is why the right-swipe label wins.

## Caveats

Gesture labels are culturally and product specific. Hands are frequently occluded, small, motion-blurred, or outside the crop. A [trigger-point prediction](trigger-point-prediction.md) system must avoid firing before the gesture is distinguishable from ordinary movement.

## References

- [Kapitanov et al., 2022, HaGRID: HAnd Gesture Recognition Image Dataset](https://arxiv.org/abs/2206.08219)
- [Cao et al., 2018, OpenPose: Realtime Multi-Person 2D Pose Estimation](https://arxiv.org/abs/1812.08008)
