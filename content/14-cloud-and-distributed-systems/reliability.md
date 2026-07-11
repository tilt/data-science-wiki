---
title: Reliability
slug: cloud-and-distributed-systems/reliability
description: Concise guide to Reliability in Cloud and Distributed Systems.
area: cloud-and-distributed-systems
topics:
  - reliability
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

Cloud reliability is the ability of infrastructure and distributed services to meet expected behavior despite failures. It depends on redundancy, isolation, observability, recovery, and operational discipline.

## Core concepts

Reliability design starts with service-level objectives, failure domains, dependency mapping, capacity planning, and recovery targets. Distributed systems fail partially: one zone, queue, database, or downstream API can degrade while the rest of the system remains alive.

## Example

A feature-serving API depends on a database, cache, network, and model service. If the cache fails, the API might fall back to the database. If the database is overloaded, it may serve stale cached features with a warning rather than fail every request.

## Controls

Use health checks, timeouts, retries with backoff, circuit breakers, bulkheads, replication, backups, disaster recovery tests, and runbooks. Reliability mechanisms must be tested under realistic failure conditions.

## Failure modes

Common failures include retry storms, shared dependencies that defeat redundancy, backups that cannot be restored, and dashboards that show symptoms but not ownership.
