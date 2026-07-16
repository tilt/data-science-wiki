---
title: Temporal-Difference Learning
slug: reinforcement-learning/temporal-difference-learning
description: Learning value functions from incomplete episodes by bootstrapping, covering TD(0), SARSA, Q-learning, n-step returns, and eligibility traces.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - temporal-difference-learning
  - sarsa
  - eligibility-traces
  - on-policy-vs-off-policy
level: intermediate
status: complete
page_type: concept
aliases:
  - "Temporal Difference Learning"
  - "TD Learning"
  - "SARSA"
  - "TD(lambda)"
prerequisites:
  - "value-functions-and-bellman-equations.md"
related:
  - "q-learning-and-dqn.md"
  - "policy-gradients-and-actor-critic.md"
  - "markov-decision-processes.md"
historical_context: false
last_reviewed: 2026-07-14
---

# Temporal-Difference Learning

Temporal-difference (TD) learning estimates value functions by updating a prediction toward a later, better-informed prediction. It sits between Monte Carlo methods, which wait for a full episode return, and dynamic programming, which needs a known model. TD learns online from raw experience and bootstraps: it updates one estimate using another estimate.

## TD Prediction

For a transition $(s,r,s')$ under a fixed policy, TD(0) updates the state value:

$$
V(s)\leftarrow V(s)+\alpha\left[r+\gamma V(s')-V(s)\right].
$$

The bracketed quantity is the **TD error**:

$$
\delta = r+\gamma V(s')-V(s).
$$

It measures how much the one-step target $r+\gamma V(s')$ disagrees with the current estimate $V(s)$. A positive error means the transition was better than expected, so the estimate moves up.

## Three Ways to Estimate a Value

| Method         | Target                                 | Needs a model? | Waits for episode end? | Variance | Bias from bootstrapping |
| -------------- | -------------------------------------- | -------------- | ---------------------- | -------- | ----------------------- |
| Dynamic prog.  | $\sum_{s'}P(s'\mid s)[r+\gamma V(s')]$ | Yes            | No                     | None     | None                    |
| Monte Carlo    | Full return $G_t$                      | No             | Yes                    | High     | None                    |
| Temporal diff. | $r+\gamma V(s')$                       | No             | No                     | Lower    | Yes                     |

TD trades a little bias for lower variance and the ability to learn from incomplete, ongoing episodes. This is why it underlies most practical value-based control.

## On-Policy Control: SARSA

SARSA learns action values while following the same policy it improves. For a transition $(s,a,r,s',a')$ where $a'$ is the action actually taken next:

$$
Q(s,a)\leftarrow Q(s,a)+\alpha\left[r+\gamma Q(s',a')-Q(s,a)\right].
$$

Because the target uses the next action the current policy chose, SARSA evaluates the policy it is actually running, including its exploration. It tends to learn safer paths when exploration is risky.

## Off-Policy Control: Q-Learning

[Q-learning](q-learning-and-dqn.md) replaces $Q(s',a')$ with $\max_{a'}Q(s',a')$, so it learns the value of the greedy policy regardless of the exploratory actions actually taken. This off-policy target is the main practical difference from SARSA.

| Aspect             | SARSA (on-policy)          | Q-learning (off-policy) |
| ------------------ | -------------------------- | ----------------------- |
| Next-action value  | action the policy took     | greedy $\max_{a'}$      |
| Learns value of    | the behavior policy itself | the greedy policy       |
| Behavior near risk | more conservative          | more optimistic         |

## Worked TD(0) Update

Let $V(s)=6$, reward $r=1$, discount $\gamma=0.9$, next value $V(s')=10$, and step size $\alpha=0.1$. The target is $1+0.9\cdot 10=10$, so $\delta = 10-6=4$ and

$$
V(s)\leftarrow 6+0.1\cdot 4 = 6.4.
$$

## n-Step Returns and Eligibility Traces

TD(0) uses a one-step target; Monte Carlo uses the full return. **n-step TD** interpolates by bootstrapping after $n$ rewards:

$$
G_{t}^{(n)}=r_{t+1}+\gamma r_{t+2}+\cdots+\gamma^{n-1}r_{t+n}+\gamma^{n}V(s_{t+n}).
$$

**TD($\lambda$)** averages all n-step returns with geometrically decaying weights $\lambda^{n-1}$, and eligibility traces implement this efficiently by assigning credit to recently visited states. Small $\lambda$ behaves like TD(0); $\lambda=1$ approaches Monte Carlo.

## Caveats

Bootstrapping introduces bias and can diverge when combined with function approximation and off-policy targets, the so-called deadly triad. Step sizes, target networks, and on-policy sampling all mitigate this in practice.

## Connections

- [Value Functions and Bellman Equations](value-functions-and-bellman-equations.md) define the fixed point TD updates move toward.
- [Q-Learning and DQN](q-learning-and-dqn.md) is the off-policy TD control method scaled to neural networks.
- [Policy Gradients and Actor-Critic Methods](policy-gradients-and-actor-critic.md) use a TD-learned critic to reduce gradient variance.

## References

- [Sutton and Barto, 2018, Reinforcement Learning: An Introduction (Chapters 6–7, 12)](http://incompleteideas.net/book/the-book-2nd.html)
- [Sutton, 1988, Learning to Predict by the Methods of Temporal Differences](https://link.springer.com/article/10.1007/BF00115009)
- [van Seijen et al., 2016, True Online Temporal-Difference Learning](https://arxiv.org/abs/1512.04087)

> **Section — [Reinforcement Learning](index.md):** ← [Value Functions and Bellman Equations](value-functions-and-bellman-equations.md) · [Q-Learning and DQN](q-learning-and-dqn.md) →

> **Learning path — [Reinforcement learning](../00-home-and-navigation/learning-paths.md#reinforcement-learning):** ← [Value Functions and Bellman Equations](value-functions-and-bellman-equations.md) · [Q-Learning and DQN](q-learning-and-dqn.md) →
