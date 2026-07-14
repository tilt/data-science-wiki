---
title: Google Cloud Fundamentals
slug: cloud-and-distributed-systems/google-cloud-fundamentals
description: "Google Cloud projects, IAM, regions, services, and billing boundaries for data systems."
area: cloud-and-distributed-systems
topics:
  - google-cloud-fundamentals
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - aws-fundamentals.md
  - managed-compute.md
  - managed-storage.md
  - cost-management.md
  - reliability.md
  - ../13-data-engineering/bigquery.md
historical_context: false
last_reviewed: 2026-07-11
---

# Google Cloud Fundamentals

Google Cloud organizes work around resources in a hierarchy: organization, folders, projects, and then service resources. A project is the common operational boundary for APIs, IAM bindings, quotas, labels, and billing attribution. Compared with [AWS fundamentals](aws-fundamentals.md), the first design question is often "which project owns this workload?" rather than "which account owns it?"

## Architecture contract

The common data/ML path is:

```text
project -> service account -> IAM bindings -> Cloud Storage / BigQuery / Vertex AI / Cloud Run
```

A service account is the workload identity. Cloud Storage holds objects, [BigQuery](../13-data-engineering/bigquery.md) runs analytical SQL, Pub/Sub carries events, Cloud Run or GKE runs services, and Vertex AI can run training or endpoints. [Managed compute](managed-compute.md) and [managed storage](managed-storage.md) are still separate choices: a Cloud Run service with object reads has very different latency and state assumptions from a GKE job attached to a regional disk.

## Executed IAM check

This binding artifact checks a minimal service account for a trainer that reads objects, submits BigQuery jobs, and starts Vertex AI work.

```python
bindings = [
  {"role": "roles/storage.objectViewer",
   "member": "serviceAccount:trainer@wiki-prod.iam.gserviceaccount.com"},
  {"role": "roles/bigquery.jobUser",
   "member": "serviceAccount:trainer@wiki-prod.iam.gserviceaccount.com"},
  {"role": "roles/aiplatform.user",
   "member": "serviceAccount:trainer@wiki-prod.iam.gserviceaccount.com"},
]
print("project_id", "wiki-prod")
print("service_account_roles", ", ".join(b["role"] for b in bindings))
print("role_count", len({b["role"] for b in bindings}))
```

Observed output:

```text
project_id wiki-prod
service_account_roles roles/storage.objectViewer, roles/bigquery.jobUser, roles/aiplatform.user
role_count 3
```

The mechanism is explicit identity-to-role binding. If the same service account also administers projects, deletes buckets, and owns billing exports, [cost management](cost-management.md) and blast-radius control collapse into one credential.

## Caveats

Projects are not environments by themselves; they need labels, folders, billing export, organization policies, and naming conventions. Zonal resources such as VMs and disks cannot be moved casually across zones, while global resources such as networks can hide dependencies across environments. [Reliability](reliability.md) work should therefore document which region or zone a dependency lives in, not only which Google service is used.

## References

- [Google Cloud overview](https://docs.cloud.google.com/docs/overview)
- [Google Cloud resource hierarchy](https://docs.cloud.google.com/resource-manager/docs/cloud-platform-resource-hierarchy)
- [Cloud Storage classes](https://docs.cloud.google.com/storage/docs/storage-classes)
