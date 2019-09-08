import React from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

const TextEdit = props => {
  return (
    <div style={{ height: "80vh", margin:"2vh" }}>
      <TextArea
        onChange={e => props.onChange(e)}
        value={props.text}
        placeholder="I'm gonna do a magic trick..."
        style={{
          height: "80vh",
          width: "40vw",
          margin: "20px 20px 20px 20px",
          resize: "none",
          fontSize: "1.5em"
        }}
      />
    </div>
  );
};

export default TextEdit;
