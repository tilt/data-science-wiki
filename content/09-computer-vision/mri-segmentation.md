---
title: MRI Segmentation
slug: computer-vision/mri-segmentation
description: "Voxel-level delineation of anatomical or pathological structures in MRI volumes."
area: computer-vision
topics:
  - mri-segmentation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - medical-image-analysis.md
  - mri-classification.md
  - semantic-segmentation.md
  - detection-and-segmentation-metrics.md
historical_context: false
last_reviewed: 2026-07-11
---

# MRI Segmentation

MRI segmentation assigns labels to voxels or pixels for anatomy, lesions, tumor regions, edema, or organs. It is a volumetric specialization of [semantic segmentation](semantic-segmentation.md), and it often supplies measurements for [medical image analysis](medical-image-analysis.md) rather than just pictures.

## Defining math

For a volume $X\in\mathbb R^{C\times D\times H\times W}$, the model predicts a mask $\hat M\in\{0,1,\ldots,K\}^{D\times H\times W}$. Dice overlap for one structure is

$$
\mathrm{Dice}=\frac{2|M\cap \hat M|}{|M|+|\hat M|}.
$$

Here $M$ is the reference mask, $\hat M$ is the predicted mask, and $|\cdot|$ counts voxels in the selected structure. The numerator doubles the overlapping voxels; the denominator totals the predicted and reference sizes, so Dice rewards overlap while penalizing both missed voxels and false positives.

Physical volume uses voxel spacing:

$$
V_{\mathrm{ml}}=|M|\cdot s_xs_ys_z/1000,
$$

when spacings are in millimeters.

## Worked example

This snippet compares a predicted 3D lesion mask with ground truth, reporting voxel counts, Dice score, and physical volume estimates.

```python
import numpy as np

gt = np.zeros((4,4,4), bool); gt[1:3,1:3,1:3] = 1
pred = gt.copy(); pred[1,1,1] = 0; pred[3,2,2] = 1
inter = np.logical_and(gt, pred).sum()
dice = 2 * inter / (gt.sum() + pred.sum())
voxel_ml = .8 * .8 * 2 / 1000
print("gt_voxels", int(gt.sum()), "pred_voxels", int(pred.sum()))
print("dice", round(dice, 3), "volume_ml_gt", round(gt.sum()*voxel_ml, 4), "volume_ml_pred", round(pred.sum()*voxel_ml, 4))
```

Observed output:

```text
gt_voxels 8 pred_voxels 8
dice 0.875 volume_ml_gt 0.0102 volume_ml_pred 0.0102
```

The volumes match, but Dice exposes that one voxel was missed and one false voxel was added. Boundary metrics from [detection and segmentation metrics](detection-and-segmentation-metrics.md) may be needed when millimeter-level contour accuracy matters.

## Caveats

Slice-level splits leak patient anatomy. Resampling can change small lesions. Dice can look high on large organs while clinically important boundaries are wrong. Multi-sequence MRI requires consistent registration and missing-sequence handling before any [mri classification](mri-classification.md) or segmentation claim is credible.

## References

- [U-Net: Convolutional Networks for Biomedical Image Segmentation](https://arxiv.org/abs/1505.04597)
- [Automated Design of Deep Learning Methods for Biomedical Image Segmentation](https://arxiv.org/abs/1904.08128)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Medical Image Analysis](medical-image-analysis.md) [MRI Classification →](mri-classification.md)
