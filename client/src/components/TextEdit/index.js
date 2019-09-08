import React from "react";
import { Input, Button } from "antd";

const { TextArea } = Input;

const TextEdit = props => {
  return (
    <div style={{ textAlign: "center", height: "90vh" }}>
      <TextArea
        onChange={e => props.onChange(e)}
        value={props.text}
        placeholder="I'm gonna do a magic trick..."
        style={{
          height: "90%",
          width: "90%",
          margin: "20px 20px 0px 20px",
          resize: "none",
          fontSize: "1.5em"
        }}
      />
      <Button
        type="primary"
        size={"large"}
        style={{
          margin: "20px 20px 20px 20px",
          padding: "0 5vw 0 5vw"
        }}
        onClick={() => props.onSubmit()}
      >
        Submit
      </Button>
      <Button
        size={"large"}
        style={{
          margin: "20px 20px 20px 20px",
          padding: "0 5vw 0 5vw"
        }}
        onClick={() => props.onEdit()}
      >
        Edit
      </Button>
    </div>
  );
};

export default TextEdit;
