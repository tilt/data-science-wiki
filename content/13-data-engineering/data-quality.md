---
title: Data Quality
slug: data-engineering/data-quality
description: "Executable checks that decide whether a dataset is fit for a specific downstream use."
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
  - data-contracts.md
  - data-pipelines.md
  - dbt.md
  - data-lineage.md
  - reproducibility.md
historical_context: false
last_reviewed: 2026-07-11
---

# Data Quality

Data quality is not a dashboard of vague health indicators. It is a set of executable expectations tied to a dataset's intended use: schema validity, completeness, uniqueness, freshness, referential integrity, and semantic constraints.

## Check mechanism

Each expectation becomes a query that counts violations, so an abstract property turns into a number a gate can act on. Against a small payments table seeded with one null amount, one duplicate `payment_id`, and one non-USD row, completeness is the count of null amounts, uniqueness is the count of `payment_id` values that appear more than once, and validity is the count of rows outside the allowed currency set:

```sql
WITH payments(payment_id, amount_cents, currency, event_ts) AS (
  VALUES
    ('p1', 1200, 'USD', '2026-01-01T10:00:00'),
    ('p2', NULL, 'USD', '2026-01-01T10:05:00'),
    ('p2', 500, 'USD', '2026-01-01T10:06:00'),
    ('p3', 700, 'EUR', '2026-01-01T10:07:00')
),
duplicate_ids AS (
  SELECT payment_id
  FROM payments
  GROUP BY payment_id
  HAVING count(*) > 1
)
SELECT 'rows' AS check_name, count(*) AS violations FROM payments
UNION ALL
SELECT 'null_amounts', count(*) FROM payments WHERE amount_cents IS NULL
UNION ALL
SELECT 'duplicate_payment_ids', count(*) FROM duplicate_ids
UNION ALL
SELECT 'non_usd_rows', count(*) FROM payments WHERE currency <> 'USD';
```

Result:

```text
check_name                  violations
rows                        4
null_amounts                1
duplicate_payment_ids       1
non_usd_rows                1
```

The checks become useful only when their thresholds are part of [data-contracts](data-contracts.md): a duplicate payment id should usually block publication, while a small number of late events might trigger a warning and backfill.

## Architecture

Quality gates should run at multiple boundaries: ingestion validates raw schema, transform jobs validate business rules, [dbt](dbt.md) tests protect marts, and [data-pipelines](data-pipelines.md) publish only after blocking checks pass. [Data-lineage](data-lineage.md) tells owners which downstream tables and models were exposed to a failed check.

## Failure modes

Schema checks can pass while semantics drift. Aggregate checks can hide segment-level failures. Quality systems that alert but do not block critical tables train consumers to ignore them.

## References

- [Great Expectations documentation: Try GX Core](https://docs.greatexpectations.io/docs/core/introduction/try_gx/)
- [dbt documentation: About data tests property](https://docs.getdbt.com/reference/resource-properties/data-tests)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [← dbt](dbt.md) [Data Contracts →](data-contracts.md)
