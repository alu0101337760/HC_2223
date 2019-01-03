export class DuplicateEdgeError extends Error {
  constructor(public from: number, public to: number) {
    super(`Duplicate edge ${from} - ${to}`);
  }
}

export interface IEdge {
  from: number;
  to: number;
}

export class Edges {
  /** Keeps track of all the edges related to all the nodes */
  private _map: Map<number, number[]> = new Map();

  /** Keeps track of all the edges */
  private _set: Set<IEdge> = new Set();

  /** Adds the given edge to the map */
  private _addSingleEdge(from: number, to: number) {
    const toIds = this._map.get(from);

    if (toIds) {
      if (toIds.includes(to)) {
        throw new DuplicateEdgeError(from, to);
      }
      toIds.push(to);
    } else {
      this._map.set(from, [to]);
    }
  }

  /** Adds the given undirected edge */
  public add(from: number, to: number) {
    this._addSingleEdge(from, to);
    this._addSingleEdge(to, from);

    this.set.add({ from, to });
  }

  /** Returns all edges coming from/to the given node ID */
  public get(from: number): number[] | null {
    return this._map.get(from) || null;
  }

  /** Returns the set of all the edges */
  public get set(): Set<IEdge> {
    return this._set;
  }

  /** Returns a iterator to go over the set of edges */
  public *[Symbol.iterator]() {
    for (const { from, to } of this.set) {
      yield [from, to];
    }
  }
}
