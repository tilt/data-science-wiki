---
title: Self Supervised Visual Learning
slug: computer-vision/self-supervised-visual-learning
description: "Training visual encoders from unlabeled images using contrastive or predictive objectives."
area: computer-vision
topics:
  - self-supervised-visual-learning
level: foundational
status: review
page_type: concept
aliases:
  - self-supervised vision
prerequisites:
  - index.md
related:
  - feature-extraction.md
  - content-based-image-retrieval.md
  - data-augmentation.md
  - vision-transformers.md
  - ../10-generative-ai/stable-diffusion.md
  - ../06-deep-learning/contrastive-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# Self Supervised Visual Learning

Self-supervised visual learning trains an encoder from images without manual task labels. It is usually used to produce transferable [feature extraction](feature-extraction.md) backbones for [image classification](image-classification.md), [content-based image retrieval](content-based-image-retrieval.md), segmentation, detection, and low-label domains such as [medical image analysis](medical-image-analysis.md).

This page is about representation learning, not image generation. It still matters for generative systems: text-to-image models such as [Stable Diffusion](../10-generative-ai/stable-diffusion.md) depend on visual and vision-language representation learning through autoencoders, image-text encoders, and perceptual feature spaces.

## Defining math

Contrastive methods make two augmented views of the same image close and other images far apart. For normalized embeddings $z_i$ and positive index $p(i)$, the NT-Xent loss is

$$
L_i=-\log
\frac{\exp(z_i^\top z_{p(i)}/\tau)}
\sum_{j\ne i}\exp(z_i^\top z_j/\tau)}.
$$

The [data augmentation](data-augmentation.md) policy is part of the objective: it defines which changes should preserve identity.

Other self-supervised vision methods avoid explicit negatives or reconstruct masked content:

$$
L_{MAE}=\sum_{m\in M}\lVert \hat x_m-x_m\rVert_2^2,
$$

where $M$ is the set of masked image patches. JEPA-style image methods predict target-region features instead of pixels:

$$
L_{JEPA}=\sum_{m\in M}\lVert p_\phi(f_\theta(x_{\bar M}),m)-\operatorname{sg}(g_{\bar\theta}(x)_m)\rVert_2^2.
$$

The difference matters. Contrastive learning defines invariances through augmentation. Masked autoencoding defines a reconstruction problem over missing patches. Self-distillation and JEPA-style methods use target networks to avoid needing labels or explicit negative pairs.

## Method Families

| family | representative idea | what it is good for | main risk |
|---|---|---|---|
| Contrastive learning | Pull augmented views together and push other images apart. | Retrieval, nearest-neighbor search, general image embeddings. | Augmentation shortcuts and dependence on negative-pair construction. |
| Non-contrastive self-distillation | Predict a stop-gradient or momentum target representation from another view. | Strong backbones without explicit negatives. | Collapse unless the architecture and normalization prevent trivial constant embeddings. |
| Masked autoencoding | Hide image patches and reconstruct pixels or patch targets. | Scalable [vision transformers](vision-transformers.md) and low-label transfer. | Reconstruction may overemphasize texture if the task is too local. |
| Self-supervised ViT features | Use self-distillation or masking with transformer patch tokens. | Dense object-like features, segmentation transfer, k-nearest-neighbor classification. | Patch size, crop policy, and dataset bias strongly shape the representation. |
| Vision-language contrastive pretraining | Match image embeddings to paired text embeddings. | Zero-shot classification, image-text retrieval, promptable visual concepts. | Noisy captions and web data bias can become model behavior. |
| JEPA-style latent prediction | Predict target-region representations from context regions. | Semantic image features without pixel reconstruction or hand-crafted negative pairs. | The target feature space and masking strategy define what can be learned. |

Use self-supervised pretraining when labels are scarce, categories change, or downstream tasks share visual structure. Use supervised pretraining when the target label space is stable and labeled data is abundant. In practice, many visual foundation models mix these ideas with weak labels, captions, filtering, or synthetic data.

## Worked example

```python
import torch
import torch.nn.functional as F

z = torch.tensor([[1.,0.],[.9,.1],[0.,1.],[.1,.9]])
z = F.normalize(z, dim=1)
sim = z @ z.T
tau = .2
logits = sim / tau
pos = torch.tensor([1,0,3,2])
loss = F.cross_entropy(logits - torch.eye(4) * 1e9, pos)
print("similarity_matrix")
print(torch.round(sim, decimals=3).numpy())
print("nt_xent_loss", round(float(loss), 3))
```

Observed output:

```text
similarity_matrix
[[1.    0.994 0.    0.11 ]
 [0.994 1.    0.11  0.22 ]
 [0.    0.11  1.    0.994]
 [0.11  0.22  0.994 1.   ]]
nt_xent_loss 0.026
```

The intended positive pairs have cosine similarity 0.994, while mismatched pairs are much lower, between 0.0 and 0.22. Because the positives already dominate the softmax at $\tau=0.2$, the NT-Xent loss is only 0.026.

## Caveats

Pretraining loss is not a deployment metric. A representation can group images by scanner, watermark, crop style, or background. Evaluate frozen probes, fine-tuning, and nearest neighbors across [domain shift](domain-shift.md) slices before trusting the encoder.

## References

- [A Simple Framework for Contrastive Learning of Visual Representations](https://arxiv.org/abs/2002.05709)
- [Bootstrap Your Own Latent: A New Approach to Self-Supervised Learning](https://arxiv.org/abs/2006.07733)
- [Emerging Properties in Self-Supervised Vision Transformers](https://arxiv.org/abs/2104.14294)
- [Masked Autoencoders Are Scalable Vision Learners](https://arxiv.org/abs/2111.06377)
- [Self-Supervised Learning from Images with a Joint-Embedding Predictive Architecture](https://arxiv.org/abs/2301.08243)
- [Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)
- [Deep Learning, Chapter 15: Representation Learning](https://www.deeplearningbook.org/contents/representation.html)
