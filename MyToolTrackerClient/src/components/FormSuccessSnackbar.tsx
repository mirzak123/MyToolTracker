import * as React from 'react';
import {
  Snackbar,
  Alert,
} from '@mui/material'

interface Props {
  isOpen: boolean;
  close: () => void;
  message: string;
}

const FormSuccessSnackbar: React.FC<Props> = ({
  isOpen,
  close,
  message,
}) => {

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000} // Adjust the duration as needed
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      onClose={close}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={close}
        severity="success" // You can change the severity based on the type of feedback
      >
        { message }
      </Alert>
    </Snackbar>
  )
}

export default FormSuccessSnackbar;
