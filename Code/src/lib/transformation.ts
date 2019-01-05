import Graph, { IGraph } from "./Graph";
import Node, { INode, mapToGroupedNodes } from "./Node";
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
  const newGraph = new Graph();

  // Selectors creation
  const selectors: INode[] = [];
  for (let i = 1; i <= coverSize; ++i) {
    selectors.push(new Node("Selector-" + i));
  }
  newGraph.addVertices(mapToGroupedNodes(selectors, 0));

  // Edge gadgets creation
  const edgeGadgets: EdgeGadget[] = [];
  const vertexAndEdgeGadgetsInfo = new Map<string, EdgeGadget[]>();
  graph.nodes.forEach(({ id }) => vertexAndEdgeGadgetsInfo.set(id, []));

  graph.edges.forEach(({ from, to }) => {
    const newEdgeGadget = new EdgeGadget(from, to);
    const firstVertexEdgeGadgets = vertexAndEdgeGadgetsInfo.get(from);
    const secondVertexEdgeGadgets = vertexAndEdgeGadgetsInfo.get(to);

    if (!firstVertexEdgeGadgets || !secondVertexEdgeGadgets) {
      throw new Error(
        "Each graph vertex should have an EdgeGadget array initialized"
      );
    }
    firstVertexEdgeGadgets.push(newEdgeGadget);
    secondVertexEdgeGadgets.push(newEdgeGadget);
    edgeGadgets.push(newEdgeGadget);
  });

  edgeGadgets.forEach(({ vertices, edges }, i) => {
    newGraph.addVertices(mapToGroupedNodes(vertices, (i + 1) * 3));
    newGraph.addEdges(edges);
  });

  // Connections between edge gadgets
  graph.nodes.forEach(({ id }) => {
    const edgeGadgets = vertexAndEdgeGadgetsInfo.get(id);
    if (!edgeGadgets) {
      throw new Error(
        "Each graph vertex should have an EdgeGadget array initialized"
      );
    }
    newGraph.addEdges(EdgeGadget.connectEdgeGadgets(edgeGadgets, id));
  });

  // Connections between edge gadgets and selectors
  edgeGadgets.forEach(edgeGadget =>
    newGraph.addEdges(
      EdgeGadget.connectEdgeGadgetWithSelectors(edgeGadget, selectors)
    )
  );

  return newGraph;
}
