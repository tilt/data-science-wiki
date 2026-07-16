---
title: Batch Versus Streaming
slug: data-engineering/batch-versus-streaming
description: "Bounded versus unbounded data processing, with different latency and correctness contracts."
area: data-engineering
topics:
  - batch-versus-streaming
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-pipelines.md
  - airflow.md
  - feature-pipelines.md
  - data-quality.md
  - etl-and-elt.md
historical_context: false
last_reviewed: 2026-07-11
---

# Batch Versus Streaming

Batch processing runs over bounded inputs: a date partition, snapshot, or file set. Streaming processing runs over unbounded event streams and must decide how long to wait for late data. The difference is not just latency; it changes the correctness contract for [data-pipelines](data-pipelines.md), [feature-pipelines](feature-pipelines.md), and quality checks.

## Timing mechanism

A batch job can wait until a partition is complete and recompute it. A streaming job needs event time, processing time, a window, and a lateness policy. In a 10-minute event-time window ending at 10:10, these events behave differently:

| Event | Event time | Arrival time | Batch count? | Stream count with 5-minute allowed lateness? |
| ----- | ---------- | ------------ | ------------ | -------------------------------------------- |
| e1    | 10:00      | 10:01        | yes          | yes                                          |
| e2    | 10:04      | 10:12        | yes          | no                                           |
| e3    | 10:08      | 10:09        | yes          | no                                           |

Batch counts all three records when it recomputes the partition. A stream that closes the window at 10:05 only counts e1, because both e2 and e3 arrive after that completeness cutoff. The streaming number is lower because the completeness decision was made before all event-time records arrived. That may be acceptable for fraud alerts but unacceptable for financial reporting in a [data-warehouse](data-warehouses.md).

## Design choice

Use [Airflow](airflow.md) or a warehouse scheduler for replayable daily/hourly jobs. Use a streaming engine when the decision loses value after seconds or minutes, or when intermediate state must stay continuously warm. Many systems combine both: streaming produces provisional metrics, while batch recomputes authoritative partitions.

## Failure modes

Streaming jobs fail semantically when keys, windows, and watermark policy are not part of the contract. Batch jobs fail when "daily" actually means "whatever arrived before the job started." Both modes need [data-quality](data-quality.md) checks that distinguish missing data from late data.

## References

- [Apache Beam Programming Guide](https://beam.apache.org/documentation/programming-guide/)
- [Apache Airflow documentation: DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)

> **Section — [Data Engineering](index.md):** ← [Cloud Storage](cloud-storage.md) · [ETL and ELT](etl-and-elt.md) →
