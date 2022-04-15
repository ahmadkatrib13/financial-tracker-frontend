import React from "react";
import { useState } from "react";
import styled from "styled-components";
import Card from "../kit/Card";
import Column from "../kit/Column";
import Row from "../kit/Row";
import Button from "../kit/Button";
import moment from "moment";

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
const headers = {headers: {Authorization: "Bearer " + token}}
  const [form, setForm] = useState({
    title: "",
    description: "",
    category_id: "",
    currency: "$",
    amount: "null",
    type: "fixed",
    schedule: "",
    duration: "",
    start_date: moment().format("YYYY-MM-DD"),
    end_date: moment().add(1, "days").format("YYYY-MM-DD"),
  });
  let min_end_date = new Date(form.start_date);
  min_end_date.setDate(min_end_date.getDate() + 1);

  const onChange = (e) => {
    const { value, name } = e.target;
    if (name === "type") {
      console.log(e.target.checked);
      setForm((state) => ({
        ...state,
        [name]: e.target.checked ? "recurring" : "fixed",
      }));
    } else
      setForm((state) => ({
        ...state,
        [name]: value,
      }));
  };

  const sendForm = async (e) => {
    const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {headers: {Authorization: "Bearer " + token}}
    e.preventDefault();
    let res = await addTransaction(form);
    console.log(res.data.data);
    if (res.data.status == 201) {
      props.pushRecord(res.data.data);
      setForm({
        title: "",
        description: "",
        category_id: "",
        currency: "$",
        amount: "",
        type: "fixed",
        schedule: "",
        duration: "",
        start_date: moment().format("YYYY-MM-DD"),
        end_date: moment().add(1, "days").format("YYYY-MM-DD"),
      });
      Swal.fire({
        icon: "success",
        title: "Transaction Added Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      
      props.closeAddMode();
    }
  };
  const addTransaction = async (transactionObject) => {
    try {
      let res = await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URI}api/transactions/add`,
        data: transactionObject,
        ...headers
      });
      return res;
      // don't forgot to pass response to the parent
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Card margin="0" padding="1.5rem 2rem 1rem 2rem" grow="0">
      <form onSubmit={sendForm}>
        <Title2 margin="0.25rem 0 1rem 0 ">Add Transaction</Title2>
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
                  // value={form.title}
                  value={form.title}
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
                  value={form.amount}
                  inputProps={{ step: "any" }}

                />
              </FormControl>
            </Grid>
            <Grid item xs={12} md={4}>
              <FormControl fullWidth>
                <InputLabel id="Currency">Currency</InputLabel>
                <Select
                  labelId="Currency"
                  id="Currency"
                  name="currency"
                  value={form.currency}
                  label="Currency"
                  onChange={onChange}
                >
                  <MenuItem value={"$"}>$</MenuItem>
                  <MenuItem value={"LBP"}>LBP</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
          <Grid container item xs={12} md={6}>
            <FormControl fullWidth>
              <TextField
                id="description"
                required
                label="Description"
                name="description"
                variant="outlined"
                onChange={onChange}
                value={form.description}
                multiline
                rows={7}
                maxRows={7}
              />
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={1}>
          <Grid item xs={12} md={12}>
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography>Fixed</Typography>
              <Switch onChange={onChange} name="type" value="recurring" checked={form.type=="recurring"}/>
              <Typography>Recurring</Typography>
            </Stack>
          </Grid>
          <Grid item xs={6} md={3}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DatePicker
                label={form.type == "recurring" ? "Start Date" : "Date"}
                name="start_date"
                value={form.start_date}
                maxDate={Date.now()}
                onChange={(newValue) => {
                  console.log(newValue);
                  setForm((state) => {
                    // console.log( moment(form.end_date).min(moment(newValue)).format("YYYY-MM-DD"));
                    setForm({
                      ...state,
                      start_date: newValue.toISOString().split("T")[0],
                      end_date: moment(form.end_date)
                        .min(moment(newValue))
                        .add(1, "days")
                        .format("YYYY-MM-DD"),
                    });
                  });
                }}
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>
          <Grid item xs={6} md={3}>
            <Collapse in={form.type == "recurring"}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  required
                  disabled={form.type != "recurring"}
                  label="End Date"
                  name="end_date"
                  minDate={min_end_date.getTime()}
                  //it works only with Date
                  value={form.end_date}
                  onChange={(newValue) => {
                    setForm((state) => {
                      setForm({
                        ...state,
                        end_date: newValue.toISOString().split("T")[0],
                      });
                    });
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Collapse>
          </Grid>
          <Grid item xs={6} md={3}>
            <Collapse in={form.type == "recurring"}>
              <FormControl fullWidth>
                <TextField
                  required
                  disabled={form.type != "recurring"}
                  type="number"
                  id="Duration"
                  label="Every"
                  name="duration"
                  variant="outlined"
                  onChange={onChange}
                  value={form.duration}
                  InputProps={{ min: 0 }}
                />
              </FormControl>
            </Collapse>
          </Grid>
          <Grid item xs={6} md={3}>
            <Collapse in={form.type == "recurring"}>
              <FormControl fullWidth>
                <InputLabel id="Schedule-label">Schedule *</InputLabel>
                <Select
                  labelId="Schedule-label"
                  id="Schedule"
                  name="schedule"
                  required
                  disabled={form.type != "recurring"}
                  value={form.schedule}
                  label="Schedule *"
                  onChange={onChange}
                >
                  <MenuItem value={"days"}>Days</MenuItem>
                  <MenuItem value={"months"}>Months</MenuItem>
                  <MenuItem value={"years"}>Years</MenuItem>
                </Select>
              </FormControl>
            </Collapse>
          </Grid>
          <Grid item />
          <Grid container item spacing={1}>
            <Grid item>
              <Button type="submit">ADD</Button>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </Card>
  );
}
