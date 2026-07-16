---
title: Data Engineering
slug: 13-data-engineering
description: "Learning map for reliable analytical data systems, warehouses, pipelines, and contracts."
area: data-engineering
topics:
  - relational-modelling
  - sql
  - data-warehouses
  - dimensional-modelling
  - etl-and-elt
  - batch-versus-streaming
  - data-pipelines
  - data-quality
  - data-contracts
  - dbt
  - airflow
  - bigquery
  - cloud-storage
  - data-lineage
  - reproducibility
  - feature-pipelines
level: foundational
status: review
page_type: area-index
aliases:
  - Data Engineering
prerequisites:
  - ../16-software-engineering/index.md
related:
  - ../14-ml-engineering-and-mlops/index.md
  - ../15-cloud-and-distributed-systems/index.md
historical_context: false
last_reviewed: 2026-07-16
---

# Data Engineering

Data engineering builds reliable paths from source events and operational records to analytical tables, features, and governed datasets. The useful through-line is contract first: what is the grain, who owns it, how is it tested, and can it be rebuilt?

## Knowledge map

Data modelling and SQL underpin warehouses; storage and processing choices feed pipelines and orchestration; governance and feature pipelines sit on top.

```mermaid
flowchart TD
  Model[Relational and Dimensional Modelling] --> SQL[SQL and Warehouses]
  Storage[Cloud Storage and Batch vs Streaming] --> Pipelines[ETL/ELT and Data Pipelines]
  SQL --> Pipelines
  Pipelines --> Orchestration[Airflow and dbt]
  Pipelines --> Quality[Data Quality, Contracts, Lineage]
  Quality --> Features[Feature Pipelines]
```

## Reading path

Read modelling and SQL, then storage and pipelines, orchestration, governance, and feature pipelines.

1. [Relational Modelling](relational-modelling.md): keys, constraints, and table relationships that protect integrity.
2. [SQL](sql.md): joins, aggregation, and window functions as the core transformation language.
3. [Dimensional Modelling](dimensional-modelling.md): facts, dimensions, grain, and slowly changing context.
4. [Data Warehouses](data-warehouses.md): curated analytical stores for shared metrics.
5. [BigQuery](bigquery.md): managed warehouse design with partitioning and clustering.
6. [Cloud Storage](cloud-storage.md): object layout for raw, staged, curated, and versioned assets.
7. [Batch Versus Streaming](batch-versus-streaming.md): bounded and unbounded processing trade-offs.
8. [ETL and ELT](etl-and-elt.md): where extraction, loading, and transformation happen.
9. [Data Pipelines](data-pipelines.md): production dataflows with sources, transforms, targets, and watermarks.
10. [Airflow](airflow.md): orchestration for scheduled, observable task graphs.
11. [dbt](dbt.md): versioned SQL models, tests, and warehouse dependency graphs.
12. [Data Quality](data-quality.md): executable checks that block or warn on invalid data.
13. [Data Contracts](data-contracts.md): producer-consumer agreements for schema, semantics, and ownership.
14. [Data Lineage](data-lineage.md): job and dataset graph metadata for impact analysis.
15. [Reproducibility](reproducibility.md): pinned inputs, code, parameters, and output snapshots.
16. [Feature Pipelines](feature-pipelines.md): point-in-time model features for training and serving.

## Connections

- [Software Engineering](../16-software-engineering/index.md) supplies the testing and design discipline pipelines need.
- [ML Engineering and MLOps](../14-ml-engineering-and-mlops/index.md) consumes feature pipelines, and [Cloud and Distributed Systems](../15-cloud-and-distributed-systems/index.md) runs the processing.
