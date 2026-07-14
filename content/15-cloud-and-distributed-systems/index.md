---
title: Cloud and Distributed Systems
slug: 15-cloud-and-distributed-systems
description: Index and learning map for Cloud and Distributed Systems.
area: cloud-and-distributed-systems
topics:
  - "aws-fundamentals"
  - "google-cloud-fundamentals"
  - "managed-compute"
  - "managed-storage"
  - "distributed-data-processing"
  - "distributed-model-training"
  - "gpu-systems"
  - "storage-and-decoding-bottlenecks"
  - "scalability"
  - "reliability"
  - "cost-management"
level: foundational
status: draft
page_type: area-index
aliases:
  - "Cloud and Distributed Systems"
prerequisites:
  - "16-software-engineering/index.md"
related:
  - "13-data-engineering/index.md"
  - "14-ml-engineering-and-mlops/index.md"
historical_context: false
last_reviewed: 2026-07-10
---
# Cloud and Distributed Systems

## Summary

Cloud and distributed systems covers the infrastructure layer that makes data and ML systems usable at scale: managed compute, storage, accelerators, distributed processing, reliability, and cost control. The recurring tradeoff is locality versus elasticity: cloud services make capacity easy to obtain, but network boundaries, storage formats, accelerator memory, and operational failure modes decide whether a design is actually fast, reliable, and affordable.

Use this section when a model or data pipeline stops being a notebook problem and becomes a system problem. For ML-specific deployment concerns, pair it with [ML Engineering and MLOps](../14-ml-engineering-and-mlops/index.md); for data layout and orchestration, pair it with [Data Engineering](../13-data-engineering/index.md).

## Study Route

| Need | Start with | Then read |
| --- | --- | --- |
| Choose cloud primitives | [AWS Fundamentals](aws-fundamentals.md), [Google Cloud Fundamentals](google-cloud-fundamentals.md) | [Managed Compute](managed-compute.md), [Managed Storage](managed-storage.md) |
| Scale data workloads | [Distributed Data Processing](distributed-data-processing.md) | [Scalability](scalability.md), [Reliability](reliability.md) |
| Train or serve large models | [GPU Systems](gpu-systems.md) | [Distributed Model Training](distributed-model-training.md), [Storage and Decoding Bottlenecks](storage-and-decoding-bottlenecks.md) |
| Control production spend | [Cost Management](cost-management.md) | [Managed Compute](managed-compute.md), [Managed Storage](managed-storage.md) |

## Subtopics

- [AWS Fundamentals](aws-fundamentals.md)
- [Google Cloud Fundamentals](google-cloud-fundamentals.md)
- [Managed Compute](managed-compute.md)
- [Managed Storage](managed-storage.md)
- [Distributed Data Processing](distributed-data-processing.md)
- [Distributed Model Training](distributed-model-training.md)
- [GPU Systems](gpu-systems.md)
- [Storage and Decoding Bottlenecks](storage-and-decoding-bottlenecks.md)
- [Scalability](scalability.md)
- [Reliability](reliability.md)
- [Cost Management](cost-management.md)
