import React, { Component } from "react";
import { List } from "antd";

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
