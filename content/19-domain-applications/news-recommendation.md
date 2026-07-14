---
title: News Recommendation
slug: domain-applications/news-recommendation
description: "Ranking fresh articles under personalization, editorial, diversity, and feedback-loop constraints."
area: domain-applications
topics:
  - application
  - news-recommendation
level: intermediate
status: review
page_type: case-study
aliases: []
prerequisites:
  - index.md
related:
  - ../04-recommendation-systems/retrieval-and-ranking-architectures.md
  - ../04-recommendation-systems/candidate-generation.md
  - ../04-recommendation-systems/ranking.md
  - ../04-recommendation-systems/evaluation-of-recommenders.md
  - ../04-recommendation-systems/feedback-loops.md
  - ../17-experimentation-and-evaluation/online-experiments.md
historical_context: false
last_reviewed: 2026-07-11
---

# News Recommendation

News recommendation ranks articles for readers under freshness, personalization, editorial, source-diversity, and public-interest constraints. Inputs include article text, section, entities, source, publish time, geography, reading history, subscriptions, device, and session context. Targets may be click, dwell, save, complaint, subscription retention, or editorially defined exposure.

## Framing

Most systems use [retrieval and ranking architectures](../04-recommendation-systems/retrieval-and-ranking-architectures.md): [candidate generation](../04-recommendation-systems/candidate-generation.md) pulls breaking, subscribed, similar, and collaborative candidates; [ranking](../04-recommendation-systems/ranking.md) scores them; a final policy enforces freshness and diversity. Offline [evaluation of recommenders](../04-recommendation-systems/evaluation-of-recommenders.md) can use historical impressions, but the live system changes what feedback exists, so [online experiments](../17-experimentation-and-evaluation/online-experiments.md) need guardrails for latency, complaints, source concentration, and important-topic exposure.

MIND is a canonical public news recommendation artifact. The project page says it contains about 160,000 English news articles and more than 15 million impression logs from 1 million users, with article text, categories, entities, clicks, non-clicks, and histories.

## Worked Ranking Check

This toy ranking checks [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md) and [source coverage](../17-experimentation-and-evaluation/coverage.md) for five candidate articles:

| rank | article gain | source  |
| ---: | -----------: | ------- |
|    1 |            3 | local   |
|    2 |            2 | local   |
|    3 |            2 | wire    |
|    4 |            1 | opinion |
|    5 |            0 | wire    |

The ranked gains are already in ideal order, so [NDCG](../12-information-retrieval-and-search/precision-recall-map-mrr-ndcg.md)@5 is 1.0. The list covers three unique sources, but local and wire each appear twice. That is acceptable only if the editorial policy allows it; a real news ranker should report diversity and coverage beside relevance.

## Failure Modes

Fresh articles suffer cold start, sensational items can create [feedback loops](../04-recommendation-systems/feedback-loops.md), and narrow personalization can bury major public-interest stories. Click labels can also encode position bias and headline style rather than reader value. Keep an editorial override path and measure exposure by source, section, geography, and recency.

## References

- [MIND: MIcrosoft News Dataset](https://msnews.github.io/)
- [Wu et al., MIND: A Large-scale Dataset for News Recommendation](https://aclanthology.org/2020.acl-main.331/)
