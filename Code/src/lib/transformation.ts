import Graph, { IGraph } from "./Graph";
import Node, { INode } from "./Node";
import Edge, { IEdge } from "./Edge";
import EdgeGadget from "./EdgeGadget";
import { IVertexCoverInstance } from "./IVertexCoverInstance";

/**
 * Method to transform in polynomial time instances of the Vertex
 * Cover problem to instances of the Hamiltonian Cycle problem.
 */
export default function transformation({
  graph,
  coverSize
}: IVertexCoverInstance): IGraph {
  let newGraph: Graph = new Graph();

  // Selectors creation
  let selectors: Node[] = [];
  for (let i = 1; i <= coverSize; ++i) {
    selectors.push(new Node("Selector-" + i));
  }
  newGraph.addVertices(selectors);

  // Edge gadgets creation
  let edgeGadgets: EdgeGadget[] = [];
  let vertexAndEdgeGadgetsInfo: Map<string, EdgeGadget[]> = new Map<
    string,
    EdgeGadget[]
  >();
  graph.nodes.forEach((vertex: Node) =>
    vertexAndEdgeGadgetsInfo.set(vertex.id, [])
  );

  graph.edges.forEach((edge: Edge) => {
    let newEdgeGadget: EdgeGadget = new EdgeGadget(edge.from, edge.to);
    let firstVertexEdgeGadgets:
      | EdgeGadget[]
      | undefined = vertexAndEdgeGadgetsInfo.get(edge.from);
    let secondVertexEdgeGadgets:
      | EdgeGadget[]
      | undefined = vertexAndEdgeGadgetsInfo.get(edge.to);

    if (!firstVertexEdgeGadgets || !secondVertexEdgeGadgets) {
      throw new Error(
        "Each graph vertex should have an EdgeGadget array initialized"
      );
    }
    firstVertexEdgeGadgets.push(newEdgeGadget);
    secondVertexEdgeGadgets.push(newEdgeGadget);
    edgeGadgets.push(newEdgeGadget);
  });

  edgeGadgets.forEach((edgeGadget: EdgeGadget) => {
    newGraph.addVertices(edgeGadget.vertices);
    newGraph.addEdges(edgeGadget.edges);
  });

  // Connections between edge gadgets
  graph.nodes.forEach((vertex: Node) => {
    let edgeGadgets: EdgeGadget[] | undefined = vertexAndEdgeGadgetsInfo.get(
      vertex.id
    );
    if (!edgeGadgets) {
      throw new Error(
        "Each graph vertex should have an EdgeGadget array initialized"
      );
    }
    newGraph.addEdges(EdgeGadget.connectEdgeGadgets(edgeGadgets, vertex.id));
  });

  // Connections between edge gadgets and selectors
  edgeGadgets.forEach((edgeGadget: EdgeGadget) =>
    newGraph.addEdges(
      EdgeGadget.connectEdgeGadgetWithSelectors(edgeGadget, selectors)
    )
  );

  return newGraph;
}
