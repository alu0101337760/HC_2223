import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";
import SubmittableTextarea from "./components/SubmittableTextarea";

interface INode {
  id: number;
  label: string;
}

interface IEdge {
  from: number;
  to: number;
}

interface IGraph {
  nodes: INode[];
  edges: IEdge[];
}

const graph = {
  nodes: [
    { id: 1, group: "g1", label: "Node 1", x: 0, y: 0 },
    { id: 2, group: "g1", label: "Node 2", x: 0, y: 100 },
    { id: 3, group: "g1", label: "Node 3", x: 100, y: 0 },
    { id: 4, group: "g1", label: "Node 4", x: 100, y: 100 },
    { id: 5, group: "g1", label: "Node 5", x: 250, y: 250 }
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 }
  ]
};

const options = {
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
  groups: {
    g1: { color: { background: "red" } }
  },
  physics: {
    enabled: false
  }
};

const events = {
  select: function(event: IGraph) {
    const { nodes, edges } = event;
    console.log({ nodes, edges });
  }
};

class App extends Component {
  onNewProblemInstance = (value: string): boolean => {
    console.log({ value });

    return false;
  };

  render() {
    return (
      <div className="container">
        <SubmittableTextarea onSubmit={this.onNewProblemInstance} />
        <div style={{ height: "80vh", display: "flex" }}>
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid black"
            }}
          >
            <Graph graph={graph} options={options} events={events} />
          </div>
          <div
            style={{
              width: "100%",
              height: "100%",
              border: "1px solid black"
            }}
          >
            <Graph graph={graph} options={options} events={events} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
