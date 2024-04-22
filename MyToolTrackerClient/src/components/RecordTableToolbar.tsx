import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { GridRowSelectionModel } from '@mui/x-data-grid';

export interface Props {
  handleOpenDialogAdd: (value: boolean) => void;
  handleOpenDialogUpdate: (value: boolean) => void;
  handleDeleteSelected: () => void;
  recordType: string;
  selectedIds: GridRowSelectionModel;
}

const RecordTableToolbar = ({
  handleOpenDialogAdd,
  handleOpenDialogUpdate,
  handleDeleteSelected,
  recordType,
  selectedIds,
}: Props) => {

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
          onClick={handleOpenDialogUpdate}
        >
          Update {recordType}
        </Button>
        <Button
          variant="contained" color="primary"
          onClick={handleOpenDialogAdd}
        >
          Add {recordType}
        </Button>
      </Box>
    </Box>
  )
};

export default RecordTableToolbar;
