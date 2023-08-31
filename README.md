# NP-COMPLETENESS FOR HAMILTONIAN CIRCUIT
# 1 Introduction
## 1.1 Description of the problem
In this report, we will prove the NP-Completeness of the Hamiltonian Circuit problem. To do so, we will find a way to transform the input of another NP-Complete problem (in our case, the Vertex Cover problem) into the input of a Hamiltonian Circuit Problem. The procedure used to transform the input must be polynomial, and the resulting input for the Hamiltonian Circuit problem must be satisfied if and only if the original input satisfies the Vertex Cover problem.

# 2 Proving the NP-completeness
## 2.1 Introduction
We define the class of NP Languages as the languages that represent all of the encoded decision problems that a Non-Deterministic Turing Machine (NDTM) can solve in polynomial time complexity.
The class of languages NP-Complete is defined by the following statement:
A language L is NP-Complete if it satisfies the following conditions:
- L ∈ NP
- ∀L′ ∈ NP ∃L′ ∝ L

This means that if the language L is NP-complete, it must belong to the NP class, and every other language L’ that belongs to the NP class must have a polynomial transformation to L.
Furthermore, if a language L’ is known to be NP-complete, a polynomial transformation to L confirms L is also NP-complete. In formal terms:
- L ∈ NP
- L′ ∈ NP-Complete
- ∃L′ ∝ L ⇒ L ∈ NP-Complete

Knowing this, we can prove that the Hamiltonian Circuit problem is NP-Complete by proving that it belongs to the NP language class and finding a polynomial transformation from Vertex Cover (a known NP-complete language) to Hamiltonian Circuit.

## 2.2 Vertex Cover Problem
A Vertex Cover is a subset of vertices from a graph that contains at least one endpoint of every edge of the graph. The problem of finding a Minimum Vertex Cover is a classical optimization problem and is NP-Complete.
The formal definition of the problem would be:
Given a Graph G = (V, E) and an integer K ∈ N, the Vertex Cover V′ ⊆ V: uv ∈ E ⇒ (u ∈ V′ ∨ v ∈ V′).
The question is: Can we find a vertex cover with |V′| = K?

We know the Vertex Cover problem is NP-Complete because it's "easy" to find a polynomial-time algorithm to solve it in a non-deterministic Turing machine, and it has been proven that the Vertex Cover problem is NP-Complete. A polynomial transformation from the 3-SAT problem to Vertex Cover has been found.
## 2.3 Hamiltonian Circuit Problem
The Hamiltonian Circuit problem consists of finding a cycle in a graph where every node of the graph appears only once.
The formal definition of the problem is:
Given a Graph G = (V, E), does G contain a Hamiltonian circuit?
That is, an ordering < v1, v2, ..., vn > of the vertices of G where n = |V |: ({vn, v1} ∈ E) ∧ ({vi, vi+1} ∈ E) ∀i, 1 ≤ i < n.

## 2.4 Proving Hamiltonian Circuit ∈ NP
To prove that the Hamiltonian Circuit problem is in NP, we will be using the Certifier-Certificate based definition of NP. This way of proving if a problem is in NP relies on having a certificate (solution to the problem) and a certifier (a way of checking if the certificate is a solution to the problem) in polynomial time. If so, the problem is in NP.
Given a 'certificate' for the Hamiltonian Circuit problem, which is a sequence of vertices forming the Hamiltonian cycle, we will be able to verify the certificate by checking that all of the vertices belong to the graph and each pair of vertices in the certificate are adjacent:

```markdown
for {u, v} in V' where v = u + 1
    if E does not contain {u, v}
        Solution is incorrect
    end if
end for
Solution is correct
```
## 2.5 Polynomial Transformation
The polynomial transformation from Vertex Cover to Hamiltonian Circuit is based on the construction of components. Specifically, we will have two types of components: the selectors and the more complex cover-testing components.

### 2.5.1 Selectors
The selectors are the simplest set of components we will need for the transformation. It's just a set of vertices S = {a1, a2, ..., ak} with |S| = K, where K is the size of the vertex cover.

### 2.5.2 Cover-Testing Components
We will add a Cover-Testing component for every arc in the original Vertex Cover Graph. The purpose of these Cover-Testing components is to ensure that at least one of the vertices of the original arc is in the Vertex Cover. For each e = {u, v} ∈ E of the Vertex Cover graph, a cover testing component has:
- A vertex set Ve' = {(u, e, i), (v, e, i) : 1 ≤ i ≤ 6} with |Ve'| = 12.
- Edges Ee' = {{(u, e, i), (u, e, i + 1)}, {(v, e, i), (v, e, i + 1)} : 1 ≤ i ≤ 5}
  ∪ {{(u, e, 3), (v, e, 1)}, {(v, e, 3), (u, e, 1)}}
  ∪ {{(u, e, 6), (v, e, 4)}, {(v, e, 6), (u, e, 4)}}
  resulting in |Ee'| = 14.

This construction ensures that the only vertices that will be involved in any external edges are (u, e, 1), (v, e, 1), (u, e, 6), and (v, e, 6). This implies that any Hamiltonian circuit of G’ will only be able to pass through the edges of every vertex cover in one of the three following configurations:
