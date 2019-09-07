import React, { Component } from "react";

import TextEdit from "../TextEdit";

class LeftPanel extends Component {
  render() {
    return (
      <TextEdit
        text={this.props.text}
        onChange={e => this.props.onChange(e)}
        onSubmit={() => this.props.onSubmit()}
      />
    );
  }
}

export default LeftPanel;
