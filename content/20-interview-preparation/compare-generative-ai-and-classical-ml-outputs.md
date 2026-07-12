---
title: How can outputs from generative-AI information systems be compared with outputs from classical ML systems?
slug: interview-preparation/compare-generative-ai-and-classical-ml-outputs
description: Interview prompt that links to the canonical evaluation comparison topic page.
area: interview-preparation
topics:
  - "interview-question"
  - "evaluation"
  - "generative-ai"
level: intermediate
status: review
page_type: interview-question
aliases: []
prerequisites:
  - "../16-experimentation-and-evaluation/golden-datasets.md"
related:
  - "../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md"
  - "../16-experimentation-and-evaluation/golden-datasets.md"
  - "../16-experimentation-and-evaluation/paired-evaluation.md"
  - "../10-generative-ai/rag-evaluation.md"
  - "../03-classical-machine-learning/evaluation-metrics.md"
  - evaluation.md
  - generative-ai.md
historical_context: false
last_reviewed: 2026-07-11
---
# How can outputs from generative-AI information systems be compared with outputs from classical ML systems?

## Answer

Compare systems by the workflow decision and risk, not by whether the output is fluent text or a fixed label. Use shared measures such as correctness, cost, latency, calibration, coverage, and user impact, then add generative-specific checks for groundedness, citation support, instruction following, schema validity, refusal quality, and unsafe tool behavior.

## What a strong answer adds

1. Start with the decision: triage, search, recommendation, forecast, support response, or action.
2. Use the same examples where possible through [golden datasets](../16-experimentation-and-evaluation/golden-datasets.md) or [paired evaluation](../16-experimentation-and-evaluation/paired-evaluation.md).
3. Keep shared [evaluation metrics](../03-classical-machine-learning/evaluation-metrics.md) when outputs overlap: accuracy, precision, recall, calibration, ranking quality, latency, and cost.
4. Add generative checks: factual support, citation correctness, groundedness, schema validity, refusal behavior, and severe-error rate.
5. Compare failures by severity and recoverability, not only by average score.

## Interview artifact

For document triage, a classical model might output `{label: "legal", probability: 0.82}`. A generative system might output a label, rationale, extracted fields, citations, and a suggested next action. Compare label accuracy for both systems, then separately score the generative rationale for support in cited spans, field validity, and whether the suggested action is allowed. This is the interview version of [Comparing Generative AI and Classical ML Systems](../16-experimentation-and-evaluation/comparing-generative-ai-and-classical-ml-systems.md).

## Common follow-ups

- **"Which system is better?"** The one with lower risk-adjusted error and better workflow utility under cost, latency, and maintenance constraints.
- **"Can LLM-as-judge replace labels?"** It can help grade semantic qualities, but high-risk claims still need human review, deterministic checks, or source-grounded rubrics.
- **"What would block launch?"** Unsupported claims, malformed outputs feeding downstream systems, poor refusal behavior, degraded calibration, or unacceptable errors in high-risk slices.

## Canonical links

Use [Evaluation](evaluation.md) for the interview evaluation map, [Generative AI](generative-ai.md) for the system-design map, and [RAG Evaluation](../10-generative-ai/rag-evaluation.md) for grounded answer checks.

## References

- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
- [scikit-learn User Guide: Metrics and scoring](https://scikit-learn.org/stable/modules/model_evaluation.html)
