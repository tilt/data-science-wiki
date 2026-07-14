---
title: Data Augmentation
slug: computer-vision/data-augmentation
description: "Label-preserving image, box, mask, and embedding-space transformations for training robustness."
area: computer-vision
topics:
  - data-augmentation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - domain-shift.md
  - synthetic-data.md
  - self-supervised-visual-learning.md
  - instance-segmentation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Data Augmentation

Data augmentation creates transformed training examples that should preserve the target label. It is a robustness tool for [domain shift](domain-shift.md), a core ingredient of [self-supervised visual learning](self-supervised-visual-learning.md), and a label-geometry risk in [object detection](object-detection.md) or [instance segmentation](instance-segmentation.md).

## Defining math

For a transformation $T\sim\mathcal T$, training minimizes

$$
\mathbb E_{(x,y)}\mathbb E_{T}[\ell(f_\theta(T(x)), T_y(y))],
$$

where $T_y$ transforms labels when needed. A crop or flip must update boxes and masks; mixup creates convex combinations

$$
\tilde x=\lambda x_i+(1-\lambda)x_j,\qquad
\tilde y=\lambda y_i+(1-\lambda)y_j.
$$

## Worked example

This snippet horizontally flips an image bounding box and mixes two labels, showing how augmentations must transform labels consistently with pixels.

```python
import numpy as np

box = np.array([1, 1, 3, 4])  # xyxy in a width-6 image
W = 6
flipped = np.array([W - box[2], box[1], W - box[0], box[3]])
lam = .3
y1, y2 = np.array([1., 0.]), np.array([0., 1.])
ym = lam * y1 + (1 - lam) * y2
print("original_box_xyxy", box.tolist(), "flipped_box_xyxy", flipped.tolist())
print("mixup_label", np.round(ym, 2).tolist(), "lambda", lam)
```

Observed output:

```text
original_box_xyxy [1, 1, 3, 4] flipped_box_xyxy [3, 1, 5, 4]
mixup_label [0.3, 0.7] lambda 0.3
```

The horizontal flip is only correct because the box coordinates are transformed with the image: in a width-6 frame, $x_1=1,x_2=3$ becomes $x_1=3,x_2=5$. The mixup label `[0.3, 0.7]` likewise preserves the chosen $\lambda=0.3$, so the target changes with the augmented input instead of remaining a hard class.

## Caveats

Augmentation teaches invariances. Horizontal flips are wrong for laterality markers, text, and some traffic signs. Strong color jitter can erase medically meaningful intensity. Copy-paste [synthetic data](synthetic-data.md) can improve rare instances, but unrealistic boundaries may become a shortcut.

## References

- [Torchvision transforms documentation](https://docs.pytorch.org/vision/stable/transforms.html)
- [mixup: Beyond Empirical Risk Minimization](https://arxiv.org/abs/1710.09412)
