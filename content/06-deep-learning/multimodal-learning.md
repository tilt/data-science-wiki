---
title: Multimodal Learning
slug: deep-learning/multimodal-learning
description: "Learning shared or interacting representations across data modalities."
area: deep-learning
topics:
  - multimodal-learning
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - attention.md
  - contrastive-learning.md
  - representation-learning.md
  - ../11-generative-ai/multimodal-models.md
  - ../09-computer-vision/image-representation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Multimodal Learning

Multimodal learning combines signals such as text, images, audio, video, tables, and actions. The model can align modalities in a shared embedding space, fuse them with [attention](attention.md), or condition generation in one modality on another. It connects deep [representation learning](representation-learning.md) with applied [multimodal models](../11-generative-ai/multimodal-models.md) and visual [image representations](../09-computer-vision/image-representation.md).

## Defining math

A dual-encoder contrastive setup maps paired modalities to normalized vectors:

$$
z_i^{(a)}=\frac{f_a(x_i^{(a)})}{\lVert f_a(x_i^{(a)})\rVert}, \qquad
z_i^{(b)}=\frac{f_b(x_i^{(b)})}{\lVert f_b(x_i^{(b)})\rVert}.
$$

The similarity matrix is

$$
S_{ij}=\frac{z_i^{(a)\top}z_j^{(b)}}{\tau}.
$$

Training often uses cross-entropy in both directions so matched pairs have high diagonal similarity. This is the same pressure as [contrastive learning](contrastive-learning.md), but positives come from paired modalities.

## Worked example

The example constructs paired image and text embeddings with a deliberately shuffled text order, then checks whether similarity recovers the intended cross-modal matches.

```python
import torch
import torch.nn.functional as F

torch.manual_seed(13)
image = F.normalize(torch.randn(3, 4), dim=1)
text = image[[0, 2, 1]] + 0.05 * torch.randn(3, 4)
text = F.normalize(text, dim=1)
logits = image @ text.T / 0.07
probs = logits.softmax(1)
print("similarity")
print(torch.round(image @ text.T, decimals=3).tolist())
print("image_to_text_match", probs.argmax(1).tolist())
```

Observed output:

```text
similarity
[[0.9980000257492065, -0.2709999978542328, 0.45399999618530273], [0.42800000309944153, 0.4569999873638153, 0.9980000257492065], [-0.3409999907016754, 0.9900000095367432, 0.29899999499320984]]
image_to_text_match [0, 2, 1]
```

The best text match for each image recovers the constructed pairing. The similarity matrix is the object optimized in CLIP-style training.

## Caveats

Modality imbalance is common: a model may ignore audio if text alone solves the loss, or overfit captions that leak labels. Alignment quality is not the same as grounded reasoning. Missing modalities, timestamp drift, and different sampling rates must be modeled explicitly.

## References

- [Radford et al., 2021, Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
- [Vaswani et al., 2017, Attention Is All You Need](https://arxiv.org/abs/1706.03762)
