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

A batch job can wait until a partition is complete and recompute it. A streaming job needs event time, processing time, a window, and a lateness policy. This toy calculation uses three events in a 10-minute window. Batch sees all events by recomputation; a stream with 5 minutes of allowed lateness misses the event that arrived at 10:12.

```python
events = [("e1", "10:00", "10:01"), ("e2", "10:04", "10:12"), ("e3", "10:08", "10:09")]
batch = sum(1 for _, event, arrival in events if event < "10:10")
stream = sum(1 for _, event, arrival in events if event < "10:10" and arrival <= "10:05")
print("batch_count_10m", batch)
print("stream_count_with_5m_allowed_lateness", stream)
```

Observed output:

```text
batch_count_10m 3
stream_count_with_5m_allowed_lateness 1
```

The streaming number is lower because the completeness decision was made before all event-time records arrived. That may be acceptable for fraud alerts but unacceptable for financial reporting in a [data-warehouse](data-warehouses.md).

## Design choice

Use [Airflow](airflow.md) or a warehouse scheduler for replayable daily/hourly jobs. Use a streaming engine when the decision loses value after seconds or minutes, or when intermediate state must stay continuously warm. Many systems combine both: streaming produces provisional metrics, while batch recomputes authoritative partitions.

## Failure modes

Streaming jobs fail semantically when keys, windows, and watermark policy are not part of the contract. Batch jobs fail when "daily" actually means "whatever arrived before the job started." Both modes need [data-quality](data-quality.md) checks that distinguish missing data from late data.

## References

- [Apache Beam Programming Guide](https://beam.apache.org/documentation/programming-guide/)
- [Apache Airflow documentation: DAGs](https://airflow.apache.org/docs/apache-airflow/stable/core-concepts/dags.html)
