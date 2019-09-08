import React, { Component } from "react";
import { Collapse } from "antd";

const { Panel } = Collapse;

class Result extends Component {

  constructor(props) {
    super(props);
  }

  renderPanels() {
    return this.props.outlines.map((outline, i) => {
      return (
        <Panel header={outline} key={i} style={{height: "100%", width: "90%"}}>
          <p>Placeholder!</p>
        </Panel>
      )
    })
  }

  render() {

    return (
      <Collapse style={{marginTop: "5vh"}}>
        {this.renderPanels()}
      </Collapse>
      );
  }
}

export default Result;
