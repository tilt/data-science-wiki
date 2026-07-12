---
title: ETL and ELT
slug: data-engineering/etl-and-elt
description: "Where extraction, loading, and transformation happen in a data pipeline."
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
  - data-pipelines.md
  - dbt.md
  - data-warehouses.md
  - cloud-storage.md
  - data-quality.md
historical_context: false
last_reviewed: 2026-07-11
---
# ETL and ELT

ETL transforms data before loading it into the target system. ELT loads raw data first, then transforms it inside a [data-warehouse](data-warehouses.md), lakehouse, or query engine. The letters are simple; the real design choice is where failures are isolated and where business logic is reviewed.

## Mechanism

In ETL, a pipeline might parse and normalize a SaaS export before writing warehouse tables. In ELT, the same raw export lands in [cloud-storage](cloud-storage.md) or a raw schema, then [dbt](dbt.md) or warehouse SQL creates staged and curated models. I ran this tiny transform to make the boundary concrete:

```python
raw = [
    {"order_id": 1, "amount": "12.30", "currency": "usd"},
    {"order_id": 2, "amount": "7.00", "currency": "eur"},
]
staged = []
for r in raw:
    staged.append({
        "order_id": r["order_id"],
        "amount_cents": int(round(float(r["amount"]) * 100)),
        "currency": r["currency"].upper(),
    })
print(staged)
```

Observed output:

```text
[{'order_id': 1, 'amount_cents': 1230, 'currency': 'USD'}, {'order_id': 2, 'amount_cents': 700, 'currency': 'EUR'}]
```

In ETL, that conversion happens before loading. In ELT, the raw string amount is loaded and this conversion becomes reviewed [SQL](sql.md), often with [data-quality](data-quality.md) tests on non-null `amount_cents` and accepted currency codes.

## Design choice

ELT works well when the target warehouse is scalable, raw retention is affordable, and analysts can review transformation code. ETL is still appropriate when data must be masked before landing, source systems cannot be replayed, or external formats are too messy to expose broadly.

## Failure modes

ETL can hide source defects by overwriting raw evidence. ELT can create a raw-data swamp when ownership and retention are missing. Both fail when transformation logic is duplicated across [data-pipelines](data-pipelines.md) instead of centralized in versioned models.

## References

- [dbt documentation: SQL models](https://docs.getdbt.com/docs/build/sql-models)
- [dbt documentation: Sources](https://docs.getdbt.com/docs/build/sources)
