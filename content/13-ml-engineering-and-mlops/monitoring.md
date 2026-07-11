---
title: Monitoring
slug: ml-engineering-and-mlops/monitoring
description: Concise guide to Monitoring in ML Engineering and MLOps.
area: ml-engineering-and-mlops
topics:
  - monitoring
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - index.md
  - ../05-time-series-and-forecasting/forecast-monitoring.md
historical_context: false
last_reviewed: 2026-07-11
---

## Summary

Monitoring watches production systems for known signals that indicate health, degradation, or risk. For ML, monitoring must include both service health and model-behavior health.

## What to monitor

System metrics include traffic, latency, error rate, saturation, queue depth, and dependency failures. Model metrics include input distributions, missing-feature rates, score distributions, prediction mix, calibration proxies, feedback delay, and business guardrails. The right set depends on the model’s decision and failure cost.

## Example

A credit-risk model should monitor request volume, timeout rate, feature freshness, missing income fields, score distribution by channel, approval-rate changes, and later default outcomes when labels arrive. Alerts should distinguish a system outage from a population shift.

## Alert design

Good alerts are actionable, routed to an owner, and tied to runbooks. Thresholds should account for expected seasonality and low-traffic periods. Dashboards are useful for diagnosis, but alerts should be reserved for conditions that require timely action.

## Failure modes

Monitoring fails when it tracks only infrastructure, uses noisy thresholds, ignores delayed labels, or detects shifts with no path to response.
