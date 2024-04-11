import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import AddEmployeeForm from '@/components/AddEmployeeForm';

export interface Props {
  open: boolean;
  handleClose: () => void;
}

const FormDialog = ({
  open,
  handleClose,
}: Props) => {

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle textAlign="center" mt={2}>Add Employee</DialogTitle>
      <DialogContent sx={{ padding: '16px' }}>
        <AddEmployeeForm />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default FormDialog;
