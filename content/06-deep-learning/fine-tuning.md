---
title: Fine-Tuning
slug: deep-learning/fine-tuning
description: "Adapting pretrained neural networks by selectively updating parameters on a target task."
area: deep-learning
topics:
  - fine-tuning
level: foundational
status: complete
page_type: concept
aliases:
  - fine tuning
prerequisites:
  - index.md
related:
  - transfer-learning.md
  - regularization.md
  - optimizers.md
  - ../11-generative-ai/fine-tuning-versus-rag.md
historical_context: false
last_reviewed: 2026-07-22
---

# Fine-Tuning

Fine-tuning adapts a pretrained model to a target task by updating selected parameters. It is a specific form of [transfer learning](transfer-learning.md): start from a useful representation, then decide which layers or adapters should learn. In generative systems it should be separated from [fine-tuning versus RAG](../11-generative-ai/fine-tuning-versus-rag.md), because retrieval can solve knowledge injection without changing weights.

## Full, partial, and low-rank tuning

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

For a dense weight matrix $W\in\mathbb R^{d_{\mathrm{out}}\times d_{\mathrm{in}}}$, full fine-tuning trains $d_{\mathrm{out}}d_{\mathrm{in}}$ parameters for that matrix. LoRA freezes $W$ and trains two skinny matrices:

$$
B\in\mathbb R^{d_{\mathrm{out}}\times r},\qquad
A\in\mathbb R^{r\times d_{\mathrm{in}}}.
$$

The trainable parameter count becomes

$$
r(d_{\mathrm{out}}+d_{\mathrm{in}}),
$$

which is much smaller when the rank $r$ is small. For a $4096\times4096$ projection, full fine-tuning trains $16{,}777{,}216$ parameters. With $r=8$, LoRA trains $8(4096+4096)=65{,}536$ parameters for the adapter, about $0.39\%$ of the full matrix.

## LoRA Footprint

LoRA achieves a small footprint because the large pretrained matrix stays frozen. Only the low-rank adapter weights and their [optimizer](optimizers.md) state need to be trained, checkpointed, and swapped for a task. At inference time, the adapter can be applied as $Wx + BAx$, or the low-rank update can be merged into $W$ for deployment.

This has three practical consequences:

| Aspect             | Full fine-tuning                                       | LoRA-style adapter tuning                   |
| ------------------ | ------------------------------------------------------ | ------------------------------------------- |
| Trainable weights  | all selected base weights                              | only low-rank adapter matrices              |
| Optimizer state    | large, because Adam-style state tracks trained weights | small, because state tracks adapter weights |
| Task storage       | often a full model copy or large delta                 | compact adapter checkpoint                  |
| Base model sharing | each task may need separate weights                    | many adapters can share one frozen base     |

The small footprint is not magic compression of the original model. It is a modeling assumption: the task-specific update can be well approximated by a low-rank matrix. If the target task needs broad changes across many directions, too small a rank can underfit.

## Worked example

This snippet freezes a base network, trains only a small head, and checks that the base weights do not change during the update.

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

The frozen base maps each 3-dimensional input to 3 hidden features, but its weight and bias have `requires_grad=False`, so the optimizer never sees those parameters. Only the 3 head weights plus 1 head bias are trainable, giving `trainable_params 4`. The `base_weight_change` is exactly `0.0` because gradients flow through the base to train the head, but no update is applied to the base weights.

## Caveats

Small target datasets make full fine-tuning prone to overfitting and catastrophic forgetting. Learning rates usually need to be lower than scratch training. Evaluation must include target-domain slices because average validation loss can hide regressions in the capabilities the pretrained model already had.

## References

- [Hu et al., 2021, LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Transfer Learning](transfer-learning.md) [Multimodal Learning →](multimodal-learning.md)
