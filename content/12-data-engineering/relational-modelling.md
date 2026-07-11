---
title: Relational Modelling
slug: data-engineering/relational-modelling
description: Concise guide to Relational Modelling in Data Engineering.
area: data-engineering
topics:
  - relational-modelling
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
# Relational Modelling

## Summary

Relational modelling represents data as tables with keys, constraints, and relationships. It is the foundation for reliable SQL systems and many warehouses.

## Step-by-step example

Customers, orders, and order_items can be separate tables linked by keys, avoiding duplicated customer attributes on every line item.

## Common failure modes

- Changing Relational Modelling without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
