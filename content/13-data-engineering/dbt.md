---
title: dbt
slug: data-engineering/dbt
description: "Versioned SQL transformation framework for warehouse analytics engineering."
area: data-engineering
topics:
  - dbt
level: intermediate
status: review
page_type: implementation
aliases:
  - DBT
prerequisites:
  - index.md
related:
  - sql.md
  - data-warehouses.md
  - etl-and-elt.md
  - data-quality.md
  - data-lineage.md
  - airflow.md
historical_context: false
last_reviewed: 2026-07-11
---

# dbt

dbt turns warehouse [SQL](sql.md) files into a dependency graph of models, tests, documentation, and build commands. It is most useful in ELT systems where raw data lands first and reviewed transformations publish marts in a [data-warehouse](data-warehouses.md).

## Model contract

A dbt model is a `select` statement saved as a file. dbt materializes it as a view, table, incremental table, or ephemeral query depending on configuration. This artifact defines a daily order fact and tests the grain:

```sql
-- models/marts/fct_orders.sql
{{ config(materialized="table") }}

select
  order_id,
  customer_id,
  date(order_ts) as order_date,
  amount_cents
from {{ ref("stg_orders") }}
where status = 'paid'
```

```yaml
# models/marts/schema.yml
models:
  - name: fct_orders
    description: "One row per paid order."
    columns:
      - name: order_id
        data_tests:
          - not_null
          - unique
      - name: amount_cents
        data_tests:
          - not_null
```

The `ref("stg_orders")` call creates graph dependency and lets dbt build upstream staging before the mart. Tests are not observability decoration: they are blocking [data-quality](data-quality.md) contracts for downstream dashboards and [feature-pipelines](feature-pipelines.md).

## Architecture

dbt commonly owns the transform layer inside [ETL and ELT](etl-and-elt.md): sources describe raw tables, staging models clean names and types, intermediate models encode reusable joins, and marts publish [dimensional-modelling](dimensional-modelling.md) facts and dimensions. [Airflow](airflow.md) may schedule dbt jobs, but dbt should own SQL dependencies and generated [data-lineage](data-lineage.md) for models.

## Failure modes

`ref` dependencies are reliable only when teams avoid hard-coded database names in model SQL. Incremental models can drift from full-refresh behavior if late updates are not merged correctly. Tests that check only `not_null` miss semantic regressions such as currency changes or redefined statuses.

## References

- [dbt documentation: SQL models](https://docs.getdbt.com/docs/build/sql-models)
- [dbt documentation: About data tests property](https://docs.getdbt.com/reference/resource-properties/data-tests)
- [dbt documentation: Sources](https://docs.getdbt.com/docs/build/sources)
