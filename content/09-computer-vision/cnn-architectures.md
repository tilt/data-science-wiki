---
title: CNN Architectures
slug: computer-vision/cnn-architectures
description: "Convolutional backbones built from local filters, downsampling, normalization, and residual blocks."
area: computer-vision
topics:
  - cnn-architectures
level: intermediate
status: complete
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - ../06-deep-learning/residual-connections.md
  - vision-transformers.md
  - image-classification.md
  - object-detection.md
  - ../06-deep-learning/convolutional-neural-networks.md
historical_context: false
last_reviewed: 2026-07-22
---

# CNN Architectures

CNN architectures organize convolution, nonlinearities, normalization, pooling or strided convolution, residual paths, and task heads. They are the standard backbone for [image classification](image-classification.md), [object detection](object-detection.md), and many segmentation models, and are the vision-specific case of [convolutional neural networks](../06-deep-learning/convolutional-neural-networks.md). ResNet and ResNeXt are useful reference architectures for [residual connections](../06-deep-learning/residual-connections.md), skip paths, and grouped convolutional capacity.

## Convolution, stride, and receptive field

For input $X$ and kernel $W$, a 2D convolutional layer computes

$$
Y_{o,u,v}=b_o+\sum_c\sum_i\sum_j W_{o,c,i,j}X_{c,u+i,v+j}.
$$

The output spatial size for one dimension is

$$
\left\lfloor \frac{L+2p-d(k-1)-1}{s}+1 \right\rfloor,
$$

with input size $L$, padding $p$, dilation $d$, kernel size $k$, and stride $s$. Residual blocks learn $y=x+F(x)$, making deep stacks easier to optimize; see [residual connections](../06-deep-learning/residual-connections.md) for a more detailed treatment of skip connections, ResNet, and ResNeXt.

## Worked example

This snippet runs a convolutional layer on an image-shaped tensor and computes the receptive field and effective stride after two layers.

```python
import torch

torch.manual_seed(8)
x = torch.arange(1*1*8*8, dtype=torch.float32).reshape(1,1,8,8)
conv = torch.nn.Conv2d(1, 2, kernel_size=3, stride=2, padding=1, bias=False)
with torch.no_grad():
    conv.weight.fill_(1/9)
y = conv(x)
rf, jump = 1, 1
for k, s in [(3, 2), (3, 2)]:
    rf += (k - 1) * jump
    jump *= s
print("output_shape", tuple(y.shape))
print("top_left_channel0", round(float(y[0,0,0,0]), 3), "center_channel0", round(float(y[0,0,2,2]), 3))
print("two_layer_receptive_field", rf, "effective_stride", jump)
```

Observed output:

```text
output_shape (1, 2, 4, 4)
top_left_channel0 2.0 center_channel0 36.0
two_layer_receptive_field 7 effective_stride 4
```

Stride halves the spatial resolution, while the receptive field grows. That is useful for semantics but risky for small objects and fine [detection and segmentation metrics](detection-and-segmentation-metrics.md).

## Caveats

Architecture comparisons are not meaningful unless resolution, augmentation, training length, and compute budget are matched. CNN locality is efficient, but long-range interactions may require larger receptive fields, attention, or a [vision transformer](vision-transformers.md).

## References

- [PyTorch documentation: `torch.nn.Conv2d`](https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv2d.html)
- [He et al., 2015, Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
- [Xie et al., 2016, Aggregated Residual Transformations for Deep Neural Networks](https://arxiv.org/abs/1611.05431)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← Detection and Segmentation Metrics](detection-and-segmentation-metrics.md) [Vision Transformers →](vision-transformers.md)
