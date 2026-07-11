---
title: News Recommendation
slug: domain-applications/news-recommendation
description: Concise guide to News Recommendation in Domain Applications.
area: domain-applications
topics:
  - news-recommendation
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

News recommendation ranks articles for readers under freshness, personalization, editorial, and diversity constraints. It differs from many product recommenders because item value decays quickly and public-interest considerations may matter.

## Core signals

Useful signals include article topic, recency, source, geography, device, reading history, collaborative patterns, editorial priorities, and session context. Candidate generation must include fresh content before enough interaction data exists.

## Example pipeline

A news app may generate candidates from breaking-news feeds, topic subscriptions, collaborative signals, and similar-article retrieval. A ranker scores relevance and engagement, then a final layer enforces diversity across topics and avoids showing too many articles from one source.

## Evaluation

Offline evaluation can test historical clicks and dwell time, but online experiments are needed because ranking changes affect what users see and therefore what feedback is collected. Guardrails should include latency, complaint rate, source diversity, and exposure of important editorial categories.

## Failure modes

News recommenders can create feedback loops, over-personalize, bury important stories, or chase sensational clicks. Freshness and editorial constraints should be explicit rather than patched on after ranking.
