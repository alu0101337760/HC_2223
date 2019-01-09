import { IEdge } from "./Edge";
import { INode } from "./Node";

export interface IGraph {
  nodes: INode[];
  edges: IEdge[];
}

/**
 * Class which represents an undirected Graph
 */
export default class Graph implements IGraph {
  nodes: INode[] = [];
  edges: IEdge[] = [];

  addVertices(newVertices: INode[]) {
    this.nodes = [...this.nodes, ...newVertices];
  }

  addEdges(newEdges: IEdge[]) {
    this.edges = [...this.edges, ...newEdges];
  }
}
