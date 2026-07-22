---
title: ETL and ELT
slug: data-engineering/etl-and-elt
description: "Where extraction, loading, and transformation happen in a data pipeline."
area: data-engineering
topics:
  - etl-and-elt
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-pipelines.md
  - dbt.md
  - data-warehouses.md
  - cloud-storage.md
  - data-quality.md
historical_context: false
last_reviewed: 2026-07-23
---

# ETL and ELT

ETL transforms data before loading it into the target system. ELT loads raw data first, then transforms it inside a [data-warehouse](data-warehouses.md), lakehouse, or query engine. The letters are simple; the real design choice is where failures are isolated and where business logic is reviewed.

## ETL versus ELT

In ETL, a pipeline might parse and normalize a SaaS export before writing warehouse tables. In ELT, the same raw export lands in [cloud-storage](cloud-storage.md) or a raw schema, then [dbt](dbt.md) or warehouse SQL creates staged and curated models.

| Raw field        | Staged field        | Rule                                        |
| ---------------- | ------------------- | ------------------------------------------- |
| `order_id=1`     | `order_id=1`        | Preserve source identifier.                 |
| `amount="12.30"` | `amount_cents=1230` | Parse decimal currency and multiply by 100. |
| `currency="usd"` | `currency="USD"`    | Normalize to uppercase accepted codes.      |

In ETL, that conversion happens before loading. In ELT, the raw string amount is loaded and this conversion becomes reviewed [SQL](sql.md), often with [data-quality](data-quality.md) tests on non-null `amount_cents` and accepted currency codes.

## Design choice

ELT works well when the target warehouse is scalable, raw retention is affordable, and analysts can review transformation code. ETL is still appropriate when data must be masked before landing, source systems cannot be replayed, or external formats are too messy to expose broadly.

## Failure modes

ETL can hide source defects by overwriting raw evidence. ELT can create a raw-data swamp when ownership and retention are missing. Both fail when transformation logic is duplicated across [data-pipelines](data-pipelines.md) instead of centralized in versioned models.

## References

- [dbt documentation: SQL models](https://docs.getdbt.com/docs/build/sql-models)
- [dbt documentation: Sources](https://docs.getdbt.com/docs/build/sources)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [← Batch Versus Streaming](batch-versus-streaming.md) [Data Pipelines →](data-pipelines.md)
