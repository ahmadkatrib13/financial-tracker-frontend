import React from "react";
import styled from "styled-components";

function Title1(props) {
  const Title1 = styled.h1`
    /* margin: ${props.margin || "0"};
    padding: ${props.margin || "0"}; */
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: -0.06em;
    color: #000000;
    opacity: 0.7;
  `;
  return <Title1>{props.children}</Title1>;
}

export default Title1;
