import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";
import SubmittableTextarea from "./components/SubmittableTextarea";
import {
  IVertexCoverInstance,
  vertexCoverInstanceParser
} from "./lib/vertexCoverInstanceParser";
import { IEdge } from "./lib/Edges";

interface INode {
  id: number;
}

interface IGraph {
  nodes: INode[];
  edges: IEdge[];
}

const exampleGraph = {
  nodes: [{ id: 1, label: "1" }, { id: 2, label: "2" }, { id: 3, label: "3" }, { id: 4, label: "4" }],
  edges: [{ from: 1, to: 2 }, { from: 2, to: 3 }, { from: 1, to: 3 }, {from: 3, to: 4}]
};

const vertexCoverGraphOptions = {
  layout: {
    hierarchical: false
  },
  edges: {
    color: "#000000",
    arrows: {
      to: {
        enabled: false
      }
    }
  },
  physics: {
    enabled: false
  }
};

function graphFromVertexCoverInstance(instance: IVertexCoverInstance): IGraph {
  return {
    nodes: [...instance.nodes].map(id => ({ id, label: "" + id })),
    edges: [...instance.edges.set]
  };
}

interface State {
  vertexCoverGraphs: IGraph[];
}

class App extends Component<{}, State> {
  state: State = {
    vertexCoverGraphs: [exampleGraph]
  };

  onNewProblemInstance = (value: string): boolean => {
    try {
      const newInstance = vertexCoverInstanceParser(value);
      console.log({ value, newInstance });
      this.setState(prevState => ({
        vertexCoverGraphs: prevState.vertexCoverGraphs.concat([
          graphFromVertexCoverInstance(newInstance)
        ])
      }));
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  render() {
    return (
      <div className="container">
        <SubmittableTextarea onSubmit={this.onNewProblemInstance} />
        {this.state.vertexCoverGraphs.map((graph, index) => (
          <div key={index} style={{ height: "80vh", display: "flex" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black"
              }}
            >
              <Graph graph={graph} options={vertexCoverGraphOptions} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
