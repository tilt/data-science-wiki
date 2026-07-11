---
title: Confidence Intervals
slug: probability-and-statistics/confidence-intervals
description: Concise guide to Confidence Intervals in Probability and Statistics.
area: probability-and-statistics
topics:
  - confidence-intervals
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

A confidence interval is a procedure that gives a range of plausible parameter values with a specified long-run coverage rate. It communicates estimation uncertainty, not a guarantee about one realized interval.

## Core idea

A 95 percent confidence interval means that if the same sampling procedure were repeated many times, about 95 percent of the constructed intervals would contain the true parameter. After one interval is observed, the true parameter is fixed; the procedure is what has coverage.

## Example

If a survey estimates conversion at 12 percent with a 95 percent interval of 10-14 percent, the data is compatible with values in that range under the model assumptions. It does not mean there is a 95 percent probability that this specific interval contains the true value in frequentist interpretation.

## Practical use

Confidence intervals are more informative than point estimates alone because they show uncertainty and sample-size limitations. They are useful for model metrics, experiment effects, error rates, and business estimates.

## Failure modes

Intervals can be invalid under biased sampling, dependence, optional stopping, incorrect variance estimates, or distribution shift. Narrow intervals around a biased estimate are still misleading.
