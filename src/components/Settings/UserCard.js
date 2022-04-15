import React, { useState, useEffect } from "react";
import Title1 from "../kit/Title1";
import Row from "../kit/Row";
import Column from "../kit/Column";
import Card from "../kit/Card";
import ProfileSVG from "../../assets/images/ProfileSVG.svg";
import { FaUserEdit } from "react-icons/fa";
import { IoIosOpen, IoMdTrash } from "react-icons/io";
import Button from "../../components/kit/Button";
import axios from "axios";
import Buttonn from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Cookies from "universal-cookie";
import { Grid, Typography } from "@mui/material";
import Title2 from "../kit/Title2";
import Swal from "sweetalert2";

// const cookies = new Cookies();
// const token = cookies.get("TOKEN");
// const headers = {headers: {Authorization: "Bearer " + token}}
function UserCard(props) {
  const [editForm, setEditForm] = useState([]);
  const [editID, setEditID] = useState(undefined);
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  const handleDelete = (id) => {
    axios
      .delete(`${process.env.REACT_APP_API_URI}api/admin/delete/${id}`, headers)
      .then((res) => {
        console.log()
        if(res.data.status==201){
          props.setAdmins(state=>{
            if(state.length==1) return [];
            state.splice(props.index,1);
            return [...state]
          })
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }if(res.data.status==400){
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        }
        
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setEditForm((state) => {
      return { ...state, name: props.name, email: props.email };
    });
  }, [props.name, props.email]);

  const [open, setOpen] = useState(false);

  const handleClickOpen = (id) => {
    setEditID(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const onChange = (e) => {
    setEditForm((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEdit = (e) => {
    e.preventDefault();
    axios({
      method: "put",
      url: `${process.env.REACT_APP_API_URI}api/admin/edit/${editID}`,
      data: editForm,
      ...headers,
    })
      .then((res) => {
        if (res.data.status != 201) {
          setOpen(false);
          Swal.fire({
            position: "center",
            icon: "error",
            title: res.data.message,
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          props.setAdmins(
            state => {
              if (state.length == 1) return [res.data.data];
              state.splice(props.index, 1, res.data.data);
              console.log(state);
              return [...state];
            }
          );
          setOpen(false)
          Swal.fire({
            position: "center",
            icon: "success",
            title: "user edited successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }

      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <Grid item lg={4} md={6} xs={12} direction="column">
        <Card margin="0" direction={"Column"} align="center" height="100%">
          <Grid container direction={"column"} spacing={2}>
            <Grid container item justifyContent="center">
              <img
                src={ProfileSVG}
                alt="profile"
                style={{ width: "6rem", height: "6rem", objectFit: "cover" }}
              />
            </Grid>
            <Grid item container justifyContent="start" xs>
              <span
                style={{
                  width: "100%",
                  fontSize: "2rem",
                  fontWeight: "800",
                  textAlign: "center",
                  overflowWrap: "break-word",
                  color: "#2adb86",
                }}
              >
                {props.name}
              </span>
            </Grid>
            <Grid container item justifyContent="center" xs>
              <span
                style={{
                  width: "100%",
                  fontSize: "1.2rem",
                  overflowWrap: "break-word",
                  textAlign: "center",
                }}
              >
                {props.email}
              </span>
            </Grid>
            <Grid container item justifyContent="center" gap={3}>
              <Button onPress={() => handleClickOpen(props.id)}>Edit</Button>
              <Button onPress={() => handleDelete(props.id)}>Delete</Button>
            </Grid>
          </Grid>
        </Card>
      </Grid>
      <Dialog open={open} onClose={handleClose}>
        <form onSubmit={handleEdit}>
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Edit these information carefully any change can affect the
              system!! edit password is necessarly
              <br />
            </DialogContentText>
            <div style={{ display: "flex", gap: "1rem" }}>
              <TextField
                required
                autoFocus
                margin="dense"
                name="name"
                label="Name"
                type="text"
                Width="100"
                variant="standard"
                onChange={onChange}
                value={editForm.name || ""}
              />
              <TextField
                required
                margin="dense"
                name="email"
                label="Email Address"
                type="email"
                Width="100"
                variant="standard"
                onChange={onChange}
                value={editForm.email || ""}
              />
              <TextField
                required
                margin="dense"
                name="password"
                label="password"
                type="password"
                Width="100"
                variant="standard"
                onChange={onChange}
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Buttonn onClick={handleClose}>Cancel</Buttonn>
            <Buttonn type="submit">Save</Buttonn>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

export default UserCard;
