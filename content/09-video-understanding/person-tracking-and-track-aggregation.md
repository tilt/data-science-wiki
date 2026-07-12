---
title: Person Tracking and Track Aggregation
slug: video-understanding/person-tracking-and-track-aggregation
description: "Linking person detections across frames and summarizing per-track evidence."
area: video-understanding
topics:
  - person-tracking-and-track-aggregation
level: intermediate
status: review
page_type: system-design
aliases:
  - Person tracking
prerequisites:
  - index.md
related:
  - real-time-video-understanding.md
  - gesture-recognition.md
  - optical-flow.md
  - temporal-action-recognition.md
historical_context: false
last_reviewed: 2026-07-11
---
# Person Tracking and Track Aggregation

Person tracking links detections of the same person across frames. Track aggregation then turns frame-level detections, poses, logits, or embeddings into person-level evidence. This is essential when [gesture recognition](gesture-recognition.md) or [temporal action recognition](temporal-action-recognition.md) must answer "which person did it?" rather than only "did it happen?"

## Defining mechanism

Tracking-by-detection builds an association score between existing tracks $i$ and detections $j$, often using box IoU, motion prediction, and appearance distance:

$$
\operatorname{score}(i,j)=\lambda\,\operatorname{IoU}(b_i,b_j) - (1-\lambda)d(e_i,e_j).
$$

Assignments are solved per frame, then each track aggregates features over time with pooling, smoothing, or a temporal model. [Optical flow](optical-flow.md) can help predict short-term motion, but identity association is the central problem.

## Worked example

```python
import numpy as np
from scipy.optimize import linear_sum_assignment

tracks = np.array([[0,0,2,2],[5,5,7,7]], float)
dets = np.array([[0.2,0.1,2.2,2.1],[5.4,5.2,7.4,7.2]], float)
def iou(a, b):
    ix1, iy1 = max(a[0],b[0]), max(a[1],b[1])
    ix2, iy2 = min(a[2],b[2]), min(a[3],b[3])
    inter = max(0, ix2-ix1) * max(0, iy2-iy1)
    return inter / ((a[2]-a[0])*(a[3]-a[1]) + (b[2]-b[0])*(b[3]-b[1]) - inter)
M = np.array([[iou(t, d) for d in dets] for t in tracks])
r, c = linear_sum_assignment(-M)
print("iou_matrix", np.round(M, 3).tolist())
print("matches", list(zip(r.tolist(), c.tolist())), "mean_iou", round(float(M[r,c].mean()), 3))
```

Observed output:

```text
iou_matrix [[0.747, 0.0], [0.0, 0.562]]
matches [(0, 0), (1, 1)] mean_iou 0.655
```

The IoU matrix is nearly diagonal: track 0 overlaps detection 0 at 0.747 and track 1 overlaps detection 1 at 0.562, while the cross-pairs are 0.0. The Hungarian assignment therefore links each track to its compatible detection, yielding a mean matched IoU of 0.655.

## Caveats

Occlusion and crossing paths cause identity switches. Aggregating over a broken track can dilute the event or assign it to the wrong person. Real-time deployments must bound track memory and handle detector dropouts explicitly.

## References

- [Bewley et al., 2016, Simple Online and Realtime Tracking](https://arxiv.org/abs/1602.00763)
- [Wojke et al., 2017, Simple Online and Realtime Tracking with a Deep Association Metric](https://arxiv.org/abs/1703.07402)
