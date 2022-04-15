import React, { useEffect, useState } from "react";

// import { height } from "@mui/system";
// import { DropzoneArea } from "material-ui-dropzone";
import { TextField } from "@mui/material";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import Button1 from "@mui/material/Button";
// import DeleteIcon from '@mui/icons-material/Delete';
// import EditIcon from '@mui/icons-material/Edit';
import axios from "axios";
import { CategoryCard } from "../components/Categories/CategoryCard";
import Card from "../components/kit/Card";
import Column from "../components/kit/Column";
import Row from "../components/kit/Row";
import Title1 from "../components/kit/Title1";
import Button from "../components/kit/Button";
import Swal from "sweetalert2";

function Category() {
  const [hidden, setHidden] = useState(true);
  const [form, setForm] = useState({
    name: "",
    type: "",
  });

  const [data, setData] = useState([]);

  const onChange = (e) => {
    const { value, name, type, checked } = e.target;
    setForm((state) => ({
      ...state,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const showData = () => {
    console.log(form);
  };

  const onSubmit = (e) => {
    showData();
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_API_URI}api/categories/add`, form).then((res) => {
      if (res.data.status == 400) {
        setHidden(true);
        Swal.fire({
          icon: "error",
          title: "something went wrong",
          showConfirmButton: false,
          timer: 1500,
        });
      } else if (res.data.status == 500) {
        setHidden(true);
        Swal.fire({
          icon: "error",
          title: "Bad Request",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
        setHidden(true);
        console.log(res.data.data)
        setData(state=>{
          return [res.data.data,...state]
        })
        Swal.fire({
          icon: "success",
          title: "added successfully",
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URI}api/categories`)
      .then((res) => {
        // console.log(res);
        if (res.status === 200) {
          setData(res.data.data);
          // console.log(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);


  useEffect(()=>{
    console.log(data);
  },[data]);
  const hiddenStyle = {
    margin: "0px",
    paddingBottom: "0px",
    paddingTop: "0px",
    maxHeight: "0",
    overflow: "hidden",
  };

  const visibleStyle = { margin: "0px", maxHeight: "1000px" };
  return (
    <>
      <Title1>Category</Title1>

      <Row align="center" justify="space-between" bottom="1rem">
        <Button
          onPress={() => {
            setHidden(false);
          }}
        >
          ADD +
        </Button>
      </Row>

      <Card style={hidden ? hiddenStyle : visibleStyle}>
        <form onSubmit={onSubmit} onClick={showData}>
          <Column justify="space-around" bottom="2rem">
            <TextField
              required
              id="email"
              label="Title"
              type="text"
              size="small"
              name="name"
              value={form.name}
              onChange={onChange}
            />
          </Column>
          <FormControl>
            <FormLabel id="demo-controlled-radio-buttons-group">
              <h1>Type</h1>
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-controlled-radio-buttons-group"
              name="controlled-radio-buttons-group"
            >
              <FormControlLabel
                value="income"
                control={<Radio />}
                label="Income"
                onChange={onChange}
                type="radio"
                name="type"
                checked={form.type === "income"}
                required="required"
              />
              <FormControlLabel
                value="expense"
                control={<Radio />}
                label="Expense"
                onChange={onChange}
                type="radio"
                name="type"
                checked={form.type === "expense"}
              />
            </RadioGroup>
          </FormControl>

          <Row>
            <Button
              type="submit"
              onPress={() => {
                setHidden(true);
              }}
            >
              Submit
            </Button>
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
      {data &&
        data.map((item,index) => {
          return <CategoryCard data={item} setData={setData} index={index} />;
        })}
    </>
  );
}

export default Category;
