---
title: Domain Shift
slug: computer-vision/domain-shift
description: "Train-test distribution changes across cameras, sites, acquisition protocols, geography, or time."
area: computer-vision
topics:
  - domain-shift
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-augmentation.md
  - synthetic-data.md
  - model-benchmarking.md
  - medical-image-analysis.md
historical_context: false
last_reviewed: 2026-07-11
---
# Domain Shift

Domain shift occurs when deployment images differ from training images. In vision this often comes from sensors, lighting, geography, weather, hospital, scanner protocol, annotation policy, or time. It is the reason [model benchmarking](model-benchmarking.md) must report slices, not only a random validation split.

## Defining math

The training and deployment distributions differ:

$$
P_{\mathrm{train}}(X,Y)\ne P_{\mathrm{test}}(X,Y).
$$

Covariate shift changes $P(X)$ while the labeling rule is stable; label shift changes $P(Y)$; concept shift changes $P(Y\mid X)$. [Data augmentation](data-augmentation.md) and [synthetic data](synthetic-data.md) try to widen the training distribution, but they must be checked against real target-domain examples.

## Worked example

This snippet trains a classifier in one feature distribution and evaluates it on a shifted distribution to show accuracy and positive-rate drift.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression

rng = np.random.default_rng(8)
Xtr = rng.normal(0, 1, (200, 2)); ytr = (Xtr[:,0] + Xtr[:,1] > 0).astype(int)
Xin = rng.normal(0, 1, (200, 2)); yin = (Xin[:,0] + Xin[:,1] > 0).astype(int)
Xout = rng.normal([1.2, -1.2], 1, (200, 2))
yout = (Xout[:,0] + Xout[:,1] + .8 * Xout[:,0] * Xout[:,1] > 0).astype(int)
clf = LogisticRegression().fit(Xtr, ytr)
print("in_domain_acc", round(clf.score(Xin, yin), 3), "shifted_acc", round(clf.score(Xout, yout), 3))
print("shifted_positive_rate_true_pred", round(yout.mean(), 3), round(clf.predict(Xout).mean(), 3))
```

Observed output:

```text
in_domain_acc 0.99 shifted_acc 0.77
shifted_positive_rate_true_pred 0.195 0.425
```

The classifier remains strong in-domain at 0.99 accuracy but drops to 0.77 on the shifted sample. It also predicts positives for 42.5 percent of shifted examples when only 19.5 percent are truly positive, showing that the learned boundary no longer matches the deployment distribution.

## Caveats

Random splits can hide site, patient, camera, or time leakage. In [medical image analysis](medical-image-analysis.md), scanner and hospital markers may be easier to learn than pathology. Much visual shift is concrete image degradation — blur, glare, occlusion, truncation, compression artifacts, viewpoint change, low contrast, or rotated text — so a useful robustness story names the specific corruptions inspected, not just an aggregate accuracy drop. Robustness claims should include target-domain holdouts and worst-slice performance.

## References

- [WILDS: A Benchmark of in-the-Wild Distribution Shifts](https://arxiv.org/abs/2012.07421)
- [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/)
