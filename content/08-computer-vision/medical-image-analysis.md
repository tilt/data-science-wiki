---
title: Medical Image Analysis
slug: computer-vision/medical-image-analysis
description: "Vision methods for clinical images, with patient-level validation and clinically meaningful error tradeoffs."
area: computer-vision
topics:
  - medical-image-analysis
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - mri-classification.md
  - mri-segmentation.md
  - detection-and-segmentation-metrics.md
  - ../18-domain-applications/medical-mri-analysis.md
historical_context: false
last_reviewed: 2026-07-11
---
# Medical Image Analysis

Medical image analysis applies computer vision to X-ray, CT, MRI, ultrasound, microscopy, pathology, and other clinical images. It includes [MRI classification](mri-classification.md), [MRI segmentation](mri-segmentation.md), detection, measurement, registration, triage, and longitudinal change analysis. The same metric can imply different clinical risk depending on workflow.

## Defining mechanism

For a binary triage model, the model estimates

$$
\hat p=P(Y=1\mid X),
$$

then a threshold $\tau$ turns probability into action. Sensitivity and specificity are

$$
\mathrm{sensitivity}=\frac{TP}{TP+FN},\qquad
\mathrm{specificity}=\frac{TN}{TN+FP}.
$$

Patient-level splitting is part of the mechanism, not a bookkeeping detail: slices or studies from the same patient cannot be treated as independent test examples.

## Worked example

```python
import numpy as np

y_true = np.array([0,0,1,1,0,1,0,0,1,0])
probs = np.array([.05,.2,.75,.55,.1,.9,.35,.15,.45,.05])
for t in [.5, .7]:
    pred = (probs >= t).astype(int)
    tp = ((pred == 1) & (y_true == 1)).sum()
    fn = ((pred == 0) & (y_true == 1)).sum()
    fp = ((pred == 1) & (y_true == 0)).sum()
    tn = ((pred == 0) & (y_true == 0)).sum()
    print("threshold", t, "sensitivity", round(tp/(tp+fn), 3), "specificity", round(tn/(tn+fp), 3), "positives", int(pred.sum()))
```

Observed output:

```text
threshold 0.5 sensitivity 0.75 specificity 1.0 positives 3
threshold 0.7 sensitivity 0.5 specificity 1.0 positives 2
```

Raising the threshold reduces false alarms here but also misses another positive case. That tradeoff should be chosen with the clinical use case, not by accuracy alone.

## Caveats

Models can learn scanner, hospital, protocol, text overlays, or follow-up leakage. [Domain shift](domain-shift.md) is common across sites. For measurement tasks, overlap metrics from [detection and segmentation metrics](detection-and-segmentation-metrics.md) must be paired with clinically meaningful boundary and volume errors.

## References

- [DeepLesion: Automated Deep Mining, Categorization and Detection of Significant Radiology Image Findings](https://arxiv.org/abs/1710.01766)
- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
