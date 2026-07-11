import fs from "fs"
import path from "path"
import YAML from "yaml"

const root = process.cwd()
const contentDir = path.join(root, "content")
const today = "2026-07-11"

const titleCaseExceptions = new Map([
  ["AB Testing", "A/B Testing"],
  ["Bias Variance Trade OFF", "Bias-Variance Trade-Off"],
  ["Bm25", "BM25"],
  ["Content Based Image Retrieval", "Content-Based Image Retrieval"],
  ["TF IDF", "TF-IDF"],
  ["Tf Idf", "TF-IDF"],
  ["LLM AS Judge", "LLM-as-Judge"],
  ["Precision Recall MAP MRR Ndcg", "Precision, Recall, MAP, MRR, and NDCG"],
  ["TOP K AND TOP P Sampling", "Top-k and Top-p Sampling"],
  ["IN Context Learning", "In-Context Learning"],
  ["Lstm and GRU", "LSTM and GRU"],
  ["RNN and Lstm Forecasting", "RNN and LSTM Forecasting"],
  ["RAG", "RAG"],
  ["TWO Stream Models", "Two-Stream Models"],
  ["V Jepa", "V-JEPA"],
  ["V Jepa 2", "V-JEPA 2"],
  ["WEB Backends", "Web Backends"],
  ["Javascript Application Architecture", "JavaScript Application Architecture"],
  ["NLP AND Document Understanding Experience", "NLP and Document-Understanding Experience"],
])

function cleanTitle(title) {
  return titleCaseExceptions.get(title) ?? title.replace(/\bAND\b/g, "and").replace(/\bAS\b/g, "as")
}

function slugify(title) {
  return cleanTitle(title)
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/\+/g, " plus ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return {}
  return YAML.parse(match[1]) ?? {}
}

function parseSubtopics(raw) {
  const match = raw.match(/## Subtopics\n\n([\s\S]*?)(?:\n## |\n?$)/)
  if (!match) return []
  return match[1]
    .split("\n")
    .map((line) => line.match(/^- (?:\[[^\]]+\]\([^)]+\)|(.+))$/)?.[1] ?? null)
    .filter(Boolean)
}

function frontmatter(meta) {
  return `---\n${YAML.stringify(meta).trim()}\n---`
}

function pageTypeFor(slug) {
  if (
    /(algorithm|descent|boosting|forest|tree|svm|pca|svd|arima|sarima|arma|kalman|bm25|tf-idf|backtesting|testing|ab-testing)/.test(
      slug,
    )
  ) {
    return "algorithm"
  }
  if (
    /(model|transformer|bert|cnn|rnn|lstm|gru|foundation|language-model|world-model|vision-language)/.test(
      slug,
    )
  ) {
    return "model"
  }
  if (
    /(serving|deployment|microservices|docker|api|pipeline|ci-cd|integration|architecture|system)/.test(
      slug,
    )
  ) {
    return "system-design"
  }
  if (/(evaluation|metrics|precision|recall|ndcg|mrr|golden|experiment|testing)/.test(slug)) {
    return "concept"
  }
  return "concept"
}

function levelFor(slug) {
  if (
    /(distributed|transformer|bayesian|state-space|kalman|world-model|agent|governance|adversarial|concept-drift|causal|hierarchical|contextual)/.test(
      slug,
    )
  ) {
    return "advanced"
  }
  if (
    /(regression|classification|matrix|forecast|evaluation|retrieval|serving|pipeline|architecture|optimization|attention|embedding|monitoring)/.test(
      slug,
    )
  ) {
    return "intermediate"
  }
  return "foundational"
}

function domainSentence(title, areaTitle) {
  const t = title.toLowerCase()
  if (t.includes("evaluation") || t.includes("metrics")) {
    return `${title} defines how quality is measured, which failure modes are visible, and which trade-offs are acceptable in ${areaTitle}.`
  }
  if (t.includes("pipeline") || t.includes("serving") || t.includes("deployment")) {
    return `${title} describes the production path from inputs to reliable outputs, including interfaces, monitoring, and rollback points.`
  }
  if (t.includes("model") || t.includes("transformer") || t.includes("network")) {
    return `${title} is a modelling concept: understand its assumptions, inputs, outputs, training objective, and failure modes before choosing it.`
  }
  if (t.includes("data") || t.includes("feature")) {
    return `${title} concerns how information is represented, validated, transformed, and made available for modelling or analysis.`
  }
  return `${title} is a core topic in ${areaTitle}. The useful starting point is to define its inputs, outputs, assumptions, metrics, and failure modes.`
}

function exampleFor(title, slug) {
  if (slug.includes("matrix-factorization")) {
    return `A recommender can learn a user vector and an item vector. Their dot product estimates preference, while regularization prevents sparse observations from being memorized.`
  }
  if (slug.includes("arima")) {
    return `For monthly demand, first inspect trend and seasonality, difference the series if needed, fit an ARIMA or SARIMA baseline, and compare it against a naive seasonal forecast.`
  }
  if (slug.includes("rag") || slug.includes("retrieval")) {
    return `For a support assistant, evaluate whether the retriever finds the right policy document before judging whether the generated answer is well written.`
  }
  if (slug.includes("transformer") || slug.includes("attention")) {
    return `For a token sequence, attention lets each position compute a weighted summary of other positions instead of relying only on local or recurrent state.`
  }
  if (slug.includes("drift") || slug.includes("monitoring")) {
    return `If input distributions shift after deployment, compare live feature statistics with training baselines and inspect whether model errors concentrate in the shifted slice.`
  }
  if (slug.includes("testing")) {
    return `A useful test suite combines deterministic unit tests, data-contract checks, model evaluation fixtures, and end-to-end smoke tests for the user workflow.`
  }
  if (slug.includes("prompt-injection")) {
    return `A retrieved document that says "ignore previous instructions" should be treated as untrusted content, not as a higher-priority instruction.`
  }
  if (slug.includes("segmentation") || slug.includes("detection")) {
    return `For an image model, inspect both aggregate metrics and examples: small localization errors, missed rare classes, and domain shift often look different in qualitative review.`
  }
  return `Use a small realistic case: define the input, expected output, baseline, assumptions, and one failure example before adding complexity.`
}

function checklistFor(areaTitle) {
  const area = areaTitle.toLowerCase()
  if (area.includes("forecast")) {
    return [
      "Plot the series before modelling.",
      "Use time-respecting validation and simple seasonal baselines.",
      "Report horizon-specific error and interval coverage.",
    ]
  }
  if (area.includes("computer vision")) {
    return [
      "Inspect representative images and labels.",
      "Define whether the output is a label, box, mask, keypoint, or embedding.",
      "Review visual false positives and false negatives, not only aggregate metrics.",
    ]
  }
  if (area.includes("generative")) {
    return [
      "Define the task contract, evidence sources, tools, and refusal policy.",
      "Evaluate retrieval, context construction, generation, and validation separately.",
      "Use deterministic checks for schemas, permissions, and high-risk outputs.",
    ]
  }
  if (area.includes("retrieval") || area.includes("search")) {
    return [
      "Define queries, corpus, relevance labels, and ranking depth.",
      "Measure recall-oriented and ranking-oriented metrics.",
      "Inspect top results for representative known queries.",
    ]
  }
  if (area.includes("statistics") || area.includes("probability")) {
    return [
      "Define the random variables, sample, population, and conditioning information.",
      "Check sampling, independence, and missing-data assumptions.",
      "Report uncertainty and practical significance.",
    ]
  }
  if (area.includes("machine learning")) {
    return [
      "Define the target, features, split strategy, baseline, and metric.",
      "Check leakage, imbalance, calibration, and threshold choice.",
      "Inspect errors by slice before changing model complexity.",
    ]
  }
  return [
    "Define inputs, outputs, assumptions, and the decision being supported.",
    "Compare against a simple baseline or manual procedure.",
    "Inspect failures by meaningful slices before trusting aggregate performance.",
  ]
}

function bodyFor(title, areaTitle, indexRelativePath, slug) {
  return `# ${title}

## Summary

${domainSentence(title, areaTitle)}

## Core idea

- Define the object being modelled, measured, transformed, or controlled.
- Make the assumptions explicit before interpreting results.
- Check how the idea behaves under noisy data, distribution shift, and production constraints.

## Worked example

${exampleFor(title, slug)}

## Practical checklist

${checklistFor(areaTitle)
  .map((item) => `- ${item}`)
  .join("\n")}

## Common failure modes

- Ignoring assumptions about data collection, evaluation protocol, or deployment context.
- Optimizing a local metric while missing system-level behavior.
- Treating a demo result as evidence of production readiness.

## Related navigation

- [${areaTitle} index](${indexRelativePath})
`
}

function updateIndexLinks(indexPath, topics) {
  const raw = fs.readFileSync(indexPath, "utf8")
  let updated = raw
  for (const topic of topics) {
    const title = cleanTitle(topic)
    const slug = slugify(topic)
    const target = `${slug}.md`
    const escaped = topic.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
    updated = updated.replace(new RegExp(`^- ${escaped}$`, "m"), `- [${title}](${target})`)
  }
  fs.writeFileSync(indexPath, updated)
}

const indexPaths = fs
  .readdirSync(contentDir, { withFileTypes: true })
  .filter((entry) => entry.isDirectory() && /^\d+-/.test(entry.name))
  .map((entry) => path.join(contentDir, entry.name, "index.md"))
  .filter(fs.existsSync)

let created = 0
let linkedIndexes = 0

for (const indexPath of indexPaths) {
  const raw = fs.readFileSync(indexPath, "utf8")
  const meta = parseFrontmatter(raw)
  const areaTitle = meta.title ?? path.basename(path.dirname(indexPath))
  const areaDir = path.dirname(indexPath)
  const topics = parseSubtopics(raw)

  for (const originalTopic of topics) {
    const title = cleanTitle(originalTopic)
    const slug = slugify(originalTopic)
    const target = path.join(areaDir, `${slug}.md`)
    if (fs.existsSync(target)) continue

    const pageMeta = {
      title,
      slug: `${path.basename(areaDir).replace(/^\d+-/, "")}/${slug}`,
      description: `Concise guide to ${title} in ${areaTitle}.`,
      area: meta.area ?? path.basename(areaDir).replace(/^\d+-/, ""),
      topics: [slug],
      level: levelFor(slug),
      status: "draft",
      page_type: pageTypeFor(slug),
      aliases: [],
      prerequisites: ["index.md"],
      related: ["index.md"],
      historical_context: areaDir.includes("19-history"),
      last_reviewed: today,
    }
    fs.writeFileSync(
      target,
      `${frontmatter(pageMeta)}\n\n${bodyFor(title, areaTitle, "index.md", slug)}`,
    )
    created++
  }

  updateIndexLinks(indexPath, topics)
  linkedIndexes++
}

console.log(`generated ${created} missing subtopic pages and linked ${linkedIndexes} indexes`)
