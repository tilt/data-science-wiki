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
last_reviewed: 2026-07-11
---
# Data Engineering

Data engineering builds reliable paths from source events and operational records to analytical tables, features, and governed datasets. The useful through-line is contract first: what is the grain, who owns it, how is it tested, and can it be rebuilt?

## Modelling and SQL

- [Relational Modelling](relational-modelling.md): keys, constraints, and table relationships that protect integrity.
- [SQL](sql.md): joins, aggregation, and window functions as the core analytical transformation language.
- [Dimensional Modelling](dimensional-modelling.md): facts, dimensions, grain, and slowly changing business context.
- [Data Warehouses](data-warehouses.md): curated analytical stores for shared metrics and historical querying.
- [BigQuery](bigquery.md): managed warehouse design with partitioning, clustering, and GoogleSQL.

## Pipelines and Transforms

- [ETL and ELT](etl-and-elt.md): where extraction, loading, and transformation happen.
- [Data Pipelines](data-pipelines.md): production dataflows with sources, transforms, targets, and watermarks.
- [Airflow](airflow.md): orchestration for scheduled, observable task graphs.
- [dbt](dbt.md): versioned SQL models, tests, and warehouse dependency graphs.
- [Batch Versus Streaming](batch-versus-streaming.md): bounded and unbounded processing tradeoffs.

## Governance and Reproducibility

- [Data Contracts](data-contracts.md): producer-consumer agreements for schema, semantics, quality, and ownership.
- [Data Quality](data-quality.md): executable checks that block or warn on invalid data.
- [Data Lineage](data-lineage.md): job and dataset graph metadata for impact analysis.
- [Reproducibility](reproducibility.md): pinned inputs, code, parameters, and output snapshots.

## Storage and ML Interfaces

- [Cloud Storage](cloud-storage.md): object layout for raw, staged, curated, and versioned data assets.
- [Feature Pipelines](feature-pipelines.md): point-in-time model features for training and serving.
