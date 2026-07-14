import fs from "fs"
import path from "path"
import YAML from "yaml"

const root = process.cwd()
const contentRoot = path.join(root, "content")
const refineGenerated = process.argv.includes("--refine-generated")

const placeholderPatterns = [
  "This page gives the minimum practical map",
  "Treating the topic as a buzzword",
  "Start with a small concrete case",
  "How to reason about it",
  "is a practical concept in",
  "In a small project, write down the baseline approach",
  "Evidence to add later",
]

const areaNames = new Map([
  ["home-and-navigation", "navigation and learning workflow"],
  ["mathematical-foundations", "mathematical modelling"],
  ["probability-and-statistics", "uncertainty and inference"],
  ["classical-machine-learning", "classical machine learning"],
  ["recommendation-systems", "recommendation and personalization"],
  ["time-series-and-forecasting", "forecasting"],
  ["deep-learning", "deep learning"],
  ["natural-language-processing", "natural language processing"],
  ["computer-vision", "computer vision"],
  ["video-understanding", "video understanding"],
  ["generative-ai", "generative AI systems"],
  ["information-retrieval-and-search", "search and retrieval"],
  ["data-engineering", "data engineering"],
  ["ml-engineering-and-mlops", "ML engineering"],
  ["cloud-and-distributed-systems", "cloud and distributed systems"],
  ["software-engineering", "software engineering"],
  ["experimentation-and-evaluation", "evaluation and experimentation"],
  ["responsible-ai-safety-and-governance", "responsible AI"],
  ["domain-applications", "applied machine learning"],
  ["history-of-ai-and-machine-learning", "AI and ML history"],
  ["references-and-glossary", "reference material"],
])

const rules = [
  {
    re: /linear algebra|vectors and matrices|matrix multiplication|orthogonality|rank|eigenvalues/i,
    summary:
      "Linear algebra is the language for representing data, transformations, geometry, and optimization in machine learning. Vectors represent examples or parameters, matrices represent datasets or linear maps, and rank, orthogonality, and eigenstructure describe what information a transformation preserves.",
    core: [
      "Track shapes first: matrix-vector and matrix-matrix products are only meaningful when dimensions line up.",
      "Dot products, norms, and orthogonality connect algebraic operations to geometric similarity and projection.",
      "Rank and eigenstructure reveal redundancy, invertibility, compression opportunities, and numerical sensitivity.",
    ],
    example:
      "For a small user-item matrix, rows can represent users and columns can represent items. Multiplying by an item-factor matrix produces user scores, while checking rank helps explain why a low-dimensional factor model can approximate the original interactions.",
  },
  {
    re: /low-rank approximation|norms and distances/i,
    summary:
      "Low-rank approximations, norms, and distances turn high-dimensional structure into measurable geometry. They are used to compress matrices, compare embeddings, regularize models, and reason about approximation error.",
    core: [
      "A norm measures vector or matrix size; a distance measures separation between objects.",
      "Low-rank approximation keeps dominant structure while discarding smaller components as noise or detail.",
      "The chosen norm or distance must match the meaning of error in the application.",
    ],
    example:
      "For document embeddings, cosine distance may group paraphrases better than Euclidean distance. For a ratings matrix, a low-rank approximation can reveal broad taste factors while losing rare niche preferences.",
  },
  {
    re: /navigation|knowledge map|learning paths/i,
    summary:
      "Navigation pages explain how to move through the wiki without treating the numbered taxonomy as the only possible order. They connect subject indexes, learning paths, technical answer patterns, experience maps, tags, and backlinks.",
    core: [
      "Use area indexes when learning a subject from first principles.",
      "Use learning paths when preparing for a concrete goal such as recommender systems, forecasting, or generative AI.",
      "Use backlinks and related links when a concept crosses area boundaries.",
    ],
    example:
      "To study recommender systems, start at the recommendation index, read collaborative filtering and matrix factorization, jump to linear algebra for SVD prerequisites, then return through evaluation and online experimentation.",
  },
  {
    re: /answer patterns|knowledge gaps|focused review/i,
    summary:
      "Focused-review pages turn wiki concepts into concise, defensible technical explanations. They emphasize definitions, assumptions, trade-offs, examples, and failure modes rather than memorized one-liners.",
    core: [
      "Start with a direct answer before adding nuance.",
      "Name the modelling assumption or system boundary that makes the answer true.",
      "Use a small worked example to show that the concept is understood operationally.",
    ],
    example:
      "For an SVD-versus-matrix-factorization question, first state that SVD is a specific decomposition while recommender matrix factorization is an optimization model over observed interactions. Then explain why sparse missing entries are not ordinary zeros.",
  },
  {
    re: /glossary|acronyms|notation|bibliography|references|further reading/i,
    summary:
      "Reference pages provide stable lookup material for terms, notation, acronyms, and source keys used across the wiki. They should make the rest of the content easier to read, cite, and validate.",
    core: [
      "Keep definitions short enough for lookup but precise enough to avoid ambiguity.",
      "Link high-value terms back to canonical concept pages when a reader needs depth.",
      "Keep bibliography keys stable because topic pages refer to them from front matter.",
    ],
    example:
      "When a recommender page cites `koren-bell-volinsky-2009-matrix-factorization`, the bibliography page explains the key group, while the glossary expands SVD, ALS, MAP, MRR, NDCG, RAG, JEPA, and VLM.",
  },
  {
    re: /experience|background/i,
    summary:
      "Experience-map pages connect professional project themes to canonical wiki concepts without exposing confidential employer, client, or system details. They turn broad experience into reusable evidence without making the wiki depend on a single person's CV.",
    core: [
      "Map each experience theme to public, general concepts rather than private implementation details.",
      "Separate evidence, decisions, trade-offs, failure modes, and measurable outcomes.",
      "Use the page as a checklist for stories that can be discussed safely and concretely.",
    ],
    example:
      "For a production ML story, describe the general problem, data constraints, model or pipeline choice, evaluation method, deployment risk, monitoring plan, and what changed after review. Omit names, credentials, private data, and unsupported business claims.",
  },
  {
    re: /bias.?variance/i,
    summary:
      "The bias-variance trade-off describes two sources of generalization error: systematic underfitting from overly simple assumptions and sensitivity to training data from overly flexible models.",
    core: [
      "High bias means the model cannot represent the true pattern well.",
      "High variance means the model changes too much across training samples.",
      "Regularization, more data, simpler models, and ensembling change this trade-off.",
    ],
    example:
      "Fit a shallow decision tree and a deep decision tree on the same dataset. The shallow tree may miss real structure; the deep tree may memorize noise. Compare train and validation errors to see which failure dominates.",
  },
  {
    re: /bayesian personalized ranking/i,
    summary:
      "Bayesian personalized ranking is a recommender training objective for implicit feedback. It learns factors so observed user-item interactions rank above unobserved alternatives.",
    core: [
      "Training examples are triples: user, positive item, negative item.",
      "The objective optimizes pairwise ranking rather than rating prediction.",
      "Negative sampling strategy strongly affects what the model learns.",
    ],
    example:
      "For music recommendation, sample a track the user played as positive and a track they did not play as negative. Train the model to score the played track higher, then evaluate ranked recommendations.",
  },
  {
    re: /bayes theorem/i,
    summary:
      "Bayes' theorem updates a prior belief after observing evidence. It is the basic rule for moving from $P(evidence\\mid hypothesis)$ to $P(hypothesis\\mid evidence)$.",
    core: [
      "The formula is $P(H\\mid E)=P(E\\mid H)P(H)/P(E)$.",
      "The prior $P(H)$ matters when the event is rare.",
      "The denominator $P(E)$ normalizes over all ways the evidence could occur.",
    ],
    example:
      "If a disease affects 1% of people and a test is 99% sensitive but 95% specific, a positive test is not automatically a 99% disease probability. Compute the posterior using the base rate and false-positive rate.",
  },
  {
    re: /object detection/i,
    summary:
      "Object detection predicts what objects appear in an image and where they are located, usually with class labels and bounding boxes.",
    core: [
      "The model must solve classification and localization together.",
      "[Intersection over union](detection-and-segmentation-metrics.md#intersection-over-union) measures box overlap with ground truth.",
      "Evaluation should inspect missed small objects, duplicate detections, and false positives in cluttered scenes.",
    ],
    example:
      "For street-scene detection, label cars, cyclists, and pedestrians with boxes. Train a detector, review predictions at different confidence thresholds, and inspect failures for occlusion, night scenes, and small distant objects.",
  },
  {
    re: /semantic segmentation|instance segmentation|mri segmentation/i,
    summary:
      "Segmentation assigns labels to pixels. Semantic segmentation predicts class masks; instance segmentation separates individual objects; medical segmentation often measures anatomical structures.",
    core: [
      "Pixel-level labels make annotation quality and boundary ambiguity important.",
      "[Dice](detection-and-segmentation-metrics.md#dice-coefficient), [IoU](detection-and-segmentation-metrics.md#intersection-over-union), and boundary metrics capture different failure modes.",
      "Patient-level or scene-level splits prevent leakage across similar images.",
    ],
    example:
      "For MRI segmentation, define the anatomical target, standardize preprocessing, train on patient-level splits, evaluate [Dice](detection-and-segmentation-metrics.md#dice-coefficient) and boundary errors, and review failures with clinical context.",
  },
  {
    re: /image classification|mri classification/i,
    summary:
      "Image classification assigns one or more labels to an image. It is simpler than detection or segmentation because the model does not localize objects.",
    core: [
      "The label policy must define what counts as present in the image.",
      "Class imbalance and spurious background cues are common failure modes.",
      "Confusion matrices and per-class review are more informative than a single aggregate score.",
    ],
    example:
      "For MRI classification, split by patient, train a baseline CNN or vision transformer, inspect false positives and false negatives by scanner/site, and calibrate probabilities before clinical use.",
  },
  {
    re: /pose estimation/i,
    summary:
      "Pose estimation predicts keypoints such as joints, body landmarks, or object parts. The output is spatial structure rather than only a label or box.",
    core: [
      "Keypoint visibility and annotation consistency strongly affect quality.",
      "Temporal smoothing can help video pose estimates but may hide fast motion.",
      "Evaluation should separate localization error from missed keypoints.",
    ],
    example:
      "For pedestrian pose detection, label visible joints, train a keypoint model, inspect crowded scenes, and evaluate whether downstream action recognition still works when some joints are occluded.",
  },
  {
    re: /content.?based image retrieval|feature extraction/i,
    summary:
      "Image retrieval uses visual features or embeddings to find visually or semantically similar images. Feature extraction determines what similarity means.",
    core: [
      "Classical features capture edges, colors, texture, or local descriptors.",
      "Learned embeddings capture task-specific semantic similarity.",
      "Retrieval quality should be judged with nearest-neighbor examples and ranked metrics.",
    ],
    example:
      "For museum-label image retrieval, embed cropped label images, search nearest neighbors, and review whether matches group by text layout, typography, or semantic content as intended.",
  },
  {
    re: /data augmentation|synthetic data/i,
    summary:
      "Data augmentation and synthetic data expand training variation. They help only when generated variation resembles plausible deployment variation.",
    core: [
      "Augmentations should preserve the label.",
      "Overly strong augmentation can teach invariances that are false in production.",
      "Synthetic data should be evaluated for coverage, artifacts, and domain gap.",
    ],
    example:
      "For rotated-object detection, add rotations that match expected camera angles, then check whether performance improves on real rotated examples rather than only augmented validation images.",
  },
  {
    re: /historical document|museum label|ocr pipelines/i,
    summary:
      "Historical document and museum-label analysis combines image preprocessing, OCR, text cleanup, and entity matching. The hard parts are noisy scans, typography, layout, and ambiguous names.",
    core: [
      "Preprocessing improves OCR only when it preserves text shapes.",
      "Entity matching should separate exact identifiers from fuzzy names.",
      "Human review is important for low-confidence or historically ambiguous records.",
    ],
    example:
      "For museum labels, crop the label region, run OCR, normalize dates and names, link extracted entities to an authority file, and review uncertain matches before publishing metadata.",
  },
  {
    re: /self.?supervised visual learning/i,
    summary:
      "Self-supervised visual learning trains representations from images or video without manually assigned task labels. The pretext objective shapes what visual structure the representation captures.",
    core: [
      "Contrastive methods learn by pulling related views together and pushing unrelated views apart.",
      "Masked or predictive methods learn by reconstructing or predicting hidden information.",
      "Downstream quality must be tested on the target task, not assumed from pretraining loss.",
    ],
    example:
      "Pretrain on unlabeled product images, freeze the encoder, train a small classifier on limited labels, then compare against training the same classifier from scratch.",
  },
  {
    re: /domain shift|model benchmarking|medical.?image analysis/i,
    summary:
      "Domain shift occurs when training and deployment data differ. Benchmarking should reveal whether a model is robust across sites, devices, populations, and acquisition conditions.",
    core: [
      "Hold out deployment-like slices when possible.",
      "Report performance by domain, not only pooled performance.",
      "Use qualitative review to understand whether failures are clinically or operationally meaningful.",
    ],
    example:
      "For medical-image analysis, evaluate separately by scanner type, hospital, protocol, and patient subgroup. A strong pooled score can still hide a failure on one site.",
  },
  {
    re: /classical image processing|image representation/i,
    summary:
      "Classical image processing represents and transforms images with operations such as filtering, thresholding, morphology, edges, color spaces, and geometric transforms.",
    core: [
      "Preprocessing can improve signal-to-noise but can also remove task-relevant information.",
      "Image representation choices affect every downstream model.",
      "Classical methods are useful baselines and debugging tools even in deep-learning systems.",
    ],
    example:
      "For document cleanup, convert to grayscale, denoise, threshold, deskew, then compare OCR quality before and after each step.",
  },
  {
    re: /tokenization/i,
    summary:
      "Tokenization converts text into model-readable units. The tokenizer defines what the model can represent directly and how text length maps to context usage.",
    core: [
      "Word, subword, byte-pair, and byte-level tokenizers make different trade-offs.",
      "Rare words, code, numbers, and multilingual text can split into many tokens.",
      "Tokenizer choice affects cost, latency, truncation, and retrieval chunking.",
    ],
    example:
      "Take a support ticket, tokenize it, count tokens, and inspect unusual splits for product names or IDs. If important identifiers split poorly, add preprocessing or retrieval metadata rather than relying on raw text alone.",
  },
  {
    re: /embeddings/i,
    summary:
      "Embeddings represent items such as words, documents, images, users, or products as vectors so that distance or similarity reflects useful relationships.",
    core: [
      "Embedding quality depends on the training objective and domain match.",
      "Nearest-neighbor behavior should be tested with real examples, not assumed from aggregate scores.",
      "Normalization and distance choice affect retrieval results.",
    ],
    example:
      "For FAQ search, embed each question-answer pair, query with user questions, inspect nearest neighbors, and evaluate whether paraphrases retrieve the same support article.",
  },
  {
    re: /data drift|concept drift|model degradation/i,
    summary:
      "Drift describes changes after deployment. Data drift changes input distributions; concept drift changes the relationship between inputs and targets; degradation is the observed decline in model usefulness.",
    core: [
      "Feature-distribution monitoring can detect data drift before labels arrive.",
      "Concept drift requires delayed ground truth or proxy labels to diagnose.",
      "Drift response can be retraining, rollback, threshold change, or process investigation.",
    ],
    example:
      "For fraud detection, compare live transaction features with training baselines. If new merchant categories appear and false negatives rise after labels arrive, investigate concept drift before retraining blindly.",
  },
  {
    re: /api design/i,
    summary:
      "API design defines stable contracts between components. In AI systems, APIs often expose model serving, retrieval, feature access, evaluation, and tool execution.",
    core: [
      "Inputs, outputs, errors, and versioning should be explicit.",
      "Schemas let applications validate model and tool calls deterministically.",
      "A good API separates user-facing language from machine-facing contracts.",
    ],
    example:
      "For an extraction API, define a JSON schema, reject unknown fields, return confidence and source spans, version the endpoint, and document retry behavior for transient failures.",
  },
  {
    re: /^testing$/i,
    summary:
      "Testing checks whether software, data, prompts, models, and workflows behave as expected under known conditions.",
    core: [
      "Unit tests catch deterministic code errors.",
      "Contract tests catch interface and schema changes.",
      "Golden datasets catch model, prompt, and retrieval regressions.",
    ],
    example:
      "For a RAG endpoint, test chunk retrieval on fixed questions, validate JSON outputs, check citation spans, and run an end-to-end smoke test before deployment.",
  },
  {
    re: /cloud storage|managed storage/i,
    summary:
      "Cloud storage provides durable object, block, or file storage. Data and ML systems typically use object storage for datasets, model artifacts, logs, and static assets.",
    core: [
      "Object storage is durable and scalable but has different latency and listing behavior from a local filesystem.",
      "Partitioning, naming, lifecycle policies, and access control shape cost and reliability.",
      "Training and inference pipelines can bottleneck on storage throughput.",
    ],
    example:
      "For a training dataset, store immutable snapshots under versioned prefixes, write a manifest file, validate checksums, and keep lifecycle rules separate from reproducibility-critical artifacts.",
  },
  {
    re: /logistic regression/i,
    summary:
      "Logistic regression is a linear classification model that maps features to class probabilities with the logistic function. It is often the first strong baseline for binary classification.",
    core: [
      "The model computes a score $z = w^\\top x + b$ and converts it to $p(y=1\\mid x)=\\sigma(z)$.",
      "Training minimizes cross-entropy, which is equivalent to maximum likelihood under a Bernoulli model.",
      "Coefficients are interpretable as log-odds changes when features are scaled and the modelling assumptions are reasonable.",
    ],
    example:
      "For churn prediction, start with features such as tenure, usage, and support tickets. Fit logistic regression, inspect calibration, then compare precision and recall across thresholds before choosing an operating point.",
  },
  {
    re: /linear models?|regression$/i,
    summary:
      "Linear models predict a target as a weighted sum of features. They are useful baselines because they are fast, interpretable, and expose whether feature engineering already explains much of the signal.",
    core: [
      "For regression, the usual objective is squared error; for classification, linear scores are paired with a link function or margin loss.",
      "Regularization controls coefficient size and improves stability when features are correlated.",
      "Feature scaling and leakage checks matter more than model complexity.",
    ],
    example:
      "For house-price prediction, fit a linear model with size, location indicators, and age. Compare residuals by segment to find missing nonlinear effects or data-quality problems.",
  },
  {
    re: /support vector|svm/i,
    summary:
      "Support vector machines learn a decision boundary that maximizes the margin between classes. Kernels let the model build nonlinear boundaries without explicitly constructing all transformed features.",
    core: [
      "Only support vectors near the decision boundary determine the fitted boundary.",
      "The regularization parameter trades margin width against classification errors.",
      "Kernel choice controls the geometry of the feature space.",
    ],
    example:
      "For a small text-classification dataset, represent documents with TF-IDF, train a linear SVM, tune regularization, and inspect errors near the margin.",
  },
  {
    re: /decision trees?|random forests?|gradient boosting/i,
    summary:
      "Tree-based models split feature space into regions with similar target values. Forests reduce variance by averaging many trees; boosting reduces bias by adding trees sequentially to correct residual errors.",
    core: [
      "Single trees are interpretable but high variance.",
      "Random forests average decorrelated trees and work well with little preprocessing.",
      "Gradient boosting often gives stronger tabular accuracy but needs careful tuning and validation.",
    ],
    example:
      "For credit-risk classification, train a decision tree as an interpretable baseline, a random forest for robust performance, and a gradient-boosted model for accuracy. Compare performance by risk slice, not only globally.",
  },
  {
    re: /pca|dimensionality reduction|low-rank|svd|matrix decomposition/i,
    summary:
      "Dimensionality reduction represents high-dimensional data with fewer latent dimensions while preserving important structure. Linear methods such as PCA and SVD are common first tools.",
    core: [
      "PCA finds orthogonal directions of maximum variance in centered data.",
      "SVD factorizes a matrix into orthogonal directions and singular values.",
      "Low-rank approximations can denoise data but may hide rare or nonlinear structure.",
    ],
    example:
      "For document embeddings, compute a low-dimensional projection, plot the first components, then verify that nearest-neighbor relationships still match domain expectations.",
  },
  {
    re: /bayes|conditional probability|probability spaces|random variables|distributions|expectation|variance|covariance|correlation/i,
    summary:
      "This topic describes the language of uncertainty: events, random variables, distributions, dependence, and expected values. These concepts underlie statistical estimation and ML evaluation.",
    core: [
      "A probability model states what outcomes are possible and how likely they are.",
      "Conditional probability updates uncertainty when information is observed.",
      "Expectations summarize long-run averages; variance and covariance summarize spread and dependence.",
    ],
    example:
      "For a diagnostic classifier, estimate the base rate, sensitivity, and specificity. Use Bayes' theorem to compute the probability of the condition after a positive test instead of interpreting model accuracy alone.",
  },
  {
    re: /maximum likelihood|maximum a posteriori|statistical estimation|confidence intervals|hypothesis testing|central limit|law of large numbers/i,
    summary:
      "Statistical inference turns data into estimates, uncertainty statements, and decisions. The key question is not only what estimate is best, but how reliable it is under the sampling process.",
    core: [
      "Maximum likelihood chooses parameters that make the observed data most probable.",
      "MAP estimation adds a prior and chooses the posterior mode.",
      "Confidence intervals and tests require assumptions about sampling, dependence, and the chosen estimator.",
    ],
    example:
      "For an A/B test, estimate the conversion-rate difference, compute uncertainty, check sample-ratio integrity, and decide whether the effect is practically meaningful before shipping.",
  },
  {
    re: /markov|random walks|renewal/i,
    summary:
      "Markov and renewal models describe processes that evolve over time with probabilistic transitions. They are useful when state, waiting time, and event recurrence matter.",
    core: [
      "A Markov chain assumes the next state depends on the current state rather than the full history.",
      "Random walks model accumulated random changes.",
      "Renewal processes model repeated events separated by random waiting times.",
    ],
    example:
      "For user retention, define states such as active, dormant, and churned. Estimate transition probabilities from cohorts and simulate expected long-term behavior.",
  },
  {
    re: /gradient|optimization|convex|constrained|numerical stability|hessian|jacobian|calculus/i,
    summary:
      "Optimization chooses parameters that minimize or maximize an objective. In ML, optimization quality affects both model performance and reproducibility.",
    core: [
      "Gradients point in the direction of steepest local increase; gradient descent moves against them.",
      "Convex objectives have no bad local minima, but many ML objectives are non-convex.",
      "Numerical stability prevents overflow, underflow, and ill-conditioned updates.",
    ],
    example:
      "For linear regression, derive the loss, compute gradients, choose a learning rate, monitor validation loss, and stop when improvement stalls or overfitting begins.",
  },
  {
    re: /entropy|cross-entropy|kl divergence|mutual information|information theory/i,
    summary:
      "Information-theoretic quantities measure uncertainty, surprise, divergence between distributions, and dependence. They appear in classification losses, language models, and representation learning.",
    core: [
      "Entropy measures uncertainty in a distribution.",
      "Cross-entropy measures how costly it is to encode data from one distribution using another.",
      "KL divergence measures directional mismatch between distributions.",
    ],
    example:
      "For a classifier, cross-entropy penalizes confident wrong predictions more than uncertain wrong predictions. This makes probability calibration and label quality important.",
  },
  {
    re: /collaborative filtering|content-based|recommender|recommendation|implicit feedback|matrix factorization|als|cold-start|candidate generation|ranking|bandit|exploration|exploitation|feedback loops/i,
    summary:
      "Recommendation systems select items for users under sparse feedback, changing catalogues, and business constraints. Good systems separate candidate generation, ranking, filtering, exploration, and evaluation.",
    core: [
      "Collaborative methods learn from interaction patterns; content-based methods use item or user features.",
      "Sparse observations are not the same as negative preferences.",
      "Online feedback can create popularity bias and feedback loops if exploration is ignored.",
    ],
    example:
      "For a news recommender, retrieve candidate articles from collaborative and content signals, rank by predicted engagement, apply freshness and diversity constraints, and evaluate with both offline replay and online experiments.",
  },
  {
    re: /time-series|forecast|arima|sarima|stationarity|autocorrelation|exponential smoothing|state-space|kalman|backtesting|rolling-origin|prediction intervals|intermittent demand/i,
    summary:
      "Forecasting predicts future values from time-ordered observations. The validation protocol must respect time, otherwise future information leaks into the past.",
    core: [
      "Trend, seasonality, cycles, shocks, and noise should be separated conceptually before choosing a model.",
      "Backtesting uses historical cutoffs to simulate future prediction.",
      "Prediction intervals communicate uncertainty, not only point estimates.",
    ],
    example:
      "For weekly demand, plot the series, create seasonal naive and moving-average baselines, run rolling-origin backtests, then compare error and interval coverage by product segment.",
  },
  {
    re: /neural|backprop|activation|loss function|initialization|normalization|regularization|optimizer|cnn|convolution|rnn|lstm|gru|attention|transformer|self-supervised|contrastive|transfer|fine-tuning|mixed precision|distributed training|pytorch|tensorflow/i,
    summary:
      "Deep learning uses differentiable models trained by gradient-based optimization. Architecture, data scale, objective design, and training stability are usually more important than a single layer choice.",
    core: [
      "Backpropagation computes gradients through composed operations.",
      "Architectures encode useful inductive biases: convolution for local spatial structure, recurrence for sequence state, attention for content-based interaction.",
      "Training reliability depends on initialization, normalization, regularization, optimizer settings, and evaluation discipline.",
    ],
    example:
      "For image classification, start with a pretrained model, replace the classification head, freeze most layers for an initial run, then fine-tune with augmentation and monitor validation performance by class.",
  },
  {
    re: /tokenization|embeddings|language model|text classification|named-entity|entity linking|information extraction|semantic textual similarity|sequence labelling|summarization|bert|decoder-only|ocr|document understanding/i,
    summary:
      "NLP systems convert text or documents into representations, predictions, extracted structures, or generated summaries. The main risks are ambiguity, domain shift, annotation quality, and evaluation mismatch.",
    core: [
      "Tokenization defines the units a model sees.",
      "Embeddings represent lexical or semantic similarity in vector space.",
      "Task design should distinguish classification, extraction, linking, retrieval, and generation.",
    ],
    example:
      "For urgency classification, define the label policy, collect examples from real messages, split by time or source to avoid leakage, train a baseline, and review false positives with domain experts.",
  },
  {
    re: /image|vision|segmentation|object detection|pose|medical|mri|ocr pipelines|domain shift|augmentation|synthetic data|vision transformer|rotated/i,
    summary:
      "Computer vision systems transform pixels into labels, boxes, masks, keypoints, embeddings, or measurements. Evaluation must inspect both aggregate metrics and representative visual failures.",
    core: [
      "Classification predicts image-level labels; detection localizes objects; segmentation assigns pixel or instance masks.",
      "Data augmentation improves robustness only when it matches plausible real-world variation.",
      "Domain shift is common when cameras, scanners, lighting, geography, or patient populations change.",
    ],
    example:
      "For MRI segmentation, define the anatomical target, standardize preprocessing, train on patient-level splits, evaluate Dice and boundary errors, and review failures with clinical context.",
  },
  {
    re: /video|optical flow|temporal|3d convolution|two-stream|tracking|gesture|v-jepa|world models|sliding-window/i,
    summary:
      "Video understanding adds time to visual perception. Models must capture both spatial evidence in frames and temporal evidence across frames.",
    core: [
      "Frame-level models can miss motion and event ordering.",
      "Temporal models aggregate evidence with windows, recurrence, attention, tracking, or learned video representations.",
      "Latency and compute constraints matter because video inference can be expensive.",
    ],
    example:
      "For gesture recognition, sample clips around candidate actions, run a temporal model, aggregate predictions over overlapping windows, and inspect errors where the gesture starts or ends ambiguously.",
  },
  {
    re: /rag|retrieval|chunking|vector database|hybrid retrieval|reranking|query rewriting|context construction|grounding|citations|hallucination/i,
    summary:
      "RAG systems combine retrieval with generation. Quality depends on finding the right evidence, placing it in context, and making the model answer only what the evidence supports.",
    core: [
      "Chunking controls what retrieval units can be found.",
      "Hybrid retrieval combines lexical and semantic signals.",
      "Grounded generation requires citation and refusal behavior, not only fluent answers.",
    ],
    example:
      "For a policy assistant, build a golden set of questions with source passages, measure retrieval recall, inspect context construction, then grade answers for factuality and citation support.",
  },
  {
    re: /foundation model|pretraining|instruction tuning|alignment|prompt|sampling|temperature|structured output|function calling|tool|agent|memory|multi-agent|reflection|llm-as-judge|guardrails|prompt injection|privacy|pii|quantization|model serving|local versus hosted|cost/i,
    summary:
      "Generative AI systems use foundation models as reasoning, language, vision, or tool-use components. Production quality depends on orchestration, evaluation, safety boundaries, and cost control.",
    core: [
      "Model behavior is conditioned by training, prompts, tools, retrieval context, decoding parameters, and application policy.",
      "Structured outputs and tool schemas turn free-form generation into enforceable contracts.",
      "Safety controls must be implemented outside the model as well as inside prompts.",
    ],
    example:
      "For an invoice assistant, retrieve the relevant document, ask the model for structured fields, validate every field against schema and source spans, and route low-confidence cases to human review.",
  },
  {
    re: /inverted index|tf-idf|bm25|dense retrieval|sparse retrieval|hybrid search|nearest|vector index|reranking|search evaluation|elasticsearch|knowledge graph|graph-based/i,
    summary:
      "Search systems retrieve and rank documents, entities, or items for a query. Strong systems combine indexing, ranking, evaluation, and feedback loops.",
    core: [
      "Lexical retrieval matches terms; dense retrieval matches learned semantic representations.",
      "Reranking applies a more expensive model to a smaller candidate set.",
      "Evaluation should separate retrieval quality from downstream answer quality.",
    ],
    example:
      "For literature search, index titles and abstracts with BM25, add dense retrieval for semantic matches, rerank the top candidates, and evaluate whether known relevant papers appear near the top.",
  },
  {
    re: /sql|relational|warehouse|dimensional|etl|elt|batch|streaming|pipeline|quality|contract|dbt|airflow|bigquery|storage|lineage|feature/i,
    summary:
      "Data engineering makes data reliable, discoverable, and usable for analytics and ML. The work is mainly about contracts, reproducibility, lineage, quality, and operational ownership.",
    core: [
      "Pipelines should define inputs, outputs, schedules, dependencies, and failure behavior.",
      "Data contracts prevent silent schema and semantic drift.",
      "Lineage and reproducibility make debugging possible when downstream metrics move.",
    ],
    example:
      "For a feature pipeline, define source tables, transformation logic, freshness expectations, validation checks, and a backfill strategy before exposing the feature to training and serving.",
  },
  {
    re: /experiment tracking|dataset versioning|model versioning|training pipeline|serving|inference|microservices|docker|ci-cd|monitoring|drift|observability|slo|rollback|shadow|canary|human-in-the-loop|active learning|incident/i,
    summary:
      "MLOps turns model development into a repeatable production lifecycle. The goal is to train, deploy, monitor, and improve models without losing traceability or reliability.",
    core: [
      "Version code, data, configuration, models, and evaluation results together.",
      "Separate offline model quality from online service reliability.",
      "Monitoring should detect data drift, concept drift, performance decay, and operational failures.",
    ],
    example:
      "For a churn model, log each training run, register the model, deploy it as a shadow service, compare predictions with production, then promote with canary monitoring and rollback criteria.",
  },
  {
    re: /aws|google cloud|managed compute|managed storage|distributed|gpu|scalability|reliability|cost|bottleneck/i,
    summary:
      "Cloud and distributed systems provide the compute, storage, networking, and reliability primitives for data and AI workloads.",
    core: [
      "Managed services reduce operational burden but introduce platform-specific constraints.",
      "Distributed workloads are often limited by data movement, storage throughput, or coordination rather than raw compute.",
      "Cost management requires measuring utilization, latency, and workload shape.",
    ],
    example:
      "For batch embedding generation, estimate input size, model throughput, GPU memory, storage bandwidth, and retry behavior before choosing a compute service.",
  },
  {
    re: /architecture|api|testing|code review|refactoring|design pattern|requirements|decision records|documentation|backend|javascript|python/i,
    summary:
      "Software engineering practices make systems understandable, testable, maintainable, and safe to change. They are especially important when ML components behave probabilistically.",
    core: [
      "Clear interfaces reduce hidden coupling between data, model, and product code.",
      "Tests should cover deterministic code, data contracts, model fixtures, and end-to-end workflows.",
      "Decision records preserve trade-offs that are otherwise lost as systems evolve.",
    ],
    example:
      "For an ML API, define request and response schemas, validate inputs, version the contract, add integration tests, and document latency, failure modes, and rollback behavior.",
  },
  {
    re: /evaluation|experiment|golden|calibration|coverage|abstention|significance|paired|sampling|human evaluation|error taxonom/i,
    summary:
      "Evaluation defines whether a system is good enough for its intended use. It should measure task success, uncertainty, failure severity, cost, and operational risk.",
    core: [
      "Golden datasets make regression testing repeatable.",
      "Paired evaluation compares systems on the same examples to reduce variance.",
      "Risk-weighted error taxonomies prevent severe failures from being hidden by average scores.",
    ],
    example:
      "For a RAG assistant, create a golden set with source evidence, measure retrieval, grade grounded answers, record abstentions, and review high-severity failures separately.",
  },
  {
    re: /privacy|security|fairness|compliance|audit|explainability|hallucination|factual|policy|oversight|risk|adversarial|governance/i,
    summary:
      "Responsible AI manages model behavior, data use, user harm, security, and governance. It is a lifecycle practice, not a final checklist.",
    core: [
      "Risk depends on domain, user impact, reversibility, and available human oversight.",
      "Privacy and security controls must be enforced in data pipelines, prompts, tools, logs, and outputs.",
      "Governance should cover model, data, prompt, retrieval corpus, and policy changes.",
    ],
    example:
      "For a customer-support AI, classify risks, block PII leakage, evaluate hallucinations, log citations, monitor escalations, and require review before policy changes affect production answers.",
  },
]

function walk(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const p = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      if (["assets", ".obsidian", "_templates"].includes(entry.name)) return []
      return walk(p)
    }
    return entry.isFile() && entry.name.endsWith(".md") ? [p] : []
  })
}

function parse(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n/)
  if (!match) return null
  return {
    meta: YAML.parse(match[1]) ?? {},
    body: raw.slice(match[0].length),
    fm: match[0],
  }
}

function ruleFor(title, area) {
  const haystack = `${title} ${area}`.toLowerCase()
  return rules.find((rule) => rule.re.test(haystack))
}

function fallback(title, area) {
  const areaName = areaNames.get(area) ?? area
  return {
    summary: `${title} belongs to ${areaName}. To make the page useful, explain the object being studied, the decision it supports, the assumptions behind it, and how it fails when those assumptions are violated.`,
    core: [
      `Define the inputs, outputs, and boundaries for ${title}.`,
      "Identify the assumptions that make the method or concept valid.",
      "Check how the idea behaves when data is noisy, incomplete, shifted, or used in production.",
    ],
    example: `Compare a simple baseline with an approach that uses ${title}. Keep the dataset, split, metric, and review examples fixed so any improvement or regression can be attributed to the change.`,
  }
}

function checklistFor(area, title) {
  const defaults = [
    `Define the exact role ${title} plays in the larger workflow.`,
    "State the inputs, outputs, assumptions, and decision being supported.",
    "Compare against a simple baseline or manual procedure.",
    "Inspect failures by meaningful slices instead of relying only on an average score.",
    "Link the result back to prerequisites, related methods, and production constraints.",
  ]

  const byArea = {
    "mathematical-foundations": [
      "Write the objects and dimensions before manipulating symbols.",
      "Check limiting cases, units, signs, and normalization constants.",
      "Connect the formula to a small numerical example.",
      "Identify when the result depends on convexity, differentiability, orthogonality, or conditioning.",
      "Note the computational cost and numerical stability issues.",
    ],
    "probability-and-statistics": [
      "Define the random variables, population, sample, and conditioning information.",
      "Separate the estimand, estimator, estimate, and uncertainty statement.",
      "Check independence, sampling, stationarity, and missing-data assumptions.",
      "Use a small numeric example to verify the direction of the result.",
      "Report uncertainty and practical significance, not only a point estimate.",
    ],
    "classical-machine-learning": [
      "Define the prediction target, feature set, split strategy, and baseline.",
      "Check leakage, class imbalance, calibration, and threshold choice.",
      "Compare train, validation, and test behavior to diagnose underfitting or overfitting.",
      "Inspect errors by segment and by example.",
      "Choose metrics that match the deployment decision.",
    ],
    "recommendation-systems": [
      "Define users, items, events, negatives, and freshness requirements.",
      "Separate candidate generation, ranking, filtering, and exploration.",
      "Evaluate coverage, diversity, cold-start behavior, and feedback loops.",
      "Compare offline metrics with online product outcomes.",
      "Review examples for new users, rare items, and popular-item bias.",
    ],
    "time-series-and-forecasting": [
      "Plot the series before modelling.",
      "Identify trend, seasonality, regime changes, missing periods, and outliers.",
      "Use time-respecting backtests and simple seasonal baselines.",
      "Report point error and interval coverage by horizon.",
      "Document what information is actually available at forecast time.",
    ],
    "deep-learning": [
      "Start from a pretrained or simple baseline when available.",
      "Track data splits, objective, architecture, optimizer, seed, and hardware.",
      "Monitor training curves for instability, overfitting, or underfitting.",
      "Evaluate on slices that expose the intended inductive bias.",
      "Record serving cost, latency, memory, and rollback implications.",
    ],
    "natural-language-processing": [
      "Define the text unit, label policy, annotation rules, and language/domain coverage.",
      "Inspect tokenization and truncation on real examples.",
      "Separate classification, extraction, linking, retrieval, and generation objectives.",
      "Evaluate exact fields and semantic usefulness separately.",
      "Review errors for ambiguity, domain shift, and annotation disagreement.",
    ],
    "computer-vision": [
      "Inspect representative images before choosing a model.",
      "Define labels, boxes, masks, keypoints, or embeddings precisely.",
      "Split data by patient, scene, device, source, or time when leakage is possible.",
      "Report aggregate metrics and visual failure examples.",
      "Check robustness to lighting, viewpoint, scanner, resolution, and occlusion.",
    ],
    "video-understanding": [
      "Define the temporal unit: frame, clip, track, event, or stream.",
      "Choose sampling windows that match the action duration and latency budget.",
      "Evaluate boundary errors, missed starts, missed ends, and identity switches.",
      "Inspect predictions over time rather than only final labels.",
      "Measure throughput, memory, and delay under realistic video rates.",
    ],
    "generative-ai": [
      "Define the task contract, allowed tools, evidence sources, and refusal policy.",
      "Separate retrieval, context construction, model generation, validation, and post-processing.",
      "Evaluate with golden examples, citations, groundedness, latency, and cost.",
      "Add deterministic checks for schemas, permissions, and safety constraints.",
      "Review failures by severity rather than treating all bad answers equally.",
    ],
    "information-retrieval-and-search": [
      "Define the query type, corpus, fields, filters, and relevance labels.",
      "Measure both recall-oriented and ranking-oriented metrics.",
      "Inspect top results for known queries before trusting aggregate scores.",
      "Separate first-stage retrieval from reranking and downstream generation.",
      "Track index freshness, latency, and failure behavior.",
    ],
    "data-engineering": [
      "Define source ownership, schemas, freshness, quality checks, and SLAs.",
      "Make transformations reproducible and idempotent.",
      "Track lineage from raw inputs to downstream tables or features.",
      "Test backfills and late-arriving data explicitly.",
      "Document failure handling, alerting, and rollback or replay procedures.",
    ],
    "ml-engineering-and-mlops": [
      "Version code, data, features, model artifacts, prompts, and evaluation sets.",
      "Separate training quality, serving reliability, and business impact.",
      "Define promotion, rollback, monitoring, and incident-response criteria.",
      "Test batch and online paths with representative fixtures.",
      "Keep human review paths explicit where automated decisions are risky.",
    ],
    "cloud-and-distributed-systems": [
      "Estimate workload size, latency, throughput, storage, and failure domains.",
      "Choose managed services only after checking limits, costs, and portability needs.",
      "Design retries, idempotency, observability, and access control up front.",
      "Load test bottlenecks involving storage, network, CPU, GPU, and coordination.",
      "Document disaster recovery and cost guardrails.",
    ],
    "software-engineering": [
      "Define the contract, ownership boundary, and expected change rate.",
      "Add tests at the lowest level that can catch the failure clearly.",
      "Keep interfaces explicit and versioned when other systems depend on them.",
      "Record architectural trade-offs in decision records.",
      "Review operational behavior: logs, metrics, errors, rollout, and rollback.",
    ],
    "experimentation-and-evaluation": [
      "State the decision the evaluation will support.",
      "Define the population, sample, metrics, slices, and minimum meaningful effect.",
      "Use paired comparisons or randomized experiments where possible.",
      "Report uncertainty, cost, latency, calibration, coverage, and abstention when relevant.",
      "Treat severe errors separately from average performance.",
    ],
    "responsible-ai-safety-and-governance": [
      "Classify the risk by user impact, reversibility, and available oversight.",
      "Check privacy, security, fairness, explainability, and audit requirements.",
      "Define policy owners and approval paths for model or knowledge-base changes.",
      "Test adversarial, ambiguous, and high-severity cases.",
      "Log enough evidence to investigate incidents without retaining unnecessary sensitive data.",
    ],
  }

  return byArea[area] ?? defaults
}

function failureModesFor(area) {
  const defaults = [
    "Using a term without defining the actual input-output behavior.",
    "Treating a demo result as evidence of production readiness.",
    "Ignoring assumptions that were true in a toy example but false in deployment.",
  ]

  const byArea = {
    "mathematical-foundations": [
      "Applying a formula with incompatible dimensions or undefined conditions.",
      "Ignoring numerical conditioning, overflow, underflow, or approximation error.",
      "Remembering the symbolic rule but missing the modelling assumption behind it.",
    ],
    "probability-and-statistics": [
      "Confusing conditional probabilities, base rates, and causal claims.",
      "Using inference procedures after violating sampling or independence assumptions.",
      "Reporting statistical significance without practical significance or uncertainty context.",
    ],
    "classical-machine-learning": [
      "Leaking target information through features or split strategy.",
      "Optimizing a metric that does not match the operational decision.",
      "Trusting aggregate performance while important classes or slices fail.",
    ],
    "recommendation-systems": [
      "Treating missing interactions as explicit dislikes.",
      "Optimizing engagement while worsening diversity, novelty, or long-term feedback loops.",
      "Evaluating only offline rankings when the product changes user behavior.",
    ],
    "time-series-and-forecasting": [
      "Randomly splitting time series and leaking future information.",
      "Ignoring regime changes, holidays, stockouts, or calendar effects.",
      "Reporting point accuracy without interval coverage or horizon-specific behavior.",
    ],
    "deep-learning": [
      "Changing architecture before validating data, labels, and baseline performance.",
      "Mistaking lower training loss for better generalization.",
      "Ignoring serving constraints such as memory, throughput, and reproducibility.",
    ],
    "natural-language-processing": [
      "Training on labels whose policy is ambiguous or inconsistent.",
      "Letting truncation remove the evidence needed for the prediction.",
      "Evaluating generated or extracted text with a metric that misses semantic errors.",
    ],
    "computer-vision": [
      "Letting near-duplicate images or patient overlap leak across splits.",
      "Reporting a single score without visual inspection of false positives and false negatives.",
      "Assuming robustness across cameras, scanners, sites, or lighting conditions.",
    ],
    "video-understanding": [
      "Ignoring temporal boundaries and evaluating only clip-level labels.",
      "Using windows that are too short or too delayed for the real event.",
      "Building a model that is accurate offline but too slow for streaming use.",
    ],
    "generative-ai": [
      "Relying on prompt instructions for controls that need deterministic enforcement.",
      "Mixing retrieval, reasoning, and formatting failures into one undiagnosed score.",
      "Accepting fluent answers without evidence, citations, or schema validation.",
    ],
    "information-retrieval-and-search": [
      "Optimizing top-result precision while missing required evidence.",
      "Using synthetic relevance labels that do not match user intent.",
      "Conflating retrieval failure with downstream generation failure.",
    ],
    "data-engineering": [
      "Allowing silent schema, freshness, or semantic drift.",
      "Building transformations that cannot be replayed or audited.",
      "Treating data quality as a dashboard instead of a blocking contract.",
    ],
    "ml-engineering-and-mlops": [
      "Deploying a model without reproducible training and evaluation lineage.",
      "Monitoring service health but not model behavior.",
      "Lacking rollback criteria when live performance degrades.",
    ],
    "cloud-and-distributed-systems": [
      "Designing for average load but not retries, spikes, or partial failure.",
      "Moving more data than the network or storage layer can sustain.",
      "Choosing a service without understanding cost and quota behavior.",
    ],
    "software-engineering": [
      "Letting implicit contracts spread across code, data, and operational playbooks.",
      "Testing only happy paths while interfaces fail under invalid inputs.",
      "Skipping decision records and rediscovering the same trade-offs later.",
    ],
    "experimentation-and-evaluation": [
      "Using an evaluation set that no longer represents the target population.",
      "Averaging together errors with very different user or business severity.",
      "Ignoring uncertainty, repeated sampling, or multiple-comparison effects.",
    ],
    "responsible-ai-safety-and-governance": [
      "Treating governance as documentation rather than operational control.",
      "Logging sensitive data while trying to audit sensitive behavior.",
      "Failing to assign ownership for model, prompt, policy, or corpus changes.",
    ],
  }

  return byArea[area] ?? defaults
}

function body(meta, file) {
  const title = meta.title
  const area = meta.area
  const areaTitle = areaNames.get(area) ?? area
  const rule = ruleFor(title, area) ?? fallback(title, area)
  const indexHref =
    path.relative(path.dirname(file), path.join(path.dirname(file), "index.md")) || "index.md"
  const related = Array.isArray(meta.related)
    ? meta.related.filter((r) => typeof r === "string")
    : []

  return `# ${title}

## Summary

${rule.summary}

## Core idea

${rule.core.map((item) => `- ${item}`).join("\n")}

## Worked example

${rule.example}

## Practical checklist

${checklistFor(area, title)
  .map((item) => `- ${item}`)
  .join("\n")}

## Common failure modes

${failureModesFor(area)
  .map((item) => `- ${item}`)
  .join("\n")}

## Related navigation

- [${meta.area ? areaTitle : "Area"} index](${indexHref})
${related
  .filter((r) => r !== "index.md")
  .map((r) => `- [Related: ${r}](${r})`)
  .join("\n")}
`
}

let changed = 0

for (const file of walk(contentRoot)) {
  const raw = fs.readFileSync(file, "utf8")
  const looksLikeGeneratedImprovement =
    raw.includes("## Practical checklist") &&
    raw.includes("- Name the data, model, metric, or system boundary involved.") &&
    raw.includes("## Common failure modes")
  if (
    !placeholderPatterns.some((pattern) => raw.includes(pattern)) &&
    !(refineGenerated && looksLikeGeneratedImprovement)
  ) {
    continue
  }
  const parsed = parse(raw)
  if (!parsed?.meta?.title) continue
  fs.writeFileSync(file, `${parsed.fm}${body(parsed.meta, file)}`)
  changed++
}

console.log(`improved ${changed} placeholder pages`)
