import Edge from "./Edge";
import Vertex from "./Vertex";

/**
 * Class which represents an undirected Graph
 */
export default class Graph {

  vertices: Vertex[] = [];
  edges: Edge[] = [];

  addVertices(newVertices: Vertex[]) {
    this.vertices = [...this.vertices, ...newVertices];
  }

  addEdges(newEdges: Edge[]) {
    this.edges = [...this.edges, ...newEdges];
  }
}