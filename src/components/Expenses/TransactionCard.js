import React, { useState } from "react";
import Title3 from "../kit/Title3";
import Card from "../kit/Card";
import Column from "../kit/Column";
import Row from "../kit/Row";
import { IoIosArrowDown } from "react-icons/io";
import DeletePopUp from "../kit/DeletePopUp";
import Button from "../kit/Button";
import EditTransactionCard from "./EditTransactionCard";

import styled from "styled-components";
import { Collapse } from "@mui/material";
import millify from "millify";
const Input3 = styled.input``;

function TransactionCard(props) {
  const [viewMode, setViewMode] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [inputs, setInputs] = useState({});

  const handleInput = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const showViewMode = () => {
    return (
      <Card ref={props.ref} margin="0" padding="1.5rem 2rem 1rem 2rem" gap="0">
        <Column>
          <Row justify="space-between" align="center">
            <Title3>{props.transaction.title}</Title3>
            <span>{props.transaction.date_time}</span>
          </Row>
          <Row justify="space-between" align="center">
            <span>
              Category : <b>{props.transaction.category.name}</b>
            </span>
            <span
              style={{
                color: props.transaction.category.type=="income"?"#2ADB91":"#DB2A35",
                "font-size": "1.5rem",
                "font-weight": "600",
              }}
            >
              {props.transaction.category.type=="income" ?"+":"-"}
              {millify(props.transaction.amount)} {props.transaction.currency}
            </span>
          </Row>
        </Column>
        <Collapse in={viewMode}>
          <Column gap="2rem" padding="2rem 0">
            <div>
              Date : <b>{props.transaction.date_time}</b>.
            </div>
            <div>
              Amount : <b>
                {Number(props.transaction.amount).toLocaleString()} {props.transaction.currency}
              </b>
              .
            </div>
            <p>
              <div>
                <u>Description :</u>
              </div>
              <div>{props.transaction.description}</div>
            </p>
            <Row justify="flex-end">
              <Button onPress={() => {setEditMode(true)}}>EDIT</Button>
              <DeletePopUp btitle="DELETE" transaction={props.transaction} index={props.index} deleteRecord={props.deleteRecord}
/>
              {/* delete={Delete(props.transaction.id)} */}
            </Row>
          </Column>
        </Collapse>

        <div
          onClick={() => {
            setViewMode(!viewMode);
          }}
        >
          <Column>
            <IoIosArrowDown
              style={
                viewMode
                  ? {
                      transform: "rotate(180deg)",
                      margin: " 0 auto",
                      width: "1.5rem",
                      height: "1.5rem",
                    }
                  : { margin: " 0 auto", width: "1.5rem", height: "1.5rem" }
              }
            />
          </Column>
        </div>
      </Card>
    );
  };

  const showEditMode = () => {
    return (
        <EditTransactionCard
          index={props.index}
          editRecord={props.editRecord}
          categories={props.categories}
          transaction = {props.transaction}
          close={() => {setEditMode(false)}}
        ></EditTransactionCard>
    );
  };

  return editMode ? showEditMode() : showViewMode();
}

export default TransactionCard;
