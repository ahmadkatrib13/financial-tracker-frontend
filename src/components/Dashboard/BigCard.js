import React from 'react'
import Card from '../kit/Card';
import Title2 from '../kit/Title2';
import  styled from 'styled-components';

function BigCard(props) {
  const BalanceSpan = styled.span`
    /* margin: ${props.margin || "0"};
    padding: ${props.margin || "0"}; */
    font-family: "Montserrat";
    font-style: normal;
    font-weight: 800;
    font-size: 2.5rem;
    letter-spacing: -0.06em;
    color: ${props.color};
   
  `;
  return (
    <Card align="center" margin="0" rowgap="4rem" padding="1.75rem 4rem" width={props.width}>
    <Title2>{props.title}</Title2>
    {/* <span>Latest Up</span> */}
    <BalanceSpan>
      {props.sign} {props.value} {props.currency}
    </BalanceSpan> 
  </Card>
  )
}

export default BigCard