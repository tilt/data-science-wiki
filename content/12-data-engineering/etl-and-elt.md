---
title: ETL and ELT
slug: data-engineering/etl-and-elt
description: Concise guide to ETL and ELT in Data Engineering.
area: data-engineering
topics:
  - etl-and-elt
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
# ETL and ELT

## Summary

ETL and ELT describe where transformation happens. ETL transforms before loading into the target system; ELT loads raw data first and transforms inside the warehouse or lakehouse.

## Step-by-step example

A modern ELT workflow may load raw SaaS events into a warehouse, then use dbt to create cleaned and curated tables.

## Common failure modes

- Changing ETL and ELT without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
