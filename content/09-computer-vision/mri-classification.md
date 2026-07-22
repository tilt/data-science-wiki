---
title: MRI Classification
slug: computer-vision/mri-classification
description: "Scan-, patient-, slice-, or region-level classification of MRI studies with leakage-aware validation."
area: computer-vision
topics:
  - mri-classification
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - medical-image-analysis.md
  - mri-segmentation.md
  - image-classification.md
  - domain-shift.md
historical_context: false
last_reviewed: 2026-07-22
---

# MRI Classification

MRI classification assigns labels to slices, series, regions, scans, or patients. That label level must be explicit: a slice-level tear label, a scan-level abnormality label, and a patient-level outcome label have different leakage risks. The task is a medical specialization of [image classification](image-classification.md), with stricter validation requirements from [medical image analysis](medical-image-analysis.md).

## Aggregating slice embeddings

For a study with slices $x_1,\ldots,x_T$, a model may aggregate slice embeddings:

$$
h_t=\phi(x_t),\qquad
\hat p=\sigma\left(w^\top \mathrm{pool}(h_1,\ldots,h_T)+b\right).
$$

Here $x_t$ is slice or volume crop $t$, $\phi$ is the image encoder, $h_t$ is its embedding, and `pool` aggregates embeddings across the study. The final sigmoid $\sigma$ produces a binary probability $\hat p$ from the pooled study representation; multiclass problems would use a softmax head instead.

Pooling may be mean, max, attention, or sequence modeling. The split must group by patient or study:

$$
\mathrm{patient}(i)\notin \mathrm{patients}_{train}\quad\text{for all test examples }i.
$$

This condition means no test example may come from a patient seen during training. It prevents the classifier from exploiting patient-specific anatomy or acquisition artifacts instead of learning transferable disease signal.

## Worked example

The simulation below deliberately includes a patient-identity feature. It shows why random slice splits can look strong while patient-group splits give a more honest estimate.

```python
import numpy as np
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import GroupShuffleSplit, train_test_split

rng = np.random.default_rng(8)
n_pat = 80
groups = np.repeat(np.arange(n_pat), 2)
y = rng.integers(0, 2, n_pat).repeat(2)
onehot = np.eye(n_pat)[groups]
weak = (y * 0.2 + rng.normal(0, 1.0, len(y))).reshape(-1, 1)
X = np.c_[onehot, weak]

Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=.35, random_state=8, stratify=y)
acc_rand = LogisticRegression(max_iter=1000, C=10).fit(Xtr, ytr).score(Xte, yte)
gss = GroupShuffleSplit(test_size=.35, n_splits=1, random_state=8)
tr, te = next(gss.split(X, y, groups))
acc_group = LogisticRegression(max_iter=1000, C=10).fit(X[tr], y[tr]).score(X[te], y[te])
print("random_slice_split_acc", round(acc_rand, 3))
print("patient_group_split_acc", round(acc_group, 3), "test_patients", len(set(groups[te])))
```

Observed output:

```text
random_slice_split_acc 0.875
patient_group_split_acc 0.714 test_patients 28
```

The random slice split is inflated because patient identity appears in both train and test. Grouping by patient gives a more honest estimate.

## Caveats

MRI sequence availability, scanner vendor, coil, site, and reconstruction protocol can act as shortcuts. [Domain shift](domain-shift.md) across sites is normal, so report site-level and protocol-level performance. If classification depends on localization, pair it with [MRI segmentation](mri-segmentation.md) or saliency review.

## References

- [A Comparative Study of Existing and New Deep Learning Methods for Detecting Knee Injuries using the MRNet Dataset](https://arxiv.org/abs/2010.01947)
- [WILDS: A Benchmark of in-the-Wild Distribution Shifts](https://arxiv.org/abs/2012.07421)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← MRI Segmentation](mri-segmentation.md)
