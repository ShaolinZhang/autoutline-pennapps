import React, { Component } from "react";

import Loading from "../Loading";
import Welcome from "../Welcome";

class RightPanel extends Component {
  render() {
    if (this.props.isLoading) {
      return <Loading />;
    } else {
      return <Welcome />;
    }
  }
}

export default RightPanel;
