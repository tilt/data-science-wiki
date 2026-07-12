---
title: Semantic Segmentation
slug: computer-vision/semantic-segmentation
description: "Dense pixel classification where every pixel receives a class label."
area: computer-vision
topics:
  - semantic-segmentation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - detection-and-segmentation-metrics.md
  - instance-segmentation.md
  - mri-segmentation.md
  - cnn-architectures.md
historical_context: false
last_reviewed: 2026-07-11
---
# Semantic Segmentation

Semantic segmentation assigns a class to every pixel. Unlike [instance segmentation](instance-segmentation.md), it does not separate two touching objects of the same class; unlike [image classification](image-classification.md), its output preserves spatial shape.

## Defining math

For an image of height $H$ and width $W$, the model returns logits $z_{u,v,k}$ for every pixel $(u,v)$ and class $k$:

$$
p_{u,v,k}=\frac{\exp(z_{u,v,k})}{\sum_j\exp(z_{u,v,j})},\qquad
L=-\sum_{u,v}\log p_{u,v,y_{u,v}}.
$$

Fully convolutional networks make this efficient by replacing dense classification heads with spatial feature maps and upsampling. U-Net-style decoders add skip connections so low-resolution semantic features can recover fine boundaries, which is why they are common in [MRI segmentation](mri-segmentation.md).

## Worked example

```python
import numpy as np

y_true = np.array([[0,0,1,1],[0,2,2,1],[0,2,1,1]])
y_pred = np.array([[0,1,1,1],[0,2,0,1],[0,2,2,1]])
ious = []
for c in [0, 1, 2]:
    inter = np.logical_and(y_true == c, y_pred == c).sum()
    union = np.logical_or(y_true == c, y_pred == c).sum()
    ious.append(inter / union)
print("per_class_iou", np.round(ious, 3).tolist(), "mean_iou", round(float(np.mean(ious)), 3))
print("pixel_accuracy", round(float((y_true == y_pred).mean()), 3))
```

Observed output:

```text
per_class_iou [0.6, 0.667, 0.5] mean_iou 0.589
pixel_accuracy 0.75
```

Pixel accuracy is 0.75, but mean IoU is lower because class-wise overlap punishes false regions and missed regions directly.

## Caveats

Class imbalance can make background dominate the loss. Thin structures and fuzzy boundaries can get poor IoU despite acceptable visual appearance. Always pair aggregate [detection and segmentation metrics](detection-and-segmentation-metrics.md) with representative mask overlays.

## References

- [Fully Convolutional Networks for Semantic Segmentation](https://arxiv.org/abs/1411.4038)
- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
