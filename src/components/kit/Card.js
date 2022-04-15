import React from "react";
import styled from "styled-components";

    /* 
    props:
        width
        height
        direction
        bg
        margin
        padding
        direction
        rowgap
        columngap
        gap
        index
        color

    */

        const CardDiv = styled.div`
        width: ${props=>props.width || "auto"};
        height: ${props=>props.height || "auto"};
        border-radius: 1rem;
        box-shadow: 0px 16px 24px rgba(0, 0, 0, 0.06),
          0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04);
        background-color: ${props=>props.bg ||"#fff"};
        padding:${props=>props.padding||"1.75rem 1.5rem"} ;
        display:flex;
        flex-direction: ${props=>props.direction||"column"};
        gap:${props=>props.gap||"1.5rem"};
        row-gap:${props=>props.rowgap||""} ;
        column-gap:${props=>props.columngap||""} ;
        flex-wrap: wrap;
        color:${props=>props.color||"black"};
        z-index: ${props=>props.index||1};
        margin:${props=>props.margin||"1rem 1.5rem"};
        align-items:${props=>props.align||""} ;
        justify-content:${props=>props.justify||""} ;
        flex-grow:${props=>props.grow||1};
        transition: ease-in 0.3s;
      `;
function Card(props) {

  return <CardDiv {...props}>{props.children}</CardDiv>;
}

export default Card;
