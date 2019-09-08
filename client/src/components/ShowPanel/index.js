import React from "react";

const showPanel = props => {
  let paragraphs = props.sentences.map((line, ind) => {
    let p = <span key={ind}>{line} </span>

    if (props.inds.includes(ind) && props.hover[0]<=ind && ind<props.hover[1]) {
      p = <span key={ind} style={{color:"#EB7A77",backgroundColor:"#FFBA84"}}>{line} </span>;
    }
    else if (props.hover[0]<=ind && ind<props.hover[1]) {
      p = <span key={ind} style={{backgroundColor:"#FFBA84"}}>{line} </span>;
    }
    else if (props.inds.includes(ind) ) {
      p = <span key={ind} style={{color:"#EB7A77"}}>{line} </span>;
    }

    return p
  })

  return (

      <div
        onChange={e => props.onChange(e)}
        value={props.text}
        style={{
          textAlign: "left",
          height: "80vh",
          width: "95%",
          margin: "20px 20px 20px 20px",
          padding: "22px 20px 20px 20px",
          resize: "none",
          fontSize: "1.2em",
          overflow: "scroll",
          borderColor: "grey",
          borderWidth: "0.1px"
        }}
      >
      {paragraphs}
      </div>


  );
};

export default showPanel;
