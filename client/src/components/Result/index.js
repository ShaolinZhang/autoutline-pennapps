import React, { Component } from "react";
import { Collapse, Row } from "antd";

import Sentiment from "../Sentiment"

const { Panel } = Collapse;

class Result extends Component {

  constructor(props) {
    super(props);
    this.state = {
      listOfWords: []
    }

    this.renderPanels = this.renderPanels.bind(this);
  }


  componentDidMount() {
    this.props.data.titles.forEach((topic, i) => {
      this.props.keywordHandler(topic.range, (words) => {
        console.log("words", words);
        const newArr = [...this.state.listOfWords, {words: words, index: i}];
        newArr.sort((a, b) => a.index - b.index);
        this.setState({listOfWords: newArr});
      });
    })
  }

  renderPanels() {
    console.log('low', this.state.listOfWords);
    const l = this.state.listOfWords.length;
    return this.props.data.titles.map((topic, i) => (
      <Panel header={topic.string} key={i}
        style={{height: "100%", width: "90%"}}>
        <p
          onMouseEnter={()=>this.props.hoverHandler(topic.range)}
          onMouseLeave={()=>this.props.unHoverHandler()}
          >
          {i < l ? this.state.listOfWords[i].words.join(', ') : ''}
        </p>
      </Panel>
    ));
  }

  render() {

    return (
      <div>

        <Row style={{margin: "4vh 2vw 0 0"}}>
          <div style={{margin: "0 20% 0 20%", width: "60%"}}>
            <span style={{fontSize:"1.3em"}}>Sentiment Analysis: {this.props.sentiment.toFixed(2)} out of 100</span>
            <Sentiment sentiment={this.props.sentiment}/>
          </div>
        </Row>

        <Collapse style={{margin: "2vh 2vw 0 0", maxHeight: "60vh"}}>
          {this.renderPanels()}
        </Collapse>


      </div>
    );
  }
}

export default Result;
