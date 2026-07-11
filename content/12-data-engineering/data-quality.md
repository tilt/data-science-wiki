---
title: Data Quality
slug: data-engineering/data-quality
description: Concise guide to Data Quality in Data Engineering.
area: data-engineering
topics:
  - data-quality
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
# Data Quality

## Summary

Data quality measures whether data is fit for its intended use. It includes schema validity, completeness, freshness, uniqueness, accuracy, consistency, and semantic correctness.

## Step-by-step example

A customer table can pass schema checks while still having stale addresses or duplicate customer IDs that break matching.

## Common failure modes

- Changing Data Quality without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
