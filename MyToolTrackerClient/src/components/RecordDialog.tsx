import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

export interface Props {
  open: boolean;
  handleClose: () => void;
  recordForm: React.ReactElement;
  recordType: string;
}

// action is either 'Add' or 'Update'
const RecordDialog: React.FC<Props> = ({
  open,
  handleClose,
  recordForm,
  recordType,
}) => {

  // Check if the form is for updating a record
  const { isUpdate } = recordForm.props;

  let action = 'Add';
  if (isUpdate) {
    // If the form is for updating a record, set the action to 'Update'
    action = 'Update';
  }

  return (
    <Dialog
      onClose={handleClose}
      open={open}
      scroll="paper"
    >
      <DialogTitle textAlign="center" mt={2}>
        {action} {recordType}
      </DialogTitle>
      <DialogContent sx={{ padding: '16px' }}>
        {recordForm}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecordDialog;
