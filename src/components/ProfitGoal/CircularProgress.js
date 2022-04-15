import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import Button from "../../components/kit/Button";
import axios from "axios";
import Cookies from "universal-cookie";

function CircularProgress({ size,total,profit, percentage=0, color, profitID, setProfit }) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = { headers: { Authorization: "Bearer " + token } };
  const [progress, setProgress] = useState(0);

  const [form, setForm] = useState({});
  const [open, setOpen] = useState(false);
  const [animate,setAnimate] = useState(false);

  const strokeWidth = size * 0.2;
  const viewBox = `0 0 ${size} ${size}`;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * Math.PI * 2;
  const dash = (progress * circumference) / 100;
  useEffect(() => {
    setProgress(percentage);
  }, [percentage]);
  useEffect(()=>setForm({profit_goal:profit}),[profit]);

  const onChange = (e) => {
    setForm((form) => {
      return { ...form, [e.target.name]: e.target.value };
    });
  };
  useEffect(()=>{
    console.log(form);
  },[form])

  const handleAction = async () => {
    // console.log(props.transaction);
    try {
      console.log(form)
      let res = await axios({
        method: "put",
        url: `${process.env.REACT_APP_API_URI}api/profit/edit/${profitID}`,
        data: form,
        ...headers,
      });
      console.log(res.data.data);
      setProfit(res.data.data);
      setOpen(false);
      return res;
      // don't forgot to pass response to the parent
    } catch (err) {
      console.log(err);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <div onClick={handleOpen} onMouseLeave={()=>{setAnimate(false)}} onMouseEnter={()=>{setAnimate(true)}} style={animate?{transform:"scale(1.1)",transition:"0.5s ease-in",cursor:"pointer"}:{transition:"1s ease-in"}}>
        <svg width={size} height={size} viewBox={viewBox}>
          <circle
            fill="none"
            stroke={color}
            cx={size / 2}
            cy={size / 2}
            r={(size - 2 * strokeWidth + 1) / 2}
            strokeWidth={`1px`}
          />
          <circle
            fill="none"
            stroke={color}
            cx={size / 2}
            cy={size / 2}
            r={(size - 1) / 2}
            strokeWidth={`1px`}
          />
          <circle
            fill="none"
            stroke={color}
            cx={size / 2}
            cy={size / 2}
            r={radius}
            strokeWidth={`${strokeWidth}px`}
            transform={`rotate(-90 ${size / 2} ${size / 2})`}
            strokeDasharray={[dash, circumference - dash]}
            // strokeLinecap="round"
            style={{ transition: "all 1s" }}
          />
          <text
            fill="#616161"
            fontSize="1.5rem"
            fontFamily="Montserrat"
            letterSpacing="-0.06rem"
            fontWeight="bold"
            x="50%"
            y="50%"
            dy="0.5rem"
            textAnchor="middle"
          >
            {percentage.toFixed(1)}%
          </text>
        </svg>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
      <DialogTitle id="alert-dialog-title">
            Edit Profit Goal :
          </DialogTitle>
             <DialogContent>
             <DialogContentText>
               Current Amount : {total}
             </DialogContentText>
            <DialogContentText id="alert-dialog-description">
            
            <TextField
                required
                autoFocus
                margin="dense"
                name="profit_goal"
                label="profit_goal"
                type="Number"
                Width="100"
                variant="standard"
                onChange={onChange}
                value={form.profit_goal}
              />
          </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onPress={handleClose}>Close</Button>
            <Button onPress={handleAction} autoFocus>
              OK
            </Button>
          </DialogActions>
      </Dialog>
    </>
  );
}

export default CircularProgress;
