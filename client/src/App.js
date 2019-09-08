import React, { Component } from 'react';
import { Row, Layout, Col, Input, Button, List, Empty } from 'antd';
import 'antd/dist/antd.css';
import './App.css';
import axios from 'axios';

const { Header, Content, Footer } = Layout;

const { TextArea } = Input;

const listData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      submitted: false,
      isLoading: false,
      data: null,
      sentiment: null,
      text: ''
    };
  }

  handleSubmit() {
    axios.post('/api/outlines', {
      text: this.state.text
    })
    .then(function (response) {
      console.log(response);
      
    })
    .catch(function (error) {
      console.log(error);
    });
    this.setState({submitted: true, isLoading: true});
  }

  handleReset() {
    this.setState({submitted:false, isLoading: false});
  }

  render() {

    const isSubmitted = this.state.submitted;
    let instruction;

    if (isSubmitted) {
        instruction = <Empty style={{height:"auto", width:"95%", textAlign: "center"}}
          image="./loading.gif"
          imageStyle={{height:"20vw", width:"20vw", display: "block", margin: "20vh auto 0 auto"}}
          description={
            <span style={{fontSize: "1.5em", marginBottom: "20px"}}>
              Loading...
            </span>
            }
          >
          </Empty>
    } else {
      instruction = <Empty style={{height:"auto", width:"95%", textAlign: "center"}}
        imageStyle={{height:"20vw", width:"20vw", display: "block", margin: "20vh auto 0 auto"}}
        description={
          <span style={{fontSize: "1.5em", marginBottom: "20px"}}>
            ← Feed me some text!
          </span>
          }
        >
      </Empty>
    }
    return (
      <div className="App" style={{height:"100vh"}}>
        <Layout className="layout" style={{height:"6vh"}}>
          <Header>
            <p style={{fontSize: "1.5em", color: "white"}}> AutoOutline </p>
          </Header>
        </Layout>
        <Row>
          <Col span={12} style={{height:"92vh"}}>
            <div style={{textAlign: "center", height:"90vh"}}>
              <TextArea
                onChange={(e) => this.setState({ "text": e.target.value })}
                value={this.state.text}
                placeholder="I'm gonna do a magic trick..."
                style={{height:"90%", width:"90%", margin:"20px 20px 0px 20px", resize:"none", fontSize: "1.5em"}}
              />
            <Button type="primary" size={"large"} style={{margin:"20px 20px 20px 20px", padding:"0 5vw 0 5vw"}} onClick={this.handleSubmit.bind(this)}>
                Submit
              </Button>
              <Button size={"large"} style={{margin:"20px 20px 20px 20px", padding:"0 5vw 0 5vw"}} onClick={this.handleReset.bind(this)}>
                Reset
              </Button>
            </div>
          </Col>
          <Col span={12} style={{height:"92vh"}}>
            {instruction}
        </Col>
      </Row>
    </div>
    );
  }
}

export default App;
