---
title: Object Detection
slug: computer-vision/object-detection
description: "Predicting object classes and bounding boxes, including scoring and non-maximum suppression."
area: computer-vision
topics:
  - object-detection
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - detection-and-segmentation-metrics.md
  - instance-segmentation.md
  - rotated-object-detection.md
  - cnn-architectures.md
historical_context: false
last_reviewed: 2026-07-21
---

# Object Detection

Object detection predicts both what is present and where it is, usually as class-labeled bounding boxes with confidence scores. It is the box-level task between [image classification](image-classification.md), which ignores location, and [instance segmentation](instance-segmentation.md), which predicts object masks.

## Boxes and scores

A detector returns a set

$$
\{(b_i, c_i, s_i)\}_{i=1}^m,\qquad b_i=(x_1,y_1,x_2,y_2),
$$

where $c_i$ is a class and $s_i$ is a confidence score. Two-stage detectors such as Faster R-CNN first propose candidate regions and then classify/refine them; one-stage detectors predict dense boxes directly from feature maps. Most pipelines finish with non-maximum suppression (NMS): sort boxes by score, keep the highest-scoring box, and suppress lower-scoring boxes of the same class whose IoU exceeds a threshold.

## Worked example

This snippet computes box IoU and runs non-maximum suppression so overlapping lower-score boxes are removed.

```python
import numpy as np

boxes = np.array([[0,0,2,2], [.2,.1,2.2,2.1], [3,0,5,2], [0,3,2,5]], float)
scores = np.array([.9, .75, .8, .3])

def box_iou(a, b):
    lo, hi = np.maximum(a[:2], b[:2]), np.minimum(a[2:], b[2:])
    inter = max(0, hi[0]-lo[0]) * max(0, hi[1]-lo[1])
    return inter / (((a[2]-a[0])*(a[3]-a[1])) + ((b[2]-b[0])*(b[3]-b[1])) - inter)

keep = []
for i in np.argsort(-scores):
    if all(box_iou(boxes[i], boxes[j]) <= .5 for j in keep):
        keep.append(int(i))
print("pair_iou_0_1", round(box_iou(boxes[0], boxes[1]), 3))
print("kept_indices", keep, "kept_scores", scores[keep].tolist())
```

Observed output:

```text
pair_iou_0_1 0.747
kept_indices [0, 2, 3] kept_scores [0.9, 0.8, 0.3]
```

The second box is suppressed because it overlaps the first box too much and has lower confidence. The kept boxes would then be evaluated with [detection and segmentation metrics](detection-and-segmentation-metrics.md).

## Caveats

NMS can remove a real object in crowded scenes when two objects overlap. Small objects disappear when the [CNN architecture](cnn-architectures.md) downsamples too aggressively. Domain-specific variants, such as [rotated object detection](rotated-object-detection.md), change the geometry but still need calibrated scores, duplicate handling, and per-slice evaluation.

## References

- [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Image Classification](image-classification.md) [Rotated Object Detection →](rotated-object-detection.md)
>
> **Learning path** — [Computer vision](../00-home-and-navigation/learning-paths.md#computer-vision)
>
> [← Image Representation](image-representation.md) [Detection and Segmentation Metrics →](detection-and-segmentation-metrics.md)
