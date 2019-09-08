import React, { Component } from "react";
import { Slider } from 'antd';

const marks = {
  0: {
    style: {
      color: "red",
    },
    label: 'Negative'
  },
  100: {
    style: {
      color: "green",
    },
    label: 'Positive'
  },
};

class Sentiment extends Component {

  constructor(props) {
    super(props);
  }

  render() {

    return (
      <Slider style={{textAlign: "center", width: "30vw"}} marks={marks} value={this.props.sentiment} disabled={true} />
    );
  }
}

export default Sentiment;
