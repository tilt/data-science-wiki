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

## Worked metric example

For one 12-pixel mask with classes 0, 1, and 2, pixel accuracy counts all correct pixels:

$$
\operatorname{accuracy}=\frac{9}{12}=0.75.
$$

Intersection-over-union computes overlap per class:

| class | intersection | union | IoU |
|---:|---:|---:|---:|
| 0 | 3 | 5 | 0.600 |
| 1 | 4 | 6 | 0.667 |
| 2 | 2 | 4 | 0.500 |

The mean IoU is $(0.600+0.667+0.500)/3=0.589$. It is lower than pixel accuracy because class-wise overlap punishes false regions and missed regions directly instead of letting easy background pixels dominate the score.

## Caveats

Class imbalance can make background dominate the loss. Thin structures and fuzzy boundaries can get poor IoU despite acceptable visual appearance. Always pair aggregate [detection and segmentation metrics](detection-and-segmentation-metrics.md) with representative mask overlays.

## References

- [Fully Convolutional Networks for Semantic Segmentation](https://arxiv.org/abs/1411.4038)
- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
