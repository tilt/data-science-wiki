---
title: Airflow
slug: data-engineering/airflow
description: "Python-defined workflow orchestration for scheduled, observable data pipelines."
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
  - data-pipelines.md
  - etl-and-elt.md
  - dbt.md
  - batch-versus-streaming.md
  - data-quality.md
historical_context: false
last_reviewed: 2026-07-11
---

# Airflow

Airflow is an orchestrator: it decides when tasks should run, in what dependency order, with what retries and metadata. It does not make bad [SQL](sql.md) correct or turn an unreliable source into a contract; it gives [data-pipelines](data-pipelines.md) a schedulable control plane.

## DAG contract

Airflow represents a workflow as a directed acyclic graph. The artifact below is a minimal DAG shape for an ELT pipeline: one task extracts a dated object, one task runs [dbt](dbt.md), and one task blocks publication unless a [data-quality](data-quality.md) check passes.

```python
from __future__ import annotations

import pendulum
from airflow.decorators import dag, task

@dag(
    dag_id="orders_daily_mart",
    schedule="0 5 * * *",
    start_date=pendulum.datetime(2026, 1, 1, tz="UTC"),
    catchup=True,
    max_active_runs=1,
    tags=["orders", "warehouse"],
)
def orders_daily_mart():
    @task
    def extract(ds: str) -> str:
        return f"gs://raw/orders/dt={ds}/orders.jsonl"

    @task
    def build_mart(source_uri: str) -> str:
        return "warehouse.analytics.fct_orders"

    @task
    def assert_row_count(table: str) -> None:
        assert table == "warehouse.analytics.fct_orders"

    assert_row_count(build_mart(extract()))

orders_daily_mart()
```

The important contract is not the Python syntax; it is the dependency graph, schedule, retry boundary, and backfill behavior. `catchup=True` means missed logical dates are eligible for backfill, which is appropriate for [batch-versus-streaming](batch-versus-streaming.md) jobs that can replay a partition. `max_active_runs=1` protects a warehouse table when two dates would otherwise mutate the same target concurrently.

## Operational shape

Use Airflow for coordination, not row-by-row computation. Heavy transforms belong in the warehouse, Spark, Beam, or a service-specific job; the DAG should pass parameters, wait for completion, and record ownership. Dynamic task mapping is useful when a runtime list of partitions or tenants fans out into parallel tasks, but large maps create scheduler and observability overhead.

## Failure modes

A green Airflow run proves task completion, not metric correctness. Hidden side effects make retries unsafe: a task that appends without an idempotency key can duplicate rows after a transient failure. DAG parse-time network calls slow the scheduler and can break unrelated workflows.

## References

- [Apache Airflow documentation: DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)
- [Apache Airflow documentation: Dynamic Task Mapping](https://airflow.apache.org/docs/apache-airflow/stable/authoring-and-scheduling/dynamic-task-mapping.html)

> **Section — [Data Engineering](index.md):** ← [Data Pipelines](data-pipelines.md) · [dbt](dbt.md) →
