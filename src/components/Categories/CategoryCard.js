import React from "react";
import Card from "../kit/Card";
import Row from "../../components/kit/Row";
import Button1 from "@mui/material/Button";
import axios from "axios";
import { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import Title1 from "../../components/kit/Title1";
import Column from "../../components/kit/Column";
import Swal from "sweetalert2";
// import Row from "../../components/kit/Row";
// import Card from "../../components/kit/Card";
// import Button from "../../components/kit/Button";

export const CategoryCard = (props) => {
  const [id, setId] = useState();
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [idEdit, setIDEdit] = useState(undefined);
  const [editName, setEditName] = useState(undefined);
  const [editType, setEditType] = useState(undefined);

  const data = props.data;
  const handleClickOpen = (id, name, type) => {
    setIDEdit(id);
    setEditName(name);
    setEditType(type);

    setOpen(!open);
  };

  const submitEdit = () => {
    axios
      .put(`${process.env.REACT_APP_API_URI}api/categories/edit/${idEdit}`, {
        name: editName,
        type: editType,
      })
      .then((res) => {
        if (res.data.status == 400) {
          setOpen(true);

          Swal.fire({
            icon: "error",
            title: "something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        } else if (res.data.status == 500) {
          setOpen(true);
          Swal.fire({
            icon: "error",
            title: "Bad Request",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          setOpen(false);
          props.setData((state) => {
            state.splice(props.index, 1, res.data.data);
            return [...state];
          });
          Swal.fire({
            icon: "success",
            title: "edited successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  const onClick = (id) => {
    console.log("batataaaa");
    axios
      .delete(`${process.env.REACT_APP_API_URI}api/categories/delete/${id}`)
      .then((res) => {
        if (res.data.status == 201) {
          props.setData((state) => {
            if (state.length == 1) return [];
            state.splice(props.index, 1);
            return [...state]
          });
          Swal.fire({
            icon: "success",
            title: "deleted successfully",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "something went wrong",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  };

  useEffect(() => {
    if (id) {
      axios.get(`http://127.0.0.1:8000/api/categories/${id}`).then((res) => {
        if (res.status === 200) {
          data(res.data);
        }
      });
    }
  }, []);

  return (
    <div>
      <Card justify="space-between" style={{ margin: "1rem 0 0 0" }}>
        <Row justify="space-between">
          <div>
            <div>Title : {data && data.name}</div>
            <div>Type : {data && data.type}</div>
          </div>
          <div>
            <Button1
              style={{
                backgroundColor: "green",
                color: "white",
                fontWeight: "900",
                margin: "0 1rem 0 0",
              }}
              variant="contained"
              onClick={() => {
                handleClickOpen(data.id, data.name, data.type);
              }}
            >
              Edit
            </Button1>
            <Button1
              style={{
                backgroundColor: "red",
                color: "white",
                fontWeight: "900",
              }}
              variant="contained"
              onClick={() => onClick(data.id)}
            >
              Delete
            </Button1>
          </div>
        </Row>
      </Card>
      <form>
        <Dialog
          fullScreen={fullScreen}
          open={open}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <DialogContentText>
              <div className="card" style={{ width: 450 }}>
                <div className="card-header">
                  <h4> Edit Gategory {id}</h4>
                </div>

                <form>
                  <Column justify="space-around" bottom="2rem">
                    <TextField
                      required
                      id="email"
                      label="Title"
                      type="text"
                      size="small"
                      name="name"
                      defaultValue={editName}
                      onChange={(e) => setEditName(e.target.value)}
                    />
                  </Column>
                  <FormControl>
                    <FormLabel id="demo-controlled-radio-buttons-group">
                      <h1>Type</h1>
                    </FormLabel>
                    <RadioGroup
                      aria-labelledby="demo-controlled-radio-buttons-group"
                      name="controlled-radio-buttons-group"
                      value={editType}
                      onChange={(e) => setEditType(e.target.value)}
                    >
                      <FormControlLabel
                        value="income"
                        control={<Radio />}
                        label="Income"
                        required="required"
                      />
                      <FormControlLabel
                        value="expense"
                        control={<Radio />}
                        label="Expense"
                        onChange={(e) => setEditType(e.target.value)}
                      />
                    </RadioGroup>
                  </FormControl>
                </form>
              </div>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              style={{ fontSize: "16px", cursor: "pointer", color: "red" }}
              autoFocus
              onClick={(e) => handleClickOpen()}
              type="button"
            >
              Disagree
            </Button>
            <Button
              style={{ fontSize: "16px", cursor: "pointer", color: "green" }}
              type="submit"
              onClick={submitEdit}
            >
              Edit Gategory
            </Button>
          </DialogActions>
        </Dialog>
      </form>
    </div>
  );
};
