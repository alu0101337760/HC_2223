# 1 Introduction
## 1.1 Description of the problem
In this report, we will prove the NP-Completeness of the Hamiltonian Circuit problem. To do so, we will find a way to transform the input of another NP-Complete problem (in our case, the Vertex Cover problem) into the input of a Hamiltonian Circuit Problem. The procedure used to transform the input must be polynomial, and the resulting input for the Hamiltonian Circuit problem must be satisfied if and only if the original input satisfies the Vertex Cover problem.

# 2 Proving the NP-completeness
## 2.1 Introduction
We define the class of NP Languages as the languages that represent all of the encoded decision problems that a Non-Deterministic Turing Machine (NDTM) can solve in polynomial time complexity.
The class of languages NP-Complete is defined by the following statement:
A language L is NP-Complete if it satisfies the following conditions:
- $L ∈ NP$
- $∀L' ∈ NP ∃L' ≤p L$

This means, if the language L is NP-complete, it must belong to the NP class, and every other language L’ that belongs to the NP class must have a polynomial transformation to L.
Furthermore, if a language L’ is known to be NP-complete, a polynomial transformation to L confirms L is also NP-complete. In formal terms:
- $L ∈ NP$
- $L' ∈ NP-Complete$
- $∃L' ≤p L ⇒ L ∈ NP-Complete$

Knowing this, we can prove that the Hamiltonian Circuit problem is NP-Complete, by proving that it belongs to the NP language class and finding a polynomial transformation from Vertex Cover (a known NP-complete language) to Hamiltonian Circuit.

## 2.2 Vertex Cover Problem
A Vertex Cover is a subset of vertices from a graph that contains at least one endpoint of every edge of the graph. The problem of finding a Minimum Vertex Cover is a classical optimization problem and is NP-Complete.
The formal definition of the problem would be:
Given a Graph $G = (V, E)$ and an integer $K ∈ ℕ$
The Vertex Cover $V' ⊆ V: uv ∈ E ⇒ (u ∈ V' ∨ v ∈ V')$

Can we find a vertex cover with $|V'| = K$?
