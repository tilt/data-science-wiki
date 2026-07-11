---
title: Airflow
slug: data-engineering/airflow
description: Concise guide to Airflow in Data Engineering.
area: data-engineering
topics:
  - airflow
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
# Airflow

## Summary

Airflow orchestrates scheduled workflows as directed acyclic graphs of tasks. It is commonly used for batch data pipelines, backfills, dependency management, and operational visibility.

## Step-by-step example

A nightly pipeline can extract raw orders, validate schema, build warehouse tables, compute features, and notify owners if quality checks fail.

## Common failure modes

- Changing Airflow without a contract for schema, freshness, ownership, and downstream consumers.
- Letting silent nulls, duplicates, late data, or semantic drift pass because only job success is monitored.
- Building transformations that cannot be backfilled, tested, or traced during incidents.

- Transformations that cannot be replayed, tested, or traced to owners.
- Confusing pipeline success with data correctness for the downstream decision.
