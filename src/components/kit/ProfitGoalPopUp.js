import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Cookies from 'universal-cookie';
import axios from 'axios';

function DeletePopUp(props) {
  const cookies = new Cookies();
  const token = cookies.get("TOKEN");
  const headers = {headers: {Authorization: "Bearer " + token}}

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleAction = async()=>{
      // console.log(props.transaction);
      try {
        let res = await axios({
          method: "delete",
          url: `${process.env.REACT_APP_API_URI}api/profit/delete/${props.transaction.id}`,
          ...headers,
        });
        props.close();
        setOpen(false);
        return res;
        // don't forgot to pass response to the parent
      } catch (err) {
        console.log(err);
      }
    }
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" style={{"border-radius":"2rem","padding":"0.5rem 2.25rem","font-family":"Montserrat","font-size":"1rem","line-height":"1.25rem"}} onClick={handleClickOpen}>
            {props.btitle}
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            Are you sure you want to delete ?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              This action is irreversable, Are you sure you want to procceed?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={handleAction} autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
}

export default DeletePopUp