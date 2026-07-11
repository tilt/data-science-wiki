---
title: Error Taxonomies
slug: responsible-ai-safety-and-governance/error-taxonomies
description: Concise guide to Error Taxonomies in Responsible AI, Safety, and Governance.
area: responsible-ai-safety-and-governance
topics:
  - error-taxonomies
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
# Error Taxonomies

## Summary

Error taxonomies classify failures by type, cause, and severity so teams can prioritize fixes and monitor risk. They make evaluation more actionable than a single score.

## Step-by-step example

A generated answer error may be retrieval failure, unsupported claim, wrong calculation, privacy leak, refusal failure, or formatting error.

## Design check

A useful taxonomy separates cause from symptom. For a RAG assistant, 'wrong answer' is too broad; unsupported claim, stale source, wrong entity, missing citation, unsafe advice, and retrieval miss lead to different fixes.
