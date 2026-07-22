---
title: Knowledge Graphs
slug: information-retrieval-and-search/knowledge-graphs
description: "Entity-relation graphs that support structured retrieval, joins, and explainable navigation."
area: information-retrieval-and-search
topics:
  - knowledge-graphs
level: advanced
status: complete
page_type: concept
aliases:
  - knowledge graph
prerequisites:
  - index.md
related:
  - graph-based-retrieval.md
  - literature-management-search-systems.md
  - elasticsearch.md
  - hybrid-search.md
historical_context: false
last_reviewed: 2026-07-22
---

# Knowledge Graphs

A knowledge graph stores entities and typed relations as a graph. In search, it supplies structure that text alone cannot: aliases, entity disambiguation, typed filters, relation traversal, and explanations. It is a natural partner for [graph-based retrieval](graph-based-retrieval.md) and [hybrid search](hybrid-search.md).

## Triples and graphs

RDF-style knowledge graphs use triples:

$$
(s,p,o) = (\text{subject},\text{predicate},\text{object}).
$$

A SPARQL-like graph pattern retrieves subjects that satisfy joins over triples. For example, "papers that use BM25 and are evaluated on MS MARCO" is a two-edge conjunction over the same subject.

## Worked example

The table below is a tiny graph: each row is one subject-predicate-object edge. The example then asks for a conjunctive graph pattern rather than a keyword match.

| Subject  | Predicate      | Object            |
| -------- | -------------- | ----------------- |
| `paperA` | `uses`         | `bm25`            |
| `paperA` | `evaluated_on` | `msmarco`         |
| `paperB` | `uses`         | `dense_retrieval` |
| `paperB` | `evaluated_on` | `msmarco`         |

A graph query for "papers that use BM25 and are evaluated on MS MARCO" requires both edges to share the same subject:

```sparql
SELECT ?paper WHERE {
  ?paper uses bm25 .
  ?paper evaluated_on msmarco .
}
```

The result is `paperA`. Lexical search could find both papers for `MS MARCO`, but the graph query enforces the relation pattern: the same paper must both use BM25 and be evaluated on the dataset.

## Where it fits

Knowledge graphs help [literature-management search systems](literature-management-search-systems.md) connect papers, methods, datasets, authors, and notes. They also help [Elasticsearch](elasticsearch.md)-style systems with entity enrichment: a document mentioning `Robertson` can link to the intended researcher, not just the surface string.

## Caveats

Schema design is the hard part. Overly rigid ontologies slow ingestion; overly loose predicates become unqueryable. Entity resolution errors are costly because one wrong merge contaminates every downstream traversal. Keep provenance on edges so users can inspect why a relationship exists.

## References

- [W3C Recommendation: RDF 1.1 Concepts and Abstract Syntax](https://www.w3.org/TR/rdf11-concepts/)
- [W3C Recommendation: SPARQL 1.1 Query Language](https://www.w3.org/TR/sparql11-query/)

> [!nav]
> **Section** — [Information Retrieval and Search](index.md)
>
> [← Graph Based Retrieval](graph-based-retrieval.md) [Literature Management Search Systems →](literature-management-search-systems.md)
