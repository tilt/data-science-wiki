---
title: BigQuery
slug: data-engineering/bigquery
description: "Google's serverless analytical warehouse for partitioned, clustered SQL workloads."
area: data-engineering
topics:
  - bigquery
level: intermediate
status: review
page_type: implementation
aliases: []
prerequisites:
  - index.md
related:
  - data-warehouses.md
  - sql.md
  - dimensional-modelling.md
  - dbt.md
  - cloud-storage.md
historical_context: false
last_reviewed: 2026-07-11
---

# BigQuery

BigQuery is a managed analytical [data-warehouse](data-warehouses.md): users submit GoogleSQL, while Google manages storage, execution, and scaling. For data engineering, the design surface is table layout, query semantics, access policy, and cost control by bytes processed.

## Table layout contract

The artifact below is a real BigQuery DDL pattern for an events table partitioned by event date and clustered by high-selectivity columns used in filters and joins:

```sql
create table analytics.events
(
  event_id string not null,
  user_id string,
  event_ts timestamp not null,
  event_name string,
  properties json
)
partition by date(event_ts)
cluster by user_id, event_name;
```

Partitioning limits which date slices are scanned; clustering co-locates similar values inside partitions so filters on `user_id` or `event_name` can prune more data. This matters when [dbt](dbt.md) incrementally builds [dimensional-modelling](dimensional-modelling.md) facts from event data.

## Query mechanism

BigQuery's dialect supports standard analytical [SQL](sql.md): joins, arrays, structs, window functions, `qualify`, and DDL. The physical engine is columnar and serverless, so a query that selects three columns from a partitioned table can be much cheaper than `select *` over all dates. External tables and load jobs often start from files in [cloud-storage](cloud-storage.md), but operational marts should make ownership, partition expiration, and access rules explicit.

## Failure modes

Unpartitioned append-only event tables make routine date filters expensive. Partitioning on ingestion time instead of event time can produce incorrect business windows when events arrive late. Clustering fields should match common filters; clustering on a near-unique field that is rarely filtered adds maintenance cost without much pruning.

## References

- [BigQuery documentation: GoogleSQL query syntax](https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax)
- [BigQuery documentation: Introduction to partitioned tables](https://cloud.google.com/bigquery/docs/partitioned-tables)
- [BigQuery documentation: Introduction to clustered tables](https://cloud.google.com/bigquery/docs/clustered-tables)

> **Section — [Data Engineering](index.md):** ← [Data Warehouses](data-warehouses.md) · [Cloud Storage](cloud-storage.md) →
