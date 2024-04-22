import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  content: string;
}

const ConfirmationDialog: React.FC<Props> = ({
  open,
  onClose,
  onConfirm,
  title,
  content,
}) => {
  return (
    <Dialog
      onClose={onClose}
      open={open}
      scroll="body"
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button onClick={onConfirm}>Confirm</Button>
        <Button onClick={onClose} variant="contained">Cancel</Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;
