---
title: Data Lineage
slug: data-engineering/data-lineage
description: Concise guide to Data Lineage in Data Engineering.
area: data-engineering
topics:
  - data-lineage
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
# Data Lineage

## Summary

Data lineage records how data moves and transforms from sources to downstream tables, features, dashboards, or models. It makes debugging and impact analysis possible.

## Step-by-step example

If a conversion metric drops, lineage shows which source events, transformations, and derived tables feed that metric.

## Common failure modes

- Changing Data Lineage without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.

## Operational check

Lineage is only useful if it answers incident questions quickly: which upstream source changed, which transformations consumed it, which downstream tables or models were affected, and what version should be rolled back or recomputed. Column-level lineage matters when a small semantic change affects a model feature.
