import math
import numpy as np
import torch
import torch.nn.functional as F


def header(name):
    print(f"\n## {name}")


def backpropagation():
    header("backpropagation")
    torch.manual_seed(0)
    x = torch.tensor([[0.2, -0.4]])
    y = torch.tensor([[1.0]])
    W1 = torch.randn(2, 3, requires_grad=True)
    W2 = torch.randn(3, 1, requires_grad=True)
    h = torch.tanh(x @ W1)
    pred = h @ W2
    loss = ((pred - y) ** 2).mean()
    loss.backward()
    d_pred = 2 * (pred.detach() - y)
    dW2_manual = h.detach().T @ d_pred
    dh = d_pred @ W2.detach().T
    dW1_manual = x.T @ (dh * (1 - h.detach() ** 2))
    print("loss", round(loss.item(), 6))
    print("W2_grad", torch.round(W2.grad.flatten(), decimals=6).tolist())
    print("manual_W2_grad", torch.round(dW2_manual.flatten(), decimals=6).tolist())
    print("max_abs_W1_diff", (W1.grad - dW1_manual).abs().max().item())


def neural_network_fundamentals():
    header("neural-network-fundamentals")
    torch.manual_seed(1)
    X = torch.tensor([[0., 0.], [0., 1.], [1., 0.], [1., 1.]])
    y = torch.tensor([[0.], [1.], [1.], [0.]])
    net = torch.nn.Sequential(torch.nn.Linear(2, 4), torch.nn.Tanh(), torch.nn.Linear(4, 1))
    opt = torch.optim.SGD(net.parameters(), lr=0.5)
    loss0 = F.binary_cross_entropy_with_logits(net(X), y).item()
    for _ in range(400):
        opt.zero_grad()
        loss = F.binary_cross_entropy_with_logits(net(X), y)
        loss.backward()
        opt.step()
    probs = torch.sigmoid(net(X)).detach().flatten()
    print("loss_before", round(loss0, 4), "loss_after", round(loss.item(), 4))
    print("probabilities", torch.round(probs, decimals=3).tolist())
    print("predictions", (probs > 0.5).int().tolist())


def activation_functions():
    header("activation-functions")
    x = torch.tensor([-3., 0., 3.], requires_grad=True)
    for name, fn in [("sigmoid", torch.sigmoid), ("tanh", torch.tanh), ("relu", F.relu)]:
        x.grad = None
        y = fn(x).sum()
        y.backward()
        print(name, "values", torch.round(fn(x.detach()), decimals=3).tolist(),
              "grads", torch.round(x.grad, decimals=3).tolist())


def loss_functions():
    header("loss-functions")
    logits = torch.tensor([[2.0, 0.0, -1.0]], requires_grad=True)
    target = torch.tensor([0])
    ce = F.cross_entropy(logits, target)
    ce.backward()
    print("cross_entropy", round(ce.item(), 4))
    print("softmax", torch.round(logits.detach().softmax(1), decimals=4).tolist())
    print("ce_grad", torch.round(logits.grad, decimals=4).tolist())
    pred = torch.tensor([0.2, 0.7])
    truth = torch.tensor([0.0, 1.0])
    print("mse", round(F.mse_loss(pred, truth).item(), 4),
          "bce", round(F.binary_cross_entropy(pred, truth).item(), 4))


def optimizers():
    header("optimizers")
    grads = [torch.tensor(0.8), torch.tensor(-0.2), torch.tensor(0.4)]
    theta_sgd = theta_mom = theta_adam = torch.tensor(1.0)
    v = torch.tensor(0.0)
    m = torch.tensor(0.0)
    s = torch.tensor(0.0)
    for t, g in enumerate(grads, 1):
        theta_sgd = theta_sgd - 0.1 * g
        v = 0.9 * v + g
        theta_mom = theta_mom - 0.1 * v
        m = 0.9 * m + 0.1 * g
        s = 0.999 * s + 0.001 * g * g
        theta_adam = theta_adam - 0.1 * (m / (1 - 0.9 ** t)) / ((s / (1 - 0.999 ** t)).sqrt() + 1e-8)
    print("theta_sgd", round(theta_sgd.item(), 4))
    print("theta_momentum", round(theta_mom.item(), 4))
    print("theta_adam", round(theta_adam.item(), 4))


def initialization():
    header("initialization")
    torch.manual_seed(2)
    x = torch.randn(512, 128)
    for name, std in [("standard_normal", 1.0), ("he", math.sqrt(2 / 128))]:
        h = x.clone()
        variances = []
        for _ in range(6):
            W = torch.randn(128, 128) * std
            h = F.relu(h @ W)
            variances.append(round(h.var().item(), 3))
        print(name, variances)


def normalization():
    header("normalization")
    x = torch.tensor([[1., 2., 7.], [3., 4., 9.]])
    batch = (x - x.mean(0)) / torch.sqrt(x.var(0, unbiased=False) + 1e-5)
    layer = (x - x.mean(1, keepdim=True)) / torch.sqrt(x.var(1, unbiased=False, keepdim=True) + 1e-5)
    print("batch_norm_means", torch.round(batch.mean(0), decimals=4).tolist())
    print("batch_norm_vars", torch.round(batch.var(0, unbiased=False), decimals=4).tolist())
    print("layer_norm_row0", torch.round(layer[0], decimals=4).tolist())


def regularization():
    header("regularization")
    torch.manual_seed(3)
    x = torch.ones(6)
    dropout = torch.nn.Dropout(p=0.5)
    train_out = dropout(x)
    dropout.eval()
    eval_out = dropout(x)
    w = torch.tensor([2.0, -1.0])
    data_loss = torch.tensor(0.7)
    penalty = 0.1 * (w @ w) / 2
    print("dropout_train", train_out.tolist())
    print("dropout_eval", eval_out.tolist())
    print("loss_with_l2", round((data_loss + penalty).item(), 3))


def convolutional_neural_networks():
    header("convolutional-neural-networks")
    x = torch.arange(16, dtype=torch.float32).view(1, 1, 4, 4)
    kernel = torch.tensor([[[[1., 0.], [0., -1.]]]])
    y = F.conv2d(x, kernel)
    print("input")
    print(x.view(4, 4).int().tolist())
    print("conv_output")
    print(y.view(3, 3).int().tolist())
    print("receptive_field_two_3x3_layers", 5)


def recurrent_neural_networks():
    header("recurrent-neural-networks")
    torch.manual_seed(4)
    xs = torch.randn(4, 2)
    Wx = torch.randn(2, 3) * 0.4
    Wh = torch.eye(3) * 0.7
    h = torch.zeros(3)
    states = []
    for x in xs:
        h = torch.tanh(x @ Wx + h @ Wh)
        states.append(h.norm().item())
    print("hidden_norms", [round(v, 3) for v in states])
    print("final_hidden", torch.round(h, decimals=3).tolist())


def lstm_and_gru():
    header("lstm-and-gru")
    torch.manual_seed(5)
    x = torch.randn(1, 3)
    lstm = torch.nn.LSTMCell(3, 4)
    gru = torch.nn.GRUCell(3, 4)
    h0 = torch.zeros(1, 4)
    c0 = torch.zeros(1, 4)
    h_lstm, c_lstm = lstm(x, (h0, c0))
    h_gru = gru(x, h0)
    print("lstm_h", torch.round(h_lstm, decimals=3).tolist())
    print("lstm_c", torch.round(c_lstm, decimals=3).tolist())
    print("gru_h", torch.round(h_gru, decimals=3).tolist())


def attention():
    header("attention")
    torch.manual_seed(6)
    Q = torch.tensor([[1., 0.], [0., 1.]])
    K = torch.tensor([[1., 0.], [1., 1.], [0., 1.]])
    V = torch.tensor([[10., 0.], [0., 5.], [0., 1.]])
    scores = Q @ K.T / math.sqrt(2)
    weights = scores.softmax(dim=-1)
    context = weights @ V
    print("weights", torch.round(weights, decimals=3).tolist())
    print("context", torch.round(context, decimals=3).tolist())


def transformers():
    header("transformers")
    torch.manual_seed(7)
    X = torch.randn(3, 4)
    Q = K = V = X
    mask = torch.triu(torch.ones(3, 3) * float("-inf"), diagonal=1)
    weights = ((Q @ K.T) / math.sqrt(4) + mask).softmax(-1)
    attn = weights @ V
    ffn = torch.relu(attn @ torch.randn(4, 8)) @ torch.randn(8, 4)
    print("causal_weights", torch.round(weights, decimals=3).tolist())
    print("block_output_shape", list(ffn.shape))


def representation_learning():
    header("representation-learning")
    torch.manual_seed(8)
    X = torch.randn(80, 3)
    X[:, 2] = X[:, 0] * 0.5 - X[:, 1] * 0.2
    enc = torch.nn.Linear(3, 2)
    dec = torch.nn.Linear(2, 3)
    opt = torch.optim.Adam(list(enc.parameters()) + list(dec.parameters()), lr=0.05)
    start = F.mse_loss(dec(enc(X)), X).item()
    for _ in range(200):
        opt.zero_grad()
        loss = F.mse_loss(dec(enc(X)), X)
        loss.backward()
        opt.step()
    z0 = enc(X[:1]).detach()
    print("recon_loss_before", round(start, 4), "after", round(loss.item(), 4))
    print("first_latent", torch.round(z0, decimals=3).tolist())


def self_supervised_learning():
    header("self-supervised-learning")
    torch.manual_seed(9)
    X = torch.randn(100, 3)
    y = X[:, 2:3]
    visible = X[:, :2]
    pred = torch.nn.Linear(2, 1)
    opt = torch.optim.SGD(pred.parameters(), lr=0.2)
    start = F.mse_loss(pred(visible), y).item()
    for _ in range(80):
        opt.zero_grad()
        loss = F.mse_loss(pred(visible), y)
        loss.backward()
        opt.step()
    print("masked_feature_loss_before", round(start, 4), "after", round(loss.item(), 4))
    print("learned_weights", torch.round(pred.weight.detach(), decimals=3).tolist())


def contrastive_learning():
    header("contrastive-learning")
    torch.manual_seed(10)
    z = F.normalize(torch.randn(4, 3), dim=1)
    z[1] = F.normalize(z[0] + 0.1 * torch.randn(3), dim=0)
    z[3] = F.normalize(z[2] + 0.1 * torch.randn(3), dim=0)
    sim = z @ z.T / 0.5
    sim.fill_diagonal_(-1e9)
    targets = torch.tensor([1, 0, 3, 2])
    loss = F.cross_entropy(sim, targets)
    probs = sim.softmax(1)[torch.arange(4), targets]
    print("nt_xent_loss", round(loss.item(), 4))
    print("positive_probs", torch.round(probs, decimals=3).tolist())


def transfer_learning():
    header("transfer-learning")
    torch.manual_seed(11)
    X = torch.randn(120, 5)
    frozen = torch.randn(5, 4)
    y = ((X @ frozen)[:, 0] > 0).long()
    feats = (X @ frozen).detach()
    head = torch.nn.Linear(4, 2)
    opt = torch.optim.SGD(head.parameters(), lr=0.2)
    start_acc = (head(feats).argmax(1) == y).float().mean().item()
    for _ in range(60):
        opt.zero_grad()
        loss = F.cross_entropy(head(feats), y)
        loss.backward()
        opt.step()
    acc = (head(feats).argmax(1) == y).float().mean().item()
    print("head_acc_before", round(start_acc, 3), "after", round(acc, 3))
    print("feature_grad_needed", feats.requires_grad)


def fine_tuning():
    header("fine-tuning")
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


def multimodal_learning():
    header("multimodal-learning")
    torch.manual_seed(13)
    image = F.normalize(torch.randn(3, 4), dim=1)
    text = image[[0, 2, 1]] + 0.05 * torch.randn(3, 4)
    text = F.normalize(text, dim=1)
    logits = image @ text.T / 0.07
    probs = logits.softmax(1)
    print("similarity")
    print(torch.round(image @ text.T, decimals=3).tolist())
    print("image_to_text_match", probs.argmax(1).tolist())


def pytorch():
    header("pytorch")
    torch.manual_seed(14)
    w = torch.tensor([1.5], requires_grad=True)
    x = torch.tensor([2.0])
    y = (w * x).pow(2) if w.item() > 1 else w * x
    y.backward()
    with torch.no_grad():
        w -= 0.1 * w.grad
    print("grad", round(w.grad.item(), 3))
    print("updated_w", round(w.item(), 3))
    print("grad_fn", type(y.grad_fn).__name__)


def tensorflow_and_keras():
    header("tensorflow-and-keras")
    np.random.seed(15)
    x = np.array([[1.0, -2.0]])
    W = np.random.normal(size=(2, 3))
    b = np.array([0.1, 0.0, -0.1])
    logits = x @ W + b
    probs = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)
    print("dense_logits", np.round(logits, 3).tolist())
    print("softmax_probs", np.round(probs, 3).tolist())
    print("predicted_class", probs.argmax(axis=1).tolist())


def mixed_precision():
    header("mixed-precision")
    tiny_grad = np.float16(1e-8)
    scaled = np.float16(1e-8 * 4096)
    recovered = np.float32(scaled) / 4096
    a = torch.tensor([1.001], dtype=torch.float32)
    print("float16_tiny_grad", tiny_grad.item())
    print("scaled_then_unscaled", float(recovered))
    print("float16_value", torch.round(a.half().float(), decimals=6).item())


def distributed_training():
    header("distributed-training")
    w = np.array([1.0, -1.0])
    g0 = np.array([0.6, -0.2])
    g1 = np.array([0.2, 0.4])
    lr = 0.1
    local0 = w - lr * g0
    averaged = w - lr * ((g0 + g1) / 2)
    print("worker0_local_step", np.round(local0, 3).tolist())
    print("allreduced_step", np.round(averaged, 3).tolist())
    print("gradient_mean", np.round((g0 + g1) / 2, 3).tolist())


for fn in [
    backpropagation,
    neural_network_fundamentals,
    activation_functions,
    loss_functions,
    optimizers,
    initialization,
    normalization,
    regularization,
    convolutional_neural_networks,
    recurrent_neural_networks,
    lstm_and_gru,
    attention,
    transformers,
    representation_learning,
    self_supervised_learning,
    contrastive_learning,
    transfer_learning,
    fine_tuning,
    multimodal_learning,
    pytorch,
    tensorflow_and_keras,
    mixed_precision,
    distributed_training,
]:
    fn()
