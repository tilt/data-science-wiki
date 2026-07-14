---
title: Value Functions and Bellman Equations
slug: reinforcement-learning/value-functions-and-bellman-equations
description: Expected return, action values, and the recursive equations used by reinforcement learning algorithms.
area: reinforcement-learning
topics:
  - reinforcement-learning
  - value-functions
  - bellman-equations
  - dynamic-programming
level: foundational
status: complete
page_type: concept
aliases:
  - "Bellman Equations"
  - "Value Function"
  - "Q Function"
prerequisites:
  - "markov-decision-processes.md"
related:
  - "q-learning-and-dqn.md"
  - "policy-gradients-and-actor-critic.md"
  - "../01-mathematical-foundations/optimization.md"
historical_context: false
last_reviewed: 2026-07-14
---

# Value Functions and Bellman Equations

Value functions turn delayed reward into a prediction problem. They answer "how much future return should I expect if I start here?" or "how much future return should I expect if I take this action first?"

## Defining Math

For a policy $\pi(a\mid s)$, the state-value function is

$$
V^\pi(s)=\mathbb{E}_\pi[G_t\mid S_t=s].
$$

The action-value function is

$$
Q^\pi(s,a)=\mathbb{E}_\pi[G_t\mid S_t=s,A_t=a].
$$

The Bellman expectation equation rewrites value recursively:

$$
V^\pi(s)=\sum_a \pi(a\mid s)\sum_{s',r}P(s',r\mid s,a)\left[r+\gamma V^\pi(s')\right].
$$

The value of a state is the expected immediate reward plus the discounted value of the next state.

## Optimality

The optimal action-value function satisfies

$$
Q^*(s,a)=\sum_{s',r}P(s',r\mid s,a)
\left[r+\gamma\max_{a'}Q^*(s',a')\right].
$$

The $\max_{a'}$ term says that after taking action $a$, the agent assumes optimal behavior from the next state onward. This is the target behind many value-based control algorithms.

## Worked Calculation

Suppose a state has two actions. Action $a_1$ gives reward $1$ and moves to a next state with value $10$. Action $a_2$ gives reward $4$ and moves to a next state with value $3$. With $\gamma=0.8$:

$$
Q(s,a_1)=1+0.8\cdot 10=9,\qquad
Q(s,a_2)=4+0.8\cdot 3=6.4.
$$

Action $a_1$ has the smaller immediate reward but higher total value because it leads to a much better future state. That is the central point of value functions: they price delayed consequences.

## Intuition

Bellman equations are consistency equations. A value estimate is good when the value assigned to the current state agrees with the observed reward and the value assigned to the next state. Temporal-difference learning uses this mismatch as a learning signal.

## Caveats

Exact Bellman updates require known transition probabilities or enough samples to estimate them. Large state spaces replace tables with function approximators, which introduces approximation error, instability, and distribution-shift risk.

## Connections

- [Q-Learning and DQN](q-learning-and-dqn.md) use the Bellman optimality target for action values.
- [Policy Gradients and Actor-Critic Methods](policy-gradients-and-actor-critic.md) use value functions as critics and baselines.
- [Markov Decision Processes](markov-decision-processes.md) define the transition and reward process that Bellman equations summarize.

## References

- [Bellman, 1957, Dynamic Programming](https://press.princeton.edu/books/paperback/9780691146683/dynamic-programming)
- [Sutton and Barto, 2018, Reinforcement Learning: An Introduction](http://incompleteideas.net/book/the-book-2nd.html)
