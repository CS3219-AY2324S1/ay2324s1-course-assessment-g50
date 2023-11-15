import React from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';


const MatchingDialog = ({ dialogIsOpen, agree, disagree }) => {
  return (
      <Dialog
        open={dialogIsOpen}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="100"
      >
        <DialogTitle id="alert-dialog-title">
          {"Discard any unsubmitted attempt?"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
             Changes made during unsubmitted attempts will be lost when language is switched.
             Submit code first to save to attempt history!
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={disagree}>Disagree</Button>
          <Button onClick={agree}>Agree</Button>
        </DialogActions>
      </Dialog>
  );
}
export default MatchingDialog;