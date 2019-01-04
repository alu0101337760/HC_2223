export interface INode {
  id: string;
}

/**
 * Class which represents a graph vertex
 */
export default class Node implements INode {
  id: string;

  constructor(identifier: string) {
    this.id = identifier;
  }
}
