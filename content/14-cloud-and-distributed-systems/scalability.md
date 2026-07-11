---
title: Scalability
slug: cloud-and-distributed-systems/scalability
description: Concise guide to Scalability in Cloud and Distributed Systems.
area: cloud-and-distributed-systems
topics:
  - scalability
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Scalability is the ability to handle increased load by adding resources or improving efficiency. It applies to traffic, data volume, model size, team workflows, and operational complexity.

## Scaling dimensions

Systems can scale vertically by using larger machines or horizontally by adding more machines. Data systems scale through partitioning, indexing, caching, and parallel processing. Model systems scale through batching, quantization, distillation, accelerators, and asynchronous workflows.

## Example

A search API that works for 100 queries per minute may fail at 10,000 because retrieval, reranking, logging, and database calls all scale differently. Adding more API replicas will not fix a single overloaded vector index or a slow downstream reranker.

## Practical workflow

Identify the bottleneck, measure saturation, remove unnecessary work, cache stable results, partition state, and load test before launch. Scaling should preserve correctness and observability, not only throughput.

## Failure modes

Scalability fails when teams scale the wrong layer, create hot keys, ignore tail latency, or optimize average throughput while user-visible p95 and p99 latency degrade.
