---
title: Feature Extraction
slug: computer-vision/feature-extraction
description: "Turning pixels into task-relevant measurements, descriptors, feature maps, or embeddings."
area: computer-vision
topics:
  - feature-extraction
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - image-representation.md
  - classical-image-processing.md
  - content-based-image-retrieval.md
  - self-supervised-visual-learning.md
historical_context: false
last_reviewed: 2026-07-21
---

# Feature Extraction

Feature extraction converts an [image representation](image-representation.md) into measurements a downstream model can compare or classify. Classical features are hand-designed descriptors; learned features are intermediate activations or embeddings trained by [CNN architectures](cnn-architectures.md), [vision transformers](vision-transformers.md), or [self-supervised visual learning](self-supervised-visual-learning.md).

## Features as a mapping

A feature extractor is a map

$$
\phi:\mathbb R^{C\times H\times W}\rightarrow\mathbb R^d.
$$

The input has $C$ channels, height $H$, and width $W$; the output is a $d$-dimensional feature vector. The map $\phi$ can be a fixed descriptor, a CNN trunk, a vision-transformer encoder, or a task-specific embedding model.

For classical gradient features, $\phi$ may summarize local derivative magnitudes and orientations. For learned retrieval, $\phi(x)$ is usually normalized and compared by cosine similarity:

$$
\mathrm{sim}(x,q)=\frac{\phi(x)^\top\phi(q)}{\lVert\phi(x)\rVert_2\lVert\phi(q)\rVert_2}.
$$

Here $x$ is a candidate image and $q$ is the query image. Cosine similarity compares the angle between feature vectors, so two images can be close even if their raw pixel values differ.

## Worked example

This small example uses gradient magnitude as a hand-designed feature. It shows the principle, not a modern production extractor: pixels are converted into edge-strength measurements and then summarized into histogram counts.

```python
import numpy as np

img = np.array([[0,0,1,1],[0,0,1,1],[2,2,3,3],[2,2,3,3]], float)
gy, gx = np.gradient(img)
mag = np.sqrt(gx**2 + gy**2)
hist, _ = np.histogram(mag, bins=[0, .25, .75, 1.5])
print("gradient_magnitude")
print(np.round(mag, 2))
print("hist_bins", [0, .25, .75, 1.5], "counts", hist.tolist())
print("mean_feature", round(float(mag.mean()), 3))
```

Observed output:

```text
gradient_magnitude
[[0.   0.5  0.5  0.  ]
 [1.   1.12 1.12 1.  ]
 [1.   1.12 1.12 1.  ]
 [0.   0.5  0.5  0.  ]]
hist_bins [0, 0.25, 0.75, 1.5] counts [4, 4, 8]
mean_feature 0.655
```

This tiny descriptor captures edge strength but loses exact spatial layout. That tradeoff is acceptable for constrained inspection, but poor for [object detection](object-detection.md) where localization matters.

## Caveats

Features can encode shortcuts: lighting, scanner type, crop border, watermark, or background. Always inspect nearest neighbors in [content-based image retrieval](content-based-image-retrieval.md) and evaluate features on domain slices rather than assuming representation quality transfers.

## References

- [Computer Vision: Algorithms and Applications, 2nd ed.](https://szeliski.org/Book/)
- [Torchvision feature extraction documentation](https://docs.pytorch.org/vision/stable/feature_extraction.html)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Classical Image Processing](classical-image-processing.md) [Data Augmentation →](data-augmentation.md)
