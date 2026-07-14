---
title: Human Evaluation
slug: experimentation-and-evaluation/human-evaluation
description: "Reviewer-based evaluation for outputs where automatic labels or metrics are insufficient."
area: experimentation-and-evaluation
topics:
  - human-evaluation
  - inter-rater-agreement
  - rubrics
level: intermediate
status: review
page_type: concept
aliases:
  - "Human review"
prerequisites:
  - golden-datasets.md
related:
  - llm-as-judge.md
  - paired-evaluation.md
  - golden-datasets.md
  - risk-weighted-error-taxonomies.md
  - ../14-ml-engineering-and-mlops/human-in-the-loop-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# Human Evaluation

Human evaluation uses trained reviewers when the target behavior is open-ended, subjective, safety-sensitive, or not fully captured by automatic labels. It is central for summaries, support answers, refusal quality, and severity labels in [risk-weighted error taxonomies](risk-weighted-error-taxonomies.md). It also provides the audit sample for [LLM-as-judge](llm-as-judge.md).

## Defining statistic

Raw agreement is the observed matching rate between reviewers:

$$
p_o=\frac{1}{n}\sum_i \mathbf 1\{r_{1i}=r_{2i}\}.
$$

Raw agreement is not enough because reviewers can agree by chance. Cohen's kappa adjusts observed agreement $p_o$ by expected agreement $p_e$:

$$
\kappa=\frac{p_o-p_e}{1-p_e}.
$$

The rubric should define observable criteria, examples, tie-breaking rules, and escalation for ambiguous cases. When two systems are compared, use [paired evaluation](paired-evaluation.md) so reviewers judge outputs for the same inputs.

## Worked calculation

Two reviewers label twelve examples as pass or fail:

| result                           | count |
| -------------------------------- | ----: |
| both pass                        |     6 |
| both fail                        |     3 |
| reviewer 1 pass, reviewer 2 fail |     2 |
| reviewer 1 fail, reviewer 2 pass |     1 |

Raw agreement is $(6+3)/12=0.750$. The label margins imply substantial chance agreement, so Cohen's kappa drops to 0.500. The three disagreement cases should be reviewed against the rubric before treating the labels as a stable [golden dataset](golden-datasets.md).

## Caveats

Reviewer fatigue, order effects, unclear rubrics, and hidden system identity can dominate measured quality. Domain experts may be required for legal, medical, financial, or safety labels. Report reviewer counts, sampling rules, adjudication process, and agreement, not only the final average score.

## References

- [scikit-learn documentation: cohen_kappa_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html)
- [NIST AI Risk Management Framework](https://www.nist.gov/itl/ai-risk-management-framework)
