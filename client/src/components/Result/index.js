import React, { Component } from "react";
import { List } from "antd";

const data = ["Hello", "World"];

class Result extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    console.log(this.props.outlines);
    return (<List
      bordered
      dataSource={data}
      style={{height: "40vh",
              width: "100%",
              marginTop: "20vh"}}
      renderItem={item => (
        <List.Item>
          {item}
        </List.Item>
      )}
    />);
  }
}

export default Result;
