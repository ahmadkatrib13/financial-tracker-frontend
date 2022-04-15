import React from "react";
import styled from "styled-components";

function Title2(props) {
  const Title2 = styled.h2`
    margin: ${props.margin || "0"};
    padding: ${props.padding || "0"};
    font-weight: 800!important;
    font-size: 2rem;
    letter-spacing: -0.06em;
    color: ${props.color||"black"};
    opacity: ${props.opacity||0.6};
  `;
  return <Title2 margin="0">{props.children}</Title2>;
}

export default Title2;
