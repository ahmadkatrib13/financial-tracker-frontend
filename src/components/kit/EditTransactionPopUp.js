import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditTransactionPopUp(props) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleAction = async()=>{
      //await actions
      setOpen(false);
    }
    const handleClose = () => {
      setOpen(false);
    };
  
    return (
      <div>
        <Button variant="outlined" style={{"border-radius":"2rem","padding":"0.5rem 2.25rem","font-family":"Montserrat","font-size":"1rem","line-height":"1.25rem"}} onClick={handleClickOpen}>
            {props.title}
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

export default EditTransactionPopUp