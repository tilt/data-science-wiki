---
title: GPU Systems
slug: cloud-and-distributed-systems/gpu-systems
description: "GPU memory, bandwidth, interconnect, and precision constraints for ML systems."
area: cloud-and-distributed-systems
topics:
  - gpu-systems
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - distributed-model-training.md
  - storage-and-decoding-bottlenecks.md
  - managed-compute.md
  - cost-management.md
  - ../06-deep-learning/pytorch.md
  - ../06-deep-learning/mixed-precision.md
historical_context: false
last_reviewed: 2026-07-11
---
# GPU Systems

GPU systems are useful when a workload has enough tensor arithmetic to amortize data movement. For ML, the hard limits are usually not "has a GPU" but HBM capacity, HBM bandwidth, PCIe or NVLink movement, kernel launch overhead, and whether the model can use lower precision safely through [mixed precision](../06-deep-learning/mixed-precision.md). A deployment choice in [managed compute](managed-compute.md) therefore has to name the accelerator type, memory size, interconnect, driver stack, and serving batch shape.

## Mechanism

The operating model is a roofline constraint:

$$
\text{achievable FLOP/s}\le \min(\text{peak FLOP/s},\ \text{memory bandwidth}\times\text{arithmetic intensity}).
$$

Arithmetic intensity is FLOPs per byte moved from memory. A transformer prefill matmul can be compute-heavy; token-by-token decoding often becomes bandwidth- and KV-cache-bound, which connects directly to [storage and decoding bottlenecks](storage-and-decoding-bottlenecks.md) at the input side and [distributed model training](distributed-model-training.md) at the synchronization side. PyTorch also reserves memory through its CUDA caching allocator, so `nvidia-smi` can show reserved memory that is not currently occupied by tensors; inspect `memory_allocated()` and `memory_reserved()` when debugging [PyTorch](../06-deep-learning/pytorch.md) jobs.

## Executed capacity check

This snippet computes the weight footprint of a 7B-parameter model and a simple Adam training-state estimate. It also compares arithmetic intensity to an NVIDIA A100 80GB SXM roofline using NVIDIA's published 312 TFLOP/s FP16 Tensor Core peak and 2,039 GB/s memory bandwidth.

```python
params = 7_000_000_000
for name, b in [("fp32", 4), ("fp16/bf16", 2), ("int8", 1)]:
    print(f"{name}_weights_gib {params*b/1024**3:.2f}")
adam_bytes_per_param = 2 + 2 + 4 + 4 + 4
adam_total = params * adam_bytes_per_param / 1024**3
print(f"adam_training_state_gib {adam_total:.2f}")
print(f"fsdp_8way_state_gib_per_rank {adam_total/8:.2f}")
kv_bytes = 32 * 2 * 4096 * 2048 * 2 / 1024**3
print(f"kv_cache_1req_2048tok_gib {kv_bytes:.2f}")
threshold = 312e12 / (2039e9)
print(f"a100_80gb_sxm_fp16_roofline_threshold_flop_per_byte {threshold:.1f}")
for ai in [32, 256]:
    print(f"arithmetic_intensity_{ai}", "memory_bound" if ai < threshold else "compute_bound")
```

Observed output:

```text
fp32_weights_gib 26.08
fp16/bf16_weights_gib 13.04
int8_weights_gib 6.52
adam_training_state_gib 104.31
fsdp_8way_state_gib_per_rank 13.04
kv_cache_1req_2048tok_gib 1.00
a100_80gb_sxm_fp16_roofline_threshold_flop_per_byte 153.0
arithmetic_intensity_32 memory_bound
arithmetic_intensity_256 compute_bound
```

A 7B model's fp16 weights fit on one 40GB GPU, but a naive Adam training state does not fit even on 80GB without sharding, offload, or recomputation. During inference, KV cache can dominate capacity: this 32-layer, hidden-size-4096, 2048-token, fp16 example uses about 1 GiB per active request before batching overhead.

## Caveats

GPU utilization can be high while user latency is bad if batching hides queueing delay. It can also be low for the wrong reason: CPU tokenization, object-store reads, or decompression may starve kernels before compute saturates. In cluster scheduling, a request for "one GPU" is underspecified; A10G, L4, A100 40GB, A100 80GB, and H100 instances expose very different memory and interconnect behavior, which changes both [cost management](cost-management.md) and failure handling.

## References

- [NVIDIA A100 Tensor Core GPU specifications](https://www.nvidia.com/en-us/data-center/a100/)
- [Amazon EC2 P4 instances](https://aws.amazon.com/ec2/instance-types/p4/)
- [PyTorch CUDA semantics: memory management](https://docs.pytorch.org/docs/2.13/notes/cuda.html)
