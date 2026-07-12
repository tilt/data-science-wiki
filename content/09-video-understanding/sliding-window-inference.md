---
title: Sliding Window Inference
slug: video-understanding/sliding-window-inference
description: "Applying a fixed-input video model across overlapping windows of a longer stream."
area: video-understanding
topics:
  - sliding-window-inference
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - real-time-video-understanding.md
  - temporal-localization.md
  - trigger-point-prediction.md
  - temporal-action-recognition.md
historical_context: false
last_reviewed: 2026-07-11
---
# Sliding Window Inference

Sliding-window inference runs a fixed-size clip model over a long video by choosing window length and stride. It is the practical glue between clip-trained [temporal action recognition](temporal-action-recognition.md) models and untrimmed streams. The same windows can feed [temporal localization](temporal-localization.md), [trigger-point prediction](trigger-point-prediction.md), or offline indexing.

## Defining mechanism

For video length $T$, window size $w$, and stride $s$, windows are

$$
W_k = [ks, \min(ks+w, T)).
$$

Overlap improves coverage and boundary recall but increases compute. Predictions are then pooled, smoothed, non-max suppressed, or converted into trigger rules depending on the task.

## Worked example

```python
import numpy as np

T, win, stride = 20, 6, 4
windows = [(s, min(s+win, T)) for s in range(0, T-win+1, stride)]
coverage = np.zeros(T, dtype=int)
for s, e in windows:
    coverage[s:e] += 1
print("windows", windows)
print("coverage", coverage.tolist())
print("min_max_coverage", [int(coverage.min()), int(coverage.max())])
```

Observed output:

```text
windows [(0, 6), (4, 10), (8, 14), (12, 18)]
coverage [1, 1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1, 1, 0, 0]
min_max_coverage [0, 2]
```

The final two frames are uncovered because the simple range stops at the last full window. Production code usually adds a final padded or shifted window.

## Caveats

Stride determines both cost and worst-case detection delay. Windows split actions at boundaries, so smoothing and non-max suppression must be tuned with tIoU metrics. For [real-time video understanding](real-time-video-understanding.md), buffering a full window can dominate latency.

## References

- [Wang et al., 2016, Temporal Segment Networks](https://arxiv.org/abs/1608.00859)
- [Wu et al., 2021, Towards High-Quality Temporal Action Detection with Sparse Proposals](https://arxiv.org/abs/2109.08847)
