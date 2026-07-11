---
title: Managed Compute
slug: cloud-and-distributed-systems/managed-compute
description: Concise guide to Managed Compute in Cloud and Distributed Systems.
area: cloud-and-distributed-systems
topics:
  - managed-compute
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

Managed compute lets teams run services, jobs, containers, functions, or notebooks without owning the underlying servers directly. It speeds delivery but still requires explicit design for permissions, cost, reliability, and observability.

## Compute choices

Virtual machines provide control. Container services package applications consistently. Serverless functions suit event-driven tasks. Managed batch jobs suit scheduled processing. Managed ML endpoints simplify inference deployment. Kubernetes offers portability and control but adds operational overhead.

## Example

A nightly embedding job may run as a managed batch container that reads new documents, computes embeddings, writes them to a vector index, and exits. A user-facing inference API may run on an autoscaled container service with stricter latency targets.

## Selection criteria

Choose based on startup time, runtime length, statefulness, scaling pattern, hardware needs, network access, deployment workflow, and team operating skill. The simplest managed option is often best until workload constraints force more control.

## Failure modes

Managed compute fails when teams ignore cold starts, quotas, hidden retries, logging cost, regional outages, or IAM permissions. Managed does not mean ownerless.
