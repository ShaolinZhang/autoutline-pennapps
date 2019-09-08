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
    this.handleClick = this.handleClick.bind(this)
  }


  componentDidMount() {
    this.props.data.titles.forEach((topic, i) => {
      this.props.keywordHandler(topic.range, (words) => {
        const newArr = [...this.state.listOfWords, {words: words, index: i}];
        newArr.sort((a, b) => a.index - b.index);
        this.setState({listOfWords: newArr});
      });
    })
  }

  handleClick(i) {
    document.getElementById(i).scrollIntoView(true);
  }

  renderPanels() {
    const l = this.state.listOfWords.length;
    return this.props.data.titles.map((topic, i) => (
      <Panel header={topic.string} key={i}
        style={{height: "100%", width: "90%", overflow:"scroll"}}>
        <p style={{cursor: "pointer"}}
          
          onClick={()=>this.props.clickHandler(topic.range[0], topic.range)}
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

        <div style={{height: "70vh", overflow: "scroll"}}>
        <Collapse style={{margin: "2vh 2vw 0 0"}}>
          {this.renderPanels()}
        </Collapse>
        </div>

      </div>
    );
  }
}

export default Result;
