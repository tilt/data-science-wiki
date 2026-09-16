---
title: Fine-Tuning
slug: deep-learning/fine-tuning
description: "Adapting pretrained neural networks by selectively updating parameters on a target task."
area: deep-learning
topics:
  - fine-tuning
level: foundational
status: complete
page_type: concept
aliases:
  - fine tuning
  - QLoRA
  - Quantized LoRA
prerequisites:
  - index.md
related:
  - transfer-learning.md
  - regularization.md
  - optimizers.md
  - ../11-generative-ai/quantization.md
  - ../11-generative-ai/fine-tuning-versus-rag.md
historical_context: false
last_reviewed: 2026-07-22
---

# Fine-Tuning

Fine-tuning adapts a pretrained model to a target task by updating selected parameters. It is a specific form of [transfer learning](transfer-learning.md): start from a useful representation, then decide which layers or adapters should learn. In generative systems it should be separated from [fine-tuning versus RAG](../11-generative-ai/fine-tuning-versus-rag.md), because retrieval can solve knowledge injection without changing weights.

## Full, partial, and low-rank tuning

Full fine-tuning optimizes all parameters:

$$
\theta^*=\arg\min_\theta \frac{1}{n}\sum_i L(f_\theta(x_i),y_i).
$$

Frozen-backbone tuning optimizes only a subset $S$:

$$
\theta_{\bar S}=\theta_{0,\bar S}, \qquad
\theta_S^*=\arg\min_{\theta_S}\frac{1}{n}\sum_i L(f_{\theta_S,\theta_{0,\bar S}}(x_i),y_i).
$$

Adapter methods such as LoRA add a low-rank update to a frozen matrix,

$$
W' = W + \Delta W,\qquad \Delta W = BA,\quad \operatorname{rank}(\Delta W)\le r.
$$

For a dense weight matrix $W\in\mathbb R^{d_{\mathrm{out}}\times d_{\mathrm{in}}}$, full fine-tuning trains $d_{\mathrm{out}}d_{\mathrm{in}}$ parameters for that matrix. LoRA freezes $W$ and trains two skinny matrices:

$$
B\in\mathbb R^{d_{\mathrm{out}}\times r},\qquad
A\in\mathbb R^{r\times d_{\mathrm{in}}}.
$$

The trainable parameter count becomes

$$
r(d_{\mathrm{out}}+d_{\mathrm{in}}),
$$

which is much smaller when the rank $r$ is small. For a $4096\times4096$ projection, full fine-tuning trains $16{,}777{,}216$ parameters. With $r=8$, LoRA trains $8(4096+4096)=65{,}536$ parameters for the adapter, about $0.39\%$ of the full matrix.

## Symbol guide

The full fine-tuning objective uses:

| Symbol            | Meaning                                                                            |
| ----------------- | ---------------------------------------------------------------------------------- |
| $\theta$          | All trainable model parameters.                                                    |
| $\theta^*$        | The parameter values after optimization.                                           |
| $n$               | Number of training examples.                                                       |
| $i$               | Index of one training example.                                                     |
| $x_i$             | Input for example $i$, such as an image, text prompt, or feature vector.           |
| $y_i$             | Target output for example $i$, such as a class, transcription, or response tokens. |
| $f_\theta$        | Model with parameters $\theta$.                                                    |
| $L(\hat y,y)$     | Loss comparing prediction $\hat y$ with target $y$.                                |
| $\arg\min_\theta$ | The parameter value that minimizes the objective over $\theta$.                    |

The frozen-backbone equation splits parameters into a trainable subset and a frozen subset:

| Symbol                           | Meaning                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------- |
| $S$                              | Set of parameters allowed to update, such as a head, adapter, or last few layers.   |
| $\bar S$                         | Complement of $S$: parameters kept frozen.                                          |
| $\theta_0$                       | Initial pretrained parameters before fine-tuning.                                   |
| $\theta_{0,\bar S}$              | Frozen pretrained parameters outside the trainable subset.                          |
| $\theta_S$                       | Trainable parameters inside subset $S$.                                             |
| $f_{\theta_S,\theta_{0,\bar S}}$ | Model using updated parameters in $S$ and frozen pretrained parameters outside $S$. |

The LoRA equations use:

| Symbol             | Meaning                                                                                   |
| ------------------ | ----------------------------------------------------------------------------------------- |
| $W$                | Frozen pretrained weight matrix.                                                          |
| $W'$               | Effective adapted weight used by the layer.                                               |
| $\Delta W$         | Task-specific update added to $W$.                                                        |
| $B$                | Trainable LoRA "up" matrix with shape $d_{\mathrm{out}}\times r$.                         |
| $A$                | Trainable LoRA "down" matrix with shape $r\times d_{\mathrm{in}}$.                        |
| $r$                | LoRA rank; a small bottleneck dimension controlling adapter capacity and parameter count. |
| $d_{\mathrm{in}}$  | Input width of the original dense projection.                                             |
| $d_{\mathrm{out}}$ | Output width of the original dense projection.                                            |

The product $BA$ has the same shape as $W$, so it can be added to the original matrix. It is low-rank because it is factored through the small dimension $r$.

## LoRA Footprint

LoRA achieves a small footprint because the large pretrained matrix stays frozen. Only the low-rank adapter weights and their [optimizer](optimizers.md) state need to be trained, checkpointed, and swapped for a task. At inference time, the adapter can be applied as $Wx + BAx$, or the low-rank update can be merged into $W$ for deployment.

This has three practical consequences:

| Aspect             | Full fine-tuning                                       | LoRA-style adapter tuning                   |
| ------------------ | ------------------------------------------------------ | ------------------------------------------- |
| Trainable weights  | all selected base weights                              | only low-rank adapter matrices              |
| Optimizer state    | large, because Adam-style state tracks trained weights | small, because state tracks adapter weights |
| Task storage       | often a full model copy or large delta                 | compact adapter checkpoint                  |
| Base model sharing | each task may need separate weights                    | many adapters can share one frozen base     |

The small footprint is not magic compression of the original model. It is a modeling assumption: the task-specific update can be well approximated by a low-rank matrix. If the target task needs broad changes across many directions, too small a rank can underfit.

## QLoRA

QLoRA combines [quantization](../11-generative-ai/quantization.md) with LoRA-style adapter tuning. The pretrained base model is stored in 4-bit quantized form and kept frozen, while small LoRA matrices are trained in higher-precision compute. Gradients flow through the quantized base model into the adapter weights, so the memory-heavy base does not need full-precision optimizer state.

Conceptually, QLoRA uses the same low-rank update as LoRA,

$$
W' \approx \operatorname{dequantize}(Q(W)) + BA,
$$

where $Q(W)$ is a 4-bit representation of the frozen base weight and $BA$ is the trainable low-rank adapter. The approximation symbol matters: the base model used during training is the quantized reconstruction of the original weights, not the original full-precision matrix.

The QLoRA paper made this practical with three engineering ideas:

| Component           | Role                                                                                   |
| ------------------- | -------------------------------------------------------------------------------------- |
| NF4                 | a 4-bit NormalFloat data type designed for normally distributed neural-network weights |
| double quantization | quantizes quantization constants as well, reducing metadata memory                     |
| paged optimizers    | reduce temporary GPU memory spikes during adapter training                             |

QLoRA is useful when the bottleneck is GPU memory for adapter training. It can make a large base model trainable on much smaller hardware than full fine-tuning, while still saving only compact adapter checkpoints. It is not a general replacement for [RAG](../11-generative-ai/rag.md): if the problem is changing facts, private documents, or auditable citations, retrieval is usually the better first tool.

## Examples

The first example is a production-shaped adapter setup: a large multimodal base model stays frozen while LoRA adapters learn a supervised image-to-text task. The second example is intentionally tiny: it isolates the mechanics of freezing a base and training only a small head.

### Example 1: multimodal LoRA

A practical LoRA fine-tuning run can start from a pretrained vision-language model and train only adapter weights. Handwriting recognition is one example: the input is an image plus an instruction, and the target is the desired text answer. The same pattern also applies to document field extraction, visual question answering, image captioning style adaptation, or domain-specific OCR correction.

1. Load labelled images and target responses.
2. Build prompt messages with an image placeholder and an instruction such as "Read the text in this image" or "Extract the requested fields."
3. Load the pretrained vision-language model in 4-bit form to fit GPU memory.
4. Add LoRA adapters to linear layers and freeze the quantized base model.
5. Mask the prompt tokens in `labels` so the loss trains only the assistant answer.
6. Train with a held-out validation set and select the checkpoint using a task-appropriate metric.

The core model and adapter setup looks like this:

```python
import torch
from peft import LoraConfig, get_peft_model, prepare_model_for_kbit_training
from transformers import AutoModelForImageTextToText, BitsAndBytesConfig, Trainer, TrainingArguments

# Load the base model in 4-bit form so the frozen backbone fits in memory.
quantization_config = BitsAndBytesConfig(
    load_in_4bit=True,
    bnb_4bit_quant_type="nf4",
    bnb_4bit_use_double_quant=True,
    bnb_4bit_compute_dtype=torch.float16,
)

base_model = AutoModelForImageTextToText.from_pretrained(
    "provider/vision-language-model",
    device_map="auto",
    quantization_config=quantization_config,
)

# Prepare the quantized model for adapter training, then attach LoRA modules.
base_model = prepare_model_for_kbit_training(base_model, use_gradient_checkpointing=True)
lora_config = LoraConfig(
    r=16,
    lora_alpha=32,
    lora_dropout=0.1,
    target_modules="all-linear",
    bias="none",
    task_type="CAUSAL_LM",
)

# This wraps the base model with trainable LoRA adapters.
# It does not start training yet.
model = get_peft_model(base_model, lora_config)

training_args = TrainingArguments(
    output_dir="outputs/vlm-lora",
    per_device_train_batch_size=1,
    gradient_accumulation_steps=8,
    learning_rate=2e-4,
    num_train_epochs=3,
    remove_unused_columns=False,
)

trainer = Trainer(
    model=model,
    args=training_args,
    train_dataset=train_dataset,
    eval_dataset=validation_dataset,
    data_collator=data_collator,
)

# This starts optimization: only LoRA adapter weights should update.
trainer.train()
```

Here `load_in_4bit=True` stores the frozen base model compactly. `r=16` is the LoRA rank. `lora_alpha=32` is the scaling factor applied to the low-rank update. `lora_dropout=0.1` regularizes adapter training. `target_modules="all-linear"` attaches adapters to linear projections, which is common for transformer-style models. `task_type="CAUSAL_LM"` tells the PEFT library that the training objective is next-token prediction. `get_peft_model(...)` only modifies the model by inserting adapter modules; the optimization starts later at `trainer.train()`.

For supervised image-to-text training, label construction is just as important as adapter configuration:

```python
# Tokenize the prompt plus target answer.
item = processor(text=full_text, images=image, return_tensors="pt")

# Tokenize the prompt alone to find where the assistant answer begins.
prompt_inputs = processor(text=prompt_text, images=image, return_tensors="pt")
prompt_len = prompt_inputs["input_ids"].shape[1]

# Copy the full sequence as labels, then ignore prompt and padding positions.
labels = item["input_ids"].clone()
labels[:, :prompt_len] = -100
labels[labels == processor.tokenizer.pad_token_id] = -100
item["labels"] = labels
```

The value `-100` is the PyTorch cross-entropy ignore index used by Hugging Face language-model trainers. Masking the prompt means the model is not rewarded for reproducing the system instruction or user request; the loss applies only to the target answer tokens. This is the supervised fine-tuning equivalent of saying: "given this image and prompt, learn to emit the labelled response."

The evaluation metric should match the task. Handwriting recognition or OCR-style tasks often use character error rate because single-character mistakes can matter. Field extraction may use exact-match or schema-validity checks. Captioning may need semantic or human evaluation in addition to token-level similarity.

### Example 2: minimal frozen head

This snippet freezes a base network, trains only a small head, and checks that the base weights do not change during the update.

```python
import torch
import torch.nn.functional as F

torch.manual_seed(12)
base = torch.nn.Linear(3, 3)
head = torch.nn.Linear(3, 1)
for p in base.parameters():
    p.requires_grad_(False)
X = torch.randn(20, 3)
y = torch.randn(20, 1)
before = base.weight.detach().clone()
opt = torch.optim.SGD(head.parameters(), lr=0.1)
loss = F.mse_loss(head(torch.relu(base(X))), y)
loss.backward()
opt.step()
print("trainable_params", sum(p.numel() for p in list(base.parameters()) + list(head.parameters()) if p.requires_grad))
print("loss", round(loss.item(), 4))
print("base_weight_change", (base.weight.detach() - before).abs().max().item())
```

Observed output:

```text
trainable_params 4
loss 0.7045
base_weight_change 0.0
```

The frozen base maps each 3-dimensional input to 3 hidden features, but its weight and bias have `requires_grad=False`, so the optimizer never sees those parameters. Only the 3 head weights plus 1 head bias are trainable, giving `trainable_params 4`. The `base_weight_change` is exactly `0.0` because gradients flow through the base to train the head, but no update is applied to the base weights.

## Caveats

Small target datasets make full fine-tuning prone to overfitting and catastrophic forgetting. Learning rates usually need to be lower than scratch training. Evaluation must include target-domain slices because average validation loss can hide regressions in the capabilities the pretrained model already had.

## References

- [Hu et al., 2021, LoRA: Low-Rank Adaptation of Large Language Models](https://arxiv.org/abs/2106.09685)
- [Dettmers et al., 2023, QLoRA: Efficient Finetuning of Quantized LLMs](https://arxiv.org/abs/2305.14314)
- [PyTorch documentation: Autograd mechanics](https://docs.pytorch.org/docs/2.7/notes/autograd.html)

> [!nav]
> **Section** — [Deep Learning](index.md)
>
> [← Transfer Learning](transfer-learning.md) [Multimodal Learning →](multimodal-learning.md)
