import React from "react";

const showPanel = props => {
  let paragraphs = props.sentences.map((line, ind) => {
    let p = <span key={ind}>line</span>

    if (props.inds.includes(ind) && props.hover[0]<=ind && ind<props.hover[1]) {
      p = <span key={ind} style={{color:"red",backgroundColor:"blue"}}>{line}</span>;
    }
    else if (props.hover[0]<=ind && ind<props.hover[1]) {
      p = <span key={ind} style={{backgroundColor:"blue"}}>{line}</span>;
    }
    else if (props.inds.includes(ind) ) {
      p = <span key={ind} style={{color:"red"}}>{line}</span>;
    }

    return p
  })

  return (
    
    <div style={{ 
      textAlign: "left", 
      height: "80vh", 
      margin:"2vh",
    }}>
      <div
        onChange={e => props.onChange(e)}
        value={props.text}
        placeholder="I'm gonna do a magic trick..."
        style={{
          height: "80vh",
          width: "40vw",
          margin: "20px 20px 20px 20px",
          resize: "none",
          fontSize: "1.5em",
          borderStyle: "solid",
          borderColor: "grey",
          borderWidth: "0.1px"
        }}
      >
      {paragraphs}
      </div>
    </div>
      

  );
};

export default showPanel;
