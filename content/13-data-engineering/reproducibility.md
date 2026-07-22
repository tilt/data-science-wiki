---
title: Reproducibility
slug: data-engineering/reproducibility
description: "Ability to rebuild a dataset output from pinned inputs, code, parameters, and environment."
area: data-engineering
topics:
  - reproducibility
level: foundational
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-lineage.md
  - data-contracts.md
  - data-quality.md
  - cloud-storage.md
  - ../14-ml-engineering-and-mlops/dataset-versioning.md
historical_context: false
last_reviewed: 2026-07-23
---

# Reproducibility

Reproducibility in data engineering means a table, file set, or feature dataset can be rebuilt from pinned inputs, transformation code, parameters, and environment. It is stricter than "the job usually reruns" because mutable sources and changing business rules can produce different outputs under the same name.

## A reproducibility manifest

A reproducibility manifest should be deterministic and human-reviewable:

```json
{
  "code_sha": "9f31a2c",
  "input_snapshot": "s3://lake/orders/dt=2026-01-01",
  "params": { "currency": "USD" },
  "output": "s3://lake/marts/orders/v=20260102"
}
```

| Manifest field   | Reproducibility role                                  |
| ---------------- | ----------------------------------------------------- |
| `code_sha`       | Pins the transformation logic.                        |
| `input_snapshot` | Pins the source data version or partition.            |
| `params`         | Captures business choices that affect output.         |
| `output`         | Names the immutable result location or table version. |

A hash of this manifest is useful only if the input path is immutable or versioned. [Cloud-storage](cloud-storage.md) prefixes such as `latest/` undermine reproducibility unless object version IDs or table snapshots are captured.

## Architecture

[Data-lineage](data-lineage.md) records which job produced which dataset; reproducibility records enough detail to rebuild it. [Data-contracts](data-contracts.md) pin the expected schema and semantics, while [data-quality](data-quality.md) records whether the rebuilt output still satisfies the contract. For ML, link this metadata to [dataset-versioning](../14-ml-engineering-and-mlops/dataset-versioning.md) so model metrics can be traced to a dataset snapshot.

## Failure modes

Live source tables, overwritten files, non-deterministic sampling, unpinned dependency versions, and unrecorded timezone rules all break reproducibility. Backfills should write a new version or atomically replace a partition with recorded provenance, not mutate history silently.

## References

- [Amazon S3 documentation: Retaining multiple versions of objects with S3 Versioning](https://docs.aws.amazon.com/AmazonS3/latest/userguide/Versioning.html)
- [OpenLineage documentation: Object Model](https://openlineage.io/docs/spec/object-model/)

> [!nav]
> **Section** — [Data Engineering](index.md)
>
> [← Data Lineage](data-lineage.md) [Feature Pipelines →](feature-pipelines.md)
