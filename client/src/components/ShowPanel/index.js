import React from "react";

const showPanel = props => {
  let paragraphs = props.sentences.map((line, ind) => {
    let style = {}

    if (props.inds.includes(ind) && props.hover[0]<=ind && ind<props.hover[1]) {
      style['color'] = "white"
      style['backgroundColor'] = "#FFBA84"
    }
    else if (props.hover[0]<=ind && ind<props.hover[1]) {
      style['backgroundColor'] = "#FFBA84"
    }
    else if (props.inds.includes(ind)) {
      style['color'] = "#EB7A77"
    }

    let p = <span style={style} key={ind} id={ind}>{line} </span>
    if (props.returns.includes(ind+1))
      p= <div><span style={style} key={ind} id={ind}> {line} </span> <br/></div>

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
