---
title: SQL
slug: data-engineering/sql
description: "Relational query language for joining, aggregating, and publishing analytical data."
area: data-engineering
topics:
  - sql
level: foundational
status: complete
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - relational-modelling.md
  - data-warehouses.md
  - dbt.md
  - data-quality.md
  - ../16-software-engineering/sql.md
historical_context: false
last_reviewed: 2026-07-23
---

# SQL

SQL is the contract language of warehouse-centric data engineering: tables expose named columns, queries declare the result set, and engines decide the physical plan. In this section it means analytical SQL over modeled data, while [software-engineering SQL](../16-software-engineering/sql.md) focuses on application safety, transactions, and parameterization.

## The logical query pipeline

A useful mental model is the logical query pipeline: `FROM` builds a row source, joins combine tables from [relational modelling](relational-modelling.md), `WHERE` filters rows, `GROUP BY` aggregates them, `HAVING` filters groups, window functions compute over partitions, and the final `SELECT` projects columns. Warehouses such as [BigQuery](bigquery.md) may reorder physical execution, but the declarative contract is the result table.

This SQLite query joins users to orders, aggregates revenue, and ranks users within each plan:

```sql
WITH users(user_id, signup_date, plan) AS (
  VALUES
    (1, '2026-01-03', 'pro'),
    (2, '2026-01-08', 'free'),
    (3, '2026-02-02', 'pro')
),
orders(order_id, user_id, order_date, amount) AS (
  VALUES
    (10, 1, '2026-01-12', 120),
    (11, 1, '2026-02-04', 80),
    (12, 2, '2026-02-15', 35),
    (13, 3, '2026-02-20', 200)
)
SELECT
  u.plan,
  u.user_id,
  count(o.order_id) AS orders,
  sum(o.amount) AS revenue,
  rank() OVER (PARTITION BY u.plan ORDER BY sum(o.amount) DESC) AS plan_rank
FROM users u
JOIN orders o USING (user_id)
GROUP BY u.plan, u.user_id
ORDER BY u.plan, plan_rank;
```

Result:

```text
plan  user_id  orders  revenue  plan_rank
free  2        1       35       1
pro   3        1       200      1
pro   1        2       200      1
```

The tie in the `pro` partition is intentional: `rank()` gives both users rank 1 because both aggregate to 200. This is exactly the kind of semantic choice that should be tested in [data-quality](data-quality.md) checks before a [dbt](dbt.md) model becomes a shared mart.

Two different "grouping" ideas appear in that query. `GROUP BY u.plan, u.user_id` collapses many order rows into one result row per user and plan; after that collapse, `count(o.order_id)` and `sum(o.amount)` are aggregate values. The window expression `rank() OVER (PARTITION BY u.plan ORDER BY sum(o.amount) DESC)` does not collapse rows again. It splits the grouped result into plan-level partitions and ranks rows within each partition. Use `GROUP BY` when the output grain should become coarser; use window `PARTITION BY` when each row should remain visible but needs context from peer rows.

Physical table partitions are a different warehouse concern. A query over a date-partitioned fact table should filter the partition column, for example `WHERE order_date >= DATE '2026-02-01'`, so the engine can prune irrelevant storage before scanning. Window partitions shape calculations; table partitions shape storage access.

### `GROUP BY` example

`GROUP BY` changes the result grain. The input has one row per order, but the output has one row per `plan`:

```sql
WITH orders(order_id, plan, amount) AS (
  VALUES
    (10, 'pro', 120),
    (11, 'pro', 80),
    (12, 'free', 35),
    (13, 'pro', 200)
)
SELECT
  plan,
  count(*) AS orders,
  sum(amount) AS revenue
FROM orders
GROUP BY plan
ORDER BY plan;
```

Result:

```text
plan  orders  revenue
free  1       35
pro   3       400
```

Every selected column must either be part of the grouping key or be produced by an aggregate function such as `count`, `sum`, `min`, or `max`. This rule protects the output grain: after grouping by `plan`, there is no single unambiguous `order_id` left to select.

### Window `PARTITION BY` example

Window `PARTITION BY` does not change the result grain. The input and output both have one row per order, but each row can see peer rows in the same partition:

```sql
WITH orders(order_id, plan, amount) AS (
  VALUES
    (10, 'pro', 120),
    (11, 'pro', 80),
    (12, 'free', 35),
    (13, 'pro', 200)
)
SELECT
  order_id,
  plan,
  amount,
  sum(amount) OVER (PARTITION BY plan) AS plan_revenue,
  rank() OVER (PARTITION BY plan ORDER BY amount DESC) AS rank_within_plan
FROM orders
ORDER BY plan, rank_within_plan;
```

Result:

```text
order_id  plan  amount  plan_revenue  rank_within_plan
12        free  35      35            1
13        pro   200     400           1
10        pro   120     400           2
11        pro   80      400           3
```

Use this shape for running totals, ranks, percentiles, and comparisons against a group average when the detail rows still matter.

### Table partition filter example

Warehouse table partitions are about storage layout, not window calculations. Syntax varies by engine, but the query pattern is stable: filter the physical partition column so the engine can skip irrelevant partitions.

```sql
SELECT
  order_date,
  sum(extended_revenue) AS revenue
FROM mart.fact_order_line
WHERE order_date >= DATE '2026-02-01'
  AND order_date < DATE '2026-03-01'
GROUP BY order_date
ORDER BY order_date;
```

Without the `order_date` predicate, a distributed warehouse may scan many more partitions even if the final dashboard only shows February.

## Engineering use

In [data warehouses](data-warehouses.md), SQL is usually versioned as models: staging queries normalize raw fields, intermediate queries encode reusable business logic, and mart queries publish facts or dimensions. Good SQL makes grain explicit (`one row per order`, `one row per user per day`), avoids accidental many-to-many joins, and names late-arriving-data behavior rather than burying it in a dashboard.

## Failure modes

`select distinct` can hide duplicate upstream records instead of fixing them. `natural join` is brittle because a new same-named column changes join semantics. Window functions are evaluated after grouping in the query shape above, so mixing raw-row and grouped-row intent in one statement can produce plausible but wrong metrics.

## References

- [PostgreSQL documentation: Table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [SQLite documentation: Window functions](https://www.sqlite.org/windowfunctions.html)
- [BigQuery documentation: GoogleSQL query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [← Relational Modelling](relational-modelling.md) [Dimensional Modelling →](dimensional-modelling.md)
