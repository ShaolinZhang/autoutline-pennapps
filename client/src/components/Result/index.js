import React, { Component } from "react";
import { Collapse, Col, Row } from "antd";

import Sentiment from "../Sentiment"

const { Panel } = Collapse;

class Result extends Component {

  constructor(props) {
    super(props);
  }

  renderPanels() {
    return this.props.outlines.map((outline, i) => {
      return (
        <Panel header={outline} key={i}>
          <p>Placeholder!</p>
        </Panel>
      )
    })
  }

  render() {

    return (
      <div>
        <Collapse style={{margin: "5vh 2vw 0 0", maxHeight: "50vh"}}>
          {this.renderPanels()}
        </Collapse>

        <Row style={{top: "70vh", position: "fixed", margin: "5vh 2vw 0 0"}}>
          <Sentiment sentiment={this.props.sentiment}/>
        </Row>
      </div>
    );
  }
}

export default Result;
