import React, { Component } from "react";
import { Collapse } from "antd";

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
      <Collapse style={{marginTop: "5vh"}}>
        {this.renderPanels()}
      </Collapse>
      );
  }
}

export default Result;
