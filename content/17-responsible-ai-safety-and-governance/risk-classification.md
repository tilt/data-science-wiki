---
title: Risk Classification
slug: responsible-ai-safety-and-governance/risk-classification
description: Concise guide to Risk Classification in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - risk-classification
level: intermediate
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

Risk classification sorts AI systems by potential harm, autonomy, domain, data sensitivity, and reversibility. It determines how much review, testing, documentation, and monitoring a system needs.

## Core dimensions

Useful risk classification asks: Who is affected? What decision is influenced? Can the output deny access to important opportunities or services? Is personal or sensitive data used? Can a human reverse the result? Can the system take external actions? How visible is the error to the user?

## Example

A product-title generator is usually lower risk than an automated hiring screener. The hiring system affects employment opportunity, may use sensitive proxies, and requires fairness analysis, human review, auditability, documentation, and stronger monitoring. The title generator still needs brand and safety checks, but the control burden is different.

## Workflow

Classify at project start, before launch, and after major changes. Record the classification, rationale, required controls, and approval owner. Reclassify if the system is reused in a new domain or connected to new tools.

## Failure modes

Risk classification fails when teams classify only the model type rather than the use case, or when a low-risk prototype quietly becomes a high-impact production workflow.
