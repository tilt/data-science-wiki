---
title: Embeddings
slug: natural-language-processing/embeddings
description: "Vector representations that make tokens, spans, sentences, or documents comparable by geometry."
area: natural-language-processing
topics:
  - embeddings
level: intermediate
status: review
page_type: concept
aliases: []
prerequisites:
  - index.md
related:
  - tokenization.md
  - semantic-textual-similarity.md
  - bert-style-encoders.md
  - text-classification.md
  - ../11-information-retrieval-and-search/dense-retrieval.md
historical_context: false
last_reviewed: 2026-07-11
---
# Embeddings

Embeddings represent linguistic objects as vectors so that distances, dot products, and downstream models can operate on text. Static word embeddings assign one vector per token type; contextual [bert-style encoders](bert-style-encoders.md) compute different vectors for the same token in different contexts. Sentence and document embeddings power [semantic textual similarity](semantic-textual-similarity.md), clustering, [text classification](text-classification.md), and dense retrieval.

## Defining mechanism

An embedding table maps token ids from [tokenization](tokenization.md) to rows of a learned matrix:

$$
e_i = E[t_i].
$$

Distributional embeddings are useful because words appearing in similar contexts receive similar rows. Similarity is often measured with cosine:

$$
\operatorname{cos}(u,v)=\frac{u^\top v}{\lVert u\rVert\lVert v\rVert}.
$$

Contextual encoders replace the table lookup with a function $h_i=f_\theta(t_{1:n},i)$ that conditions on surrounding tokens.

## Worked example

```python
import numpy as np

np.random.seed(7)
corpus = ["cat animal pet sleeps", "dog animal pet runs",
          "invoice payment bank posted", "refund payment bank approved"]
words = sorted(set(" ".join(corpus).split()))
idx = {w: i for i, w in enumerate(words)}
C = np.zeros((len(words), len(words)))
for doc in corpus:
    toks = doc.split()
    for i, w in enumerate(toks):
        for j in range(max(0, i - 2), min(len(toks), i + 3)):
            if i != j:
                C[idx[w], idx[toks[j]]] += 1
P = C / C.sum()
PPMI = np.maximum(np.log2((P + 1e-12) / (P.sum(1, keepdims=True) @ P.sum(0, keepdims=True) + 1e-12)), 0)
def cos(a, b):
    return float(a @ b / (np.linalg.norm(a) * np.linalg.norm(b)))
for a, b in [("cat", "dog"), ("invoice", "refund"), ("cat", "invoice")]:
    print(f"cos({a},{b})", round(cos(PPMI[idx[a]], PPMI[idx[b]]), 3))
print("cat_top_contexts", [words[i] for i in np.argsort(PPMI[idx["cat"]])[-3:][::-1]])
```

Observed output:

```text
cos(cat,dog) 1.0
cos(invoice,refund) 1.0
cos(cat,invoice) 0.0
cat_top_contexts ['pet', 'animal', 'sleeps']
```

This tiny PPMI embedding makes `cat` and `dog` close because their context vectors share `animal` and `pet`; it separates them from invoice words.

## Caveats

Embedding geometry reflects the training corpus, objective, and tokenizer. Nearest neighbors can encode popularity, bias, formatting artifacts, or domain leakage rather than meaning. Always validate embeddings on the task they serve, whether [semantic textual similarity](semantic-textual-similarity.md), [entity linking and matching](entity-linking-and-matching.md), or retrieval.

## References

- [Mikolov et al., Efficient Estimation of Word Representations in Vector Space](https://arxiv.org/abs/1301.3781)
- [Jurafsky and Martin, Speech and Language Processing, 3rd ed. draft](https://web.stanford.edu/~jurafsky/slp3/)
- [scikit-learn API: cosine_similarity](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html)
