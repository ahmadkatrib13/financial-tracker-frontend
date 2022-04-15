import React, { useState, useEffect } from "react";
import Title1 from "../components/kit/Title1";
import Column from "../components/kit/Column";
import Row from "../components/kit/Row";
import Card from "../components/kit/Card";
import UserCard from "../components/Settings/UserCard";
import Button from "../components/kit/Button";
import { flexbox, height } from "@mui/system";
import { DropzoneArea } from "material-ui-dropzone";
import { Grid, Input, TextField } from "@mui/material";
import axios from "axios";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";

function Settings() {
  const [hidden, setHidden] = useState(true);
  const [admins, setAdmins] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URI}api/admin`, headers).then((res) => {
      console.log(res.data.data);
      setAdmins(res.data.data);
    });
  }, []);
  const onChange = (e) => {
    const { value, name } = e.target;

    setForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${process.env.REACT_APP_API_URI}api/register`, form, headers)
      .then((res) => {
        console.log(res.data.user);
        setAdmins(state=>{
          return [res.data.user,...state]
        })
        setHidden(true);
      }).catch(err=>{
        Swal.fire({
          icon: "error",
          title: err.response.data,
          showConfirmButton: false,
          timer: 1500,
        });
        
      });
  };

  const hiddenStyle = {
    margin: "0px",
    "padding-bottom": "0px",
    "padding-top": "0px",
    "max-height": "0",
    overflow: "hidden",
  };
  const visibleStyle = { margin: "0px", "max-height": "1000px" };
  return (
    <>
      <Row align="center" justify="space-between">
        <Title1>Users</Title1>
        <Button
          onPress={() => {
            setHidden(false);
          }}
        >
          ADD +
        </Button>
      </Row>
      <Card style={hidden ? hiddenStyle : visibleStyle}>
        <form onSubmit={onSubmit}>
          <Column justify="space-around" bottom="2rem">
            <TextField
              required
              id="name"
              name="name"
              label="Name"
              size="small"
              defaultValue={form.name}
              onChange={onChange}
            />

            <TextField
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              size="small"
              defaultValue={form.email}
              onChange={onChange}
            />

            <TextField
              required
              id="passowrd"
              name="password"
              label="Password"
              type="password"
              size="small"
              defaultValue={form.password}
              onChange={onChange}
            />
            <TextField
              required
              id="passowrd_confirmation"
              name="password_confirmation"
              label="Confirm Password"
              type="password"
              size="small"
              defaultValue={form.password_confirmation}
              onChange={onChange}
            />
          </Column>
          <Row>
            <Button type="submit">Submit</Button>
            <Button
              onPress={() => {
                setHidden(true);
              }}
            >
              Cancel
            </Button>
          </Row>
        </form>
      </Card>

      <Grid container spacing ={2} alignItems="stretch"  style={{marginTop:"1rem"}}>
        {admins.length>0?admins.map((admin, index) => (
            <UserCard
              name={admin.name}
              email={admin.email}
              key={index}
              index={index}
              id={admin.id}
              setAdmins={setAdmins}
            />
        )):<Grid container item xs justifyContent={"center"}>{"no users"}</Grid>}
      </Grid>
    </>
  );
}

export default Settings;
