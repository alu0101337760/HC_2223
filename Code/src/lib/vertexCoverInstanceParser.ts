import { Edges } from "./Edges";

// TODO: Create better classes for errors

export interface IVertexCoverInstance {
  coverSize: number;
  nodes: Set<number>;
  edges: Edges;
}

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
  const nodes = parseNodes(nodesRepr);
  const edges = parseEdges(verticesRepr);
  const coverSize = parseCoverSize(coverSizeRepr);

  // Check that all edges are from valid nodes to valid nodes
  let invalidNode = null;
  for (const [from, to] of edges) {
    if (!nodes.has(from)) {
      invalidNode = from;
    } else if (!nodes.has(to)) {
      invalidNode = to;
    }

    if (invalidNode !== null) {
      throw new Error(
        `${invalidNode} is not a valid node in edge ${from} - ${to}`
      );
    }
  }

  // Check that the cover size is plausible
  if (coverSize < 1 || coverSize > nodes.size) {
    throw new Error(
      `Invalid cover size. Must be between 1 and ${
        nodes.size
      } (size of the set of nodes)`
    );
  }

  return { coverSize, nodes, edges };
}

export function parseNodes(nodesRepr: string): Set<number> {
  const nodesReprs = nodesRepr
    .split(ELEMENTS_SEPARATOR)
    .map(str => parseInt(str.trim()));

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

    let from = parseInt(vertexElements[0].trim());
    let to = parseInt(vertexElements[1].trim());

    if (isNaN(from) || isNaN(to)) {
      throw new Error(
        `Unable to parse nodes as integers in vertex "${vertexRepr}"`
      );
    }

    edges.add(from, to);
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
