---
title: Instance Segmentation
slug: computer-vision/instance-segmentation
description: "Detecting individual objects and predicting a separate mask for each instance."
area: computer-vision
topics:
  - instance-segmentation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - object-detection.md
  - semantic-segmentation.md
  - detection-and-segmentation-metrics.md
  - data-augmentation.md
historical_context: false
last_reviewed: 2026-07-11
---

# Instance Segmentation

Instance segmentation predicts a separate mask for each object instance. It combines [object detection](object-detection.md) with mask prediction: the system must decide how many objects exist, where they are, and which pixels belong to each one.

## Defining mechanism

A typical instance model returns

$$
\{(b_i, m_i, c_i, s_i)\}_{i=1}^m,
$$

where $b_i$ is a box, $m_i\in\{0,1\}^{H\times W}$ is an instance mask, $c_i$ is a class, and $s_i$ is a score. Mask R-CNN extends Faster R-CNN by adding a mask branch in parallel with the class and box heads. Evaluation still uses IoU matching, but the IoU is computed over masks rather than boxes.

## Worked example

This snippet computes an instance-mask IoU matrix and greedily matches predictions to ground-truth instances above a threshold.

```python
import numpy as np

gt = np.zeros((2,4,4), bool); gt[0,:2,:2] = 1; gt[1,2:,2:] = 1
pred = np.zeros((3,4,4), bool); pred[0,:2,:2] = 1; pred[1,1:3,1:3] = 1; pred[2,2:,2:] = 1
scores = np.array([.9, .7, .6])
iou = np.array([[np.logical_and(p, g).sum() / np.logical_or(p, g).sum() for g in gt] for p in pred])
matched, flags = set(), []
for i in np.argsort(-scores):
    j = int(np.argmax(iou[i]))
    ok = iou[i, j] >= .5 and j not in matched
    flags.append(int(ok))
    if ok:
        matched.add(j)
print("mask_iou_matrix")
print(np.round(iou, 3))
print("tp_flags", flags, "matched_instances", len(matched))
```

Observed output:

```text
mask_iou_matrix
[[1.    0.   ]
 [0.143 0.143]
 [0.    1.   ]]
tp_flags [1, 0, 1] matched_instances 2
```

The middle mask overlaps both objects weakly and is counted as a false positive. This is the same matching idea as [detection and segmentation metrics](detection-and-segmentation-metrics.md), but with per-instance masks.

## Caveats

Touching objects are easy to merge; over-segmentation can split one object into fragments. Copy-paste [data augmentation](data-augmentation.md) can help crowded scenes, but only when pasted masks preserve realistic occlusion and scale.

## References

- [Mask R-CNN](https://arxiv.org/abs/1703.06870)
- [Microsoft COCO: Common Objects in Context](https://arxiv.org/abs/1405.0312)
