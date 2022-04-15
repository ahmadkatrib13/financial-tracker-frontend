import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../kit/Card";
import Column from "../kit/Column";
import Row from "../kit/Row";
import Button from "../kit/Button";

import {
  MenuItem,
  Select,
  FormControl,
  Grid,
  TextField,
  InputLabel,
  Stack,
  Typography,
  Switch,
  Collapse,
} from "@mui/material";

import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DatePicker from "@mui/lab/DatePicker";
import Title2 from "../kit/Title2";
import axios from "axios";
import Swal from "sweetalert2";
import Cookies from "universal-cookie";

export default function Form(props) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  const [form, setForm] = useState({
    title: props.transaction.title,
    description: props.transaction.description,
    category_id: props.transaction.category_id,
    currency: props.transaction.currency,
    amount: props.transaction.amount,
    date_time: props.transaction.date_time,
  });

  const onChange = (e) => {
    const { value, name } = e.target;
    setForm((state) => ({
      ...state,
      [name]: value,
    }));
  };
  // React.useEffect(() => {
  //   console.log(form);
  // }, [form])

  const editTransaction = async (transactionObject) => {
    console.log(transactionObject);
    try {
      let res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URI}api/transactions/edit/${props.transaction.id}`,
        data: transactionObject,
        ...headers,
      });
      return res;
      // don't forgot to pass response to the parent
    } catch (err) {
      console.log(err);
    }
  };

  const sendForm = async (e) => {
    e.preventDefault();
    let res = await editTransaction(form);
    console.log(res.data.status);
    if (res.data.status == 201) {
      Swal.fire({
        icon: "success",
        title: "Transaction edited Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      props.editRecord(res.data.data, props.index);
      Swal.fire({
        icon: "success",
        title: "Transaction Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      props.close();
    }

    //////////////
  };
  return (
    <Card margin="0" padding="1.5rem 2rem 1rem 2rem" grow="0">
      <form onSubmit={sendForm}>
        <Title2 margin="0.25rem 0 1rem 0 ">Edit Transaction</Title2>
        <Grid container spacing={1}>
          <Grid container item md={6} xs={12} spacing={1}>
            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="title"
                  label="Title"
                  name="title"
                  variant="outlined"
                  onChange={onChange}
                  defaultValue={form.title}
                />
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <FormControl fullWidth>
                <InputLabel id="Category-label">Category *</InputLabel>
                <Select
                  required
                  labelId="Category-label"
                  id="Category"
                  name="category_id"
                  value={form.category_id}
                  label="Category *"
                  onChange={onChange}
                >
                  {props.categories.map((category) => (
                    <MenuItem value={category.id}>{category.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={8}>
              <FormControl fullWidth>
                <TextField
                  required
                  id="Amount"
                  type="number"
                  label="Amount"
                  name="amount"
                  variant="outlined"
                  onChange={onChange}
                  defaultValue={form.amount}
                  inputProps={{ step: "any" }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="Currency-label">Currency *</InputLabel>
                <Select
                  labelId="Currency-label"
                  id="Currency"
                  name="currency"
                  value={form.currency}
                  label="Currency *"
                  onChange={onChange}
                >
                  <MenuItem value={"$"}>$</MenuItem>
                  <MenuItem value={"LBP"}>LBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={12} md={12}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  label="Date"
                  name="date_time"
                  value={form.date_time}
                  onChange={(newValue) => {
                    setForm((state) => {
                      return {
                        ...state,
                        date_time: newValue.toISOString().split("T")[0],
                      };
                    });
                  }}
                  renderInput={(params) => <TextField {...params} fullWidth />}
                />
              </LocalizationProvider>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                required
                id="description"
                label="Description"
                name="description"
                variant="outlined"
                onChange={onChange}
                defaultValue={form.description}
                multiline
                rows={10}
                maxRows={10}
              />
            </FormControl>
          </Grid>
          <Grid container item spacing={1}>
            <Grid item>
              <Button type="submit">Save</Button>
            </Grid>
            <Grid item>
              <Button onPress={props.close}>Cancel</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
