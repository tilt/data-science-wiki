---
title: Adversarial Evaluation
slug: responsible-ai-safety-and-governance/adversarial-evaluation
description: Concise guide to Adversarial Evaluation in Responsible AI, Safety,
  and Governance.
area: responsible-ai-safety-and-governance
topics:
  - adversarial-evaluation
level: advanced
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
# Adversarial Evaluation

## Summary

Adversarial evaluation tests a system with inputs designed to expose safety, security, robustness, or policy failures. It complements average-case evaluation.

## Step-by-step example

For a RAG assistant, adversarial cases can include prompt injection in retrieved documents, ambiguous user requests, and attempts to extract private data.

## Scope

Adversarial evaluation is most useful when ordinary test sets are too polite. It should include malicious inputs, confusing edge cases, policy-boundary cases, prompt-injection attempts, privacy probes, and examples based on prior incidents. The goal is not to prove the system safe; it is to find specific failures before users or attackers do.
