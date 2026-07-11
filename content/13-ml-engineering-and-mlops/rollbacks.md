---
title: Rollbacks
slug: ml-engineering-and-mlops/rollbacks
description: Concise guide to Rollbacks in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - rollbacks
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

A rollback restores a previous known-good behavior after a release causes unacceptable risk or degradation. Rollback planning is part of deployment design, not an emergency improvisation.

## What can be rolled back

In ML systems, rollback may involve code, model artifacts, thresholds, feature definitions, prompts, retrieval indexes, data pipelines, or routing rules. The rollback target must be compatible with current schemas and dependencies.

## Example

A new churn model increases false positives after rollout. A safe rollback returns traffic to the previous model version, restores the previous threshold, and verifies that the feature pipeline still emits fields expected by the old model. If the schema changed, a code rollback alone may fail.

## Rollback checklist

Before launch, define the rollback trigger, owner, command or feature flag, expected recovery time, validation checks, and communication path. After rollback, preserve the failed version for diagnosis rather than deleting evidence.

## Failure modes

Rollbacks fail when database migrations are irreversible, old model artifacts have been removed, cached state is incompatible, or dashboards cannot distinguish old and new behavior.
