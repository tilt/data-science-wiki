---
title: Storage and Decoding Bottlenecks
slug: cloud-and-distributed-systems/storage-and-decoding-bottlenecks
description: "How reads, decompression, tokenization, and decode stages starve accelerators and services."
area: cloud-and-distributed-systems
topics:
  - storage-and-decoding-bottlenecks
level: advanced
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - gpu-systems.md
  - managed-storage.md
  - distributed-data-processing.md
  - distributed-model-training.md
  - scalability.md
  - ../06-deep-learning/pytorch.md
  - ../10-generative-ai/tokenization.md
historical_context: false
last_reviewed: 2026-07-11
---
# Storage and Decoding Bottlenecks

Storage and decoding bottlenecks happen when data reaches the model slower than the model can consume it. The bottleneck may be object-store listing, small-file reads, network bandwidth, decompression, image/video decode, tokenization, Python collation, or synchronous logging. In [GPU systems](gpu-systems.md), the symptom is often low device utilization with high input queue time.

## Mechanism

The input path is a pipeline:

```mermaid
flowchart LR
  List[List objects] --> Read[Read bytes]
  Read --> Decode[Decompress or decode]
  Decode --> Parse[Parse or tokenize]
  Parse --> Batch[Batch or collate]
  Batch --> Copy[Host-to-device copy]
  Copy --> Kernel[Accelerator kernel]
```

Throughput is bounded by the slowest stage. Adding more [distributed model training](distributed-model-training.md) workers can make the problem worse if every worker lists the same [managed storage](managed-storage.md) prefix or decodes on the same small CPU pool. [Distributed data processing](distributed-data-processing.md) can reduce the problem by compacting files and precomputing expensive transforms.

## Executed capacity check

This deterministic check compresses about 4.9 MiB of generated text, then derives storage and decoder capacity from fixed scenario inputs. It avoids wall-clock timing: `3200` MiB/s is the raw-equivalent demand to keep the downstream stage fed, and `800` MiB/s is the assumed per-worker decode budget for sizing.

```python
import math, random, zlib

random.seed(14)
text = (" ".join(str(random.randrange(1000000)) for _ in range(750000))).encode()
compressed = zlib.compress(text, 6)
raw_mib = len(text) / 1024**2
compressed_mib = len(compressed) / 1024**2
shards_per_epoch = 2000
raw_epoch_gib = raw_mib * shards_per_epoch / 1024
compressed_epoch_gib = compressed_mib * shards_per_epoch / 1024
raw_equivalent_mib_s = 3200
per_worker_decode_mib_s = 800
workers = math.ceil(raw_equivalent_mib_s / per_worker_decode_mib_s)
compressed_storage_mib_s = raw_equivalent_mib_s * compressed_mib / raw_mib
print(f"raw_size_mib {raw_mib:.1f}")
print(f"compressed_size_mib {compressed_mib:.1f}")
print(f"compressed_read_reduction {raw_mib/compressed_mib:.2f}x")
print(f"epoch_raw_gib_for_{shards_per_epoch}_shards {raw_epoch_gib:.1f}")
print(f"epoch_compressed_gib_for_{shards_per_epoch}_shards {compressed_epoch_gib:.1f}")
print(f"decoder_workers_for_{raw_equivalent_mib_s}_mib_s_at_{per_worker_decode_mib_s}_each {workers}")
print(f"compressed_storage_mib_s_at_{raw_equivalent_mib_s}_raw_equivalent {compressed_storage_mib_s:.1f}")
```

Observed output:

```text
raw_size_mib 4.9
compressed_size_mib 2.3
compressed_read_reduction 2.11x
epoch_raw_gib_for_2000_shards 9.6
epoch_compressed_gib_for_2000_shards 4.6
decoder_workers_for_3200_mib_s_at_800_each 4
compressed_storage_mib_s_at_3200_raw_equivalent 1519.5
```

Compression cuts bytes read by about 2.1x here, so a 3200 MiB/s raw-equivalent input stream would read about 1519.5 MiB/s from storage. The decoder still needs enough CPU or accelerator capacity to produce the raw-equivalent stream; with an 800 MiB/s per-worker budget, that means four workers before any safety margin. For real image, video, or tokenization workloads, the right answer may be bigger shards, pre-tokenized data, NVIDIA DALI, more `DataLoader` workers, pinned memory, or moving preprocessing into a separate [scalability](scalability.md) tier.

## Caveats

Warm-cache benchmarks lie. Measure cold reads, list time, decode time, queue depth, host-to-device copy time, and GPU utilization together. Increasing batch size can hide input latency but raise user-visible latency or memory pressure. Preprocessing everything saves serving CPU but can lock in tokenizer, resolution, or schema choices that later models need to change.

## References

- [PyTorch data loading documentation](https://docs.pytorch.org/docs/2.13/data.html)
- [NVIDIA DALI image decoder](https://docs.nvidia.com/deeplearning/dali/user-guide/docs/operations/nvidia.dali.fn.decoders.image.html)
- [PyTorch CUDA semantics: pinned memory and CUDA behavior](https://docs.pytorch.org/docs/2.13/notes/cuda.html)
