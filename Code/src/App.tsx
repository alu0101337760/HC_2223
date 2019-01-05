import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";
import SubmittableTextarea from "./components/SubmittableTextarea";
import { vertexCoverInstanceParser } from "./lib/vertexCoverInstanceParser";
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

      this.setState(({ vcGraphs, hcGraphs }) => ({
        vcGraphs: [...vcGraphs, vcInstance.graph],
        hcGraphs: [...hcGraphs, hcInstance]
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
          <div key={index} className="result-container">
            <div className="graph-container">
              <Graph graph={vcGraph} options={graphOptions} />
            </div>
            <div
              className="graph-container"
              style={{ borderTop: "1px solid #555" }}
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
