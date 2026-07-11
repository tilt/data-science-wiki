---
title: Data Contracts
slug: data-engineering/data-contracts
description: Concise guide to Data Contracts in Data Engineering.
area: data-engineering
topics:
  - data-contracts
level: intermediate
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
# Data Contracts

## Summary

Data contracts define expected schemas, semantics, freshness, ownership, and quality guarantees between producers and consumers. They prevent silent downstream breakage.

## Step-by-step example

A payments table contract may require stable transaction IDs, currency codes, event timestamps, and no duplicate settled transactions.

## Common failure modes

- Changing Data Contracts without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
