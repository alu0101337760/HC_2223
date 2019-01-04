
/**
 * Class which represents an undirected graph edge.
 */
export default class Edge {

  firstVertexID: string;
  secondVertexID: string;

  constructor(firstVertexID: string, secondVertexID: string) {
    this.firstVertexID = firstVertexID;
    this.secondVertexID = secondVertexID;
  }
}