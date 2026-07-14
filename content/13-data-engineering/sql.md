---
title: SQL
slug: data-engineering/sql
description: "Relational query language for joining, aggregating, and publishing analytical data."
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
  - relational-modelling.md
  - data-warehouses.md
  - dbt.md
  - data-quality.md
  - ../16-software-engineering/sql.md
historical_context: false
last_reviewed: 2026-07-11
---

# SQL

SQL is the contract language of warehouse-centric data engineering: tables expose named columns, queries declare the result set, and engines decide the physical plan. In this section it means analytical SQL over modeled data, while [software-engineering SQL](../16-software-engineering/sql.md) focuses on application safety, transactions, and parameterization.

## Query mechanism

A useful mental model is the logical query pipeline: `FROM` builds a row source, joins combine tables from [relational modelling](relational-modelling.md), `WHERE` filters rows, `GROUP BY` aggregates them, `HAVING` filters groups, window functions compute over partitions, and the final `SELECT` projects columns. Warehouses such as [BigQuery](bigquery.md) may reorder physical execution, but the declarative contract is the result table.

This SQLite query joins users to orders, aggregates revenue, and ranks users within each plan:

```python
import sqlite3

con = sqlite3.connect(":memory:")
con.executescript("""
create table users(user_id integer primary key, signup_date text, plan text);
create table orders(order_id integer primary key, user_id integer references users(user_id), order_date text, amount integer);
insert into users values (1,'2026-01-03','pro'),(2,'2026-01-08','free'),(3,'2026-02-02','pro');
insert into orders values (10,1,'2026-01-12',120),(11,1,'2026-02-04',80),(12,2,'2026-02-15',35),(13,3,'2026-02-20',200);
""")
for row in con.execute("""
select u.plan, u.user_id, count(o.order_id) as orders, sum(o.amount) as revenue,
       rank() over (partition by u.plan order by sum(o.amount) desc) as plan_rank
from users u
join orders o using (user_id)
group by u.plan, u.user_id
order by u.plan, plan_rank;
"""):
    print(row)
```

Observed output:

```text
('free', 2, 1, 35, 1)
('pro', 3, 1, 200, 1)
('pro', 1, 2, 200, 1)
```

The tie in the `pro` partition is intentional: `rank()` gives both users rank 1 because both aggregate to 200. This is exactly the kind of semantic choice that should be tested in [data-quality](data-quality.md) checks before a [dbt](dbt.md) model becomes a shared mart.

## Engineering use

In [data warehouses](data-warehouses.md), SQL is usually versioned as models: staging queries normalize raw fields, intermediate queries encode reusable business logic, and mart queries publish facts or dimensions. Good SQL makes grain explicit (`one row per order`, `one row per user per day`), avoids accidental many-to-many joins, and names late-arriving-data behavior rather than burying it in a dashboard.

## Failure modes

`select distinct` can hide duplicate upstream records instead of fixing them. `natural join` is brittle because a new same-named column changes join semantics. Window functions are evaluated after grouping in the query shape above, so mixing raw-row and grouped-row intent in one statement can produce plausible but wrong metrics.

## References

- [PostgreSQL documentation: Table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
- [SQLite documentation: Window functions](https://www.sqlite.org/windowfunctions.html)
- [BigQuery documentation: GoogleSQL query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
