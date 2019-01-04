import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";
import SubmittableTextarea from "./components/SubmittableTextarea";
import { vertexCoverInstanceParser } from "./lib/vertexCoverInstanceParser";
import { IVertexCoverInstance } from "./lib/IVertexCoverInstance";
import { IGraph } from "./lib/Graph";
import transformation from "./lib/transformation";

const graphOptions = {
  layout: {
    hierarchical: false,
    randomSeed: 0
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

function addLabelsToGraph({ nodes, edges }: IGraph): IGraph {
  return {
    nodes: nodes.map(({ id }) => ({ id, label: id })),
    edges: edges
  };
}

interface State {
  vcGraphs: IGraph[];
  hcGraphs: IGraph[];
}

class App extends Component<{}, State> {
  state: State = {
    vcGraphs: [],
    hcGraphs: []
  };

  onNewProblemInstance = (value: string): boolean => {
    try {
      const vcInstance = vertexCoverInstanceParser(value);
      const hcInstance = transformation(vcInstance);

      console.log({ value, vcInstance, hcInstance });

      const vcGraph = addLabelsToGraph(vcInstance.graph);
      const hcGraph = addLabelsToGraph(hcInstance);

      this.setState(({ vcGraphs, hcGraphs }) => ({
        vcGraphs: [...vcGraphs, vcGraph],
        hcGraphs: [...hcGraphs, hcGraph]
      }));
    } catch (error) {
      console.error(error);
    }
    return false;
  };

  render() {
    const { vcGraphs, hcGraphs } = this.state;

    return (
      <div className="container">
        <SubmittableTextarea onSubmit={this.onNewProblemInstance} />
        {vcGraphs.map((vcGraph, index) => (
          <div key={index} style={{ height: "80vh", display: "flex" }}>
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black"
              }}
            >
              <Graph graph={vcGraph} options={graphOptions} />
            </div>
            <div
              style={{
                width: "100%",
                height: "100%",
                border: "1px solid black"
              }}
            >
              <Graph graph={hcGraphs[index]} options={graphOptions} />
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default App;
