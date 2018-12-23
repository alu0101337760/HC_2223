import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";

interface INode {
  id: number;
  label: string;
}

interface IEdge {
  from: number;
  to: number;
}

const graph = {
  nodes: [
    { id: 1, label: "Node 1", x: 0, y: 0 },
    { id: 2, label: "Node 2", x: 0, y: 100 },
    { id: 3, label: "Node 3", x: 100, y: 0 },
    { id: 4, label: "Node 4", x: 100, y: 100 },
    { id: 5, label: "Node 5", x: 250, y: 250 }
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
  physics: {
    enabled: false
  }
};

const events = {
  select: function(event: { nodes: INode[]; edges: IEdge[] }) {
    const { nodes, edges } = event;
    console.log({ nodes, edges });
  }
};

class App extends Component {
  render() {
    return (
      <div className="container">
        <Graph graph={graph} options={options} events={events} />
      </div>
    );
  }
}

export default App;
