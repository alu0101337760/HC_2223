import React, { Component } from "react";
import "./App.scss";
import Graph from "react-graph-vis";
import SubmittableTextarea from "./components/SubmittableTextarea";
import { vertexCoverInstanceParser } from "./lib/vertexCoverInstanceParser";
import { IGraph } from "./lib/Graph";
import transformation from "./lib/transformation";
import Tabs from "./components/Tabs";

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
  instances: {
    vcGraph: IGraph;
    hcGraph: IGraph;
  }[];
}

class App extends Component<{}, State> {
  state: State = {
    instances: []
  };

  onNewProblemInstance = (value: string): boolean => {
    try {
      const vcInstance = vertexCoverInstanceParser(value);
      const hcInstance = transformation(vcInstance);

      console.log({ value, vcInstance, hcInstance });

      this.setState(({ instances }) => ({
        instances: instances.concat({
          vcGraph: vcInstance.graph,
          hcGraph: hcInstance
        })
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
        {this.state.instances.map(({ vcGraph, hcGraph }, index) => (
          <Tabs
            key={index}
            tabNames={["Vertex Cover Graph", "Hamiltonian Circuit Graph"]}
          >
            <div className="graph-container">
              <Graph graph={vcGraph} options={graphOptions} />
            </div>
            <div className="graph-container">
              <Graph graph={hcGraph} options={graphOptions} />
            </div>
          </Tabs>
        ))}
      </div>
    );
  }
}

export default App;
