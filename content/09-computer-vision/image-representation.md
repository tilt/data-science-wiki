---
title: Image Representation
slug: computer-vision/image-representation
description: "Pixels, channels, tensors, patches, and embeddings as the input contracts for vision systems."
area: computer-vision
topics:
  - image-representation
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - classical-image-processing.md
  - feature-extraction.md
  - vision-transformers.md
  - image-classification.md
historical_context: false
last_reviewed: 2026-07-11
---

# Image Representation

Image representation defines the contract between visual data and algorithms: pixel grid, channel semantics, dtype, scale, metadata, patches, feature maps, or embeddings. Most failures in [image classification](image-classification.md), [classical image processing](classical-image-processing.md), and [vision transformers](vision-transformers.md) become harder to debug when this contract is implicit.

## Defining mechanism

A common tensor representation is $X\in\mathbb R^{C\times H\times W}$ or batched $X\in\mathbb R^{N\times C\times H\times W}$. Normalization maps integer pixels into numeric ranges suitable for optimization:

$$
x'_{c,u,v}=\frac{x_{c,u,v}/255-\mu_c}{\sigma_c}.
$$

Patch-based models reshape an image into $P$ flattened patches $X_p\in\mathbb R^{P\times(Cp_hp_w)}$ before projection into tokens.

## Worked example

This snippet converts an image array into channel-first tensor form, extracts flattened patches, and reports channel means and a patch summary.

```python
import numpy as np

rgb = np.arange(3 * 4 * 4, dtype=np.uint8).reshape(3, 4, 4)
chw = rgb.astype("float32") / 255.0
patches = chw.reshape(3, 2, 2, 2, 2).transpose(1, 3, 0, 2, 4).reshape(4, -1)
print("tensor_shape", tuple(chw.shape), "dtype", str(chw.dtype), "range", (round(float(chw.min()),3), round(float(chw.max()),3)))
print("patch_matrix_shape", patches.shape)
print("channel_means", np.round(chw.mean(axis=(1,2)), 3).tolist())
print("first_patch_sum", round(float(patches[0].sum()), 3))
```

Observed output:

```text
tensor_shape (3, 4, 4) dtype float32 range (0.0, 0.184)
patch_matrix_shape (4, 12)
channel_means [0.028999999165534973, 0.09200000017881393, 0.1550000011920929]
first_patch_sum 0.871
```

The same 4-by-4 image becomes four 12-value patch vectors. That representation is natural for a [vision transformer](vision-transformers.md), while a [CNN architecture](cnn-architectures.md) would preserve local spatial neighborhoods through convolution.

## Caveats

RGB/BGR swaps, missing alpha handling, lossy resizing, and wrong dtype ranges can silently poison a pipeline. Medical images add spacing, orientation, windowing, and sequence metadata; treating a voxel volume as an ordinary PNG stack can invalidate [MRI segmentation](mri-segmentation.md).

## References

- [Torchvision transforms documentation](https://docs.pytorch.org/vision/stable/transforms.html)
- [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/)

> **Section — [Computer Vision](index.md):** [Classical Image Processing](classical-image-processing.md) →

> **Learning path — [Computer vision](../00-home-and-navigation/learning-paths.md#computer-vision):** ← [Computer Vision](index.md) · [Object Detection](object-detection.md) →
