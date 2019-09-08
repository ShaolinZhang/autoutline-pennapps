import React, { Component } from "react";
import { Row, Layout, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";

import AppHeader from "../AppHeader";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";
import Result from "../Result";

var Tokenizer = require('sentence-tokenizer');
var tokenizer = new Tokenizer('Chuck');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isEditable: true,
      text: "",
      data: null,
      sentiment: 0,
      text: "",
      sentences: [],
      selected_ind: [],
      hover: [-1,-1]
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleHover = this.handleHover.bind(this)
    this.handleUnHover = this.handleUnHover.bind(this)
  }

  handleSubmit() {
    tokenizer.setEntry(this.state.text)
    this.setState({sentences: tokenizer.getSentences()});
    this.setState({ isLoading: true });
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

  render() {

    console.log(this.state.sentiment);
    let rightPanel;
    if (this.state.isEditable) {
      rightPanel = <RightPanel isLoading={this.state.isLoading}/>;
    } else {
      rightPanel = <Result data={this.state.data}
                    hoverHandler = {this.handleHover}
                    unHoverHandler = {this.handleUnHover}
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
