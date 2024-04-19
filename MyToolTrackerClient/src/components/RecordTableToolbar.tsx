import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface Props {
  setOpen: (value: boolean) => void;
  handleDeleteSelected: () => void;
}

const RecordTableToolbar = ({
  setOpen,
  handleDeleteSelected,
}: Props) => {

  const handleOpenAddEmployeeDialog = () => {
    setOpen(true);
  }

  return(
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
    >
      <Button color="primary" onClick={handleDeleteSelected}>
        Delete
      </Button>
      <Button variant="contained" color="primary" onClick={handleOpenAddEmployeeDialog}>
        Add Employee
      </Button>
    </Box>
  )
};

export default RecordTableToolbar;
