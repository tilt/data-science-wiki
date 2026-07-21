---
title: ELK Stack
slug: information-retrieval-and-search/elk-stack
description: "Elasticsearch, Logstash, and Kibana for ingesting, indexing, searching, and visualizing events."
area: information-retrieval-and-search
topics:
  - elk-stack
level: foundational
status: review
page_type: implementation
aliases:
  - Elastic Stack
prerequisites:
  - index.md
related:
  - elasticsearch.md
  - inverted-indexes.md
  - search-evaluation.md
  - ranking-and-retrieval-metrics.md
historical_context: false
last_reviewed: 2026-07-21
---

# ELK Stack

The ELK stack combines Logstash ingest pipelines, [Elasticsearch](elasticsearch.md) indexing/search, and Kibana exploration. Its retrieval problem is operational: find the right events, traces, or logs quickly enough during debugging or incident response. That makes field extraction and time filters as important as [BM25](bm25.md)-style text scoring.

## The pipeline contract

The pipeline contract is:

$$
\text{raw event}\rightarrow\text{parse/enrich}\rightarrow\text{indexed document}\rightarrow\text{query/dashboard}.
$$

Logstash has `input`, `filter`, and `output` sections. Elasticsearch stores parsed events in time-based indices backed by [inverted indexes](inverted-indexes.md) and columnar doc values. Kibana queries and visualizes those fields.

## A Logstash pipeline

This minimal Logstash pipeline follows Elastic's documented configuration structure: read JSON lines from an application log, parse a timestamp, and write to Elasticsearch.

```text
input {
  file {
    path => "/var/log/app/events.jsonl"
    start_position => "beginning"
    codec => "json"
  }
}

filter {
  date {
    match => [ "ts", "ISO8601" ]
    target => "@timestamp"
  }
}

output {
  elasticsearch {
    hosts => [ "http://localhost:9200" ]
    index => "app-events-%{+YYYY.MM.dd}"
  }
}
```

No local Logstash or Elasticsearch cluster was run here; this is a sourced configuration artifact, not an invented execution result.

## Where it fits

ELK search is less like web search and more like filtered evidence retrieval. A useful incident query often combines time range, service, severity, trace ID, and text. [Search evaluation](search-evaluation.md) can still apply, but labels may be incident tickets or postmortem evidence rather than human relevance judgments.

## Caveats

Parsing failures silently damage search. If `user.id`, `trace.id`, or `service.name` is trapped inside an unparsed message string, Kibana filters and aggregations become unreliable. Retention and index lifecycle settings also change what can be retrieved, so operational dashboards should surface missing data as a failure mode, not just empty results.

## References

- [Logstash Reference: Structure of a pipeline](https://www.elastic.co/docs/reference/logstash/configuration-file-structure)
- [Elasticsearch Reference: Match query](https://www.elastic.co/docs/reference/query-languages/query-dsl/query-dsl-match-query)
- [Kibana Reference](https://www.elastic.co/docs/reference/kibana)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Elasticsearch](elasticsearch.md) [Graph Based Retrieval →](graph-based-retrieval.md)
