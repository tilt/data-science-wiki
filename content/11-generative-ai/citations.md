---
title: Citations
slug: generative-ai/citations
description: "Links from generated claims to the exact retrieved evidence that supports them."
area: generative-ai
topics:
  - citations
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - grounding.md
  - rag.md
  - rag-evaluation.md
  - context-construction.md
  - hallucination-mitigation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Citations

Citations are evidence pointers, not decorations. A cited source must support the specific claim made by the answer. They are strongest when [grounding](grounding.md), [context construction](context-construction.md), and [RAG evaluation](rag-evaluation.md) all operate on stable passage IDs.

## Mechanism

A citation contract can require each factual claim to carry `{claim, source_id, span}`. A validator then checks that the source was retrieved, the span exists, and the claim is semantically supported. [Hallucination mitigation](hallucination-mitigation.md) should treat uncited factual claims as defects, not as style issues.

## Executed artifact

```python
import re

claims = {
    "manager approval required above 500 EUR": "policy-7",
    "shipping is two days": "policy-9",
}
sources = {
    "policy-7": "Manager approval is required above 500 EUR.",
    "policy-9": "Standard shipping is five days.",
}
print("CITATION_SUPPORT")
for claim, source_id in claims.items():
    claim_terms = set(re.findall(r"[a-z0-9]+", claim.lower()))
    source_terms = set(re.findall(r"[a-z0-9]+", sources[source_id].lower()))
    overlap = len(claim_terms & source_terms) / len(claim_terms)
    print(claim, "overlap", round(overlap, 2))
```

Observed output:

```text
CITATION_SUPPORT
manager approval required above 500 EUR overlap 1.0
shipping is two days overlap 0.75
```

The first claim matches its cited policy. The second has high lexical overlap but contradicts the source, showing why lexical checks are only a triage artifact.

## Caveats

Page-level links are too coarse for dense manuals. Citations can also be copied from retrieved context even when the generated sentence says something stronger than the passage.

## References

- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
