---
title: 3D Convolutional Networks
slug: video-understanding/3d-convolutional-networks
description: "Convolutional video models that learn local filters over time, height, and width."
area: video-understanding
topics:
  - 3d-convolutional-networks
level: intermediate
status: review
page_type: model
aliases:
  - 3D CNNs
prerequisites:
  - index.md
related:
  - two-stream-models.md
  - video-transformers.md
  - spatial-and-temporal-modelling.md
  - video-representation.md
historical_context: false
last_reviewed: 2026-07-11
---

# 3D Convolutional Networks

3D convolutional networks replace image kernels with kernels over $(T,H,W)$. A 2D CNN sees one frame at a time; a 3D CNN can fire on a short motion pattern such as "hand moves upward while the torso stays still." They are a direct architecture for [spatial and temporal modelling](spatial-and-temporal-modelling.md), an alternative to [two-stream models](two-stream-models.md), and a useful baseline before reaching for [video transformers](video-transformers.md).

## Defining mechanism

For input $X\in\mathbb R^{C_{in}\times T\times H\times W}$, a 3D convolution computes

$$
Y_{c_o,t,i,j} = b_{c_o} + \sum_{c_i}\sum_{\tau,u,v}
W_{c_o,c_i,\tau,u,v}X_{c_i,t+\tau,i+u,j+v}.
$$

The temporal kernel size controls the motion horizon visible to one layer. Stacking layers grows the temporal receptive field, while strides trade temporal resolution for compute. This is why 3D CNN features are often pooled into a compact [video representation](video-representation.md) for downstream recognition or retrieval.

## Worked example

This snippet applies a 3D convolution over time, height, and width and checks that the output shape follows the manual convolution-size formula.

```python
import torch

torch.manual_seed(4)
conv = torch.nn.Conv3d(1, 2, kernel_size=(3,3,3), stride=(2,1,1), padding=(1,1,1), bias=False)
x = torch.arange(1*1*8*6*6, dtype=torch.float32).reshape(1,1,8,6,6) / 100
with torch.no_grad():
    conv.weight.fill_(1/27)
y = conv(x)
manual = [(8+2*1-3)//2+1, (6+2*1-3)//1+1, (6+2*1-3)//1+1]
print("output_shape", list(y.shape), "manual_DHW", manual)
print("first_channel_t0_patch", torch.round(y[0,0,0,:2,:3], decimals=3).tolist())
```

Observed output:

```text
output_shape [1, 2, 4, 6, 6] manual_DHW [4, 6, 6]
first_channel_t0_patch [[0.06400000303983688, 0.09799999743700027, 0.10199999809265137], [0.10899999737739563, 0.16699999570846558, 0.17299999296665192]]
```

The temporal stride halves the eight-frame clip to four temporal positions. The kernel is an average here, but learned kernels specialize into appearance-motion patterns.

The snippet is an API example as much as a calculation: PyTorch `Conv3d` expects input shaped as batch, channels, time/depth, height, width. The manual depth-height-width calculation uses the standard convolution-size formula, so the output shape `[1, 2, 4, 6, 6]` means two learned filters were applied at four temporal positions over the original spatial grid. The first patch values are smaller near the boundary because padding inserts zeros around the clip.

## Caveats

3D kernels are parameter- and memory-heavy because activations retain time as well as space. Short clips can miss long-range context, while aggressive temporal stride hurts [temporal localization](temporal-localization.md). Pretraining and careful sampling matter because video labels are expensive and adjacent frames are highly redundant.

## References

- [Tran et al., 2015, Learning Spatiotemporal Features with 3D Convolutional Networks](https://arxiv.org/abs/1412.0767)
- [Carreira and Zisserman, 2017, Quo Vadis, Action Recognition?](https://arxiv.org/abs/1705.07750)
- [PyTorch documentation: Conv3d](https://docs.pytorch.org/docs/stable/generated/torch.nn.Conv3d.html)

> **Section — [Video Understanding](index.md):** ← [Optical Flow](optical-flow.md) · [Two-Stream Models](two-stream-models.md) →
