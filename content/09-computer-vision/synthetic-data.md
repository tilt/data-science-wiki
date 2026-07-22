---
title: Synthetic Data
slug: computer-vision/synthetic-data
description: "Generated visual data for rare cases, controllable labels, simulation, and robustness testing."
area: computer-vision
topics:
  - synthetic-data
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - domain-shift.md
  - data-augmentation.md
  - object-detection.md
  - pose-estimation.md
historical_context: false
last_reviewed: 2026-07-22
---

# Synthetic Data

Synthetic data is generated rather than collected from the deployment environment. In computer vision it can provide exact masks, boxes, depth, pose, or rare scenarios for [object detection](object-detection.md), [pose estimation](pose-estimation.md), and segmentation. Its central risk is the simulation-to-real gap, a specific form of [domain shift](domain-shift.md).

## Rendering with controllable attributes

Let $G_\psi(z,a)$ render an image from random seed $z$ and controllable attributes $a$ such as pose, lighting, texture, camera, and background. Training uses

$$
(x_s,y_s)=G_\psi(z,a),
$$

then evaluates on real $(x_r,y_r)$. Domain randomization samples many $a$ values so the real domain is more likely to fall inside the synthetic support.

## Worked example

This snippet trains a threshold-like classifier on synthetic pixel intensities and evaluates how well it transfers to a shifted real-intensity distribution.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(8)
synth_bg, real_bg = rng.normal(0, .1, 80), rng.normal(.45, .1, 80)
synth_obj, real_obj = rng.normal(.8, .1, 80), rng.normal(.65, .1, 80)
Xsyn = np.r_[synth_bg, synth_obj].reshape(-1, 1); ysyn = np.r_[np.zeros(80), np.ones(80)]
Xreal = np.r_[real_bg, real_obj].reshape(-1, 1); yreal = np.r_[np.zeros(80), np.ones(80)]
clf = LogisticRegression().fit(Xsyn, ysyn)
print("synthetic_train_acc", round(clf.score(Xsyn, ysyn), 3), "real_test_acc", round(clf.score(Xreal, yreal), 3))
print("learned_threshold_approx", round(float(-clf.intercept_[0] / clf.coef_[0,0]), 3), "real_means", [round(float(real_bg.mean()),3), round(float(real_obj.mean()),3)])
```

Observed output:

```text
synthetic_train_acc 1.0 real_test_acc 0.65
learned_threshold_approx 0.401 real_means [0.445, 0.632]
```

The synthetic separator reaches 1.0 training accuracy, but real accuracy falls to 0.65 because the learned threshold is about 0.401 while the real background mean is 0.445. Many real background samples therefore land on the object side of the synthetic decision boundary.

## Caveats

Synthetic data can teach rendering artifacts, unrealistic textures, and simplified physics. It should be treated as [data augmentation](data-augmentation.md), not proof of deployment readiness. Always reserve real target-domain images for final evaluation.

## References

- [Render for CNN: Viewpoint Estimation in Images Using CNNs Trained with Rendered 3D Model Views](https://arxiv.org/abs/1505.05641)
- [Understanding Domain Randomization for Sim-to-real Transfer](https://arxiv.org/abs/2110.03239)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Domain Shift](domain-shift.md) [Medical Image Analysis →](medical-image-analysis.md)
