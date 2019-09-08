import React, { Component } from "react";
import { Collapse, Col, Row } from "antd";

import Sentiment from "../Sentiment"

const { Panel } = Collapse;

class Result extends Component {

  constructor(props) {
    super(props);
  }

  renderPanels() {
    return this.props.data.topics.map((topic, i) => {
      let range = topic.range
      return (
        <Panel header={topic["string"]} key={i} 
          style={{height: "100%", width: "90%"}}>
          <p onMouseEnter={()=>this.props.hoverHandler(range)}
          onMouseLeave={()=>this.props.unHoverHandler()}>Placeholder!</p>
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
