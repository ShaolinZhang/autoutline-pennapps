import React from "react";
import { Empty } from "antd";

const Loading = () => (
  <Empty
    style={{ height: "auto", width: "95%", textAlign: "center" }}
    image="./loading.gif"
    imageStyle={{
      height: "20vw",
      width: "20vw",
      display: "block",
      margin: "20vh auto 0 auto"
    }}
    description={
      <span style={{ fontSize: "1.5em", marginBottom: "20px" }}>
        Loading...
      </span>
    }
  ></Empty>
);

export default Loading;
