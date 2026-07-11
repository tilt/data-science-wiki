---
title: Technical Decision Records
slug: software-engineering/technical-decision-records
description: Concise guide to Technical Decision Records in Software Engineering.
area: software-engineering
topics:
  - technical-decision-records
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

Technical decision records document important engineering choices, the context behind them, and the consequences the team accepted. They are most valuable when a future reader needs to understand why the system is the way it is.

## Core idea

A decision record should be short and durable. It usually includes status, context, options considered, decision, consequences, and links to evidence. The point is not to win an argument after the fact; it is to preserve the reasoning that would otherwise disappear into chat or memory.

## Example

A team chooses hosted embeddings over self-hosted embeddings for the first release. The record should mention expected traffic, latency target, privacy review, cost estimate, fallback plan, and the condition under which self-hosting will be reconsidered. That is more useful than a vague note saying hosted embeddings are "simpler".

## Step-by-step use

Write a record when a choice is expensive to reverse, affects multiple teams, changes operational risk, or sets a precedent. Mark it proposed while discussing, accepted when implemented, superseded when replaced, and link the replacement record.

## Failure modes

Decision records fail when they are too long, written only for approvals, or never updated after reality contradicts assumptions. Keep them connected to code, runbooks, and evaluation reports.
