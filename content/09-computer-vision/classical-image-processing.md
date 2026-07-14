---
title: Classical Image Processing
slug: computer-vision/classical-image-processing
description: "Deterministic filtering, gradients, thresholding, and morphology for controlled visual signals."
area: computer-vision
topics:
  - classical-image-processing
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - image-representation.md
  - feature-extraction.md
  - ocr-pipelines.md
  - semantic-segmentation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Classical Image Processing

Classical image processing uses fixed operations such as convolution, thresholding, morphology, and geometric transforms. It is not obsolete: it is often the most auditable part of an [OCR pipeline](ocr-pipelines.md), a preprocessing step before [feature extraction](feature-extraction.md), or a sanity baseline for [semantic segmentation](semantic-segmentation.md).

## Defining math

For a grayscale image $I$ and kernel $K$, 2D convolution computes

$$
(I*K)[u,v]=\sum_i\sum_j I[u-i,v-j]K[i,j].
$$

The Sobel operator estimates horizontal and vertical derivatives with small kernels, for example

$$
K_x=
\begin{bmatrix}
-1&0&1\\
-2&0&2\\
-1&0&1
\end{bmatrix}.
$$

Edges become large responses because neighboring intensities differ strongly; flat regions cancel out.

## Worked example

```python
import numpy as np
from scipy.signal import convolve2d

img = np.zeros((5, 5)); img[:, 3:] = 10
sobel_x = np.array([[-1,0,1],[-2,0,2],[-1,0,1]])
gx = convolve2d(img, sobel_x, mode="same", boundary="symm")
print("image")
print(img.astype(int))
print("sobel_x")
print(gx.astype(int))
print("max_abs_gradient", int(np.abs(gx).max()))
```

Observed output:

```text
image
[[ 0  0  0 10 10]
 [ 0  0  0 10 10]
 [ 0  0  0 10 10]
 [ 0  0  0 10 10]
 [ 0  0  0 10 10]]
sobel_x
[[  0   0 -40 -40   0]
 [  0   0 -40 -40   0]
 [  0   0 -40 -40   0]
 [  0   0 -40 -40   0]
 [  0   0 -40 -40   0]]
max_abs_gradient 40
```

Only the vertical intensity jump produces a strong derivative. The same array contract depends on correct [image representation](image-representation.md): channel order, dtype, and padding convention all change the result.

## Caveats

Fixed thresholds break under lighting changes, blur, and sensor shifts. Morphology can remove the small structures that [medical image analysis](medical-image-analysis.md) cares about. Classical steps should be versioned and benchmarked like learned models, not treated as harmless preprocessing.

## References

- [SciPy documentation: `scipy.signal.convolve2d`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.signal.convolve2d.html)
- [SciPy documentation: `scipy.ndimage.sobel`](https://docs.scipy.org/doc/scipy/reference/generated/scipy.ndimage.sobel.html)
