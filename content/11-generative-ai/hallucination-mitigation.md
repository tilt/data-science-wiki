---
title: Hallucination Mitigation
slug: generative-ai/hallucination-mitigation
description: "Reducing unsupported generated claims through retrieval, constraints, abstention, and evaluation."
area: generative-ai
topics:
  - hallucination-mitigation
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - grounding.md
  - citations.md
  - rag.md
  - llm-as-judge.md
  - guardrails.md
historical_context: false
last_reviewed: 2026-07-20
---

# Hallucination Mitigation

Hallucination mitigation reduces unsupported claims; it does not make a model know truth in the abstract. The strongest controls combine [grounding](grounding.md), [citations](citations.md), constrained answer formats, abstention, and targeted evaluation.

## Mitigation across the pipeline

A practical pipeline retrieves evidence, instructs the model to answer only from that evidence, extracts claims, and checks each claim against cited spans. [LLM-as-judge](llm-as-judge.md) can help label semantic support, but deterministic checks should verify that cited source IDs were actually retrieved and that every required claim has a citation.

Mitigation can happen before generation through better retrieval, during generation through source-grounded prompts and schemas, and after generation through citation validation or abstention. [Guardrails](guardrails.md) decide what happens when support is missing: revise, ask for more evidence, route to a human, or say there is not enough information.

## An answer policy with checks

```json
{
  "answer_policy": "If no cited source supports a claim, say 'I do not have enough evidence.'",
  "checks": ["source_id_seen", "claim_has_citation", "citation_support"],
  "fail_action": "revise_or_abstain",
  "unsupported_claim": {
    "claim": "Refunds are approved in two days.",
    "cited_source": "policy-9",
    "source_says": "up to five business days"
  }
}
```

The artifact separates policy, checks, and failure handling. `source_id_seen` prevents fabricated citations, `claim_has_citation` prevents unsupported assertions from passing silently, and `citation_support` checks whether the cited passage actually entails the claim. In the example, the generated claim says "two days" while the source says "up to five business days", so the correct action is revision or abstention.

## Caveats

Retrieval can introduce false evidence. A fluent answer with citations can still be wrong if the cited passage is irrelevant, stale, or contradicted elsewhere. Reducing hallucination is therefore a system property, not a prompt trick.

## References

- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Citations](citations.md) [RAG Evaluation →](rag-evaluation.md)
