---
title: DBT
slug: data-engineering/dbt
description: Concise guide to DBT in Data Engineering.
area: data-engineering
topics:
  - dbt
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
# DBT

## Summary

dbt organizes SQL transformations as versioned models with dependencies, tests, documentation, and build commands. It is widely used for warehouse-centric analytics engineering.

## Step-by-step example

A dbt project can define staging models for raw events, intermediate models for sessions, and marts for product KPIs, with tests for uniqueness and non-null keys.

## Common failure modes

- Changing DBT without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
