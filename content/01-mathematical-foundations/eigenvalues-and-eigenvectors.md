---
title: Eigenvalues and Eigenvectors
slug: mathematical-foundations/eigenvalues-and-eigenvectors
description: "Directions that a square linear map only scales, with the corresponding scale factors."
area: mathematical-foundations
topics:
  - linear-algebra
  - eigenvalues
level: foundational
status: review
page_type: concept
aliases: []
prerequisites:
  - linear-algebra.md
related:
  - linear-algebra.md
  - matrix-decompositions.md
  - singular-value-decomposition.md
  - orthogonality.md
  - ../03-classical-machine-learning/pca.md
historical_context: false
last_reviewed: 2026-07-11
---

# Eigenvalues and Eigenvectors

An eigenvector is a direction that a square matrix stretches or shrinks without rotating away from itself. The eigenvalue is that stretch factor. They expose natural axes of transformations, covariance matrices, graph Laplacians, and stability dynamics.

## Defining math

For $A\in\mathbb R^{n\times n}$, a nonzero vector $v$ is an eigenvector when

$$
Av=\lambda v.
$$

Here $A$ is a square matrix, $v$ is a nonzero direction vector, and $\lambda$ is the scalar factor applied along that direction. The equation says that applying $A$ changes the length and possibly sign of $v$, but not its direction.

The scalar $\lambda$ is an eigenvalue, found from

$$
\det(A-\lambda I)=0.
$$

The determinant becomes zero exactly when $A-\lambda I$ loses an independent direction, which means there is a nonzero vector $v$ satisfying $Av=\lambda v$.

If $A$ is symmetric, its eigenvectors can be chosen [orthogonal](orthogonality.md), giving $A=Q\Lambda Q^\top$. This special structure is why covariance eigendecomposition and [PCA](../03-classical-machine-learning/pca.md) are stable for symmetric matrices. [SVD](singular-value-decomposition.md) extends related geometry to rectangular or non-normal matrices by using eigenvectors of $A^\top A$.

## Executed demo

This snippet computes the eigenpairs of a symmetric matrix and verifies each pair by measuring the residual norm $\|Av-\lambda v\|$.

```python
import numpy as np

B = np.array([[2., 1.], [1., 2.]])
w, v = np.linalg.eig(B)
idx = np.argsort(w)[::-1]
w, v = w[idx], v[:, idx]
print("eigenvalues", np.round(w, 4))
print("Av_minus_lambda_v_norms",
      np.round([np.linalg.norm(B @ v[:, i] - w[i] * v[:, i]) for i in range(2)], 12))
```

Observed output:

```text
eigenvalues [3. 1.]
Av_minus_lambda_v_norms [0. 0.]
```

Both residual norms are zero to displayed precision, confirming $Bv=\lambda v$. The larger eigenvalue corresponds to the direction where the matrix amplifies most strongly.

## Caveats

Eigenvectors are scale-ambiguous: $v$ and $-v$ represent the same direction. Non-symmetric matrices may have complex eigenvalues or too few independent eigenvectors, so do not use eigendecomposition where [matrix decompositions](matrix-decompositions.md) such as SVD are the safer tool.

## References

- [NumPy documentation: `numpy.linalg.eig`](https://numpy.org/doc/stable/reference/generated/numpy.linalg.eig.html)
- [MIT OpenCourseWare: 18.06 Linear Algebra](https://ocw.mit.edu/courses/18-06-linear-algebra-spring-2010/)

> [!nav]
> **Section** — [Mathematical Foundations](index.md)
>
> [← Norms and Distances](norms-and-distances.md) [Matrix Decompositions →](matrix-decompositions.md)
