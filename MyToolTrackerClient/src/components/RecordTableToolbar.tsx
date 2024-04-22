import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

export interface Props {
  setOpen: (value: boolean) => void;
  handleDeleteSelected: () => void;
  recordType: string;
}

const RecordTableToolbar = ({
  setOpen,
  handleDeleteSelected,
  recordType,
}: Props) => {

  const handleOpenDialog = () => {
    setOpen(true);
  }

  return(
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
    >
      <Button color="primary" onClick={handleDeleteSelected}>
        Delete
      </Button>
      <Box>
        <Button sx={{ marginRight: 3 }} disabled variant="contained" color="primary" onClick={handleOpenDialog}>
          Update {recordType}
        </Button>
        <Button variant="contained" color="primary" onClick={handleOpenDialog}>
          Add {recordType}
        </Button>
      </Box>
    </Box>
  )
};

export default RecordTableToolbar;
