---
title: Detection and Segmentation Metrics
slug: computer-vision/detection-and-segmentation-metrics
description: "Overlap, matching, precision-recall, and boundary metrics for detection and segmentation."
area: computer-vision
topics:
  - detection-and-segmentation-metrics
level: intermediate
status: review
page_type: reference
aliases:
  - IoU
  - Dice coefficient
  - Detection metrics
  - Segmentation metrics
prerequisites:
  - object-detection.md
  - semantic-segmentation.md
related:
  - object-detection.md
  - semantic-segmentation.md
  - instance-segmentation.md
  - model-benchmarking.md
historical_context: false
last_reviewed: 2026-07-11
---

# Detection and Segmentation Metrics

Detection and segmentation metrics answer two different questions: did the model choose the right object, and did it localize the object tightly enough? They sit between [object detection](object-detection.md), [semantic segmentation](semantic-segmentation.md), [instance segmentation](instance-segmentation.md), and practical [model benchmarking](model-benchmarking.md), because the same visual error can look good or bad depending on the metric.

## Defining math

Intersection over union compares a predicted region $A$ with a ground-truth region $B$:

$$
\mathrm{IoU}(A,B)=\frac{|A\cap B|}{|A\cup B|}.
$$

Dice is common for masks, especially in medical work:

$$
\mathrm{Dice}(A,B)=\frac{2|A\cap B|}{|A|+|B|}.
$$

For detection, predictions are sorted by confidence, matched greedily to unused ground-truth objects above an IoU threshold, and converted into precision-recall:

$$
\mathrm{precision}_k=\frac{\mathrm{TP}_k}{\mathrm{TP}_k+\mathrm{FP}_k},\qquad
\mathrm{recall}_k=\frac{\mathrm{TP}_k}{N_{\mathrm{gt}}}.
$$

Average precision summarizes the precision-recall curve; COCO-style reporting averages AP across classes and multiple IoU thresholds, which is stricter than reporting AP at one threshold.

## Worked example

This snippet computes mask IoUs, assigns detections by score, and derives precision-recall points plus average precision.

```python
import numpy as np
from sklearn.metrics import average_precision_score

gt = np.array([[0, 0, 2, 2], [3, 0, 5, 2]], dtype=float)
pred = np.array([[0, 0, 2, 2], [0.5, 0, 2.5, 2], [3.2, 0, 5.2, 2], [6, 0, 8, 2]], dtype=float)
scores = np.array([0.95, 0.80, 0.70, 0.40])

def box_iou(a, b):
    lo = np.maximum(a[:2], b[:2])
    hi = np.minimum(a[2:], b[2:])
    inter = max(0, hi[0] - lo[0]) * max(0, hi[1] - lo[1])
    union = (a[2]-a[0])*(a[3]-a[1]) + (b[2]-b[0])*(b[3]-b[1]) - inter
    return inter / union

iou = np.array([[box_iou(p, g) for g in gt] for p in pred])
order = np.argsort(-scores)
matched, flags = set(), []
for i in order:
    j = int(np.argmax(iou[i]))
    ok = iou[i, j] >= 0.5 and j not in matched
    flags.append(1 if ok else 0)
    if ok:
        matched.add(j)

precision = np.cumsum(flags) / (np.arange(len(flags)) + 1)
recall = np.cumsum(flags) / len(gt)
print("iou_matrix")
print(np.round(iou, 3))
print("tp_flags_by_score", flags)
print("precision", np.round(precision, 3).tolist(), "recall", np.round(recall, 3).tolist())
print("ap_sklearn", round(average_precision_score(flags, scores[order]), 3))
```

Observed output:

```text
iou_matrix
[[1.    0.   ]
 [0.6   0.   ]
 [0.    0.818]
 [0.    0.   ]]
tp_flags_by_score [1, 0, 1, 0]
precision [1.0, 0.5, 0.667, 0.5] recall [0.5, 0.5, 1.0, 1.0]
ap_sklearn 0.833
```

The duplicate prediction overlaps the first object but becomes a false positive because that ground-truth object is already matched. A [rotated object detection](rotated-object-detection.md) benchmark changes only the overlap geometry; the matching logic is the same.

## Caveats

Pixel accuracy can be meaningless when background dominates a mask. IoU punishes small boundary errors heavily on tiny objects, while Dice can look forgiving when a large structure is mostly correct. AP hides the identity of the failure: missed rare classes, duplicate boxes, poor boundaries, and calibration errors all collapse into one scalar.

## References

- [scikit-learn documentation: `average_precision_score`](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.average_precision_score.html)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)

> **Section — [Computer Vision](index.md):** ← [Instance Segmentation](instance-segmentation.md) · [CNN Architectures](cnn-architectures.md) →

> **Learning path — [Computer vision](../00-home-and-navigation/learning-paths.md#computer-vision):** ← [Object Detection](object-detection.md) · [Vision Transformers](vision-transformers.md) →
