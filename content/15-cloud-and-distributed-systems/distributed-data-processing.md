---
title: Distributed Data Processing
slug: cloud-and-distributed-systems/distributed-data-processing
description: "Partitioned execution, shuffles, skew, and fault tolerance in large data jobs."
area: cloud-and-distributed-systems
topics:
  - distributed-data-processing
level: advanced
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - scalability.md
  - reliability.md
  - managed-storage.md
  - distributed-model-training.md
  - storage-and-decoding-bottlenecks.md
  - ../13-data-engineering/data-pipelines.md
  - ../13-data-engineering/feature-pipelines.md
historical_context: false
last_reviewed: 2026-07-23
---

# Distributed Data Processing

Distributed data processing splits a dataset into partitions, runs tasks near those partitions, and coordinates the shuffle steps that move records by key. It is the systems layer behind many [data pipelines](../13-data-engineering/data-pipelines.md), feature builds, backfills, and offline evaluation jobs. The design question is not just "can it run on a cluster?" but "which stage repartitions data, which key can become hot, and what side effects are safe to retry?"

## Jobs as DAGs

A Spark-style batch job is a DAG:

```mermaid
flowchart LR
  Read[Read partitions] --> Narrow[Narrow map or filter]
  Narrow --> Shuffle[Wide shuffle by key]
  Shuffle --> Reduce[Reduce or join]
  Reduce --> Write[Write partitions]
```

Narrow stages keep each record in its original partition. Wide stages, such as `groupByKey`, joins, and global sorts, repartition records across workers and create network, disk, and skew risk. [Managed storage](managed-storage.md) matters because object stores are good at large immutable objects but poor at millions of tiny files. [Reliability](reliability.md) comes from deterministic recomputation and idempotent writes, not from assuming tasks will run once.

## Executed skew check

This local calculation simulates 100,000 events for one hot key plus 60,000 ordinary keys across 16 partitions. Salting the hot key into 32 subkeys reduces the maximum partition load.

```python
import hashlib, statistics

def bucket(key, parts):
    return int(hashlib.md5(key.encode()).hexdigest(), 16) % parts

keys = ["hot"] * 100_000 + [f"user_{i}" for i in range(60_000)]
parts = 16
unsalted = [0] * parts
for k in keys:
    unsalted[bucket(k, parts)] += 1
salted = [0] * parts
for i, k in enumerate(keys):
    salted[bucket(f"hot#{i%32}" if k == "hot" else k, parts)] += 1
for label, vals in [("unsalted", unsalted), ("salted_hot_32way", salted)]:
    print(f"{label}_max_rows {max(vals)} median_rows {statistics.median(vals):.0f} skew_ratio {max(vals)/statistics.median(vals):.2f}")
print(f"max_partition_improvement {max(unsalted)/max(salted):.2f}x")
```

Observed output:

```text
unsalted_max_rows 103741 median_rows 3758 skew_ratio 27.61
salted_hot_32way_max_rows 22420 median_rows 10020 skew_ratio 2.24
max_partition_improvement 4.63x
```

The hot key makes one task about 28 times the median task. Adding salt does not remove the need to combine results later, but it changes a straggler-dominated shuffle into a tractable one. The same thinking applies before [distributed model training](distributed-model-training.md): slow input partitions can starve GPUs even when the training loop is correct.

## Caveats

More partitions are not always better; scheduler overhead and small-file writes can dominate. Repartitioning after every transformation wastes network and storage bandwidth. Retried tasks must not send duplicate emails, double-count payments, or overwrite a committed partition without a transaction or staging protocol.

## References

- [Apache Spark RDD programming guide](https://spark.apache.org/docs/latest/rdd-programming-guide.html)
- [Apache Spark SQL performance tuning](https://spark.apache.org/docs/latest/sql-performance-tuning.html)
- [Apache Beam programming guide](https://beam.apache.org/documentation/programming-guide/)

> [!nav]
> **Section** — [Cloud and Distributed Systems](index.md)
>
> [← GPU Systems](gpu-systems.md) [Distributed Model Training →](distributed-model-training.md)
