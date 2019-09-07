import React, { Component } from "react";
import { Row, Layout, Col } from "antd";
import "antd/dist/antd.css";
import "./index.css";
import axios from "axios";

import AppHeader from "../AppHeader";
import LeftPanel from "../LeftPanel";
import RightPanel from "../RightPanel";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      data: null,
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
        this.setState({ data: response.data, isLoading: false });
      })
      .catch(() => {
        console.log("response error!!!");
        this.setState({ data: null, isLoading: false });
      });
    this.setState({ isLoading: true });
  }

  render() {
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
            />
          </Col>
          <Col span={12} style={{ height: "92vh" }}>
            <RightPanel
              isLoading={this.state.isLoading}
              data={this.state.data}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default App;
