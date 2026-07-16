---
title: Vision Transformers
slug: computer-vision/vision-transformers
description: "Transformer encoders over image patches, with positional information and quadratic attention cost."
area: computer-vision
topics:
  - vision-transformers
level: intermediate
status: review
page_type: model
aliases:
  - ViT
prerequisites:
  - index.md
related:
  - image-representation.md
  - cnn-architectures.md
  - self-supervised-visual-learning.md
  - ../06-deep-learning/attention.md
historical_context: false
last_reviewed: 2026-07-11
---

# Vision Transformers

Vision transformers treat image patches as tokens and process them with transformer blocks. They replace the hard-coded locality of [CNN architectures](cnn-architectures.md) with learned attention over patch sequences, using the same core mechanism as [attention](../06-deep-learning/attention.md).

## Defining math

An image $x\in\mathbb R^{C\times H\times W}$ is split into $N=HW/P^2$ patches, flattened, projected, and combined with positional embeddings:

$$
Z_0=[x_1E;\ldots;x_NE]+E_{\mathrm{pos}}.
$$

Here $P$ is the patch width and height, $x_j$ is the flattened vector for patch $j$, $E$ is the learned projection into token space, and $E_{\mathrm{pos}}$ adds position information so the transformer can distinguish where each patch came from. The initial token sequence $Z_0$ is therefore an ordered grid of visual patch embeddings.

Each attention head computes

$$
\mathrm{Attention}(Q,K,V)=\mathrm{softmax}\left(\frac{QK^\top}{\sqrt d}\right)V.
$$

The query, key, and value matrices $Q$, $K$, and $V$ are linear projections of the patch tokens, and $d$ is the key dimension used to scale dot products. Attention turns patch-to-patch similarity into weights, then mixes value vectors from all patches.

Patch size controls spatial granularity: a large patch lowers compute but makes small details harder to represent.

## Worked example

This snippet splits an image tensor into patches, projects them into tokens, and computes one row of token attention weights.

```python
import torch

torch.manual_seed(8)
img = torch.arange(1*1*8*8, dtype=torch.float32).reshape(1,1,8,8)
patches = img.unfold(2,4,4).unfold(3,4,4).contiguous().view(1,1,4,4,4)
patches = patches.permute(0,2,1,3,4).reshape(1,4,16)
W = torch.randn(16,6) * 0.01
tokens = patches @ W
attn = torch.softmax((tokens @ tokens.transpose(-1,-2)) / (6**0.5), dim=-1)
print("patches_shape", tuple(patches.shape), "tokens_shape", tuple(tokens.shape))
print("first_attention_row", torch.round(attn[0,0], decimals=3).tolist())
```

Observed output:

```text
patches_shape (1, 4, 16) tokens_shape (1, 4, 6)
first_attention_row [0.03200000151991844, 0.04399999976158142, 0.38999998569488525, 0.5339999794960022]
```

The 8-by-8 image becomes four patch tokens. Attention then mixes information globally across all patches rather than only through neighboring convolution windows.

## Caveats

Attention cost grows as $O(N^2)$ in the number of patches, so high-resolution [semantic segmentation](semantic-segmentation.md) needs architectural compromises. ViTs also tend to rely on pretraining and strong [data augmentation](data-augmentation.md); weak data regimes can favor CNN inductive bias.

## References

- [An Image is Worth 16x16 Words: Transformers for Image Recognition at Scale](https://arxiv.org/abs/2010.11929)
- [PyTorch documentation: scaled dot product attention](https://docs.pytorch.org/docs/stable/generated/torch.nn.functional.scaled_dot_product_attention.html)

> [!nav]
> **Section** — [Computer Vision](index.md)
>
> [← CNN Architectures](cnn-architectures.md) [Self Supervised Visual Learning →](self-supervised-visual-learning.md)
>
> **Learning path** — [Computer vision](../00-home-and-navigation/learning-paths.md#computer-vision)
>
> [← Detection and Segmentation Metrics](detection-and-segmentation-metrics.md)
