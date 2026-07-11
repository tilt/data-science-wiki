---
title: PII Leakage
slug: responsible-ai-safety-and-governance/pii-leakage
description: Concise guide to PII Leakage in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - pii-leakage
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

PII leakage occurs when a system exposes personally identifiable information to users, logs, tools, model providers, or downstream systems that should not receive it. It is both a privacy and security failure.

## Leakage paths

PII can leak through prompts, retrieved documents, generated answers, debug logs, traces, analytics events, model training data, screenshots, support tickets, or tool calls. Generative systems add risk because they may transform or repeat sensitive text in unexpected ways.

## Example

A document assistant indexes HR files. If retrieval permissions are checked only at upload time, a later user may ask a broad question and receive another employee's salary details. The failure is not just generation; it is retrieval authorization and output control.

## Controls

Use data minimization, access control, redaction, purpose-specific logging, retention limits, permission-aware retrieval, output filters, and privacy review for new data flows. Test with realistic sensitive examples.

## Failure modes

PII controls fail when teams redact only obvious patterns, log raw prompts for debugging, or assume that internal tools are safe places for unrestricted personal data.
