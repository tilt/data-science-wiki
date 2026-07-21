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
aliases:
  - Medical Imaging
  - Medical image analysis
prerequisites:
  - index.md
related:
  - mri-classification.md
  - mri-segmentation.md
  - detection-and-segmentation-metrics.md
  - ../19-domain-applications/medical-mri-analysis.md
historical_context: false
last_reviewed: 2026-07-21
---

# Medical Image Analysis

Medical image analysis applies computer vision to X-ray, CT, MRI, ultrasound, microscopy, pathology, and other clinical images. It includes [MRI classification](mri-classification.md), [MRI segmentation](mri-segmentation.md), detection, measurement, registration, triage, and longitudinal change analysis. The same metric can imply different clinical risk depending on workflow.

This page is the medical-imaging hub inside [computer vision](index.md). The domain is not separate from computer vision methodologically: it still uses classification, detection, segmentation, registration, self-supervised pretraining, and benchmarking. It is separate operationally because patient-level splits, site shift, acquisition protocols, calibration, and clinical error costs dominate whether a model is usable.

| task family               | typical output                                                       | computer-vision link                                                                                                 |
| ------------------------- | -------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| Classification            | Scan-, series-, slice-, or patient-level label.                      | [Image classification](image-classification.md), [MRI classification](mri-classification.md)                         |
| Segmentation              | Pixel or voxel masks for anatomy, lesions, organs, or tumor regions. | [Semantic segmentation](semantic-segmentation.md), [MRI segmentation](mri-segmentation.md)                           |
| Detection and measurement | Lesion boxes, counts, diameters, volume, or change over time.        | [Object detection](object-detection.md), [detection and segmentation metrics](detection-and-segmentation-metrics.md) |
| Representation learning   | Encoder features for scarce-label clinical tasks.                    | [Self supervised visual learning](self-supervised-visual-learning.md), [domain shift](domain-shift.md)               |

## Triage scoring

For a binary triage model, the model estimates

$$
\hat p=P(Y=1\mid X),
$$

Here $X$ is the image or study, $Y=1$ denotes the clinically positive class, and $\hat p$ is the model's estimated probability for that class. The probability is not the action by itself; the action depends on the threshold and workflow.

then a threshold $\tau$ turns probability into action. Sensitivity and specificity are

$$
\mathrm{sensitivity}=\frac{TP}{TP+FN},\qquad
\mathrm{specificity}=\frac{TN}{TN+FP}.
$$

Here $TP$ and $FN$ count positive cases correctly caught or missed, while $TN$ and $FP$ count negative cases correctly dismissed or falsely flagged. Sensitivity measures how many true positives are caught; specificity measures how many true negatives are left alone.

Patient-level splitting is part of the mechanism, not a bookkeeping detail: slices or studies from the same patient cannot be treated as independent test examples.

## Worked example

The code below holds the same ten cases fixed and changes only the triage threshold. It is valuable because the output shows that a threshold is a clinical operating point, not an afterthought after model training.

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

The same decision appears visually as a threshold tradeoff: moving the threshold right usually increases specificity but can reduce sensitivity.

![Sensitivity falls and specificity rises as the triage threshold becomes stricter.](../assets/diagrams/medical-threshold-tradeoff.svg)

## Caveats

Models can learn scanner, hospital, protocol, text overlays, or follow-up leakage. [Domain shift](domain-shift.md) is common across sites. For measurement tasks, overlap metrics from [detection and segmentation metrics](detection-and-segmentation-metrics.md) must be paired with clinically meaningful boundary and volume errors.

## References

- [DeepLesion: Automated Deep Mining, Categorization and Detection of Significant Radiology Image Findings](https://arxiv.org/abs/1710.01766)
- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Synthetic Data](synthetic-data.md) [MRI Segmentation →](mri-segmentation.md)
