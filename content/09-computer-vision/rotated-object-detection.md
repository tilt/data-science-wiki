---
title: Rotated Object Detection
slug: computer-vision/rotated-object-detection
description: "Object detection with oriented boxes for aerial imagery, text, industrial parts, and elongated objects."
area: computer-vision
topics:
  - rotated-object-detection
level: foundational
status: review
page_type: concept
aliases:
  - oriented object detection
prerequisites:
  - index.md
related:
  - object-detection.md
  - detection-and-segmentation-metrics.md
  - ocr-pipelines.md
  - synthetic-data.md
historical_context: false
last_reviewed: 2026-07-11
---

# Rotated Object Detection

Rotated object detection predicts oriented boxes instead of axis-aligned boxes. It matters when angle is part of localization: aerial ships, text lines, shelves, industrial parts, and long objects where ordinary [object detection](object-detection.md) boxes include too much background.

## Defining math

An oriented rectangle can be parameterized as

$$
b=(c_x,c_y,w,h,\theta),
$$

Here $(c_x,c_y)$ is the box center, $w$ and $h$ are width and height, and $\theta$ is the rotation angle under the dataset's convention. This parameterization is compact, but the convention must be explicit because several parameter tuples can represent the same physical rectangle.

or by four corner points. Evaluation uses the same matching as [detection and segmentation metrics](detection-and-segmentation-metrics.md), but IoU is polygon overlap rather than axis-aligned rectangle overlap:

$$
\mathrm{IoU}_{rot}(A,B)=\frac{\mathrm{area}(A\cap B)}{\mathrm{area}(A\cup B)}.
$$

The sets $A$ and $B$ are the predicted and reference rotated boxes interpreted as polygons. The numerator is their shared area; the denominator is the total area covered by either box.

Angle conventions matter because $\theta$, $\theta+\pi$, and swapped width/height can describe the same physical box.

## Worked example

The code rasterizes two oriented rectangles onto a fine grid and approximates rotated IoU by counting overlapping grid cells. It is useful here because it makes angle error visible without requiring a geometry library.

```python
import numpy as np

def rect_mask(cx, cy, w, h, theta, grid=80):
    yy, xx = np.mgrid[0:grid, 0:grid] + 0.5
    x = (xx / grid * 6) - 3
    y = (yy / grid * 6) - 3
    c, s = np.cos(theta), np.sin(theta)
    xr = c * (x - cx) + s * (y - cy)
    yr = -s * (x - cx) + c * (y - cy)
    return (np.abs(xr) <= w/2) & (np.abs(yr) <= h/2)

m0 = rect_mask(0, 0, 3, 1, 0)
m1 = rect_mask(0, 0, 3, 1, np.deg2rad(30))
m2 = rect_mask(.2, 0, 3, 1, np.deg2rad(30))
print("axis_vs_30deg_iou", round(np.logical_and(m0,m1).sum() / np.logical_or(m0,m1).sum(), 3))
print("aligned_shifted_iou", round(np.logical_and(m1,m2).sum() / np.logical_or(m1,m2).sum(), 3))
```

Observed output:

```text
axis_vs_30deg_iou 0.481
aligned_shifted_iou 0.739
```

The same elongated box at 0 and 30 degrees has IoU 0.481, below common 0.5 matching thresholds. Two boxes with the same 30-degree orientation but a small center shift still reach 0.739 IoU, so angle error can matter more than modest translation error for elongated objects.

## Caveats

Angle discontinuities near the convention boundary can destabilize training. Symmetric objects may have ambiguous orientation labels. For text, [OCR pipelines](ocr-pipelines.md) may care more about line reading order than box IoU alone.

## References

- [DOTA: A Large-scale Dataset for Object Detection in Aerial Images](https://arxiv.org/abs/1711.10398)
- [Faster R-CNN: Towards Real-Time Object Detection with Region Proposal Networks](https://arxiv.org/abs/1506.01497)
