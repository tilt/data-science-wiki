---
title: Model Benchmarking
slug: computer-vision/model-benchmarking
description: "Comparing vision models by task metrics, slices, latency, memory, and qualitative errors."
area: computer-vision
topics:
  - model-benchmarking
level: foundational
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - detection-and-segmentation-metrics.md
  - domain-shift.md
  - image-classification.md
  - object-detection.md
historical_context: false
last_reviewed: 2026-07-11
---
# Model Benchmarking

Computer-vision benchmarking compares models under the same data, preprocessing, metrics, and deployment constraints. It should connect task scores from [detection and segmentation metrics](detection-and-segmentation-metrics.md) to practical constraints such as latency, memory, calibration, and [domain shift](domain-shift.md).

## Defining mechanism

A benchmark should specify a tuple

$$
B=(D_{\mathrm{test}}, M, S, C),
$$

where $D_{\mathrm{test}}$ is a frozen dataset, $M$ is the metric set, $S$ is the slice taxonomy, and $C$ is the compute environment. Reporting only $\frac{1}{n}\sum_i \mathbf 1\{\hat y_i=y_i\}$ misses false-positive cost, recall requirements, and runtime.

## Worked example

```python
import numpy as np

truth = np.array([1,1,0,1,0,0,1,0,1,0])
fast = np.array([1,0,0,1,0,1,1,0,0,0])
slow = np.array([1,1,0,1,0,0,0,0,1,0])
for name, pred, ms in [("fast", fast, 12), ("slow", slow, 47)]:
    acc = (pred == truth).mean()
    recall = ((pred == 1) & (truth == 1)).sum() / (truth == 1).sum()
    fp = ((pred == 1) & (truth == 0)).sum()
    print(name, "accuracy", round(acc, 3), "recall", round(recall, 3), "false_positives", int(fp), "latency_ms", ms)
```

Observed output:

```text
fast accuracy 0.7 recall 0.6 false_positives 1 latency_ms 12
slow accuracy 0.9 recall 0.8 false_positives 0 latency_ms 47
```

The slow model is better on this metric set, but the fast model may still win if real-time latency is binding.

## Caveats

Benchmark leakage is common: duplicate images, slices from the same patient, near-identical video frames, or training-set augmentations in the test set. For [object detection](object-detection.md), match image size and NMS settings; for [image classification](image-classification.md), report class imbalance and calibration.

## References

- [Speed/accuracy trade-offs for modern convolutional object detectors](https://arxiv.org/abs/1611.10012)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)
