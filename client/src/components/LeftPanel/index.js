import React, { Component } from "react";

import TextEdit from "../TextEdit";
import ShowPanel from "../ShowPanel";
import { Button } from "antd";

class LeftPanel extends Component {
  render() {
    let left = this.props.isEditable ?
      <TextEdit
        text={this.props.text}
        onChange={e => this.props.onChange(e)}/>
      :
      <ShowPanel
        returns={this.props.returns}
        sentences={this.props.sentences}
        inds={this.props.inds}
        hover={this.props.hover}/>

    return (
      <div style={{ textAlign: "center", height: "90vh" }}>
        <div style={{ height: "80vh", margin:"2vh" }}>
          {left}
        </div>
        <Button
          type="primary"
          size={"large"}
          style={{
            margin: "20px 20px 20px 20px",
            padding: "0 5vw 0 5vw"
          }}
          onClick={() => this.props.onSubmit()}
        >
          Submit
        </Button>
        <Button
          size={"large"}
          style={{
            margin: "20px 20px 20px 20px",
            padding: "0 5vw 0 5vw"
          }}
          onClick={() => this.props.onEdit()}
        >
          Edit
        </Button>
      </div>);

  }
}

export default LeftPanel;
