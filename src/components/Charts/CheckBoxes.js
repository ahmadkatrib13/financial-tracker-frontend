import React from 'react'
import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from 'react-icons/md'
import styled from 'styled-components'
import { useState } from 'react';
import Expenses from '../../pages/Expenses';
import { useEffect } from 'react';

const ButtonContainer = styled.div`
background-color: rgb(239, 242, 245);
display: flex;
padding:3px;
border-radius: 8px;
gap:3px;

`
const Button = styled.button`
outline:none;
border: none;
box-shadow: rgb(239 242 245) 0px 1px 0px;
  color: rgb(88, 102, 126);
  cursor: pointer;
  background-color: ${props=>props.checkIt?"rgb(255, 255, 255)":"transparent"};
  /* width: 100%; */
  font-weight: 800;
  padding: 7px 8px;
  border-top: 1px solid transparent;
  border-right: 1px solid transparent;
  border-left: 1px solid transparent;
  border-bottom: none;
  border-radius: 8px;
  line-height: 0;
/* background-color:rgb(248, 250, 253); */


&:hover {
    background-color: rgb(248, 250, 253);
    font-weight: 600;
  }

  &:focus {
    color: rgb(88, 102, 126);
  }

`
function CheckBoxes(props) {
  const [income,setIncome] = useState(true);
  const [expense,setExpense] = useState(true);
  const [total,setTotal] = useState(false);

  useEffect(()=>{

    props.setCheck({
      income:income,
      expense:expense,
      total:total
    })

  },[income,expense,total])

  return (
    <ButtonContainer>
    <Button style={{color:"green"}}checkIt={!income} onClick={() =>setIncome(!income) }>
     Incomes
    </Button>
    <Button style={{color:"red"}} checkIt={!expense} onClick={() => setExpense(!expense)}>
    Expenses
    </Button>
    <Button style={{color:"blue"}} checkIt={!total} onClick={() => setTotal(!total)}>
      Total
    </Button>
  </ButtonContainer>
  )
}

export default CheckBoxes