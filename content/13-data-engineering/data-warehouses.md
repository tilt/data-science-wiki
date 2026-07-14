---
title: Data Warehouses
slug: data-engineering/data-warehouses
description: "Analytical databases for governed, historical, queryable business data."
area: data-engineering
topics:
  - data-warehouses
level: foundational
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - sql.md
  - dimensional-modelling.md
  - bigquery.md
  - dbt.md
  - etl-and-elt.md
historical_context: false
last_reviewed: 2026-07-11
---
# Data Warehouses

A data warehouse stores integrated, historical, queryable data for analytics. Its core promise is not "large tables"; it is consistent semantics: the same order, customer, and revenue definition should support dashboards, analysis, and downstream [feature-pipelines](feature-pipelines.md).

## Warehouse mechanism

Warehouses separate raw landing data from curated analytical models. A common flow is raw orders -> cleaned staging -> facts and dimensions from [dimensional-modelling](dimensional-modelling.md). I ran this SQLite aggregate as the final mart layer:

This snippet aggregates paid raw orders into daily warehouse-style revenue rows with SQL grouping.

```python
import sqlite3

con = sqlite3.connect(":memory:")
con.executescript("""
create table raw_orders(order_id integer, customer_id integer, order_ts text, status text, amount integer);
insert into raw_orders values
  (1,10,'2026-01-01T09:00:00','paid',50),
  (2,10,'2026-01-01T10:00:00','refunded',20),
  (3,11,'2026-01-02T09:00:00','paid',80),
  (4,12,'2026-01-02T12:00:00','paid',40);
""")
for row in con.execute("""
select substr(order_ts,1,10) as order_date, count(*) as paid_orders, sum(amount) as gross_revenue
from raw_orders where status='paid' group by 1 order by 1;
"""):
    print(row)
```

Observed output:

```text
('2026-01-01', 1, 50)
('2026-01-02', 2, 120)
```

The metric is only meaningful because the query encodes a status filter. In production that logic should live in reviewed [SQL](sql.md) or [dbt](dbt.md) models, not in each dashboard.

## Architecture

Warehouse layers usually separate `raw`, `staging`, `intermediate`, and `mart` schemas. [ETL and ELT](etl-and-elt.md) determines whether transforms run before or after loading, but modern cloud warehouses typically favor ELT because storage is cheap and SQL engines scale independently. [BigQuery](bigquery.md) adds partitioning and clustering so table layout can reduce scanned bytes for common predicates.

## Failure modes

Warehouses fail when multiple marts define the same metric differently, when raw data is overwritten before audits finish, and when access controls expose row-level sensitive data through broad analytical tables.

## References

- [BigQuery documentation: Introduction to partitioned tables](https://cloud.google.com/bigquery/docs/partitioned-tables)
- [dbt documentation: SQL models](https://docs.getdbt.com/docs/build/sql-models)
