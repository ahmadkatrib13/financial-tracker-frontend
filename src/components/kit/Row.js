import React from "react";
import styled from "styled-components";

const RowDiv = styled.div`

width:${props=>props.width||"auto"};
height:${props=>props.height||"auto"};
display: flex;
gap: ${props=>props.gap||'0.8rem'} ;
flex-wrap: ${props=>props.wrap||"wrap"};
flex-grow: ${props=>props.grow||0};
margin-top: ${props=>props.top||"0"};
margin-bottom: ${props=>props.bottom||"0"};
justify-content: ${props=>props.justify};
align-items: ${props=>props.align};
transition: ease-in 1s;
`;
function Row(props) {


  return <RowDiv {...props}>{props.children}</RowDiv>;
}

export default Row;
