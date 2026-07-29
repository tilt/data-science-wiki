---
title: Reflection and Reviewer Patterns
slug: generative-ai/reflection-and-reviewer-patterns
description: "A second pass that critiques, verifies, or revises model output before release."
area: generative-ai
topics:
  - reflection-and-reviewer-patterns
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agentic-systems.md
  - multi-agent-systems.md
  - llm-as-judge.md
  - agent-evaluation.md
  - hallucination-mitigation.md
historical_context: false
last_reviewed: 2026-07-29
---

# Reflection and Reviewer Patterns

Reflection and reviewer patterns add a critique step after a draft. The reviewer can be the same model, another model, deterministic validators, or a human. In [multi-agent systems](multi-agent-systems.md), this is the simplest useful role split. The pattern is valuable when the review step has independent evidence or a narrow rubric; otherwise it can become expensive self-reassurance.

## The review loop

The safe pattern gives the reviewer the draft, task, rubric, and evidence, then asks for structured defects rather than vague advice. [LLM-as-judge](llm-as-judge.md) can identify unsupported claims, while deterministic validators check schemas and citations. The [agentic systems](agentic-systems.md) loop decides whether to revise, escalate, or stop.

| Step   | Input                                       | Output                          |
| ------ | ------------------------------------------- | ------------------------------- |
| Draft  | user request, context, tools                | candidate answer or action plan |
| Review | draft, rubric, trusted evidence             | specific defects with locations |
| Repair | draft plus defects                          | revised answer or tool call     |
| Gate   | validators, risk policy, human review rules | release, retry, or escalate     |

The reviewer should be asked for falsifiable checks: unsupported claim, missing citation, schema mismatch, unsafe tool call, contradiction, or incomplete answer. A vague prompt such as "reflect on your answer" often produces style edits rather than evidence-based corrections.

## Reviewer types

| Reviewer                | Good for                                | Weakness                           |
| ----------------------- | --------------------------------------- | ---------------------------------- |
| Same model self-review  | cheap style and completeness pass       | shares blind spots with the draft. |
| Stronger model reviewer | semantic critique and citation checks   | higher cost and latency.           |
| Deterministic validator | schemas, citations, policy gates, tests | cannot judge nuanced prose.        |
| Human reviewer          | high-risk decisions and ambiguous cases | slow and expensive.                |

The best systems combine them: deterministic validators catch exact failures, model reviewers flag semantic defects, and humans handle high-impact uncertainty.

## A defect report

```json
{
  "defects": [
    { "type": "unsupported_claim", "claim": "shipping is two days", "source_id": "policy-9" }
  ],
  "action": "revise"
}
```

## Realistic workflow

For a RAG answer, the draft step writes an answer with citations. The reviewer receives the answer, cited chunks, and a rubric:

```text
Check each factual claim. Mark unsupported, contradicted, missing citation, or okay.
Do not improve style unless a claim defect is present.
```

The repair step then edits only the defective claims or abstains if evidence is missing. This is more reliable than asking the model to "think again," because it converts review into a bounded verification task.

## Evaluation

Measure whether review catches defects that the draft system misses, and whether it introduces new errors. Track false-positive review blocks, unsupported-claim reduction, latency, cost, and escalation rate. Reviewer patterns should be justified by risk or quality gain; they should not be default loops added to every request.

## Caveats

Self-review can rubber-stamp confident errors because the same model may share the same blind spot in both draft and review. Reviewer patterns work best when the reviewer has independent evidence, a narrow rubric, and permission to say "not enough evidence." They are weaker for factuality if retrieval is missing the relevant source; in that case the reviewer can only catch unsupported claims, not recover missing knowledge.

Reviewer loops also add latency and cost. Use them selectively for high-risk tasks, long outputs, tool calls, citations, code generation, or content that will be shown to users without human review.

## References

- [Kim et al., 2023, Prometheus](https://arxiv.org/abs/2310.08491)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)
- [Anthropic Claude docs: Reduce hallucinations](https://docs.anthropic.com/en/docs/test-and-evaluate/strengthen-guardrails/reduce-hallucinations)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Memory](memory.md) [Multi-Agent Systems →](multi-agent-systems.md)
