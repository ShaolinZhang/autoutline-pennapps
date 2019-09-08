import React, { Component } from "react";
import { Row, Layout, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";

import AppHeader from "../AppHeader";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import Result from "../Result";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditable: true,
      text: "",
      data: null,
      sentiment: 0,
      sentences: [],
      returns: [],
      selected_ind: [],
      hover: [-1,-1]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHover = this.handleHover.bind(this);
    this.handleUnHover = this.handleUnHover.bind(this);
    this.handleKeywordSearch = this.handleKeywordSearch.bind(this);
  }

  tokenize(text) {
    let stop_chars = ['.', '!', '?']
    let sentences = []
    let returns = []
    let left=0
    let right=0
    let count = 0
    for (var i = 0; i < text.length; i++) {
      if (stop_chars.includes(text.charAt(i))) {
        sentences.push(text.substring(left, right+2))
        left = right+2
        count++
      }
      right=i
      if (text.charAt(i)==='\n'){
        returns.push(count)
      }
    }

    console.log(sentences)
    console.log(returns)
    return (sentences, returns)
  }

  handleSubmit() {
    this.setState({sentences: this.tokenize(this.state.text)[0]});
    this.setState({returns: this.tokenize(this.state.text)[1]});
    this.setState({isLoading: true});

    axios
      .post("/api/outlines", {
        text: this.state.text
      })
      .then(response => {
        console.log("response data:", response.data);
        this.setState({ data: response.data, isLoading: false, isEditable: false });
        let selected_ind = [];
        for (var i = 0; i < response.data.topics.length; i++) {
          selected_ind.push(response.data.topics[i].ind);
        }
        this.setState({selected_ind: selected_ind, sentiment: (response.data.sentiment + 1) * 50});
      })
      .catch(() => {
        console.log("response error!!!");
        this.setState({ data: null, isLoading: false });
      });
  }

  handleEdit() {
    this.setState({ data: null, isLoading: false, isEditable: true });
  }

  handleHover(range) {
    this.setState({hover: range})
  }

  handleUnHover() {
    this.setState({hover: [-1,-1]})
  }

  handleKeywordSearch(range) {
    let text = ''
    let i = range[0]
    for (; i<range[1]; i++){
      text = text + this.state.sentences[i]+' '
    }
    axios
      .post("/api/keywords", {
        text: text
      })
      .then(response => {
        console.log("keyword response data:", response.data);
        return response.data.words
      })
      .catch(() => {
        console.log("response error!!!");
      });
  }

  render() {

    console.log(this.state.sentiment);
    let rightPanel;
    if (this.state.isEditable) {
      rightPanel = <RightPanel isLoading={this.state.isLoading}/>;
    } else {
      rightPanel = <Result data={this.state.data}
                    hoverHandler = {this.handleHover}
                    unHoverHandler = {this.handleUnHover}
                    keywordHandler = {this.handleKeywordSearch}
                    outlines={this.state.outlines}
                    sentiment={this.state.sentiment}/>;
    }

    let leftPanel = <LeftPanel
      onChange={e => this.setState({ text: e.target.value })}
      onSubmit={this.handleSubmit.bind(this)}
      onEdit={this.handleEdit.bind(this)}
      isEditable={this.state.isEditable}
      text={this.state.text}
      inds={this.state.selected_ind}
      sentences={this.state.sentences}
      hover={this.state.hover}
    />

    return (
      <div className="App" style={{ height: "100vh" }}>
        <Layout className="layout" style={{ height: "6vh" }}>
          <AppHeader />
        </Layout>
        <Row>
          <Col span={12} style={{ height: "92vh" }}>
            {leftPanel}
          </Col>
          <Col span={12} style={{ height: "92vh" }}>
            {rightPanel}
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
