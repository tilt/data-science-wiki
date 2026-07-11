---
title: Embeddings
slug: natural-language-processing/embeddings
description: Concise guide to Embeddings in Natural Language Processing.
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
  - index.md
historical_context: false
last_reviewed: 2026-07-11
---
## Summary

NLP embeddings represent tokens, sentences, or documents as vectors so semantic or syntactic relationships can be compared numerically. They are the bridge between text and vector-based modelling.

## NLP scope

Word embeddings capture distributional similarity between words. Sentence and document embeddings support semantic search, clustering, classification, duplicate detection, and retrieval features. Contextual embeddings change depending on surrounding text.

## Mechanism

An embedding is a learned vector representation:

$$
e_i = E[t_i],
$$

where $E$ is an embedding table or encoder and $t_i$ is a token, span, sentence, or document. Static embeddings assign one vector per token type. Contextual encoders compute a representation from surrounding text, so the same word can receive different vectors in different sentences.

Similarity is often measured with a dot product or cosine similarity:

$$
\operatorname{cos}(u,v)=\frac{u^\top v}{\lVert u\rVert \lVert v\rVert}.
$$

## Example

The word "bank" should have different contextual representations in "river bank" and "bank loan." Modern encoder models can produce embeddings that reflect this context better than static word vectors.

## Failure modes

Embeddings can encode bias, domain mismatch, language imbalance, or superficial similarity. Always evaluate them on the downstream task rather than assuming nearest neighbors are meaningful.
