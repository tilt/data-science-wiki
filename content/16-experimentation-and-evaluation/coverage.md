---
title: Coverage
slug: experimentation-and-evaluation/coverage
description: Concise guide to Coverage in Experimentation and Evaluation.
area: experimentation-and-evaluation
topics:
  - coverage
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
# Coverage

## Summary

Coverage measures which cases, sources, classes, users, or scenarios an evaluation or system actually reaches. It prevents averages from hiding untested areas.

## Step-by-step example

A RAG evaluation may have high answer quality on HR policies but no questions about benefits, legal exceptions, or non-English documents.

## Common failure modes

- Reporting high aggregate accuracy while entire classes, languages, regions, or risk scenarios are absent.
- Counting examples rather than distinct cases; many near-duplicates can create fake coverage.
- Measuring input coverage but not decision coverage, such as rare thresholds or fallback paths.
- Treating coverage as quality; a covered scenario can still be poorly handled.
