export interface IEdge {
  from: string;
  to: string;
}

/**
 * Class which represents an undirected graph edge.
 */
export default class Edge implements IEdge {
  from: string;
  to: string;

  constructor(from: string, to: string) {
    this.from = from;
    this.to = to;
  }
}
