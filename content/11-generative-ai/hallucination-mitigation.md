---
title: Hallucination Mitigation
slug: generative-ai/hallucination-mitigation
description: "Reducing unsupported generated claims through retrieval, constraints, abstention, and evaluation."
area: generative-ai
topics:
  - hallucination-mitigation
level: intermediate
status: complete
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
  - rag-evaluation.md
  - context-construction.md
historical_context: false
last_reviewed: 2026-07-29
---

# Hallucination Mitigation

Hallucination mitigation reduces unsupported claims; it does not make a model know truth in the abstract. The strongest controls combine [grounding](grounding.md), [citations](citations.md), constrained answer formats, abstention, and targeted evaluation. In production, the goal is usually not "never be wrong"; it is "make unsupported claims detectable and less likely to reach the user."

## Mitigation across the pipeline

A practical pipeline retrieves evidence, instructs the model to answer only from that evidence, extracts claims, and checks each claim against cited spans. [LLM-as-judge](llm-as-judge.md) can help label semantic support, but deterministic checks should verify that cited source IDs were actually retrieved and that every required claim has a citation.

Mitigation can happen before generation through better retrieval, during generation through source-grounded prompts and schemas, and after generation through citation validation or abstention. [Guardrails](guardrails.md) decide what happens when support is missing: revise, ask for more evidence, route to a human, or say there is not enough information.

## Mitigation levers

| Lever              | What it reduces                   | Example                                                                              |
| ------------------ | --------------------------------- | ------------------------------------------------------------------------------------ |
| Better retrieval   | missing or stale evidence         | retrieve current policy version before answering.                                    |
| Context discipline | evidence overload and distractors | pack only the top cited chunks into [context construction](context-construction.md). |
| Constrained format | unsupported free-form claims      | require each answer bullet to cite a source ID.                                      |
| Abstention policy  | confident guesses                 | answer "not enough evidence" when no source supports the claim.                      |
| Claim checking     | subtle contradictions             | compare generated claims against cited spans.                                        |
| Evaluation slices  | hidden domain failures            | test by policy version, language, jurisdiction, and topic.                           |

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

## Realistic failure analysis

Suppose a support assistant says:

```text
Enterprise refunds above 5000 EUR are automatically approved within two days.
```

The cited policy says:

```text
Enterprise refunds above 5000 EUR require finance approval and may take up to five business days.
```

This is not a retrieval miss; the right evidence was present. It is a generation or citation-support failure. The fix is not necessarily a larger retriever. Better interventions are claim-level validation, a stricter answer schema, or a prompt that requires quoting the approval condition before summarizing it.

If the retrieved context instead contained only a general refund overview, the failure would be upstream retrieval or [RAG evaluation](rag-evaluation.md). Separating these cases prevents teams from tuning the wrong component.

## Measuring hallucination mitigation

Measure unsupported-claim rate, citation precision, citation recall for required claims, abstention accuracy, and answer usefulness. A system that abstains on every hard question has low hallucination but poor utility. A system that always answers has high utility but may be unsafe. The product target should define the trade-off.

## Caveats

Retrieval can introduce false evidence. A fluent answer with citations can still be wrong if the cited passage is irrelevant, stale, or contradicted elsewhere. Reducing hallucination is therefore a system property, not a prompt trick. For high-stakes domains, unsupported answers should fail closed rather than be softened with vague disclaimers.

## References

- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)
- [Lewis et al., 2020, Retrieval-Augmented Generation](https://arxiv.org/abs/2005.11401)
- [OWASP Top 10 for LLM Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Citations](citations.md) [RAG Evaluation →](rag-evaluation.md)
