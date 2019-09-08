import React, { Component } from "react";
import { Collapse, Row } from "antd";

import Sentiment from "../Sentiment"

const { Panel } = Collapse;

class Result extends Component {

  renderPanels() {
    return this.props.data.topics.map((topic, i) => {
      let range = topic.range
      let keywords = this.props.keywordHandler(range)
      return (
        <Panel header={topic["string"]} key={i}
          style={{height: "100%", width: "90%"}}>
          <p onMouseEnter={()=>this.props.hoverHandler(range)}
          onMouseLeave={()=>this.props.unHoverHandler()}>{keywords}</p>
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
          <div style={{margin: "0 20% 0 20%", width: "60%"}}>
            <span style={{fontSize:"1.3em"}}>Sentiment Analysis: {this.props.sentiment.toFixed(2)} out of 100</span>
            <Sentiment sentiment={this.props.sentiment}/>
          </div>
        </Row>
      </div>
    );
  }
}

export default Result;
