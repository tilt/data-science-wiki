---
title: LLM-as-Judge
slug: experimentation-and-evaluation/llm-as-judge
description: "Using a language model to grade outputs under a rubric, calibrated against human judgment."
area: experimentation-and-evaluation
topics:
  - llm-as-judge
  - human-evaluation
  - generative-ai
level: foundational
status: review
page_type: concept
aliases:
  - "Model-based evaluation"
prerequisites:
  - human-evaluation.md
related:
  - human-evaluation.md
  - paired-evaluation.md
  - abstention.md
  - comparing-generative-ai-and-classical-ml-systems.md
  - ../10-generative-ai/llm-as-judge.md
  - ../10-generative-ai/rag-evaluation.md
historical_context: false
last_reviewed: 2026-07-11
---
# LLM-as-Judge

LLM-as-judge evaluation uses a model to score, classify, critique, or compare outputs from another system. It can scale qualitative review for [RAG evaluation](../10-generative-ai/rag-evaluation.md), but it is not ground truth. The judge prompt, candidate order, rubric, model version, and sampling settings are part of the evaluation artifact.

## Defining statistic

For pairwise judging, compare the judge label $J_i\in\{A,B,\text{tie}\}$ with a human label $H_i$ on an audit sample. Agreement and kappa measure whether judge outputs are usable as a proxy:

$$
\text{agreement}=\frac{1}{n}\sum_i \mathbf 1(J_i=H_i).
$$

This audit should sit next to [human evaluation](human-evaluation.md), not replace it. If the judge chooses the first answer too often, randomize answer order and estimate the bias.

## Worked calculation

```python
import numpy as np
from sklearn.metrics import cohen_kappa_score

human = np.array(["A","A","B","tie","B","A","B","A","tie","B","A","B"])
judge = np.array(["A","B","B","tie","B","A","A","A","tie","B","A","B"])
print(f"agreement {(human == judge).mean():.3f}")
print(f"cohen_kappa {cohen_kappa_score(human, judge):.3f}")
print(f"non_tie_judge_A_share {(judge[judge != 'tie'] == 'A').mean():.3f}")
```

Observed output:

```text
agreement 0.833
cohen_kappa 0.733
non_tie_judge_A_share 0.500
```

The judge agrees with the human labels on 10 of 12 examples and shows no A-side preference in this small audit. That is promising, but too small for a production claim; use [repeated sampling](repeated-sampling.md) and slice audits before trusting automated scores.

## Caveats

LLM judges can reward verbosity, miss subtle factual errors, prefer outputs from similar models, and leak rubric assumptions into prompts. For [abstention](abstention.md), the rubric must penalize both unsafe answers and unnecessary refusals. Keep a blind human audit set to detect drift in judge behavior.

## References

- [Zheng et al., Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena](https://arxiv.org/abs/2306.05685)
- [scikit-learn documentation: cohen_kappa_score](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.cohen_kappa_score.html)
