---
title: Distributed Training
slug: deep-learning/distributed-training
description: "Splitting neural network training across devices while preserving a coherent optimization step."
area: deep-learning
topics:
  - distributed-training
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - mixed-precision.md
  - optimizers.md
  - backpropagation.md
  - ../14-cloud-and-distributed-systems/distributed-model-training.md
historical_context: false
last_reviewed: 2026-07-11
---
# Distributed Training

Distributed training uses multiple devices or machines to reduce wall-clock time or fit larger models. Data parallelism is the default pattern: each worker runs forward and [backpropagation](backpropagation.md) on a shard of the batch, gradients are averaged, then every replica applies the same [optimizer](optimizers.md) step. Systems concerns connect this page to broader [distributed model training](../14-cloud-and-distributed-systems/distributed-model-training.md).

## Defining mechanism

For $N$ workers with local gradients $g_i$, synchronous data parallelism computes

$$
g=\frac{1}{N}\sum_{i=1}^N g_i,
\qquad
\theta_{t+1}=\theta_t-\eta g.
$$

The all-reduce operation both sums and distributes the gradient average. Model parallelism instead partitions parameters or activations; pipeline parallelism partitions layers and schedules microbatches. [Mixed precision](mixed-precision.md) is often combined with all three to reduce bandwidth and memory.

## Worked example

```python
import numpy as np

w = np.array([1.0, -1.0])
g0 = np.array([0.6, -0.2])
g1 = np.array([0.2, 0.4])
lr = 0.1
local0 = w - lr * g0
averaged = w - lr * ((g0 + g1) / 2)
print("worker0_local_step", np.round(local0, 3).tolist())
print("allreduced_step", np.round(averaged, 3).tolist())
print("gradient_mean", np.round((g0 + g1) / 2, 3).tolist())
```

Observed output:

```text
worker0_local_step [0.94, -0.98]
allreduced_step [0.96, -1.01]
gradient_mean [0.4, 0.1]
```

Worker 0's local gradient would move the second weight upward. After all-reduce averaging, the second coordinate moves downward because worker 1's gradient changes the global mean.

## Caveats

Scaling is not automatic. Larger global batches can require learning-rate warmup, altered schedules, and more regularization. Stragglers, nondeterministic kernels, communication overlap, and checkpoint consistency all affect reproducibility. For very large models, optimizer state can dominate memory.

## References

- [PyTorch documentation: DistributedDataParallel](https://docs.pytorch.org/docs/2.7/generated/torch.nn.parallel.DistributedDataParallel.html)
- [Goyal et al., 2017, Accurate, Large Minibatch SGD: Training ImageNet in 1 Hour](https://arxiv.org/abs/1706.02677)
