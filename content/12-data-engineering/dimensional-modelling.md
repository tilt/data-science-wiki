---
title: Dimensional Modelling
slug: data-engineering/dimensional-modelling
description: Concise guide to Dimensional Modelling in Data Engineering.
area: data-engineering
topics:
  - dimensional-modelling
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
# Dimensional Modelling

## Summary

Dimensional modelling organizes analytical data into facts and dimensions. It makes business processes queryable and understandable.

## Step-by-step example

A sales fact table records transactions; product, customer, store, and date dimensions describe the context of each transaction.

## Common failure modes

- Changing Dimensional Modelling without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
