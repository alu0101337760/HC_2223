import React, { Component, ChangeEvent } from "react";
import "./index.scss";

interface Props {
  /**
   * Callback run whenever the user submits a new text
   *
   * @param value Text submitted by the user
   * @returns Whether the textarea should be emptied or not
   */
  onSubmit: (value: string) => boolean;
}

class State {
  textareaValue: string = "";
}

class SubmittableTextarea extends Component<Props, State> {
  state = new State();

  onValueChange = ({ target }: ChangeEvent<HTMLTextAreaElement>) => {
    this.setState({
      textareaValue: target.value
    });
  };

  onSubmit = () => {
    const clearTextarea = this.props.onSubmit(this.state.textareaValue);

    if (clearTextarea) {
      this.setState({
        textareaValue: ""
      });
    }
  };

  render() {
    return (
      <div className="SubmittableTextarea">
        <textarea
          className="SubmittableTextarea__textarea"
          value={this.state.textareaValue}
          onChange={this.onValueChange}
          rows={15}
        />
        <button
          className="SubmittableTextarea__submit-button"
          onClick={this.onSubmit}
        >
          Submit
        </button>
      </div>
    );
  }
}

export default SubmittableTextarea;
