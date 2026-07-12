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
  - ../06-deep-learning/contrastive-learning.md
historical_context: false
last_reviewed: 2026-07-11
---
# Self Supervised Visual Learning

Self-supervised visual learning trains an encoder from images without manual task labels. It is usually used to produce transferable [feature extraction](feature-extraction.md) backbones for [image classification](image-classification.md), [content-based image retrieval](content-based-image-retrieval.md), or dense tasks with limited labels.

## Defining math

Contrastive methods make two augmented views of the same image close and other images far apart. For normalized embeddings $z_i$ and positive index $p(i)$, the NT-Xent loss is

$$
L_i=-\log
\frac{\exp(z_i^\top z_{p(i)}/\tau)}
\sum_{j\ne i}\exp(z_i^\top z_j/\tau)}.
$$

The [data augmentation](data-augmentation.md) policy is part of the objective: it defines which changes should preserve identity.

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
- [Deep Learning, Chapter 15: Representation Learning](https://www.deeplearningbook.org/contents/representation.html)
