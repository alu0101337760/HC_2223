import { Edges } from "./Edges";
import { IEdge } from "./Edge";
import { IVertexCoverInstance } from "./IVertexCoverInstance";
import Node from "./Node";

// TODO: Create better classes for errors

const LINES_SEPARATOR = "\n";
const ELEMENTS_SEPARATOR = ",";

export function vertexCoverInstanceParser(
  rawRepr: string
): IVertexCoverInstance {
  const lines = rawRepr
    .split(LINES_SEPARATOR)
    .map(line => line.trim())
    .filter(line => line !== "");

  // Check that there is at least the minimum number of elements required
  if (lines.length < 2) {
    throw new Error(
      "Invalid number of elements. Must contain cover size, node set & vertex set"
    );
  }

  const [coverSizeRepr, nodesRepr, ...verticesRepr] = lines;
  const nodeSet = parseNodes(nodesRepr);
  const edgesMap = parseEdges(verticesRepr);
  const edges = [...edgesMap.list];
  const coverSize = parseCoverSize(coverSizeRepr);

  // Check that all edges are from valid nodes to valid nodes
  let invalidNode = null;
  for (const { from, to } of edges) {
    if (!nodeSet.has(from)) {
      invalidNode = from;
    } else if (!nodeSet.has(to)) {
      invalidNode = to;
    }

    if (invalidNode !== null) {
      throw new Error(
        `${invalidNode} is not a valid node in edge ${from} - ${to}`
      );
    }
  }

  // Check that the cover size is plausible
  if (coverSize < 1 || coverSize > nodeSet.size) {
    throw new Error(
      `Invalid cover size. Must be between 1 and ${
        nodeSet.size
      } (size of the set of nodes)`
    );
  }

  return {
    coverSize,
    graph: {
      nodes: [...nodeSet].map(repr => new Node(repr)),
      edges
    }
  };
}

export function parseNodes(nodesRepr: string): Set<string> {
  const nodesReprs = nodesRepr.split(ELEMENTS_SEPARATOR).map(str => str.trim());

  return new Set(nodesReprs);
}

export function parseEdges(verticesRepr: string[]): Edges {
  const edges = new Edges();

  for (const vertexRepr of verticesRepr) {
    const vertexElements = vertexRepr.split(ELEMENTS_SEPARATOR);

    if (vertexElements.length !== 2) {
      throw new Error(
        `Invalid vertex "${vertexRepr}". Vertices must contain exactly two nodes`
      );
    }

    const [from, to] = vertexElements;
    edges.add(from.trim(), to.trim());
  }

  return edges;
}

export function parseCoverSize(coverSizeRepr: string) {
  const coverSize = parseInt(coverSizeRepr.trim());

  if (isNaN(coverSize)) {
    throw new Error(`Unable to parse cover size "${coverSize}" as an integer`);
  }

  return coverSize;
}
