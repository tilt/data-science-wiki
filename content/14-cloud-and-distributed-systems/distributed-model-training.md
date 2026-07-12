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

## Executed communication check

For a 7B-parameter model with fp16 gradients, this calculation estimates ideal ring all-reduce transfer per GPU over a 400 Gbps link.

```python
params = 7_000_000_000
grad_gib = params * 2 / 1024**3
for n in [2, 4, 8, 16]:
    transfer_gib = 2 * (n - 1) / n * grad_gib
    ideal_s = transfer_gib * 1024**3 / (400e9 / 8)
    print(f"{n}_gpu_ring_allreduce_transfer_gib_per_gpu {transfer_gib:.2f} ideal_400gbps_seconds {ideal_s:.3f}")
print(f"fsdp_8way_param_grad_adam_gib_per_rank {(params*(2+2+4+4+4)/8)/1024**3:.2f}")
```

Observed output:

```text
2_gpu_ring_allreduce_transfer_gib_per_gpu 13.04 ideal_400gbps_seconds 0.280
4_gpu_ring_allreduce_transfer_gib_per_gpu 19.56 ideal_400gbps_seconds 0.420
8_gpu_ring_allreduce_transfer_gib_per_gpu 22.82 ideal_400gbps_seconds 0.490
16_gpu_ring_allreduce_transfer_gib_per_gpu 24.45 ideal_400gbps_seconds 0.525
fsdp_8way_param_grad_adam_gib_per_rank 13.04
```

The ideal number excludes software overhead and topology effects, but it shows why "add GPUs" eventually hits communication. If [distributed data processing](distributed-data-processing.md) cannot feed batches and [storage and decoding bottlenecks](storage-and-decoding-bottlenecks.md) leave devices idle, the all-reduce math is not the limiting factor.

## Caveats

Large effective batch sizes can change optimization behavior, so throughput improvements still need validation against loss curves. Stragglers slow synchronous jobs. Checkpoints must be restorable under the same or a deliberately migrated sharding plan. Spot or preemptible capacity requires frequent, tested checkpointing, not optimistic restart scripts.

## References

- [PyTorch DistributedDataParallel](https://docs.pytorch.org/docs/2.13/generated/torch.nn.parallel.DistributedDataParallel.html)
- [PyTorch FullyShardedDataParallel](https://docs.pytorch.org/docs/2.13/fsdp.html)
- [Amazon EC2 P4 instances](https://aws.amazon.com/ec2/instance-types/p4/)
