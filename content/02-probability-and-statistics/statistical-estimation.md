---
title: Statistical Estimation
slug: probability-and-statistics/statistical-estimation
description: Concise guide to Statistical Estimation in Probability and Statistics.
area: probability-and-statistics
topics:
  - statistical-estimation
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

Statistical estimation uses sample data to infer unknown quantities about a population or data-generating process. It connects observed data to parameters, uncertainty, and decisions.

## Core idea

An estimator is a rule that maps data to an estimate. The sample mean estimates a population mean; a fitted regression coefficient estimates an association; a model metric estimates future performance. Good estimators are judged by bias, variance, consistency, robustness, and relevance to the target decision.

## Example

To estimate average delivery time, compute the mean from sampled deliveries. The estimate is only meaningful if the sample reflects the deliveries you care about: geography, time period, service type, and outlier handling all affect the target.

## Practical workflow

Define the estimand first, choose the sampling process, compute the estimate, quantify uncertainty, and check sensitivity to assumptions. In ML evaluation, the estimand might be future error rate on a specific deployment population.

## Failure modes

Estimation fails when the target is vague, sampling is biased, data is dependent, measurement changes over time, or uncertainty is omitted from reporting.
