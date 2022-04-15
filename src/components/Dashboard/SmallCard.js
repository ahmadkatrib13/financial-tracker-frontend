import React from 'react'
import Card from "../../components/kit/Card";
import Column from "../../components/kit/Column";
import Title2 from "../../components/kit/Title2";

function SmallCard(props) {
  return (
    <Card margin="0" direction="row" width={props.width}>
    {props.img}
    <Column gap={props.gap}>
      <Title2 color={props.color1||props.color} opacity={props.opacity1||"0.6"}>
        {props.title}
      </Title2>
      {/* <span style={{"color":props.color}}></span> */}
      <Title2 color={props.color2||props.color} opacity="1">
      {props.sign} {props.value} {props.currency}
      </Title2>
    </Column>
  </Card>
  )
}

export default SmallCard