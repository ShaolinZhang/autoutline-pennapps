import React from "react";
import { Layout } from "antd";

const { Header } = Layout;

const AppHeader = () => {
  return (
    <Header>
      <p style={{ fontSize: "1.5em", color: "white" }}> AutoOutline </p>
    </Header>
  );
};

export default AppHeader;
