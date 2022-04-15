import React from "react";
import {
  MdOutlineArrowBackIos,
  MdOutlineArrowForwardIos,
} from "react-icons/md";
import styled from "styled-components";

const ButtonContainer = styled.div`
  background-color: rgb(239, 242, 245);
  display: flex;
  padding: 3px;
  border-radius: 8px;
  width: fit-content;
`;
const Button = styled.button`
  outline: none;
  border: none;
  box-shadow: rgb(239 242 245) 0px 1px 0px;
  color: rgb(88, 102, 126);
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: 800;
  background-color: transparent;
  /* width: 100%; */
  padding: 7px 8px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: none;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  /* background-color:rgb(248, 250, 253); */

  &:hover {
    background-color: rgb(248, 250, 253);
    font-weight: 600;
  }

  &:focus {
    color: rgb(88, 102, 126);
  }
`;
function NextBackButtons(props) {
  return (
    <ButtonContainer>
      <Button onClick={() => props.setRange(props.range - 1)}>
        <MdOutlineArrowBackIos />
      </Button>
      <Button onClick={() => props.setRange(props.range + 1)}>
        <MdOutlineArrowForwardIos />
      </Button>
    </ButtonContainer>
  );
}

export default NextBackButtons;
