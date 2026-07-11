---
title: Hypothesis Testing
slug: probability-and-statistics/hypothesis-testing
description: Concise guide to Hypothesis Testing in Probability and Statistics.
area: probability-and-statistics
topics:
  - hypothesis-testing
level: foundational
status: review
page_type: algorithm
aliases: []
prerequisites:
  - index.md
related:
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

Hypothesis testing evaluates whether observed data is surprising under a specified null hypothesis. It is a decision aid, not a substitute for effect-size reasoning or study design.

## Core idea

A test defines a null hypothesis, an alternative, a test statistic, and a rejection rule. The p-value is the probability, under the null, of seeing a result at least as extreme as the observed result.

## Example

An A/B test asks whether a new ranking model changes conversion. The null hypothesis may be no difference in conversion rate. A small p-value suggests the observed difference would be unlikely if the null were true, but it does not measure practical importance.

## Practical workflow

Define the hypothesis before looking at results, choose the unit of analysis, check assumptions, report effect sizes and uncertainty, and account for multiple comparisons when many metrics or segments are tested.

## Failure modes

Common mistakes include treating p-values as the probability the null is true, stopping when results become significant, ignoring small but unimportant effects, and testing many slices without correction.
