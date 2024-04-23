import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

// Forms
import AddEmployeeForm from '@/components/AddEmployeeForm';
import AddToolForm from '@/components/AddToolForm';
import AddCompanyForm from '@/components/AddCompanyForm';

export interface Props {
  open: boolean;
  handleClose: () => void;
  recordType: string;
  isUpdate: boolean;
  defaultValues?: any;
  fetchData: () => void;
}

// action is either 'Add' or 'Update'
const RecordDialog: React.FC<Props> = ({
  open,
  handleClose,
  recordType,
  isUpdate,
  defaultValues,
  fetchData,
}) => {

  let action = 'Add';
  if (isUpdate) {
    // If the form is for updating a record, set the action to 'Update'
    action = 'Update';
  }

  const renderForm = () => {
    switch (recordType) {
      case 'Employee':
        return (
          <AddEmployeeForm
            fetchData={fetchData}
            defaultValues={defaultValues}
            isUpdate={isUpdate}
          />
        );
      case 'Tool':
        return (
          <AddToolForm
            fetchData={fetchData}
            defaultValues={defaultValues}
            isUpdate={isUpdate}
          />
        );
      case 'Company':
        return (
          <AddCompanyForm
            fetchData={fetchData}
            defaultValues={defaultValues}
            isUpdate={isUpdate}
          />
        );
      default:
        return null;
    }
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
        { renderForm() }
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}

export default RecordDialog;
