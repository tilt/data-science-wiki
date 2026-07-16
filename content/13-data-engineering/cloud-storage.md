---
title: Cloud Storage
slug: data-engineering/cloud-storage
description: "Object storage layout for raw, staged, curated, and reproducible data assets."
area: data-engineering
topics:
  - cloud-storage
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-pipelines.md
  - bigquery.md
  - reproducibility.md
  - data-warehouses.md
  - ../15-cloud-and-distributed-systems/managed-storage.md
historical_context: false
last_reviewed: 2026-07-11
---

# Cloud Storage

Cloud object storage is the durable file layer behind many lakes, warehouses, exports, and model datasets. In data engineering it is usually not a filesystem replacement; it is an object namespace with explicit paths, metadata, lifecycle policy, and access controls.

## Layout mechanism

A useful layout makes data version, grain, and partition visible:

```text
gs://company-lake/raw/orders/source=stripe/dt=2026-01-01/part-000.jsonl
gs://company-lake/staged/orders/dt=2026-01-01/part-000.parquet
gs://company-lake/curated/fct_orders/v=20260102/part-000.parquet
```

For 73 million rows per month at about 420 bytes per row, the daily partition size is

$$
\frac{73{,}000{,}000\times420}{30\times1024^3}\approx0.95\text{ GiB}.
$$

Targeting roughly 128 MiB files gives $0.95\text{ GiB}/128\text{ MiB}\approx8$ files per day. That is a reasonable starting point for parallel reads. Thousands of tiny files would slow listing and planning; one huge file would underuse parallelism in [data-pipelines](data-pipelines.md).

## Architecture

[BigQuery](bigquery.md) can load from or query files in Google Cloud Storage, while [data-warehouses](data-warehouses.md) often keep curated copies in managed table storage for governance and performance. For [reproducibility](reproducibility.md), use immutable prefixes or object versioning rather than overwriting `latest/` paths.

## Failure modes

Object paths that omit partition keys make backfills and deletion hard. Lifecycle rules can delete raw data before audits or model investigations finish. Treating object storage as a low-latency database creates poor consistency and listing assumptions compared with purpose-built [managed-storage](../15-cloud-and-distributed-systems/managed-storage.md).

## References

- [Google Cloud Storage documentation: About Cloud Storage objects](https://cloud.google.com/storage/docs/objects)
- [Amazon S3 documentation: What is Amazon S3?](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Welcome.html)
- [Amazon S3 documentation: Retaining multiple versions of objects with S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)

> **Section — [Data Engineering](index.md):** ← [BigQuery](bigquery.md) · [Batch Versus Streaming](batch-versus-streaming.md) →
