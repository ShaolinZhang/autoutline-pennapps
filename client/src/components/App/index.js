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
      data: null,
      outlines: [],
      sentiment: 0,
      text: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    axios
      .post("/api/outlines", {
        text: this.state.text
      })
      .then(response => {
        console.log("response data:", response.data);
        this.setState({ data: response.data, isLoading: false, isEditable: false });
        var outlines = [];
        for (var i = 0; i < response.data.topics.length; i++) {
          outlines.push(response.data.topics[i].string);
        }
        this.setState({outlines: outlines, sentiment: (response.data.sentiment + 1) * 50});
      })
      .catch(() => {
        console.log("response error!!!");
        this.setState({ data: null, isLoading: false });
      });
    this.setState({ isLoading: true });
  }

  handleEdit() {
    this.setState({ data: null, isLoading: false, isEditable: true });
  }

  render() {

    console.log(this.state.sentiment);
    let rightPanel;
    if (this.state.isEditable) {
      rightPanel = <RightPanel
        isLoading={this.state.isLoading}
        data={this.state.data}
        outlines={this.state.outlines}
      />;
    } else {
      rightPanel = <Result
        outlines={this.state.outlines}
        sentiment={this.state.sentiment}
      />;
    }

    return (
      <div className="App" style={{ height: "100vh" }}>
        <Layout className="layout" style={{ height: "6vh" }}>
          <AppHeader />
        </Layout>
        <Row>
          <Col span={12} style={{ height: "92vh" }}>
            <LeftPanel
              text={this.state.text}
              onChange={e => this.setState({ text: e.target.value })}
              onSubmit={this.handleSubmit.bind(this)}
              onEdit={this.handleEdit.bind(this)}
            />
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
