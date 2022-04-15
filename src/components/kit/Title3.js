import React from "react";
import styled from "styled-components";

function Title3(props) {
  const Title3 = styled.h2`
    margin: ${props.margin || "0"};
    padding: ${props.margin || "0"};
    font-weight: 500!important;
    font-size: 1.5rem;
    letter-spacing: -0.06em;
    color: ${props.color||"black"};
    opacity: ${props.opacity||0.6};
  `;
  return <Title3 margin="0">{props.children}</Title3>;
}

export default Title3;
