---
title: Data Lineage
slug: data-engineering/data-lineage
description: "Metadata that records which jobs read and wrote which datasets."
area: data-engineering
topics:
  - data-lineage
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - data-contracts.md
  - data-quality.md
  - data-pipelines.md
  - dbt.md
  - reproducibility.md
historical_context: false
last_reviewed: 2026-07-11
---
# Data Lineage

Data lineage records how datasets are produced and consumed. Good lineage answers impact questions: if `raw.orders` changed, which [dbt](dbt.md) models, dashboards, [feature-pipelines](feature-pipelines.md), and audits are affected?

## Event mechanism

OpenLineage models jobs, runs, and datasets. I computed a stable short hash for this lineage event so it can be compared with run metadata:

```python
import hashlib, json

event = {
  "job": "dbt.model.analytics.fct_orders",
  "inputs": ["raw.orders", "raw.customers"],
  "outputs": ["analytics.fct_orders"],
  "code_sha": "9f31a2c",
}
print(json.dumps(event, sort_keys=True))
print(hashlib.sha256(json.dumps(event, sort_keys=True).encode()).hexdigest()[:12])
```

Observed output:

```text
{"code_sha": "9f31a2c", "inputs": ["raw.orders", "raw.customers"], "job": "dbt.model.analytics.fct_orders", "outputs": ["analytics.fct_orders"]}
190e1b94e945
```

The event is small, but it captures the essential graph edge: one job version read two input datasets and produced one output dataset. [Airflow](airflow.md) can emit task-level runs; dbt can emit model-level dependencies; [data-pipelines](data-pipelines.md) need both when debugging production incidents.

## Architecture

Lineage should combine static design metadata, runtime observations, and [data-quality](data-quality.md) results. Static lineage says a model is declared to read `raw.orders`; runtime lineage says a specific run read partition `dt=2026-01-01`; quality facets say whether the output was fit to publish. [Data-contracts](data-contracts.md) make the graph actionable by naming owners and allowed changes.

## Failure modes

Table-level lineage is too coarse when one column feeds a regulated metric or model feature. Query-log lineage can miss file-based or API-based transforms. Manual lineage diagrams decay unless generated from code or runtime events.

## References

- [OpenLineage documentation: Object Model](https://openlineage.io/docs/spec/object-model/)
- [dbt documentation: SQL models](https://docs.getdbt.com/docs/build/sql-models)
