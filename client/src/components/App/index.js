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
    let ans = []
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
        i++
      }
    }

    ans.push(sentences)
    ans.push(returns)
    return ans
  }

  handleSubmit() {
    let arr = this.tokenize(this.state.text)
    this.setState({sentences: arr[0]});
    this.setState({returns: arr[1]});
    this.setState({isLoading: true});

    axios
      .post("http://18.219.26.6:8000/get_outline", {
        text: this.state.text
      })
      .then(response => {
        this.setState({ data: response.data, isLoading: false, isEditable: false });
        let selected_ind = [];
        for (var i = 0; i < response.data.titles.length; i++) {
          selected_ind.push(response.data.titles[i].ind);
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

  handleClick(i, range) {
    document.getElementById(i).scrollIntoView(true);
    if (this.state.hover === range){
      this.setState({hover: [-1,-1]})
    }
    else{
      this.setState({hover: range})
    }
  }

  handleHover(range) {
    this.setState({hover: range})
  }

  handleUnHover() {
    this.setState({hover: [-1,-1]})
  }

  async handleKeywordSearch(range, cb) {
    let text = ''
    let i = range[0]
    for (; i<range[1]; i++){
      text = text + this.state.sentences[i]
    }

    axios
      .post("http://18.219.26.6:8000/get_keyword", {
        text: text
      })
      .then(response => {
        cb(response.data.words);
      })
      .catch(() => {
        console.log("response error!!!");
      });
  }

  render() {
    let rightPanel;
    if (this.state.isEditable) {
      rightPanel = <RightPanel isLoading={this.state.isLoading}/>;
    } else {
      rightPanel = <Result data={this.state.data}
                    hoverHandler = {this.handleHover}
                    unHoverHandler = {this.handleUnHover}
                    clickHandler = {this.handleClick.bind(this)}
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
      returns={this.state.returns}
      hover={this.state.hover}
    />

    console.log(this.state.sentences)
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
