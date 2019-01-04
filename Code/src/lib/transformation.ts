import Graph from "./Graph";
import Vertex from "./Vertex";
import EdgeGadget from "./EdgeGadget";
import Edge from "./Edge";

/**
 * Method to transform in polynomial time instances of the Vertex
 * Cover problem to instances of the Hamiltonian Cycle problem. 
 * 
 * @param graph Graph
 * @param k Size of the vertex cover.
 */
export default function transformation(graph: Graph, k: number): Graph {

  let newGraph: Graph = new Graph();
  
  // Selectors creation
  let selectors: Vertex[] = [];
  for (let i = 1; i <= k; ++i) {
    selectors.push(new Vertex("Selector-" + i));
  }
  newGraph.addVertices(selectors);

  // Edge gadgets creation
  let edgeGadgets: EdgeGadget[] = [];
  let vertexAndEdgeGadgetsInfo: Map<string, EdgeGadget[]> = new Map<string, EdgeGadget[]>();
  graph.vertices.forEach( (vertex: Vertex) => vertexAndEdgeGadgetsInfo.set(vertex.vertexID, []));

  graph.edges.forEach( (edge: Edge) => {
    let newEdgeGadget: EdgeGadget = new EdgeGadget(edge.firstVertexID, edge.secondVertexID);
    let firstVertexEdgeGadgets: EdgeGadget[] | undefined = vertexAndEdgeGadgetsInfo.get(edge.firstVertexID);
    let secondVertexEdgeGadgets: EdgeGadget[] | undefined = vertexAndEdgeGadgetsInfo.get(edge.secondVertexID);

    if (!firstVertexEdgeGadgets || !secondVertexEdgeGadgets) {
      throw new Error("Each graph vertex should have an EdgeGadget array initialized");
    }
    firstVertexEdgeGadgets.push(newEdgeGadget);
    secondVertexEdgeGadgets.push(newEdgeGadget);
    edgeGadgets.push(newEdgeGadget);
  });

  edgeGadgets.forEach( (edgeGadget: EdgeGadget) => {
    newGraph.addVertices(edgeGadget.vertices);
    newGraph.addEdges(edgeGadget.edges);
  });

  // Connections between edge gadgets
  graph.vertices.forEach( (vertex: Vertex) => {
    let edgeGadgets: EdgeGadget[] | undefined = vertexAndEdgeGadgetsInfo.get(vertex.vertexID);
    if (!edgeGadgets ) {
      throw new Error("Each graph vertex should have an EdgeGadget array initialized");
    }
    newGraph.addEdges(EdgeGadget.connectEdgeGadgets(edgeGadgets, vertex.vertexID));
  })

  // Connections between edge gadgets and selectors
  edgeGadgets.forEach( (edgeGadget: EdgeGadget) => 
    newGraph.addEdges(EdgeGadget.connectEdgeGadgetWithSelectors(edgeGadget, selectors))
  );

  return newGraph;
}