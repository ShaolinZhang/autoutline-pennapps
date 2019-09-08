import React from "react";
import { Input } from "antd";

const { TextArea } = Input;

const TextEdit = props => {
  return (
      <TextArea
        onChange={e => props.onChange(e)}
        value={props.text}
        placeholder="I'm gonna do a magic trick..."
        style={{
          height: "80vh",
          width: "95%",
          margin: "20px 20px 20px 20px",
          resize: "none",
          fontSize: "1.5em"
        }}
      />
  );
};

export default TextEdit;
