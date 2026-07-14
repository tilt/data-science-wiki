---
title: Distributed Model Training
slug: cloud-and-distributed-systems/distributed-model-training
description: "Data, tensor, pipeline, and sharded training trade-offs for multi-GPU systems."
area: cloud-and-distributed-systems
topics:
  - distributed-model-training
level: advanced
status: review
page_type: model
aliases: []
prerequisites:
  - index.md
related:
  - gpu-systems.md
  - scalability.md
  - reliability.md
  - distributed-data-processing.md
  - storage-and-decoding-bottlenecks.md
  - ../06-deep-learning/distributed-training.md
  - ../06-deep-learning/mixed-precision.md
historical_context: false
last_reviewed: 2026-07-11
---
# Distributed Model Training

Distributed model training uses multiple accelerators because the model, batch, or wall-clock target exceeds one device. The mechanisms differ: data parallelism replicates the model and synchronizes gradients; tensor and pipeline parallelism split computation; fully sharded training shards parameters, gradients, and optimizer state. The cloud design is coupled to [GPU systems](gpu-systems.md) because memory, interconnect, and storage throughput decide which pattern is viable.

## Mechanism

In synchronous data parallelism, each rank computes gradients on a local mini-batch and participates in an all-reduce:

$$
g = \frac{1}{N}\sum_{r=1}^N g_r.
$$

The optimizer step is then identical on each rank. Ring all-reduce moves about $2(N-1)/N$ copies of the gradient tensor per GPU. FSDP changes the memory contract: instead of replicating parameters, gradients, and optimizer state on every rank, it shards them and uses all-gather/reduce-scatter around forward and backward. That connects to [mixed precision](../06-deep-learning/mixed-precision.md), activation checkpointing, and [reliability](reliability.md) because checkpoint format must include sharded optimizer state.

## Worked communication check

For a 7B-parameter model with fp16 gradients, the gradient tensor is about $7\text{B}\cdot2/1024^3=13.04$ GiB. Ring all-reduce moves about $2(N-1)/N$ copies of that tensor per GPU:

| GPUs | transfer per GPU | ideal time on 400 Gbps link |
| ---: | ---: | ---: |
| 2 | 13.04 GiB | 0.280 s |
| 4 | 19.56 GiB | 0.420 s |
| 8 | 22.82 GiB | 0.490 s |
| 16 | 24.45 GiB | 0.525 s |

With 8-way FSDP, the fp16 parameters, fp16 gradients, and Adam state estimate shard to about 13.04 GiB per rank. The ideal communication number excludes software overhead and topology effects, but it shows why "add GPUs" eventually hits communication. If [distributed data processing](distributed-data-processing.md) cannot feed batches and [storage and decoding bottlenecks](storage-and-decoding-bottlenecks.md) leave devices idle, the all-reduce math is not the limiting factor.

## Caveats

Large effective batch sizes can change optimization behavior, so throughput improvements still need validation against loss curves. Stragglers slow synchronous jobs. Checkpoints must be restorable under the same or a deliberately migrated sharding plan. Spot or preemptible capacity requires frequent, tested checkpointing, not optimistic restart scripts.

## References

- [PyTorch DistributedDataParallel](https://docs.pytorch.org/docs/2.13/generated/torch.nn.parallel.DistributedDataParallel.html)
- [PyTorch FullyShardedDataParallel](https://docs.pytorch.org/docs/2.13/fsdp.html)
- [Amazon EC2 P4 instances](https://aws.amazon.com/ec2/instance-types/p4/)
