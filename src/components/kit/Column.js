import React from "react";
import styled from "styled-components";

const ColumnDiv = styled.div`
  width: ${props=>props.width || "auto"};
  height: ${props=>props.height || "auto"};
  display: flex;
  flex-direction: column;
  gap: ${props=>props.gap || "0.8rem"};
  flex-grow: ${props=>props.grow || 0};
  justify-content: ${props=>props.justify};
  align-items: ${props=>props.align};
  margin-top: ${props=>props.top || "0"};
  margin-bottom: ${props=>props.bottom || "0"};
  padding:  ${props=>props.padding || "0"};
  transition: ease-in-out 1s;
`;

function Column(props) {
  /*
    props : CSS properties
    width : width
    height: height
    gap   : row-gap
*/

  return (
    <ColumnDiv {...props}>
      {props.children}
    </ColumnDiv>
  );
}

export default Column;
