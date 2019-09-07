import React from 'react';
import logo from './logo.svg';
import { Row, Layout, Col, Input, Button, List } from 'antd';
import 'antd/dist/antd.css';
import './App.css';

const { Header, Content, Footer } = Layout;

const { TextArea } = Input;

const listData = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];

function App() {
  return (
    <div className="App" style={{height:"100vh"}}>
    <Layout className="layout" style={{height:"6vh"}}>
      <Header>
        <div className="logo" />
      </Header>
      <Row>
        <Col span={12} style={{height:"92vh"}}>
          <TextArea
            placeholder="Hi there"
            style={{height:"80%", width:"90%", margin:"20px 20px 0px 20px", resize:"none"}}
          />
          <div style={{textAlign: "center"}}>
            <Button type="primary" size={"large"} style={{margin:"20px 20px 20px 20px"}}>
              Submit
            </Button>
          </div>
        </Col>
        <Col span={12} style={{height:"92vh"}}>
          <List
            style={{width:"90%", margin:"20px 20px 0px 20px", float:"left"}}
            bordered
            dataSource={listData}
            renderItem={item => (
              <List.Item>
                {item}
              </List.Item>
            )}
          />
        </Col>
      </Row>
    </Layout>
    </div>
  );
}

export default App;
