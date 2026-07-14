---
title: Cultural Heritage Document Extraction and Entity Matching
slug: domain-applications/cultural-heritage-document-extraction-and-entity-matching
description: "OCR, field extraction, and authority matching for turning cultural-heritage documents into structured collection data."
area: domain-applications
topics:
  - application
  - cultural-heritage-document-extraction-and-entity-matching
level: intermediate
status: review
page_type: case-study
aliases:
  - Museum Label Text Extraction and Entity Matching
prerequisites:
  - index.md
related:
  - ../09-computer-vision/ocr-pipelines.md
  - ../08-natural-language-processing/entity-linking-and-matching.md
  - ../08-natural-language-processing/information-extraction.md
  - ../08-natural-language-processing/semantic-textual-similarity.md
  - ../14-ml-engineering-and-mlops/human-in-the-loop-systems.md
  - ../09-computer-vision/document-image-analysis-and-field-extraction.md
historical_context: false
last_reviewed: 2026-07-11
---

# Cultural Heritage Document Extraction and Entity Matching

Cultural heritage document extraction turns photographed or scanned collection records, wall labels, catalog cards, accession books, and archival notes into structured records: creator, title, date, medium, accession number, place, provenance, and links to authorities. Inputs are document images, OCR text, layout regions, existing collection records, language, and authority vocabularies. Targets include field spans and entity IDs. The decision is usually catalog enrichment or curator review, where a wrong link can be worse than no link.

## Framing

The visual front end is an [OCR pipeline](../09-computer-vision/ocr-pipelines.md): detect the document or label, rectify perspective, run OCR, and preserve layout. The language layer uses [information extraction](../08-natural-language-processing/information-extraction.md) for fields, then [entity linking and matching](../08-natural-language-processing/entity-linking-and-matching.md) against collection records, Getty ULAN, Wikidata, or local authority files. [Semantic textual similarity](../08-natural-language-processing/semantic-textual-similarity.md) helps rank candidates, but thresholds must consider field type. "Monet, 1907" means different things in an artist line, title line, or provenance note.

The Getty ULAN page is a real authority artifact: it exposes the Union List of Artist Names online and documents search over names, roles, and nationalities. IIIF Presentation API 3.0 is also relevant because many cultural-heritage image systems expose canvases, metadata, and annotations through IIIF manifests.

## Executed Artifact

This executed string-matching toy used a noisy OCR line: `Claude M0net, Water Lillies, 1907`.

This snippet scores noisy OCR text against candidate artwork entities with sequence similarity and returns the best-matching entity.

```python
from difflib import SequenceMatcher

ocr = "Claude M0net, Water Lillies, 1907"
candidates = ["Claude Monet", "Edouard Manet", "Water Lilies", "Waterloo Bridge"]
scores = [
    (candidate, round(SequenceMatcher(None, ocr.lower(), candidate.lower()).ratio(), 3))
    for candidate in candidates
]

print("entity_scores", scores)
print("best_entity", max(scores, key=lambda x: x[1]))
```

Observed output:

```text
entity_scores [('Claude Monet', 0.489), ('Edouard Manet', 0.304), ('Water Lilies', 0.533), ('Waterloo Bridge', 0.333)]
best_entity ('Water Lilies', 0.533)
```

Naive whole-line similarity picks the title-like entity, not the artist. The artifact shows why field extraction must precede entity matching, and why uncertain links should flow to [human-in-the-loop systems](../14-ml-engineering-and-mlops/human-in-the-loop-systems.md).

## Failure Modes

Common failures include OCR substitutions in names, multilingual layouts, historical spelling variants, artist collectives, ambiguous dates, and records that omit the accession number. Pages in [document image analysis and field extraction](../09-computer-vision/document-image-analysis-and-field-extraction.md) should be evaluated by field-level F1 and link accuracy separately.

## References

- [Getty Union List of Artist Names Online](https://www.getty.edu/research/tools/vocabularies/ulan/index.html)
- [IIIF Presentation API 3.0](https://iiif.io/api/presentation/3.0/)
