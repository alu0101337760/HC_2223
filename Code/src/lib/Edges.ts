import { IEdge } from "./Edge";

export class DuplicateEdgeError extends Error {
  constructor(public from: string, public to: string) {
    super(`Duplicate edge ${from} - ${to}`);
  }
}

export class Edges {
  /** Keeps track of all the edges related to all the nodes */
  private _map: Map<string, string[]> = new Map();

  /** Keeps track of all the edges */
  private _list: IEdge[] = [];

  /** Adds the given edge to the map */
  private _addSingleEdge(from: string, to: string) {
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
  public add(from: string, to: string) {
    this._addSingleEdge(from, to);

    if (from !== to) {
      this._addSingleEdge(to, from);
    }

    this.list.push({ from, to });
  }

  /** Returns all edges coming from/to the given node ID */
  public get(from: string): string[] | null {
    return this._map.get(from) || null;
  }

  /** Returns the set of all the edges */
  public get list(): IEdge[] {
    return this._list;
  }

  /** Returns a iterator to go over the set of edges */
  public *[Symbol.iterator]() {
    for (const { from, to } of this.list) {
      yield [from, to];
    }
  }
}
