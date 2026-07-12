---
title: Cold Start Problem
slug: recommendation-systems/cold-start-problem
description: "Recommendation when users, items, or contexts lack interaction history."
area: recommendation-systems
topics:
  - cold-start-problem
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - recommendation-system-overview.md
related:
  - content-based-recommendation.md
  - hybrid-recommenders.md
  - exploration-versus-exploitation.md
  - candidate-generation.md
  - matrix-factorization.md
historical_context: false
last_reviewed: 2026-07-11
---
# Cold Start Problem

Cold start occurs when a recommender lacks enough interaction history for a new user, item, market, or context. Pure [collaborative filtering](collaborative-filtering.md) cannot infer much from an empty row or column, so systems use content, priors, onboarding, or exploration until behavior arrives.

## Defining math

A common serving-time fallback blends content and prior evidence:

$$
s(u,i)=\alpha\,s_{\text{content}}(u,i)+(1-\alpha)\,s_{\text{prior}}(i).
$$

For a new item, $s_{\text{content}}$ might come from metadata or image embeddings; for a new user, it might come from onboarding choices. [Hybrid recommenders](hybrid-recommenders.md) make this blend explicit.

## Worked example

```python
import numpy as np
user_profile = np.array([0.8, 0.2, 0.0])
new_items = np.array([[0.9,0.1,0.0], [0.1,0.2,0.9], [0.5,0.5,0.0]])
content = new_items @ user_profile
popularity = np.array([.30, .70, .40])
score = .75 * content + .25 * popularity
print("content_scores", np.round(content, 3).tolist())
print("blended_rank", np.argsort(-score).tolist())
```

Observed output:

```text
content_scores [0.74, 0.12, 0.5]
blended_rank [0, 2, 1]
```

The first new item wins because content aligns with the user profile, even before collaborative data exists. [Exploration versus exploitation](exploration-versus-exploitation.md) controls how aggressively cold items are exposed for learning.

## Caveats

Cold-start fixes can become popularity defaults that bury new inventory. Onboarding adds friction and can collect noisy stated preferences. Content features may be missing or weak, so track cold-start segments separately in [evaluation](evaluation-of-recommenders.md).

## References

- [Adomavicius and Tuzhilin, 2005, Toward the Next Generation of Recommender Systems](https://doi.org/10.1109/TKDE.2005.99)
- [Koren, Bell, and Volinsky, 2009, Matrix Factorization Techniques for Recommender Systems](https://doi.org/10.1109/MC.2009.263)
