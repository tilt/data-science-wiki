---
title: SQL
slug: data-engineering/sql
description: Concise guide to SQL in Data Engineering.
area: data-engineering
topics:
  - sql
level: foundational
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
# SQL

## Summary

SQL is the standard language for querying and transforming relational and analytical data. It expresses selection, joins, aggregation, filtering, and windowed calculations.

## Step-by-step example

A retention query may join users to activity events, group by signup cohort, and compute active users by week since signup.

## Common failure modes

- Changing SQL without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
