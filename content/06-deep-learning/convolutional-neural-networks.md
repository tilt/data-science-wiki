---
title: Convolutional Neural Networks
slug: deep-learning/convolutional-neural-networks
description: "Neural networks that share local filters across spatial positions."
area: deep-learning
topics:
  - convolutional-neural-networks
level: intermediate
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - normalization.md
  - backpropagation.md
  - initialization.md
  - ../09-computer-vision/cnn-architectures.md
historical_context: false
last_reviewed: 2026-07-11
---

# Convolutional Neural Networks

A convolutional neural network uses small learned kernels across many spatial locations. Instead of learning a separate weight for every input pixel and output unit, a CNN shares each filter over the grid. This is why CNNs remain central to [computer-vision architectures](../09-computer-vision/cnn-architectures.md), often combined with [normalization](normalization.md), residual connections, and careful [initialization](initialization.md).

## Defining math

For input channel $c$, output channel $k$, and kernel offsets $(u,v)$,

$$
y_{k,i,j}=b_k+\sum_c\sum_u\sum_v W_{k,c,u,v}x_{c,i+u,j+v}.
$$

Stride controls how far the kernel moves; padding controls boundary size. With kernel size $k_\ell$ and stride $s_i$, the receptive field after layer $\ell$ grows as

$$
r_\ell=r_{\ell-1}+(k_\ell-1)\prod_{i<\ell}s_i.
$$

Gradients through convolution are still handled by [backpropagation](backpropagation.md); the key difference is that shared weights accumulate gradient contributions from every spatial position where the filter was used.

## Worked example

This snippet applies a small convolutional filter to a toy image and reports the output alongside the receptive field after two $3\times3$ layers.

```python
import torch
import torch.nn.functional as F

x = torch.arange(16, dtype=torch.float32).view(1, 1, 4, 4)
kernel = torch.tensor([[[[1., 0.], [0., -1.]]]])
y = F.conv2d(x, kernel)
print("input")
print(x.view(4, 4).int().tolist())
print("conv_output")
print(y.view(3, 3).int().tolist())
print("receptive_field_two_3x3_layers", 5)
```

Observed output:

```text
input
[[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]]
conv_output
[[-5, -5, -5], [-5, -5, -5], [-5, -5, -5]]
receptive_field_two_3x3_layers 5
```

The same $2\times2$ filter is applied at nine locations, producing identical local contrast on this linear ramp. Two stride-1 $3\times3$ layers see a $5\times5$ patch, not just two independent local windows.

## Caveats

Translation equivariance is useful only when the label should be insensitive to location. Aggressive pooling can discard small objects, and padding can introduce boundary artifacts. Batch normalization statistics also become brittle when image batches are tiny or distribution-shifted.

## References

- [Goodfellow, Bengio, and Courville, Deep Learning, Chapter 9: Convolutional Networks](https://www.deeplearningbook.org/contents/convnets.html)
- [He et al., 2015, Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)
