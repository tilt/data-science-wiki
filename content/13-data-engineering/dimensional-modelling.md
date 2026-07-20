---
title: Dimensional Modelling
slug: data-engineering/dimensional-modelling
description: "Analytics modelling with fact tables, dimensions, grain, and slowly changing context."
area: data-engineering
topics:
  - dimensional-modelling
level: intermediate
status: review
page_type: concept
aliases:
  - Star Schema
  - Star Schemas
prerequisites:
  - index.md
related:
  - relational-modelling.md
  - data-warehouses.md
  - distributed-warehouse-modelling.md
  - sql.md
  - bigquery.md
  - dbt.md
historical_context: false
last_reviewed: 2026-07-11
---

# Dimensional Modelling

Dimensional modelling organizes analytics around facts and dimensions. A fact table records measurements at a declared grain, such as one row per order line. Dimension tables describe the context used to slice those facts, such as customer segment, product, or calendar date.

## Star schema

A star schema is a dimensional model with one or more central fact tables surrounded by dimension tables. The fact table owns the analytical grain and numeric measures; dimensions own the labels, hierarchies, and slowly changing context used for filters and grouping. Compared with normalized [relational-modelling](relational-modelling.md), a star schema makes [SQL](sql.md) easier for analysts because common questions become "join the fact to a few descriptive dimensions, then aggregate at the requested level."

This example uses a type-2 customer dimension, where customer `C-7` changed segment over time and facts keep the historical `customer_key`.

```sql
WITH dim_customer(
  customer_key,
  customer_id,
  segment,
  effective_from,
  effective_to,
  is_current
) AS (
  VALUES
    (1, 'C-7', 'startup', '2026-01-01', '2026-02-01', 0),
    (2, 'C-7', 'enterprise', '2026-02-01', NULL, 1),
    (3, 'C-9', 'consumer', '2026-01-01', NULL, 1)
),
fact_order(order_id, customer_key, order_date, revenue) AS (
  VALUES
    (501, 1, '2026-01-20', 100),
    (502, 2, '2026-02-18', 300),
    (503, 3, '2026-02-18', 50)
)
SELECT
  d.segment,
  sum(f.revenue) AS revenue
FROM fact_order f
JOIN dim_customer d USING (customer_key)
GROUP BY d.segment
ORDER BY revenue DESC;
```

Result:

```text
segment     revenue
enterprise  300
startup     100
consumer    50
```

The January order remains attributed to `startup` even though the current customer row is `enterprise`. That is the point of carrying dimension surrogate keys into the fact table.

## Warehouse use

[Data-warehouses](data-warehouses.md) and [BigQuery](bigquery.md) marts often materialize dimensional models because dashboards need stable metric definitions and predictable joins. At large scale, [distributed-warehouse-modelling](distributed-warehouse-modelling.md) keeps the same star-schema grain while adding partitioning, clustering, and aggregate tables for common query patterns. [dbt](dbt.md) is commonly used to encode staging, dimension, and fact models as versioned SQL.

## Failure modes

If fact grain is vague, revenue can double after joining to a multi-row dimension. If slowly changing dimensions are overwritten in place, historical metrics inherit today's attributes. If dimensions lack durable business keys, late-arriving facts cannot be matched reliably.

## References

- [Microsoft Learn: Understand star schema and the importance for Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema)
- [PostgreSQL documentation: Table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [← SQL](sql.md) [Data Warehouses →](data-warehouses.md)
