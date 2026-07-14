---
title: OCR and Handwritten Text Recognition
slug: natural-language-processing/ocr-and-handwritten-text-recognition
description: "Recognizing printed or handwritten text from images and measuring transcription error."
area: natural-language-processing
topics:
  - ocr-and-handwritten-text-recognition
level: intermediate
status: review
page_type: system-design
aliases: []
prerequisites:
  - index.md
related:
  - document-understanding.md
  - text-preprocessing.md
  - information-extraction.md
  - tokenization.md
  - evaluation-of-nlp-systems.md
historical_context: false
last_reviewed: 2026-07-11
---

# OCR and Handwritten Text Recognition

OCR and handwritten text recognition convert page images into machine-readable text. In an NLP pipeline, OCR output becomes input to [text preprocessing](text-preprocessing.md), [tokenization](tokenization.md), [document understanding](document-understanding.md), and [information extraction](information-extraction.md). The recognition problem is visual, but the downstream errors are linguistic and structured.

## Defining mechanism

Modern recognizers often produce a distribution over characters or subword symbols for each image timestep. Connectionist temporal classification (CTC) sums over alignments between frame-level predictions and the target string:

$$
P(y\mid x)=\sum_{\pi\in B^{-1}(y)}\prod_t P(\pi_t\mid x),
$$

where $B$ removes blanks and repeated labels. Operational evaluation frequently reports character error rate:

$$
\operatorname{CER}=\frac{S+D+I}{N}.
$$

## Worked example

This snippet computes character and word edit distances between a gold transcript and OCR output, then converts them to CER and WER.

```python
import numpy as np

np.random.seed(7)
def edit(a, b):
    dp = np.zeros((len(a) + 1, len(b) + 1), dtype=int)
    dp[:, 0] = np.arange(len(a) + 1); dp[0, :] = np.arange(len(b) + 1)
    for i, ca in enumerate(a, 1):
        for j, cb in enumerate(b, 1):
            dp[i, j] = min(dp[i-1, j] + 1, dp[i, j-1] + 1, dp[i-1, j-1] + (ca != cb))
    return int(dp[-1, -1])

gold = "total $42.10 due 2026-08-01"
hyp = "total $4210 due 2026-08-0l"
cer = edit(gold, hyp) / len(gold)
wer = edit(gold.split(), hyp.split()) / len(gold.split())
print("char_edits", edit(gold, hyp), "cer", round(cer, 3))
print("word_edits", edit(gold.split(), hyp.split()), "wer", round(wer, 3))
```

Observed output:

```text
char_edits 2 cer 0.074
word_edits 2 wer 0.5
```

Only two character edits are needed, but two of four whitespace-delimited words are wrong. A downstream invoice extractor may fail even when CER looks acceptable.

## Caveats

OCR quality depends on resolution, rotation, compression, script, font, handwriting style, and layout segmentation. Language-model correction can improve fluency while corrupting exact identifiers. Always evaluate on fields that matter downstream, especially totals, dates, names, and product codes.

## References

- [Hannun, Sequence Modeling with CTC](https://distill.pub/2017/ctc/)
- [Tesseract OCR engine repository](https://github.com/tesseract-ocr/tesseract)
- [Tesseract documentation repository](https://github.com/tesseract-ocr/tessdoc)
