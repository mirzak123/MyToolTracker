import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export interface Props {
  setOpen: (value: boolean) => void;
  handleDeleteSelected: () => void;
  recordType: string;
  selectedIds: GridRowSelectionModel;
}

const RecordTableToolbar = ({
  setOpen,
  handleDeleteSelected,
  recordType,
  selectedIds,
}: Props) => {

  const handleOpenDialog = () => {
    setOpen(true);
  }

  const isDeleteDisabled = selectedIds?.length === 0;
  const isUpdateDisabled = selectedIds?.length !== 1;

  return(
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}
    >
      <Button
        disabled={isDeleteDisabled}
        color="primary"
        onClick={handleDeleteSelected}
      >
        Delete
      </Button>
      <Box>
        <Button sx={{ marginRight: 3 }}
          disabled={isUpdateDisabled}
          variant="contained" color="primary"
          onClick={handleOpenDialog}
        >
          Update {recordType}
        </Button>
        <Button
          variant="contained" color="primary"
          onClick={handleOpenDialog}
        >
          Add {recordType}
        </Button>
      </Box>
    </Box>
  )
};

export default RecordTableToolbar;
