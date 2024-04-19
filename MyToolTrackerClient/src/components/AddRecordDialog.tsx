import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export interface Props {
  open: boolean;
  handleClose: () => void;
  addRecordForm: React.ReactElement;
}

const FormDialog = ({
  open,
  handleClose,
  addRecordForm,
}: Props) => {

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle textAlign="center" mt={2}>Add Employee</DialogTitle>
      <DialogContent sx={{ padding: '16px' }}>
        {addRecordForm}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
