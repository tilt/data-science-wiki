---
title: Fine-Tuning
slug: deep-learning/fine-tuning
description: "Adapting pretrained neural networks by selectively updating parameters on a target task."
area: deep-learning
topics:
  - fine-tuning
level: foundational
status: review
page_type: concept
aliases:
  - fine tuning
prerequisites:
  - index.md
related:
  - transfer-learning.md
  - regularization.md
  - optimizers.md
  - ../10-generative-ai/fine-tuning-versus-rag.md
historical_context: false
last_reviewed: 2026-07-11
---
# Fine-Tuning

Fine-tuning adapts a pretrained model to a target task by updating selected parameters. It is a specific form of [transfer learning](transfer-learning.md): start from a useful representation, then decide which layers or adapters should learn. In generative systems it should be separated from [fine-tuning versus RAG](../10-generative-ai/fine-tuning-versus-rag.md), because retrieval can solve knowledge injection without changing weights.

## Defining math

Full fine-tuning optimizes all parameters:

$$
\theta^*=\arg\min_\theta \frac{1}{n}\sum_i L(f_\theta(x_i),y_i).
$$

Frozen-backbone tuning optimizes only a subset $S$:

$$
\theta_{\bar S}=\theta_{0,\bar S}, \qquad
\theta_S^*=\arg\min_{\theta_S}\frac{1}{n}\sum_i L(f_{\theta_S,\theta_{0,\bar S}}(x_i),y_i).
$$

Adapter methods such as LoRA add a low-rank update to a frozen matrix,

$$
W' = W + \Delta W,\qquad \Delta W = BA,\quad \operatorname{rank}(\Delta W)\le r.
$$

That changes the trainable parameter count and optimizer state, which affects [regularization](regularization.md) and [optimizers](optimizers.md).

## Worked example

```python
import torch
import torch.nn.functional as F

torch.manual_seed(12)
base = torch.nn.Linear(3, 3)
head = torch.nn.Linear(3, 1)
for p in base.parameters():
    p.requires_grad_(False)
X = torch.randn(20, 3)
y = torch.randn(20, 1)
before = base.weight.detach().clone()
opt = torch.optim.SGD(head.parameters(), lr=0.1)
loss = F.mse_loss(head(torch.relu(base(X))), y)
loss.backward()
opt.step()
print("trainable_params", sum(p.numel() for p in list(base.parameters()) + list(head.parameters()) if p.requires_grad))
print("loss", round(loss.item(), 4))
print("base_weight_change", (base.weight.detach() - before).abs().max().item())
```

Observed output:

```text
trainable_params 4
loss 0.7045
base_weight_change 0.0
```

Only the head's weight and bias are trainable, so the base layer is used in the forward pass but receives no update.

## Caveats

Small target datasets make full fine-tuning prone to overfitting and catastrophic forgetting. Learning rates usually need to be lower than scratch training. Evaluation must include target-domain slices because average validation loss can hide regressions in the capabilities the pretrained model already had.

## References

- [Hu et al., 2021, LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)
