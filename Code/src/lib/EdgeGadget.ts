import Edge, { IEdge } from "./Edge";
import Node, { INode } from "./Node";

/**
 * Class which represents an edge gadget, a data structure
 * used in the transformation between Vertex Cover problem
 * instances to Hamiltonian Cycle problem instances.
 */
export default class EdgeGadget {
  vertices: INode[];
  edges: IEdge[];
  edgeGadgetID: string;

  leftSideVertexID: string;
  isTopLeftVertexConnected: boolean = false;
  isBottomLeftVertexConnected: boolean = false;

  rightSideVertexID: string;
  isTopRightVertexConnected: boolean = false;
  isBottomRightVertexConnected: boolean = false;

  static VERTEX_IN_EDGE_GADGET: number = 12;

  constructor(leftVertexID: string, rightVertexID: string) {
    this.leftSideVertexID = leftVertexID;
    this.rightSideVertexID = rightVertexID;
    this.edgeGadgetID = leftVertexID + "-" + rightVertexID;

    this.vertices = [];
    for (let i = 1; i <= EdgeGadget.VERTEX_IN_EDGE_GADGET; ++i) {
      this.vertices.push(new Node(this.edgeGadgetID + "-" + i));
    }

    this.edges = [];
    for (let i = 0; i < this.vertices.length - 1; ++i) {
      if (i === 5) continue;
      this.edges.push(new Edge(this.vertices[i].id, this.vertices[i + 1].id));
    }
    this.edges.push(new Edge(this.vertices[0].id, this.vertices[8].id));
    this.edges.push(new Edge(this.vertices[2].id, this.vertices[6].id));
    this.edges.push(new Edge(this.vertices[3].id, this.vertices[11].id));
    this.edges.push(new Edge(this.vertices[5].id, this.vertices[9].id));
  }

  public static connectEdgeGadgets(
    edgeGadgets: EdgeGadget[],
    vertexID: string
  ): Edge[] {
    if (edgeGadgets.length < 2) {
      return [];
    }

    const newEdges: IEdge[] = [];
    for (let i = 0; i < edgeGadgets.length - 1; ++i) {
      const firstGadget = edgeGadgets[i];
      const secondGadget = edgeGadgets[i + 1];
      let firstId = "";
      let secondId = "";

      if (vertexID === firstGadget.leftSideVertexID) {
        firstId = firstGadget.vertices[5].id;
        firstGadget.isBottomLeftVertexConnected = true;
      } else {
        firstId = firstGadget.vertices[11].id;
        firstGadget.isBottomRightVertexConnected = true;
      }
      if (vertexID === secondGadget.leftSideVertexID) {
        secondId = secondGadget.vertices[0].id;
        secondGadget.isTopLeftVertexConnected = true;
      } else {
        secondId = secondGadget.vertices[6].id;
        secondGadget.isTopRightVertexConnected = true;
      }

      newEdges.push(new Edge(firstId, secondId));
    }

    return newEdges;
  }

  public static connectEdgeGadgetWithSelectors(
    edgeGadget: EdgeGadget,
    selectors: INode[]
  ): Edge[] {
    const newEdges: Edge[] = [];

    const connectionPoints: string[] = [];
    if (!edgeGadget.isTopLeftVertexConnected) {
      edgeGadget.isTopLeftVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[0].id);
    }
    if (!edgeGadget.isBottomLeftVertexConnected) {
      edgeGadget.isBottomLeftVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[5].id);
    }
    if (!edgeGadget.isTopRightVertexConnected) {
      edgeGadget.isTopRightVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[6].id);
    }
    if (!edgeGadget.isBottomRightVertexConnected) {
      edgeGadget.isBottomRightVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[11].id);
    }

    selectors.forEach(({ id }) => {
      connectionPoints.forEach(identifier => {
        newEdges.push(new Edge(id, identifier));
      });
    });

    return newEdges;
  }
}
