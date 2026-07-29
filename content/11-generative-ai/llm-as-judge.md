---
title: LLM-as-Judge
slug: generative-ai/llm-as-judge
description: "Using a model to grade model outputs under a rubric, with calibration, schemas, and human audits."
area: generative-ai
topics:
  - llm-as-judge
level: intermediate
status: complete
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - agent-evaluation.md
  - rag-evaluation.md
  - hallucination-mitigation.md
  - structured-output.md
  - guardrails.md
  - grounding.md
historical_context: false
last_reviewed: 2026-07-29
---

# LLM-as-Judge

LLM-as-judge uses a model to grade outputs for qualities such as helpfulness, citation support, rubric fit, safety compliance, or task completion. It can accelerate [agent evaluation](agent-evaluation.md) and [rag evaluation](rag-evaluation.md), but it is still a model call that needs calibration against human labels. It is a measurement tool, not an oracle.

## Building and calibrating a judge

A judge prompt should include the task, candidate answer, evidence, rubric, and required output schema. The judge should return structured fields that can be aggregated: score, pass/fail, violated rubric item, explanation, confidence, and whether human review is required. For a score $s \in \{0,1,2,3\}$, track agreement with human labels and inspect disagreements by task category.

Use [structured output](structured-output.md) so judge results can be parsed and compared across model versions. Keep the rubric narrow: a citation-support judge should not also grade tone, completeness, and policy risk unless the schema separates those dimensions.

Calibration is the difference between a convenient judge and a useful evaluator. If 100 human-labeled examples contain 20 unsupported answers and the judge flags only 12, the judge is missing 8 failures before it ever reaches production traffic. Track confusion matrices, disagreement examples, and score drift across model versions instead of trusting the average score alone.

## What judges are good at

| Judge task             | Fit                        | Notes                                                             |
| ---------------------- | -------------------------- | ----------------------------------------------------------------- |
| Rubric adherence       | good                       | works when the rubric is explicit and examples are calibrated.    |
| Citation support       | medium to good             | needs source text and narrow claim checks.                        |
| Tone and helpfulness   | good but subjective        | compare against human preference labels.                          |
| Tool-policy compliance | poor if purely model-based | deterministic trace checks should own tool names and permissions. |
| Numeric correctness    | poor                       | use calculators or exact validators.                              |
| Safety triage          | useful as one signal       | should not be the only enforcement mechanism.                     |

Use judges where semantic judgment is needed. Use code where exact checks are possible.

## A structured judge result

```json
{
  "score": 1,
  "rubric": "citation_support",
  "claim_checked": "Enterprise refunds are approved within two days.",
  "evidence_result": "unsupported",
  "reason": "The cited source says approval can take up to five business days.",
  "requires_human_review": true
}
```

The artifact is useful because it separates the score from the checked claim and the evidence result. That makes it possible to audit whether the judge found the right source mismatch rather than merely assigning a low number.

## Calibration workflow

1. Create a small human-labeled gold set with clear rubric labels.
2. Run the judge with structured output.
3. Compare judge labels to human labels with a confusion matrix.
4. Inspect disagreements by category: unsupported claims, subtle contradictions, verbosity bias, safety edge cases.
5. Revise the rubric and examples, not only the judge model.
6. Freeze a judge version for regression tracking.
7. Recalibrate when the judge model, task distribution, or rubric changes.

For citation support, the judge should receive the claim and cited source span, not the whole conversation. Narrow inputs make the task more reliable and easier to audit.

## Realistic failure

A judge grades this answer as high quality because it is fluent:

```text
The refund should be approved within two days, according to the policy.
```

The cited source says:

```text
Refund review can take up to five business days.
```

If the judge rubric says only "is the answer helpful?", the score may be high. If the rubric says "does every factual claim follow from the cited evidence?", the answer should fail. Judge quality is often rubric quality.

## Caveats

Judges can prefer verbose answers, miss domain-specific errors, leak answer-order bias, or over-trust confident writing. Keep gold human labels, adversarial examples, and periodic human audits. A judge score is an evaluation signal, not proof that an answer is correct. Never let a judge approve irreversible tool actions without deterministic policy checks.

## References

- [OpenAI API documentation: Graders](https://platform.openai.com/docs/guides/graders)
- [Kim et al., 2023, Prometheus](https://arxiv.org/abs/2310.08491)
- [OpenAI API documentation: Evals](https://platform.openai.com/docs/guides/evals)

> [!nav]
> **Section** — [Generative AI and Agentic Systems](index.md)
>
> [← Agent Evaluation](agent-evaluation.md) [Multimodal Models →](multimodal-models.md)
