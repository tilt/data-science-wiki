---
title: Fairness
slug: responsible-ai-safety-and-governance/fairness
description: Concise guide to Fairness in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - fairness
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

Fairness examines whether an AI system creates unjustified differences in outcomes or error rates across people, groups, or contexts. It is a socio-technical property, not a single metric.

## Core idea

Fairness work starts by identifying who may be harmed and how. Then the team defines relevant groups, labels, outcomes, metrics, constraints, and review processes. Common measurements include selection rates, false positive rates, false negative rates, calibration by group, and distribution of benefits or burdens.

## Example

A fraud model may reduce chargebacks overall while falsely blocking more transactions from a region with different purchasing patterns. The team should examine error rates by segment, understand whether the feature set encodes regional proxies, and decide whether thresholds, features, training data, or review workflows need changes.

## Practical cautions

Fairness metrics can conflict. Equalizing one metric may worsen another, and group labels may be incomplete or sensitive. Document the chosen fairness target, the reason for it, and the residual risk.

## Failure modes

Fairness fails when teams check only aggregate accuracy, ignore affected users without labels, or treat a metric threshold as proof that no harm exists.
