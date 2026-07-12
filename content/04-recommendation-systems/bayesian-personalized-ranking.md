---
title: Bayesian Personalized Ranking
slug: recommendation-systems/bayesian-personalized-ranking
description: "A pairwise ranking objective for learning from positive-only implicit feedback."
area: recommendation-systems
topics:
  - bayesian-personalized-ranking
level: advanced
status: review
page_type: algorithm
aliases:
  - BPR
prerequisites:
  - implicit-feedback.md
related:
  - implicit-feedback.md
  - weighted-matrix-factorization.md
  - matrix-factorization.md
  - ranking.md
  - image-based-recommendation.md
historical_context: false
last_reviewed: 2026-07-11
---
# Bayesian Personalized Ranking

Bayesian Personalized Ranking trains recommenders from triples: user $u$, observed positive item $i$, and sampled unobserved item $j$. Instead of predicting a rating, it pushes $i$ above $j$, which fits [implicit feedback](implicit-feedback.md) where missing data is not a reliable negative label.

## Defining math

For score $\hat x_{ui}$, BPR maximizes pairwise preference likelihood:

$$
\sum_{(u,i,j)}\log\sigma(\hat x_{ui}-\hat x_{uj})-\lambda\lVert\Theta\rVert^2.
$$

With [matrix factorization](matrix-factorization.md), $\hat x_{ui}=p_u^\top q_i$. The sampled item $j$ is a training negative only for the pairwise comparison, not a claim that the user dislikes it.

## Worked example

```python
import numpy as np
rng = np.random.default_rng(5)
p = 0.1*rng.normal(size=2); qi = 0.1*rng.normal(size=2); qj = 0.1*rng.normal(size=2)
def margin(): return float(p @ (qi - qj))
before = margin()
sig = 1 / (1 + np.exp(before))
p0, qi0, qj0 = p.copy(), qi.copy(), qj.copy()
p += .2 * (sig*(qi0 - qj0) - .01*p0)
qi += .2 * (sig*p0 - .01*qi0)
qj += .2 * (-sig*p0 - .01*qj0)
print("margin_before", round(before, 4))
print("margin_after", round(margin(), 4))
```

Observed output:

```text
margin_before 0.007
margin_after 0.0139
```

One update increases the positive-minus-negative margin. [Weighted matrix factorization](weighted-matrix-factorization.md) uses confidence-weighted squared error instead of pairwise comparisons.

## Caveats

Negative sampling controls what the model learns; sampling only easy negatives can produce weak rankers. BPR still inherits exposure bias because unobserved items may simply never have been shown. Evaluate with top-k [ranking](ranking.md) metrics and inspect popularity skew.

## References

- [Rendle, 2012, BPR: Bayesian Personalized Ranking from Implicit Feedback](https://arxiv.org/abs/1205.2618)
- [He and McAuley, 2015, VBPR](https://arxiv.org/abs/1510.01784)
