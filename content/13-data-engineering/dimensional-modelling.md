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
aliases: []
prerequisites:
  - index.md
related:
  - relational-modelling.md
  - data-warehouses.md
  - sql.md
  - bigquery.md
  - dbt.md
historical_context: false
last_reviewed: 2026-07-11
---

# Dimensional Modelling

Dimensional modelling organizes analytics around facts and dimensions. A fact table records measurements at a declared grain, such as one row per order line. Dimension tables describe the context used to slice those facts, such as customer segment, product, or calendar date.

## Star mechanism

Compared with normalized [relational-modelling](relational-modelling.md), a star schema makes [SQL](sql.md) easier for analysts: join a central fact to a small set of descriptive dimensions. This SQLite example uses a type-2 customer dimension, where customer `C-7` changed segment over time and facts keep the historical `customer_key`.

```python
import sqlite3

con = sqlite3.connect(":memory:")
con.executescript("""
create table dim_customer(customer_key integer primary key, customer_id text, segment text, effective_from text, effective_to text, is_current integer);
create table fact_order(order_id integer primary key, customer_key integer, order_date text, revenue integer);
insert into dim_customer values (1,'C-7','startup','2026-01-01','2026-02-01',0),(2,'C-7','enterprise','2026-02-01',NULL,1),(3,'C-9','consumer','2026-01-01',NULL,1);
insert into fact_order values (501,1,'2026-01-20',100),(502,2,'2026-02-18',300),(503,3,'2026-02-18',50);
""")
for row in con.execute("""
select d.segment, sum(f.revenue) as revenue
from fact_order f join dim_customer d using (customer_key)
group by d.segment order by revenue desc;
"""):
    print(row)
```

Observed output:

```text
('enterprise', 300)
('startup', 100)
('consumer', 50)
```

The January order remains attributed to `startup` even though the current customer row is `enterprise`. That is the point of carrying dimension surrogate keys into the fact table.

## Warehouse use

[Data-warehouses](data-warehouses.md) and [BigQuery](bigquery.md) marts often materialize dimensional models because dashboards need stable metric definitions and predictable joins. [dbt](dbt.md) is commonly used to encode staging, dimension, and fact models as versioned SQL.

## Failure modes

If fact grain is vague, revenue can double after joining to a multi-row dimension. If slowly changing dimensions are overwritten in place, historical metrics inherit today's attributes. If dimensions lack durable business keys, late-arriving facts cannot be matched reliably.

## References

- [Microsoft Learn: Understand star schema and the importance for Power BI](https://learn.microsoft.com/en-us/power-bi/guidance/star-schema)
- [PostgreSQL documentation: Table expressions](https://www.postgresql.org/docs/current/queries-table-expressions.html)
