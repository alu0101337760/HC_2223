import Edge from "./Edge";
import Vertex from "./Vertex";

/**
 * Class which represents an edge gadget, a data structure
 * used in the transformation between Vertex Cover problem
 * instances to Hamiltonian Cycle problem instances.
 */
export default class EdgeGadget {

  vertices: Vertex[];
  edges: Edge[];
  edgeGadgetID: string 

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
      this.vertices.push(new Vertex(this.edgeGadgetID + "-" + i));
    }

    this.edges = [];
    for (let i = 0; i < this.vertices.length - 1; ++i) {
      if (i === 5) continue;
      this.edges.push(new Edge(this.vertices[i].vertexID, this.vertices[i + 1].vertexID));
    }
    this.edges.push(new Edge(this.vertices[0].vertexID, this.vertices[8].vertexID));
    this.edges.push(new Edge(this.vertices[2].vertexID, this.vertices[6].vertexID));
    this.edges.push(new Edge(this.vertices[3].vertexID, this.vertices[11].vertexID));
    this.edges.push(new Edge(this.vertices[5].vertexID, this.vertices[9].vertexID));
  }

  getConnectionPoint(vertexID: string): string {
    if (this.leftSideVertexID === vertexID) {
      if (!this.isTopLeftVertexConnected) {
        this.isTopLeftVertexConnected = true;
        return this.vertices[0].vertexID;
      } else if (!this.isBottomLeftVertexConnected) {
        this.isBottomLeftVertexConnected = true;
        return this.vertices[5].vertexID;
      }
    } else if (this.rightSideVertexID === vertexID) {
      if (!this.isTopRightVertexConnected) {
        this.isTopRightVertexConnected = true;
        return this.vertices[6].vertexID;
      } else if (!this.isBottomRightVertexConnected) {
        this.isBottomRightVertexConnected = true;
        return this.vertices[11].vertexID;
      }
    } else {
      throw new Error("Edge gadget " + this.edgeGadgetID + " is not a " + vertexID + " edge gadget");
    }
    throw new Error("Cannot connect edge gadget " + this.edgeGadgetID + " according to vertex " + vertexID);
  }

  public static connectEdgeGadgets(
    edgeGadgets: EdgeGadget[], 
    vertexID: string
  ): Edge[] {
    if (edgeGadgets.length < 2)
      return [];

    let newEdges: Edge[] = [];
    for (let i = 0; i < edgeGadgets.length - 1; ++i) {
      newEdges.push(new Edge(
        edgeGadgets[i].getConnectionPoint(vertexID), 
        edgeGadgets[i + 1].getConnectionPoint(vertexID)
      ));
    }
    return newEdges;
  }

  public static connectEdgeGadgetWithSelectors(
    edgeGadget: EdgeGadget,
    selectors: Vertex[]
  ): Edge[] {
    let newEdges: Edge[] = [];
    
    let connectionPoints: string[] = [];
    if (!edgeGadget.isTopLeftVertexConnected){
      edgeGadget.isTopLeftVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[0].vertexID);
    }
    if (!edgeGadget.isBottomLeftVertexConnected) {
      edgeGadget.isBottomLeftVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[5].vertexID);
    }
    if (!edgeGadget.isTopRightVertexConnected) {
      edgeGadget.isTopRightVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[6].vertexID);
    }
    if (!edgeGadget.isBottomRightVertexConnected) {
      edgeGadget.isBottomRightVertexConnected = true;
      connectionPoints.push(edgeGadget.vertices[11].vertexID);
    }

    selectors.forEach( (selector: Vertex) => {
      connectionPoints.forEach( (identifier) => {
        newEdges.push(new Edge(selector.vertexID, identifier));
      });
    });
    
    return newEdges;
  }
}