import React, { PureComponent } from "react";
import "./index.scss";

interface Props {
  tabNames: string[];
  children: any[];
}

interface State {
  currentTab: number;
}

export default class Tabs extends PureComponent<Props, State> {
  state = {
    currentTab: 0
  };

  render() {
    const { tabNames, children } = this.props;
    const { currentTab } = this.state;

    return (
      <div className="Tabs">
        <ul className="Tabs__tab-list">
          {tabNames.map((name, i) => (
            <li
              key={i}
              className={
                "tab-list__tab-item" + (i === currentTab ? " active" : "")
              }
            >
              <button onClick={() => this.setState(() => ({ currentTab: i }))}>
                {name}
              </button>
            </li>
          ))}
        </ul>
        <div className="Tabs__tab-container">
          {React.Children.map(children, (child, index) =>
            index === currentTab ? child : <div hidden>{child}</div>
          )}
        </div>
      </div>
    );
  }
}
