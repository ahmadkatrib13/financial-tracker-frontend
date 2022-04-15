import React from "react";
import Button from "@mui/material/Button";

function MButton(props) {
  return (
    <Button
      type={props.type}
      onClick={props.onPress}
      variant="outlined"
      style={{
        "border-radius": "2rem",
        padding: "0.5rem 2.25rem",
        "font-family": "Montserrat",
        "font-size": "1rem",
        "line-height": "1.25rem",
        height: "fit-content",
      }}
    >
      {props.children}
    </Button>
  );
}

export default MButton;
